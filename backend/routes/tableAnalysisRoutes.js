const express = require('express');
const router = express.Router();
const TableAnalysis = require('../models/tableAnalysis');

router.post('/upload', async (req, res) => {
  try {
    // Generate next questionId
    const last = await TableAnalysis.findOne().sort({ createdAt: -1 });
    let nextNum = 1;
    if (last && last.questionId) {
      const match = last.questionId.match(/^TA-(\d+)$/);
      if (match) nextNum = parseInt(match[1], 10) + 1;
    }
    const questionId = `TA-${String(nextNum).padStart(3, '0')}`;

    // If bulk upload (array), handle each
    if (Array.isArray(req.body)) {
      const saved = [];
      for (let i = 0; i < req.body.length; i++) {
        const q = req.body[i];
        const id = `TA-${String(nextNum + i).padStart(3, '0')}`;
        const question = new TableAnalysis({ ...q, questionId: id });
        await question.save();
        saved.push(question);
      }
      return res.status(201).json({ success: true, ids: saved.map(q => q.questionId) });
    }

    // Single upload
    const question = new TableAnalysis({ ...req.body, questionId });
    await question.save();
    res.status(201).json({ success: true, id: question.questionId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const questions = await TableAnalysis.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update table analysis question by questionId
router.patch('/:questionId', async (req, res) => {
  try {
    const updateFields = { ...req.body };
    if (updateFields.questionId) delete updateFields.questionId;

    // Optionally validate required fields here if needed

    const updated = await TableAnalysis.findOneAndUpdate(
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

// DELETE: Remove table analysis question and renumber remaining questionIds
router.delete('/:questionId', async (req, res) => {
  const session = await TableAnalysis.startSession();
  session.startTransaction();
  try {
    const toDelete = await TableAnalysis.findOne({ questionId: req.params.questionId }).session(session);
    if (!toDelete) {
      await session.endSession();
      return res.status(404).json({ error: 'Question not found' });
    }
    await TableAnalysis.deleteOne({ questionId: req.params.questionId }).session(session);

    const remaining = await TableAnalysis.find().sort({ createdAt: 1 }).session(session);

    for (let i = 0; i < remaining.length; i++) {
      const newId = `TA-${String(i + 1).padStart(3, '0')}`;
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

// Regenerate (clone) a table analysis question
router.post('/:questionId/regenerate', async (req, res) => {
  try {
    const original = await TableAnalysis.findOne({ questionId: req.params.questionId });
    if (!original) return res.status(404).json({ error: 'Question not found' });

    const questionCount = await TableAnalysis.countDocuments();
    const newQuestion = original.toObject();
    delete newQuestion._id;
    newQuestion.questionId = `TA-${String(questionCount + 1).padStart(3, '0')}`;
    newQuestion.metadata = {
      ...(original.metadata || {}),
      createdAt: new Date(),
      source: 'regenerated',
    };
    newQuestion.explanation = original.explanation || "";

    const inserted = await TableAnalysis.create(newQuestion);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
