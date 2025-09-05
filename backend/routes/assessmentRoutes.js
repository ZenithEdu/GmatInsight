const express = require('express');
const router = express.Router();
const Assessment = require('../models/assessment');

// Helper to generate unique assessmentId
async function generateAssessmentId() {
  let nextNumber = 1;
  let exists = true;
  while (exists) {
    const id = `Exam${nextNumber}`;
    exists = await Assessment.exists({ assessmentId: id });
    if (!exists) return id;
    nextNumber++;
  }
}

// Create assessment
router.post('/', async (req, res) => {
  try {
    const { title, description, duration, totalMarks } = req.body;
    if (!title || !duration || !totalMarks) {
      return res.status(400).json({ error: 'Title, duration, and totalMarks are required.' });
    }
    const assessmentId = await generateAssessmentId();
    const assessment = new Assessment({
      assessmentId,
      title,
      description,
      duration,
      totalMarks,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    await assessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all assessments
router.get('/', async (req, res) => {
  try {
    const assessments = await Assessment.find().sort({ createdAt: -1 });
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update assessment
router.put('/:id', async (req, res) => {
  try {
    const { title, description, duration, totalMarks } = req.body;
    if (!title || !duration || !totalMarks) {
      return res.status(400).json({ error: 'Title, duration, and totalMarks are required.' });
    }
    const assessment = await Assessment.findOneAndUpdate(
      { assessmentId: req.params.id },
      {
        title,
        description,
        duration,
        totalMarks,
        modifiedAt: new Date(),
      },
      { new: true }
    );
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
    res.json(assessment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete assessment
router.delete('/:id', async (req, res) => {
  try {
    const result = await Assessment.deleteOne({ assessmentId: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Assessment not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;