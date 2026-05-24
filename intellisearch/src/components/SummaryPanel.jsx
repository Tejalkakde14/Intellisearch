import ReactMarkdown
from "react-markdown";

export default function SummaryPanel({
  summary,
  onGenerate,
}) {

  return (
    <div className="summary">

      <button
        onClick={onGenerate}
      >
        Generate Summary
      </button>

      {summary && (

        <ReactMarkdown>
          {summary}
        </ReactMarkdown>
      )}

    </div>
  );
}