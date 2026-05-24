const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateDocumentSummary(
  chunks
) {

  if (!chunks?.length) {
    return "No document found.";
  }

  const text =
   chunks.map(c => c.text)
      .join("\n")
      .slice(0, 12000);

  const prompt = `
You are a document summarizer.

Summarize ONLY this document.

DOCUMENT:
${text}

Provide:
- main topic
- key ideas
- important findings

Use markdown bullets.
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

        temperature: 0.2,
      });

    return response
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.log(error);

    return "Summary failed.";
  }
}

module.exports = {
  generateDocumentSummary,
};