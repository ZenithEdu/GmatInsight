const express = require('express');
const connectDB = require('./db');
require('dotenv').config({ path: './.env' }); // env load

const app = express();
const VerbalVaultQuestion = require('./models/verbalVaultQuestion');

const PORT = process.env.PORT;

app.use(express.json());

// Connect MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('GMAT Insight Server is running');
});

// Add verbal vault question
app.post('/api/verbalVault/VerbalVaultQuestions', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const questions = await VerbalVaultQuestion.insertMany(data);
    res.status(201).json(questions);
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

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
