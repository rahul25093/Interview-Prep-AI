const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt
  }
);

module.exports = mongoose.model("Question", questionSchema);