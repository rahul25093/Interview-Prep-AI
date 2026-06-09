const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are an AI interview coach.

Generate ${numberOfQuestions} interview questions for:

Role: ${role}
Experience: ${experience} years
Topics: ${topicsToFocus}

Requirements:
- Return a JSON array.
- Each object must contain:
  - question
  - answer
- Answer should be plain text.
- Do NOT use HTML tags.
- Do NOT use markdown.

Return ONLY valid JSON.
`;

const conceptExplainPrompt = (question) => `
Explain the following interview question:

${question}

Return JSON:

{
  "title": "Title",
  "explanation": "Explanation"
}

Return ONLY valid JSON.
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};