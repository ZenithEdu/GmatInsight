const mongoose = require('mongoose');

const QuantVaultQuestionSchema = new mongoose.Schema({
  set_id: { type: String, required: true },
  questionId: { type: String, required: true },
  type: { type: String, required: true },
  topic: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  difficulty: { type: String, required: true },
  level: { type: String, required: true },
  metadata: {
    source: { type: String },
    createdAt: { type: Date },
  },
  explanation: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('QuantVaultQuestion', QuantVaultQuestionSchema, 'quantVault');
