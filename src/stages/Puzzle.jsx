
import { useState, useEffect } from "react";
import "../styles/global.css";

const SIZE = 4;
const TOTAL = 16;
const IMAGE = "/images/9bdd755128668b7b778f13bc8c9cf9d5.jpg";

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  if (result.every((value, index) => value === index)) {
    return shuffle(array);
  }

  return result;
}

export default function PuzzleStage({ onNext }) {
  const [pieces, setPieces] = useState(() =>
    shuffle(Array.from({ length: TOTAL }, (_, i) => i))
  );

  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    if (pieces.every((piece, index) => piece === index)) {
      setCompleted(true);
      setShowHearts(true);
    }
  }, [pieces]);

  const handlePieceClick = (index) => {
    if (completed) return;

    if (selected === null) {
      setSelected(index);
      return;
    }

    if (selected === index) {
      setSelected(null);
      return;
    }

    const updated = [...pieces];

    [updated[selected], updated[index]] = [
      updated[index],
      updated[selected],
    ];

    setPieces(updated);
    setSelected(null);
    setMoves((prev) => prev + 1);
  };

  const restartGame = () => {
    setPieces(shuffle(Array.from({ length: TOTAL }, (_, i) => i)));
    setSelected(null);
    setMoves(0);
    setCompleted(false);
    setShowHearts(false);
  };

  return (
    <main className="puzzle-world">

      <div className="puzzle-stars">
        {Array.from({ length: 35 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 23 + 5) % 100}%`,
              top: `${(i * 31 + 8) % 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <section className="puzzle-content">

        {!completed ? (
          <>
            <p className="puzzle-small-title">
              ✦ A LITTLE GAME OF LOVE ✦
            </p>

            <h1 className="puzzle-title">PIECES OF US</h1>

            <p className="puzzle-description">
              Look at our picture and put every piece in its place.
            </p>

            <div className="puzzle-game-layout">

              {/* LEFT SIDE ORIGINAL PHOTO */}
              <div className="puzzle-reference">
                <p>OUR ORIGINAL PHOTO ♡</p>
                <img src={IMAGE} alt="Original couple photo" />
                <span>Keep this as your guide</span>
              </div>

              {/* RIGHT SIDE PUZZLE */}
              <div className="puzzle-game">
                <div className="puzzle-info">
                  <span>♡ 16 PIECES</span>
                  <span>MOVES: {moves}</span>
                </div>

                <div className="puzzle-board">
                  {pieces.map((piece, index) => {
                    const row = Math.floor(piece / SIZE);
                    const col = piece % SIZE;

                    return (
                      <button
                        type="button"
                        key={index}
                        className={`puzzle-piece ${
                          selected === index ? "selected-piece" : ""
                        }`}
                        onClick={() => handlePieceClick(index)}
                        style={{
                          backgroundImage: `url("${IMAGE}")`,
                          backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                          backgroundPosition: `${
                            (col / (SIZE - 1)) * 100
                          }% ${(row / (SIZE - 1)) * 100}%`,
                        }}
                        aria-label={`Puzzle piece ${index + 1}`}
                      />
                    );
                  })}
                </div>

                <p className="puzzle-hint">
                  Select two pieces to swap ♡
                </p>

                <button
                  type="button"
                  className="puzzle-restart"
                  onClick={restartGame}
                >
                  ↻ SHUFFLE AGAIN
                </button>
              </div>

            </div>
          </>
        ) : (
          <div className="puzzle-success">

            {/* HEART TRANSITION */}
            {showHearts && (
              <div className="puzzle-heart-transition">
                {Array.from({ length: 18 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      left: `${(i * 19 + 7) % 95}%`,
                      animationDelay: `${(i % 6) * 0.25}s`,
                    }}
                  >
                    {i % 2 === 0 ? "♥" : "♡"}
                  </span>
                ))}
              </div>
            )}

            <div className="success-hearts">♡ ♥ ♡</div>

            <h1>YOU FOUND US!</h1>

            <p>Every piece found its place, just like us.</p>

            <div className="completed-photo">
              <img src={IMAGE} alt="Completed couple puzzle" />
            </div>

            <p className="success-message">
              YOU ARE MY FAVOURITE PIECE. ❤️
            </p>

            <button
              type="button"
              className="puzzle-next"
              onClick={() => onNext?.()}
            >
              NEXT SURPRISE ↓
            </button>

          </div>
        )}

      </section>
    </main>
  );
}
