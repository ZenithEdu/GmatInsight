const express = require('express');
const router = express.Router();
const VerbalVaultQuestion = require('../models/verbalVaultQuestion');


// Add verbal vault question
router.post('/verbalVaultQuestions', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'No questions provided for upload.' });
    }

    // Validate and sanitize each question
    let questionCount = await VerbalVaultQuestion.countDocuments();
    // Only require these fields
    const requiredFields = [
      "set_id",
      "topic",
      "type",
      "question",
      "difficulty",
      "level",
      "answer",
      "layout"
    ];
    const questions = data.map((q, idx) => {
      // Accept both "options" array or optionA, optionB, ...
      let options = [];
      if (Array.isArray(q.options)) {
        options = q.options.filter(opt => typeof opt === "string" && opt.trim() !== "");
      } else {
        // Try to build options from optionA, optionB, ...
        options = [
          q.optionA || q.optiona || "",
          q.optionB || q.optionb || "",
          q.optionC || q.optionc || "",
          q.optionD || q.optiond || "",
          q.optionE || q.optione || ""
        ].filter(opt => typeof opt === "string" && opt.trim() !== "");
      }

      // Ensure required fields
      for (const field of requiredFields) {
        if (!q[field] || q[field].toString().trim() === "") {
          throw new Error(`Question ${idx + 1} is missing required field: ${field}`);
        }
      }
      if (options.length < 2) {
        throw new Error(`Question ${idx + 1} must have at least 2 non-empty options.`);
      }

      // For double layout, require passage
      if (q.layout === "double" && (!q.passage || q.passage.toString().trim() === "")) {
        throw new Error(`Question ${idx + 1} requires a passage for double layout.`);
      }

      // Ensure answer is present and valid
      let answer = q.answer;
      if (!answer || !options.includes(answer)) {
        // Try to map answer letter to value
        const answerIdx = ["A", "B", "C", "D", "E"].indexOf((q.answer || "").toString().toUpperCase().trim());
        if (answerIdx >= 0 && answerIdx < options.length) {
          answer = options[answerIdx];
        } else {
          answer = options[0];
        }
      }

      // Explanation and passage are optional
      let explanation = q.explanation || "";
      let passage = q.passage || "";

      // Ensure type
      let type = q.type;
      if (!type || typeof type !== "string" || !type.trim()) {
        type = "Verbal";
      }

      return {
        ...q,
        options,
        type,
        answer,
        explanation,
        passage,
        questionId: `V-${String(questionCount + idx + 1).padStart(3, '0')}`,
        metadata: {
          source: Array.isArray(req.body) ? 'excel' : 'manual',
          createdAt: new Date(),
        }
      };
    });

    const insertedQuestions = await VerbalVaultQuestion.insertMany(questions);
    res.status(201).json(insertedQuestions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all verbal vault questions
router.get('/VerbalVaultQuestions', async (req, res) => {
  try {
    const questions = await VerbalVaultQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update verbal vault question by questionId
router.patch('/VerbalVaultQuestions/:questionId', async (req, res) => {
  try {
    const updateFields = { ...req.body };
    if (updateFields.questionId) delete updateFields.questionId;
    
    const updated = await VerbalVaultQuestion.findOneAndUpdate(
      { questionId: req.params.questionId },
      updateFields,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Question not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove verbal vault question and renumber remaining questionIds
router.delete('/VerbalVaultQuestions/:questionId', async (req, res) => {
  const session = await VerbalVaultQuestion.startSession();
  session.startTransaction();
  try {
    const toDelete = await VerbalVaultQuestion.findOne({ questionId: req.params.questionId }).session(session);
    if (!toDelete) {
      await session.endSession();
      return res.status(404).json({ error: 'Question not found' });
    }
    await VerbalVaultQuestion.deleteOne({ questionId: req.params.questionId }).session(session);

    const remaining = await VerbalVaultQuestion.find().sort({ createdAt: 1 }).session(session);

    for (let i = 0; i < remaining.length; i++) {
      const newId = `V-${String(i + 1).padStart(3, '0')}`;
      if (remaining[i].questionId !== newId) {
        remaining[i].questionId = newId;
        await remaining[i].save({ session });
      }
    }

    await session.commitTransaction();
    await session.endSession();
    res.json({ success: true });
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    res.status(500).json({ error: 'Failed to delete and renumber. Changes reverted. ' + err.message });
  }
});

// Regenerate (clone) a verbal vault question
router.post('/VerbalVaultQuestions/:questionId/regenerate', async (req, res) => {
  try {
    const original = await VerbalVaultQuestion.findOne({ questionId: req.params.questionId });
    if (!original) return res.status(404).json({ error: 'Question not found' });

    const questionCount = await VerbalVaultQuestion.countDocuments();
    const newQuestion = original.toObject();
    delete newQuestion._id;
    newQuestion.questionId = `V-${String(questionCount + 1).padStart(3, '0')}`;
    newQuestion.metadata = {
      ...original.metadata,
      createdAt: new Date(),
      source: 'regenerated',
    };
    newQuestion.explanation = original.explanation || "";

    const inserted = await VerbalVaultQuestion.create(newQuestion);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;