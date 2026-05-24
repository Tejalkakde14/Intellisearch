const Groq = require("groq-sdk");

const GROQ_MODEL =
  "llama-3.1-8b-instant";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateAnswer(
  question,
  chunks
) {

  const context =
    chunks
      .map((c) => c.text)
      .join("\n");

  const prompt = `
You are a RAG AI assistant.

Answer ONLY from the context.

If answer not found say:
"I could not find this in the document."

CONTEXT:
${context}

QUESTION:
${question}
`;

  const response =
    await groq.chat.completions.create({
      model: GROQ_MODEL,

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.1,
    });

  return response
    .choices[0]
    .message
    .content;
}

module.exports = {
  generateAnswer,
  GROQ_MODEL,
};