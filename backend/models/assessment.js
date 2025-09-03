const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  duration: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model(
  'Assessment',
  assessmentSchema,
  process.env.ASSESSMENTS_COLLECTION || 'assessments'
);
