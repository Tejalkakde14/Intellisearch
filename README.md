# 🧠 DocMind — Node.js AI RAG Document Analyzer

Intellisearch is a full-stack AI-powered RAG (Retrieval-Augmented Generation) application built using:

- ⚛️ React Frontend
- 🟢 Node.js + Express Backend
- 🧠 Groq LLM API
- 📄 PDF Parsing
- 🔍 Semantic Retrieval
- 💬 Real-time AI Question Answering

Users can upload documents and ask questions about them using AI.

---

# ✨ Features

## 📄 Upload Documents

Supports:

- PDF files
- TXT files

Documents are automatically processed and chunked.

---

## 🔍 Semantic Search

Uses:

- TF-IDF embeddings
- Cosine similarity

to retrieve the most relevant document chunks.

---

## 🤖 AI Chat

Ask questions about uploaded documents.

AI responses are:

- grounded in uploaded files
- context-aware
- generated using Groq LLM

---

## 📑 Executive Summary

Generate AI-powered summaries of uploaded documents.

---

## 💡 Suggested Questions

Automatically generates smart questions from uploaded content.

---

# 🧠 Multi-Agent Architecture

| Agent | Responsibility |
|---|---|
| Document Agent | PDF/TXT extraction + chunking |
| Retrieval Agent | Semantic search |
| QA Agent | AI answer generation |
| Question Agent | Suggested questions |
| Summary Agent | Executive summaries |

---

# 📁 Project Structure

```bash
docmind/
│
├── backend/
│   │
│   ├── agents/
│   │   ├── documentAgent.js
│   │   ├── retrievalAgent.js
│   │   ├── qaAgent.js
│   │   ├── questionAgent.js
│   │   └── summaryAgent.js
│   │
│   ├── uploads/
│   │
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

# 1. Clone Repository

```bash
git clone https://github.com/yourusername/docmind.git

cd intellisearch
```

---

# 2. Install Backend Dependencies

```bash
cd testtejal

npm install
```

---

# 3. Install Frontend Dependencies

```bash
cd intellisearch

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside backend folder.

```env
GROQ_API_KEY=your_groq_api_key

GROQ_MODEL=llama-3.3-70b-versatile
```

---

# 🚀 Running the Application

# Start Backend

```bash
cd testtejal

node index.js
```

Server runs on:

```txt
http://localhost:5000
```

---

# Start Frontend

```bash
cd intellisearch

npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 📦 Backend Dependencies

Install:

```bash
npm install express cors multer dotenv groq-sdk pdf-parse natural compromise
```

---

# 📦 Frontend Dependencies

Install:

```bash
npm install axios react-markdown
```

---

# 🧠 How It Works

# Step 1 — Upload Document

User uploads PDF/TXT file.

---

# Step 2 — Text Extraction

Backend extracts text using:

- pdf-parse
- fs

---

# Step 3 — Chunking

Document split into overlapping chunks.

Example:

- 500 words per chunk
- 50 word overlap

---

# Step 4 — Retrieval

TF-IDF similarity search finds relevant chunks.

---

# Step 5 — AI Generation

Retrieved chunks sent to Groq API.

AI generates grounded answer.

---

# 📄 API Endpoints

# Upload Document

```http
POST /upload
```

FormData:

```txt
file
```

---

# Ask Question

```http
POST /ask
```

Body:

```json
{
  "question": "What is this document about?"
}
```

---

# Generate Summary

```http
POST /summary
```

---

# Generate Suggested Questions

```http
POST /questions
```

---

# 🧠 Example Questions

```txt
Summarize this document

What are the key findings?

Explain the architecture

What risks are mentioned?

What conclusions are made?
```

---

# 🎨 Frontend Features

- Dark modern UI
- AI chat interface
- Markdown rendering
- Suggested question pills
- Source viewer
- Responsive design
- Executive summary panel

---

# 🔍 Source Viewer

Every AI answer shows:

- source document
- chunk number
- similarity score
- retrieved text preview

---

# 📄 Supported Files

| Type | Supported |
|---|---|
| PDF | ✅ |
| TXT | ✅ |

---

# 🧱 Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend |
| Express | Backend |
| Groq API | LLM |
| pdf-parse | PDF Extraction |
| Multer | File Upload |
| Natural | NLP |
| Axios | HTTP Requests |
| React Markdown | Markdown Rendering |

---

# ⚠️ Common Errors

# pdfParse is not a function

Fix:

```bash
npm uninstall pdf-parse

npm install pdf-parse@1.1.1
```

---

# Model Decommissioned


```

New:

```js
llama-3.3-70b-versatile
```

---

# Upload Failed

Check:

- backend running
- multer configured
- uploads folder exists

Create uploads folder:

```bash
mkdir uploads
```

---

# CORS Error

Install:

```bash
npm install cors
```

Use:

```js
app.use(cors());
```

---

# Empty Answers

Possible reasons:

- PDF text extraction failed
- scanned PDF
- no matching chunks found

---

# 🛠 Future Improvements

- ChromaDB integration
- Vector embeddings
- OCR support
- Multi-document search
- Authentication
- Chat memory
- Cloud deployment
- Streaming responses

---

# 👨‍💻 Author

Built by Tejal Kakde

React + Node.js + Groq AI + RAG Project

---

# 📜 License

MIT License

Free to use and modify.