const mongoose = require('mongoose');

const VerbalVaultQuestionSchema = new mongoose.Schema({
  set_id: { type: String, required: true },
  questionId: { type: String, required: true },
  type: { type: String, required: true },
  topic: { type: String, required: true },
  question: { type: String, required: true },
  passage: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  difficulty: { type: String, required: true },
  level: { type: String, required: true },
  layout: { type: String, required: true },
  metadata: {
    source: { type: String },
    createdAt: { type: Date },
  },
}, { timestamps: true });

// No assessmentId field in schema, no unique index.

module.exports = mongoose.model('VerbalVaultQuestion', VerbalVaultQuestionSchema, 'verbalVault');