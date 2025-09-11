const express = require('express');
const router = express.Router();
const DataSufficiency = require('../models/dataSufficiency');

// Bulk upload or single upload of data sufficiency questions
router.post('/upload', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'No questions provided for upload.' });
    }

    // Validate and sanitize each question
    let questionCount = await DataSufficiency.countDocuments();
    const requiredFields = [
      "set_id",
      "topic",
      "type",
      "contextText",
      "statements",
      "options",
      "answer",
      "difficulty",
      "level"
    ];
    const questions = data.map((q, idx) => {
      // Ensure required fields
      for (const field of requiredFields) {
        if (
          (field === "options" && (!Array.isArray(q.options) || q.options.length < 2)) ||
          (field === "statements" && (!Array.isArray(q.statements) || q.statements.length < 2)) ||
          (field !== "options" && field !== "statements" && (!q[field] || q[field].toString().trim() === ""))
        ) {
          throw new Error(`Question ${idx + 1} is missing required field: ${field}`);
        }
      }
      // Only keep non-empty options/statements
      const options = (q.options || []).filter(opt => typeof opt === "string" && opt.trim() !== "");
      const statements = (q.statements || []).filter(st => typeof st === "string" && st.trim() !== "");
      if (options.length < 2) {
        throw new Error(`Question ${idx + 1} must have at least 2 non-empty options.`);
      }
      if (statements.length < 2) {
        throw new Error(`Question ${idx + 1} must have at least 2 non-empty statements.`);
      }
      // Ensure type
      let type = q.type;
      if (!type || typeof type !== "string" || !type.trim()) {
        type = "Data Sufficiency";
      }
      // Ensure answer is present and valid
      let answer = q.answer || q.correctAnswer;
      if (!answer || !["A", "B", "C", "D", "E"].includes(answer.toUpperCase())) {
        const answerIdx = ["A", "B", "C", "D", "E"].indexOf((q.answer || q.correctAnswer || "").toString().toUpperCase().trim());
        if (answerIdx >= 0 && answerIdx < options.length) {
          answer = String.fromCharCode(65 + answerIdx);
        } else {
          answer = "A";
        }
      }
      // Explanation default
      let explanation = q.explanation || "";
      // Content domain validation
      const contentDomain = ["Math", "Non-Math"].includes(q.contentDomain) ? q.contentDomain : "Math";

      // Generate questionId in the format DS-XXX
      const questionId = q.questionId || q.question_id || `DS-${String(questionCount + idx + 1).padStart(3, '0')}`;

      return {
        set_id: q.set_id || null,
        questionId,
        type,
        topic: q.topic,
        contextText: q.contextText,
        statements,
        options,
        answer,
        difficulty: q.difficulty,
        level: q.level,
        contentDomain,
        explanation,
        metadata: {
          source: Array.isArray(req.body) ? 'excel' : 'manual',
          createdAt: new Date(),
        }
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
    await DataSufficiency.bulkWrite(bulkOps);
    res.status(200).json({ message: `Successfully uploaded ${questions.length} question(s)` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all data sufficiency questions
router.get('/', async (req, res) => {
  try {
    const questions = await DataSufficiency.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update data sufficiency question by questionId
router.patch('/:questionId', async (req, res) => {
  try {
    const updateFields = { ...req.body };
    if (updateFields.questionId) delete updateFields.questionId;

    // Validate required fields
    const requiredFields = [
      "set_id",
      "topic",
      "type",
      "contextText",
      "statements",
      "options",
      "answer",
      "difficulty",
      "level"
    ];
    for (const field of requiredFields) {
      if (
        (field === "options" && (!Array.isArray(updateFields.options) || updateFields.options.length < 2)) ||
        (field === "statements" && (!Array.isArray(updateFields.statements) || updateFields.statements.length < 2)) ||
        (field !== "options" && field !== "statements" && (!updateFields[field] || updateFields[field].toString().trim() === ""))
      ) {
        return res.status(400).json({ error: `Missing or invalid required field: ${field}` });
      }
    }
    // Validate contentDomain
    if (updateFields.contentDomain && !["Math", "Non-Math"].includes(updateFields.contentDomain)) {
      return res.status(400).json({ error: "Content domain must be 'Math' or 'Non-Math'" });
    }
    // Validate answer
    if (!["A", "B", "C", "D", "E"].includes(updateFields.answer?.toUpperCase())) {
      return res.status(400).json({ error: "Answer must be A, B, C, D, or E" });
    }

    const updated = await DataSufficiency.findOneAndUpdate(
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

// DELETE: Remove data sufficiency question and renumber remaining questionIds
router.delete('/:questionId', async (req, res) => {
  const session = await DataSufficiency.startSession();
  session.startTransaction();
  try {
    const toDelete = await DataSufficiency.findOne({ questionId: req.params.questionId }).session(session);
    if (!toDelete) {
      await session.endSession();
      return res.status(404).json({ error: 'Question not found' });
    }
    await DataSufficiency.deleteOne({ questionId: req.params.questionId }).session(session);

    const remaining = await DataSufficiency.find().sort({ createdAt: 1 }).session(session);

    for (let i = 0; i < remaining.length; i++) {
      const newId = `DS-${String(i + 1).padStart(3, '0')}`;
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

// Regenerate (clone) a data sufficiency question
router.post('/:questionId/regenerate', async (req, res) => {
  try {
    const original = await DataSufficiency.findOne({ questionId: req.params.questionId });
    if (!original) return res.status(404).json({ error: 'Question not found' });

    const questionCount = await DataSufficiency.countDocuments();
    const newQuestion = original.toObject();
    delete newQuestion._id;
    newQuestion.questionId = `DS-${String(questionCount + 1).padStart(3, '0')}`;
    newQuestion.metadata = {
      ...original.metadata,
      createdAt: new Date(),
      source: 'regenerated',
    };
    newQuestion.explanation = original.explanation || "";

    const inserted = await DataSufficiency.create(newQuestion);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;