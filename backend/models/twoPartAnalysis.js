const mongoose = require('mongoose');


const TwoPartAnalysisSchema = new mongoose.Schema({
	set_id: { type: String, required: true },
	questionId: { type: String, required: true },
	type: { type: String, required: true },
	topic: { type: String, required: true },
	contextText: { type: String, required: true },
	instructionText: { type: String, required: true },
	tableHeaders: [{ type: String, required: true }],
	tableValues: [{ type: String, required: true }],
	answers: [{ type: String, required: true }], // e.g. ['290', '320']
	difficulty: { type: String, required: true },
	level: { type: String, required: true },
	explanation: { type: String },
	contentDomain: { type: String, required: true },
	metadata: {
		source: { type: String },
		createdAt: { type: Date },
	},
}, { timestamps: true });

module.exports = mongoose.model('TwoPartAnalysis', TwoPartAnalysisSchema, 'datainsight.two_part_analysis');
