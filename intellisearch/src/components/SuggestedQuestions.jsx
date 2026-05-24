export default function SuggestedQuestions({
  questions,
  onAsk,
}) {

  if (!questions.length)
    return null;

  return (
    <div className="questions">

      {questions.map(
        (q, idx) => (

          <button
            key={idx}
            onClick={() =>
              onAsk(q)
            }
          >
            {q}
          </button>
        )
      )}

    </div>
  );
}