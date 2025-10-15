const mongoose = require('mongoose');

const TableAnalysisSchema = new mongoose.Schema({
  questionId: { type: String, required: true, unique: true }, // Add this
  setId: { type: String },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  level: { type: String, required: true },
  instructions: { type: String, required: true },
  headers: [{ type: String, required: true }],
  rows: [[{ type: String, required: true }]],
  sortBy: { type: String },
  explanation: { type: String },
  statements: [
    {
      text: { type: String, required: true },
      answer: { type: String }
    }
  ],
  contentDomain: { type: String, required: true },
  metadata: {
    source: { type: String },
    createdAt: { type: Date }
  }
}, { timestamps: true });

module.exports = mongoose.model('TableAnalysis', TableAnalysisSchema, 'datainsight.table_analysis');
