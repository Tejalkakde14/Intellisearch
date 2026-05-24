import { useState, useRef } from "react";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import SuggestedQuestions from "../components/SuggestedQuestions";
import SummaryPanel from "../components/SummaryPanel";

import api from "../services/api";

export default function Home() {

  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // tracks whether a doc has been uploaded so askQuestion can guard correctly
  const hasDocRef = useRef(false);

  async function uploadFile(file) {
    setMessages([]);
    setQuestions([]);
    setSummary("");
    hasDocRef.current = false;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      await api.post("/upload", formData);

      // mark doc as ready BEFORE fetching questions
      hasDocRef.current = true;

      const q = await api.get("/questions");
      setQuestions(q.data.questions || []);

    } catch (error) {
      console.error("Upload error:", error);
    }

    setLoading(false);
  }

  async function askQuestion(question) {
    if (!question?.trim()) return;

    // add user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
    ]);

    try {
      const response = await api.post("/ask", { question });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          sources: response.data.sources || [],
        },
      ]);

    } catch (error) {
      console.error("Ask error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  }

  async function generateSummary() {
    try {
      const response = await api.get("/summary");
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Summary error:", error);
    }
  }

  return (
    <div className="app">

      <Sidebar
        onUpload={uploadFile}
        loading={loading}
      />

      <div className="main">

        <SuggestedQuestions
          questions={questions}
          onAsk={askQuestion}
        />

        <SummaryPanel
          summary={summary}
          onGenerate={generateSummary}
        />

        <ChatWindow
          messages={messages}
        />

        <ChatInput
          onSend={askQuestion}
        />

      </div>
    </div>
  );
}