const mongoose = require('mongoose');

const graphicsInterpretationSchema = new mongoose.Schema({
  set_id: { type: String, default: null },
  questionId: { type: String, required: true, unique: true },
  type: { type: String, default: 'Graphics Interpretation' },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  level: { type: String, required: true },
  graphUrl: { type: String, required: true },
  graphDescription: { type: String, required: true },
  instructionText: { type: String, required: true },
  conclusionTemplate: { type: String, required: true },
  dropdowns: [
    {
      id: Number,
      placeholder: String,
      options: [String],
      selectedValue: String,
    },
  ],
  explanation: { type: String },
  contentDomain: { type: String, default: 'Math' },
  metadata: {
    source: { type: String, default: 'manual' },
    createdAt: { type: Date, default: Date.now },
  },
}, { timestamps: true });

module.exports = mongoose.model('GraphicsInterpretation', graphicsInterpretationSchema, 'datainsight.graphics_interpretation');