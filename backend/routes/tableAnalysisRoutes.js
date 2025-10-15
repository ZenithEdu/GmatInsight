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

module.exports = router;
