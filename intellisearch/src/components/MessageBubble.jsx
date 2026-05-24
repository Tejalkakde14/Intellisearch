import ReactMarkdown
from "react-markdown";

import SourceViewer
from "./SourceViewer";

export default function MessageBubble({
  role,
  content,
  sources,
}) {

  return (
    <div
      className={`bubble ${role}`}
    >

      <ReactMarkdown>
        {content}
      </ReactMarkdown>

      {role === "assistant" && (
        <SourceViewer
          sources={sources}
        />
      )}

    </div>
  );
}