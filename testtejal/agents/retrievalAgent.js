const {
  generateEmbedding,
} = require(
  "../services/embeddingService"
);

function cosineSimilarity(a, b) {

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {

    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (
    Math.sqrt(magA) *
    Math.sqrt(magB)
  );
}

async function retrieveChunks(
  question,
  documents,
  topK = 5
) {

  const questionEmbedding =
    await generateEmbedding(question);

  const scored =
    documents.map((doc) => ({
      ...doc,
      score: cosineSimilarity(
        questionEmbedding,
        doc.embedding
      ),
    }));

  scored.sort(
    (a, b) => b.score - a.score
  );

  return scored.slice(0, topK);
}

module.exports = {
  retrieveChunks,
};