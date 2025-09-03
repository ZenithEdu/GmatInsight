const express = require('express');
const connectDB = require('./db');
require('dotenv').config({ path: './.env' }); // env load
const cors = require('cors');

const app = express();
// Enable CORS for all routes
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

const VerbalVaultQuestion = require('./models/verbalVaultQuestion');
const Assessment = require('./models/assessment');

const PORT = process.env.PORT;

app.use(express.json());

// Connect MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('GMAT Insight Server is running');
});

// Generate questionId in V-001 format
async function generateQuestionId(count) {
  return `V-${String(count + 1).padStart(3, '0')}`;
}

// Add verbal vault question
app.post('/api/verbalVault/VerbalVaultQuestions', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'No questions provided for upload.' });
    }

    // Get current question count
    const questionCount = await VerbalVaultQuestion.countDocuments();
    // Generate unique questionId for each question in V-xxx series
    const questions = data.map((q, idx) => ({
      ...q,
      questionId: `V-${String(questionCount + idx + 1).padStart(3, '0')}`,
      metadata: {
        source: Array.isArray(req.body) ? 'excel' : 'manual',
        createdAt: new Date(),
      },
    }));

    const insertedQuestions = await VerbalVaultQuestion.insertMany(questions);
    res.status(201).json(insertedQuestions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all verbal vault questions
app.get('/api/verbalVault/VerbalVaultQuestions', async (req, res) => {
  try {
    const questions = await VerbalVaultQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update verbal vault question by questionId (edit all except questionId)
app.patch('/api/verbalVault/VerbalVaultQuestions/:questionId', async (req, res) => {
  try {
    const updateFields = { ...req.body };
    // Prevent questionId from being updated
    if (updateFields.questionId) delete updateFields.questionId;
    // Only update fields present in body
    const updated = await VerbalVaultQuestion.findOneAndUpdate(
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
app.post('/api/assessments', async (req, res) => {
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

// Get all assessments (sorted by createdAt descending)
app.get('/api/assessments', async (req, res) => {
  try {
    const assessments = await Assessment.find().sort({ createdAt: -1 });
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update assessment
app.put('/api/assessments/:id', async (req, res) => {
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

// DELETE: Remove verbal vault question and renumber remaining questionIds
app.delete('/api/verbalVault/VerbalVaultQuestions/:questionId', async (req, res) => {
  const session = await VerbalVaultQuestion.startSession();
  session.startTransaction();
  try {
    // Find and delete the question
    const toDelete = await VerbalVaultQuestion.findOne({ questionId: req.params.questionId }).session(session);
    if (!toDelete) {
      await session.endSession();
      return res.status(404).json({ error: 'Question not found' });
    }
    await VerbalVaultQuestion.deleteOne({ questionId: req.params.questionId }).session(session);

    // Fetch all remaining questions sorted by createdAt
    const remaining = await VerbalVaultQuestion.find().sort({ createdAt: 1 }).session(session);

    // Renumber questionIds
    for (let i = 0; i < remaining.length; i++) {
      const newId = `V-${String(i + 1).padStart(3, '0')}`;
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

// Delete assessment
app.delete('/api/assessments/:id', async (req, res) => {
  try {
    const result = await Assessment.deleteOne({ assessmentId: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Assessment not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Regenerate (clone) a verbal vault question
app.post('/api/verbalVault/VerbalVaultQuestions/:questionId/regenerate', async (req, res) => {
  try {
    const original = await VerbalVaultQuestion.findOne({ questionId: req.params.questionId });
    if (!original) return res.status(404).json({ error: 'Question not found' });

    // Get current question count for new ID
    const questionCount = await VerbalVaultQuestion.countDocuments();
    const newQuestion = original.toObject();
    delete newQuestion._id;
    newQuestion.questionId = `V-${String(questionCount + 1).padStart(3, '0')}`;
    newQuestion.metadata = {
      ...original.metadata,
      createdAt: new Date(),
      source: 'regenerated',
    };

    const inserted = await VerbalVaultQuestion.create(newQuestion);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all for undefined API routes (404)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});