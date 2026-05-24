import MessageBubble
from "./MessageBubble";

export default function ChatWindow({
  messages,
}) {

  return (
    <div className="chat-window">

      {messages.map(
        (msg, idx) => (

          <MessageBubble
            key={idx}
            role={msg.role}
            content={msg.content}
            sources={msg.sources}
          />
        )
      )}

    </div>
  );
}