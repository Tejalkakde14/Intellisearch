const fs = require("fs");
const pdf = require("pdf-parse");

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function chunkText(
  text,
  docName,
  chunkSize = 500,
  overlap = 50
) {

  const words = cleanText(text).split(" ");

  const chunks = [];

  let start = 0;
  let idx = 0;

  while (start < words.length) {

    const end = Math.min(
      start + chunkSize,
      words.length
    );

    chunks.push({
      docName,
      chunkIdx: idx,
      text: words
        .slice(start, end)
        .join(" "),
    });

    if (end === words.length) {
      break;
    }

    start += chunkSize - overlap;
    idx++;
  }

  return chunks;
}

async function extractTextFromPDF(
  filePath
) {

  const buffer =
    fs.readFileSync(filePath);

  const data =
    await pdf(buffer);

  return data.text;
}

async function ingestDocument(
  filePath,
  fileName
) {

  const text =
    await extractTextFromPDF(filePath);

  return chunkText(text, fileName);
}

module.exports = {
  ingestDocument,
  chunkText,
};