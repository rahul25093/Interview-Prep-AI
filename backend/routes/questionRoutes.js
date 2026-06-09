const express = require("express");
const router = express.Router();

const {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
} = require("../controllers/questionController");

const { protect } = require("../middlewares/authMiddleware");

// Add Questions
router.post("/add", protect, addQuestionsToSession);

// Pin / Unpin Question
router.post("/:id/pin", protect, togglePinQuestion);

// Add Note
router.post("/:id/note", protect, updateQuestionNote);

module.exports = router;