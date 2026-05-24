require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const {
  ingestDocument,
} = require(
  "./agents/documentAgent"
);

const {
  generateEmbedding,
} = require(
  "./services/embeddingService"
);

const {
  retrieveChunks,
} = require(
  "./agents/retrievalAgent"
);

const {
  generateAnswer,
} = require(
  "./agents/qaAgent"
);

const {
  generateDocumentSummary,
} = require(
  "./agents/summaryAgent"
);


const {
  generateSuggestedQuestions,
} = require(
  "./agents/questionAgent"
);
const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "uploads/",

});

let documents = [];

app.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {

    try {

      // CLEAR OLD DATA
      documents = [];

      const chunks =
        await ingestDocument(
          req.file.path,
          req.file.originalname
        );

      for (const chunk of chunks) {

        const embedding =
          await generateEmbedding(
            chunk.text
          );

        documents.push({
          ...chunk,
          embedding,
        });
      }

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

app.post("/ask", async (req, res) => {

  try {

    const { question } = req.body;

    const chunks =
      await retrieveChunks(
        question,
        documents
      );

    const answer =
      await generateAnswer(
        question,
        chunks
      );

    res.json({
      answer,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.get(
  "/summary",
  async (req, res) => {

    try {

      if (!documents.length) {

        return res.status(400).json({
          error:
            "No documents uploaded",
        });
      }

      const summary =
        await generateDocumentSummary(
          documents
        );

      res.json({
        summary,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Summary failed",
      });
    }
  }
);

app.get(
  "/questions",
  async (req, res) => {

    try {

      if (!documents.length) {

        return res.status(400).json({
          error:
            "No document uploaded",
        });
      }

      const questions =
        await generateSuggestedQuestions(
          documents
        );

      res.json({
        questions,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Question generation failed",
      });
    }
  }
);

app.listen(5000, () => {
  console.log("Server running");
});