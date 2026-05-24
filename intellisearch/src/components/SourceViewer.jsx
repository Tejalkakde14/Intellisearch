import { useState } from "react";

export default function SourceViewer({
  sources = [],
}) {

  const [open, setOpen] =
    useState(false);

  if (!sources.length)
    return null;

  return (
    <div className="source-viewer">

      <button
        className="source-toggle"
        onClick={() =>
          setOpen(!open)
        }
      >
        {open
          ? "Hide Sources"
          : "View Sources"}
      </button>

      {open && (

        <div className="source-list">

          {sources.map(
            (src, idx) => (

              <div
                key={idx}
                className="source-card"
              >

                <div className="source-header">

                  <span className="source-doc">
                    📄 {src.docName}
                  </span>

                  <span className="source-score">
                    Score:
                    {" "}
                    {src.score?.toFixed(3)}
                  </span>

                </div>

                <div className="source-chunk">
                  Chunk #{src.chunkIdx}
                </div>

                <p className="source-text">
                  {src.text}
                </p>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}