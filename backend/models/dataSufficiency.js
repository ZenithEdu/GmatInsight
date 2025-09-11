const mongoose = require('mongoose');


const DataSufficiencySchema = new mongoose.Schema({
  set_id: { type: String, required: true },
  questionId: { type: String, required: true },
  type: { type: String, required: true },
  topic: { type: String, required: true },
  contextText: { type: String, required: true },
  statements: [{ type: String, required: true }],
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  difficulty: { type: String, required: true },
  level: { type: String, required: true },
  contentDomain: { type: String, required: true },
  explanation: { type: String },
  metadata: {
    source: { type: String },
    createdAt: { type: Date },
  },
}, { timestamps: true });

module.exports = mongoose.model('DataSufficiency', DataSufficiencySchema, 'datainsight.data_sufficiency');
