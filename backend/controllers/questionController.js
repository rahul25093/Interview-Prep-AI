const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc Add additional questions to an existing session
// @route POST /api/questions/add
// @access Private
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        message: "Invalid request data",
      });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    // Created new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Update session to include new question IDs
    session.questions.push(...createdQuestions.map((q) => q._id));

    await session.save();

    res.status(201).json(createdQuestions);
  } catch (error) {
    console.error("Add Questions Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Toggle Pin Question
// @route POST /api/questions/:id/pin
// @access Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // ✅ FIX: Toggle the isPinned boolean (was incorrectly updating note field)
    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("Toggle Pin Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Add or Update Question Note
// @route POST /api/questions/:id/note
// @access Private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    question.note = note;

    await question.save();

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error("Update Note Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
