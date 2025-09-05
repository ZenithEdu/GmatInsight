const express = require('express');
const router = express.Router();
const QuantVaultQuestion = require('../models/quantVaultQuestion');

// Generate questionId in Q-001 format
async function generateQuestionId(count) {
  return `Q-${String(count + 1).padStart(3, '0')}`;
}

// Add quant vault question(s)
router.post('/QuantVaultQuestions', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'No questions provided for upload.' });
    }

    const questionCount = await QuantVaultQuestion.countDocuments();
    const questions = data.map((q, idx) => ({
      ...q,
      questionId: `Q-${String(questionCount + idx + 1).padStart(3, '0')}`,
      metadata: {
        source: Array.isArray(req.body) ? 'excel' : 'manual',
        createdAt: new Date(),
      },
      explanation: q.explanation || "",
    }));

    const insertedQuestions = await QuantVaultQuestion.insertMany(questions);
    res.status(201).json(insertedQuestions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all quant vault questions
router.get('/QuantVaultQuestions', async (req, res) => {
  try {
    const questions = await QuantVaultQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update quant vault question by questionId
router.patch('/QuantVaultQuestions/:questionId', async (req, res) => {
  try {
    const updateFields = { ...req.body };
    if (updateFields.questionId) delete updateFields.questionId;
    
    const updated = await QuantVaultQuestion.findOneAndUpdate(
      { questionId: req.params.questionId },
      updateFields,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Question not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove quant vault question and renumber remaining questionIds
router.delete('/QuantVaultQuestions/:questionId', async (req, res) => {
  const session = await QuantVaultQuestion.startSession();
  session.startTransaction();
  try {
    const toDelete = await QuantVaultQuestion.findOne({ questionId: req.params.questionId }).session(session);
    if (!toDelete) {
      await session.endSession();
      return res.status(404).json({ error: 'Question not found' });
    }
    await QuantVaultQuestion.deleteOne({ questionId: req.params.questionId }).session(session);

    const remaining = await QuantVaultQuestion.find().sort({ createdAt: 1 }).session(session);

    for (let i = 0; i < remaining.length; i++) {
      const newId = `Q-${String(i + 1).padStart(3, '0')}`;
      if (remaining[i].questionId !== newId) {
        remaining[i].questionId = newId;
        await remaining[i].save({ session });
      }
    }

    await session.commitTransaction();
    await session.endSession();
    res.json({ success: true });
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    res.status(500).json({ error: 'Failed to delete and renumber. Changes reverted. ' + err.message });
  }
});

// Regenerate (clone) a quant vault question
router.post('/QuantVaultQuestions/:questionId/regenerate', async (req, res) => {
  try {
    const original = await QuantVaultQuestion.findOne({ questionId: req.params.questionId });
    if (!original) return res.status(404).json({ error: 'Question not found' });

    const questionCount = await QuantVaultQuestion.countDocuments();
    const newQuestion = original.toObject();
    delete newQuestion._id;
    newQuestion.questionId = `Q-${String(questionCount + 1).padStart(3, '0')}`;
    newQuestion.metadata = {
      ...original.metadata,
      createdAt: new Date(),
      source: 'regenerated',
    };
    newQuestion.explanation = original.explanation || "";

    const inserted = await QuantVaultQuestion.create(newQuestion);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
