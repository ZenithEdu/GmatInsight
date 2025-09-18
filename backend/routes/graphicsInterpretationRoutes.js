const express = require('express');
const router = express.Router();
const GraphicsInterpretation = require('../models/graphicsInterpretation');

// Bulk or single upload of graphics interpretation questions (bulk supported)
router.post('/upload', async (req, res) => {
  try {
    const q = req.body;
    if (!q || typeof q !== 'object') {
      return res.status(400).json({ error: 'No question provided for upload.' });
    }
    let questionCount = await GraphicsInterpretation.countDocuments();
    const requiredFields = [
      'topic',
      'difficulty',
      'level',
      'graphUrl',
      'graphDescription',
      'instructionText',
      'conclusionTemplate',
      'dropdowns',
    ];
    for (const field of requiredFields) {
      if (
        (field === 'dropdowns' && (!Array.isArray(q.dropdowns) || q.dropdowns.length < 1)) ||
        (field !== 'dropdowns' && (!q[field] || q[field].toString().trim() === ''))
      ) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    // Only keep non-empty dropdowns
    const dropdowns = (q.dropdowns || []).filter(d => d && d.placeholder && Array.isArray(d.options) && d.options.length > 0);
    if (dropdowns.length < 1) {
      return res.status(400).json({ error: 'Must have at least 1 dropdown.' });
    }
    let type = q.type;
    if (!type || typeof type !== 'string' || !type.trim()) {
      type = 'Graphics Interpretation';
    }
    let explanation = q.explanation || '';
    const contentDomain = ['Math', 'Non-Math'].includes(q.contentDomain) ? q.contentDomain : 'Math';
    const questionId = q.questionId || q.question_id || `GI-${String(questionCount + 1).padStart(3, '0')}`;
    const questionObj = {
      set_id: q.set_id || null,
      questionId,
      type,
      topic: q.topic,
      difficulty: q.difficulty,
      level: q.level,
      graphUrl: q.graphUrl,
      graphDescription: q.graphDescription,
      instructionText: q.instructionText,
      conclusionTemplate: q.conclusionTemplate,
      dropdowns,
      explanation,
      contentDomain,
      metadata: {
        source: 'manual',
        createdAt: new Date(),
      },
    };
    // Upsert by questionId
    const updated = await GraphicsInterpretation.findOneAndUpdate(
      { questionId: questionObj.questionId },
      { $set: questionObj },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'Successfully uploaded 1 question', question: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all graphics interpretation questions
router.get('/', async (req, res) => {
  try {
    const questions = await GraphicsInterpretation.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update graphics interpretation question by questionId
router.patch('/:questionId', async (req, res) => {
  try {
    const updateFields = { ...req.body };
    if (updateFields.questionId) delete updateFields.questionId;
    const requiredFields = [
      'topic',
      'difficulty',
      'level',
      'graphUrl',
      'graphDescription',
      'instructionText',
      'conclusionTemplate',
      'dropdowns',
    ];
    for (const field of requiredFields) {
      if (
        (field === 'dropdowns' && (!Array.isArray(updateFields.dropdowns) || updateFields.dropdowns.length < 1)) ||
        (field !== 'dropdowns' && (!updateFields[field] || updateFields[field].toString().trim() === ''))
      ) {
        return res.status(400).json({ error: `Missing or invalid required field: ${field}` });
      }
    }
    if (updateFields.contentDomain && !['Math', 'Non-Math'].includes(updateFields.contentDomain)) {
      return res.status(400).json({ error: "Content domain must be 'Math' or 'Non-Math'" });
    }
    const updated = await GraphicsInterpretation.findOneAndUpdate(
      { questionId: req.params.questionId },
      updateFields,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove graphics interpretation question and renumber remaining questionIds
router.delete('/:questionId', async (req, res) => {
  const session = await GraphicsInterpretation.startSession();
  session.startTransaction();
  try {
    const toDelete = await GraphicsInterpretation.findOne({ questionId: req.params.questionId }).session(session);
    if (!toDelete) {
      await session.endSession();
      return res.status(404).json({ error: 'Question not found' });
    }
    await GraphicsInterpretation.deleteOne({ questionId: req.params.questionId }).session(session);
    const remaining = await GraphicsInterpretation.find().sort({ createdAt: 1 }).session(session);
    for (let i = 0; i < remaining.length; i++) {
      const newId = `GI-${String(i + 1).padStart(3, '0')}`;
      if (remaining[i].questionId !== newId) {
        remaining[i].questionId = newId;
        await remaining[i].save({ session });
      }
    }
    await session.commitTransaction();
    await session.endSession();
    res.status(200).json({ success: true });
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    res.status(500).json({ error: 'Failed to delete and renumber. Changes reverted. ' + err.message });
  }
});

// Regenerate (clone) a graphics interpretation question
router.post('/:questionId/regenerate', async (req, res) => {
  try {
    const original = await GraphicsInterpretation.findOne({ questionId: req.params.questionId });
    if (!original) return res.status(404).json({ error: 'Question not found' });
    const questionCount = await GraphicsInterpretation.countDocuments();
    const newQuestion = original.toObject();
    delete newQuestion._id;
    newQuestion.questionId = `GI-${String(questionCount + 1).padStart(3, '0')}`;
    newQuestion.metadata = {
      ...original.metadata,
      createdAt: new Date(),
      source: 'regenerated',
    };
    newQuestion.explanation = original.explanation || "";
    const inserted = await GraphicsInterpretation.create(newQuestion);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
