const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateSuggestedQuestions(
  chunks
) {

  if (!chunks?.length) {
    return [];
  }

  // USE ONLY CURRENT DOC
  const text =
    chunks
      .slice(0, 5)
      .map((c) => c.text)
      .join("\n")
      .slice(0, 6000);

  const prompt = `
You are analyzing a document.

Generate 5 UNIQUE questions
based ONLY on this document.

DOCUMENT:
${text}

Rules:
- Questions must be specific
- Questions must differ
- Return ONLY JSON array

Example:
[
 "What is the main topic?",
 "What conclusions are presented?"
]
`;

  try {

    const response =
      await groq.chat.completions.create({
        model:
          "llama-3.1-8b-instant",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

    const content =
      response.choices[0]
      .message
      .content;

    return JSON.parse(content);

  } catch (error) {

    console.log(error);

    return [];
  }
}

module.exports = {
  generateSuggestedQuestions,
};