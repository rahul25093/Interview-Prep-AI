const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Helper: Wait for ms milliseconds
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper: Robustly extract and parse JSON from Gemini response
const extractJSON = (rawText) => {
  let cleaned = rawText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  if (cleaned[0] !== "{" && cleaned[0] !== "[") {
    const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }
  }

  return JSON.parse(cleaned);
};

// Helper: Call Gemini with retry on 503
const generateWithRetry = async (prompt, retries = 3, delayMs = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      return response;
    } catch (error) {
      const is503 = error?.status === 503 || error?.message?.includes("503") || error?.message?.includes("UNAVAILABLE");

      if (is503 && attempt < retries) {
        console.log(`Gemini 503 - retrying (${attempt}/${retries}) in ${delayMs}ms...`);
        await wait(delayMs);
      } else {
        throw error; // rethrow if not 503 or out of retries
      }
    }
  }
};

// @desc Generate interview questions
// @route POST /api/ai/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await generateWithRetry(prompt);
    const data = extractJSON(response.text);

    res.status(200).json(data);
  } catch (error) {
    console.error("Generate Questions Error:", error);

    const is503 = error?.status === 503 || error?.message?.includes("UNAVAILABLE");
    res.status(500).json({
      message: is503
        ? "Gemini API is busy. Please try again in a moment."
        : "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc Generate concept explanation
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await generateWithRetry(prompt);
    const data = extractJSON(response.text);

    res.status(200).json(data);
  } catch (error) {
    console.error("Generate Explanation Error:", error);

    const is503 = error?.status === 503 || error?.message?.includes("UNAVAILABLE");
    res.status(500).json({
      message: is503
        ? "Gemini API is busy. Please try again in a moment."
        : "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
