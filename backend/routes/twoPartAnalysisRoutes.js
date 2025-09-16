const express = require('express');
const router = express.Router();
const TwoPartAnalysis = require('../models/twoPartAnalysis');

// Bulk or single upload of two part analysis questions
router.post('/upload', async (req, res) => {
	try {
		const data = Array.isArray(req.body) ? req.body : [req.body];
		if (!data || !Array.isArray(data) || data.length === 0) {
			return res.status(400).json({ error: 'No questions provided for upload.' });
		}

		let questionCount = await TwoPartAnalysis.countDocuments();

			const requiredFields = [
				'set_id',
				'topic',
				'type',
				'contextText',
				'instructionText',
				'tableHeaders',
				'tableValues',
				'answers',
				'difficulty',
				'level',
				'contentDomain',
			];

			const questions = data.map((q, idx) => {
				for (const field of requiredFields) {
					if (
						(field === 'tableHeaders' && (!Array.isArray(q.tableHeaders) || q.tableHeaders.length < 1)) ||
						(field === 'tableValues' && (!Array.isArray(q.tableValues) || q.tableValues.length < 1)) ||
						(field === 'answers' && (!Array.isArray(q.answers) || q.answers.length < 1)) ||
						(field !== 'tableHeaders' && field !== 'tableValues' && field !== 'answers' && (!q[field] || q[field].toString().trim() === ''))
					) {
						throw new Error(`Question ${idx + 1} is missing required field: ${field}`);
					}
				}

				// Only keep non-empty headers/values/answers
				const tableHeaders = (q.tableHeaders || []).filter(h => typeof h === 'string' && h.trim() !== '');
				const tableValues = (q.tableValues || []).filter(v => typeof v === 'string' && v.trim() !== '');
				const answers = (q.answers || []).filter(a => typeof a === 'string' && a.trim() !== '');
				if (tableHeaders.length < 1) {
					throw new Error(`Question ${idx + 1} must have at least 1 non-empty table header.`);
				}
				if (tableValues.length < 1) {
					throw new Error(`Question ${idx + 1} must have at least 1 non-empty table value.`);
				}
				if (answers.length < 1) {
					throw new Error(`Question ${idx + 1} must have at least 1 non-empty answer.`);
				}
				// Ensure type
				let type = q.type;
				if (!type || typeof type !== 'string' || !type.trim()) {
					type = 'Two Part Analysis';
				}
				// Explanation default
				let explanation = q.explanation || '';

				// Generate questionId in the format TPA-XXX
				const questionId = q.questionId || q.question_id || `TPA-${String(questionCount + idx + 1).padStart(3, '0')}`;

				return {
					set_id: q.set_id || null,
					questionId,
					type,
					topic: q.topic,
					contextText: q.contextText,
					instructionText: q.instructionText,
					tableHeaders,
					tableValues,
					answers,
					difficulty: q.difficulty,
					level: q.level,
					explanation,
					contentDomain: q.contentDomain,
					metadata: {
						source: Array.isArray(req.body) ? 'excel' : 'manual',
						createdAt: new Date(),
					},
				};
			});

		// Upsert by questionId
		const bulkOps = questions.map(q => ({
			updateOne: {
				filter: { questionId: q.questionId },
				update: { $set: q },
				upsert: true,
			},
		}));
		await TwoPartAnalysis.bulkWrite(bulkOps);
		res.status(200).json({ message: `Successfully uploaded ${questions.length} question(s)` });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get all two part analysis questions
router.get('/', async (req, res) => {
	try {
		const questions = await TwoPartAnalysis.find();
		res.status(200).json(questions);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// PATCH: Update two part analysis question by questionId
router.patch('/:questionId', async (req, res) => {
	try {
		const updateFields = { ...req.body };
		if (updateFields.questionId) delete updateFields.questionId;

		// Validate required fields
			const requiredFields = [
				'set_id',
				'topic',
				'type',
				'contextText',
				'instructionText',
				'tableHeaders',
				'tableValues',
				'answers',
				'difficulty',
				'level',
				'contentDomain',
			];
			for (const field of requiredFields) {
				if (
					(field === 'tableHeaders' && (!Array.isArray(updateFields.tableHeaders) || updateFields.tableHeaders.length < 1)) ||
					(field === 'tableValues' && (!Array.isArray(updateFields.tableValues) || updateFields.tableValues.length < 1)) ||
					(field === 'answers' && (!Array.isArray(updateFields.answers) || updateFields.answers.length < 1)) ||
					(field !== 'tableHeaders' && field !== 'tableValues' && field !== 'answers' && (!updateFields[field] || updateFields[field].toString().trim() === ''))
				) {
					return res.status(400).json({ error: `Missing or invalid required field: ${field}` });
				}
			}

		const updated = await TwoPartAnalysis.findOneAndUpdate(
			{ questionId: req.params.questionId },
			updateFields,
			{ new: true }
		);
		if (!updated) return res.status(404).json({ error: 'Question not found' });
		res.status(200).json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
// DELETE: Remove two part analysis question and renumber remaining questionIds
router.delete('/:questionId', async (req, res) => {
	const session = await TwoPartAnalysis.startSession();
	session.startTransaction();
	try {
		const toDelete = await TwoPartAnalysis.findOne({ questionId: req.params.questionId }).session(session);
		if (!toDelete) {
			await session.endSession();
			return res.status(404).json({ error: 'Question not found' });
		}
		await TwoPartAnalysis.deleteOne({ questionId: req.params.questionId }).session(session);

		const remaining = await TwoPartAnalysis.find().sort({ createdAt: 1 }).session(session);

		for (let i = 0; i < remaining.length; i++) {
			const newId = `TPA-${String(i + 1).padStart(3, '0')}`;
			if (remaining[i].questionId !== newId) {
				remaining[i].questionId = newId;
				await remaining[i].save({ session });
			}
		}

		await session.commitTransaction();
		await session.endSession();
		res.status(200).json({ success: true });
	} catch (err) {
		await session.abortTransaction();
		await session.endSession();
		res.status(500).json({ error: 'Failed to delete and renumber. Changes reverted. ' + err.message });
	}
});

// Regenerate (clone) a two part analysis question
router.post('/:questionId/regenerate', async (req, res) => {
	try {
		const original = await TwoPartAnalysis.findOne({ questionId: req.params.questionId });
		if (!original) return res.status(404).json({ error: 'Question not found' });

		const questionCount = await TwoPartAnalysis.countDocuments();
		const newQuestion = original.toObject();
		delete newQuestion._id;
		newQuestion.questionId = `TPA-${String(questionCount + 1).padStart(3, '0')}`;
		newQuestion.metadata = {
			...original.metadata,
			createdAt: new Date(),
			source: 'regenerated',
		};
		newQuestion.explanation = original.explanation || "";

		const inserted = await TwoPartAnalysis.create(newQuestion);
		res.status(201).json(inserted);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
