import { useState } from "react";

export default function ChatInput({
  onSend,
}) {

  const [text, setText] =
    useState("");

  function handleSend() {

    if (!text.trim()) return;

    onSend(text);

    setText("");
  }

  return (
    <div className="chat-input">

      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Ask about document..."
      />

      <button
        onClick={handleSend}
      >
        Send
      </button>

    </div>
  );
}