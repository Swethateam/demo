
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/global.css";

const gifts = [
  {
    id: 1,
    image: "/images/1st.png",
    name: "bed room",
    task: "Go and search in bed room. 🤫",
   
  },
  {
    id: 2,
    image: "/images/2nd.png",
    name: "pooja room",
    task: "Go an search pooja room. 💌",
  
  },
  {
    id: 3,
    image: "/images/3rd.png",
    name: "Priya",
    department: "I Chemistry",
    task: "Go to Priya and tell her the third letter of your name. 💌",
    clueLetter: "T",
  },
  {
    id: 4,
    image: "/images/4th.png",
    name: "Viji",
    department: "I FSC",
    task: "Go to Viji and tell her the fourth letter of your name. 💌",
    clueLetter: "H",
  },
  {
    id: 5,
    image: "/images/5th.png",
    name: "Velmayil",
    department: "II Tamil",
    task: "Go to Velmayil and tell her the fifth letter of your name. 💌",
    clueLetter: "Y",
  },
  {
    id: 6,
    image: "/images/7th.png",
    name: "Chlm",
    department: "II Physical Education",
    task: "Come to me and tell the last letter of your name. 💌",
    clueLetter: "A",
  },
];

function GiftFinder({ onNext }) {
  const [selectedGift, setSelectedGift] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [collected, setCollected] = useState([]);

  const canvasRef = useRef(null);
  const isScratching = useRef(false);

  // Scratch canvas setup
  useEffect(() => {
    if (!selectedGift || revealed || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(
      0,
      0,
      rect.width,
      rect.height
    );

    gradient.addColorStop(0, "#f6c6dc");
    gradient.addColorStop(0.5, "#dba5ce");
    gradient.addColorStop(1, "#a982bd");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 17px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "✦ SCRATCH HERE ✦",
      rect.width / 2,
      rect.height / 2
    );

    ctx.globalCompositeOperation = "destination-out";
  }, [selectedGift, revealed]);

  // Scratch action
  const scratch = (event) => {
    if (!isScratching.current || revealed || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 23, 0, Math.PI * 2);
    ctx.fill();

    // Check cleared area
    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparent = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 160) {
      total++;

      if (pixels[i] < 30) {
        transparent++;
      }
    }

    if (total > 0 && transparent / total > 0.38) {
      isScratching.current = false;
      setRevealed(true);
    }
  };

  // Open gift
  const openGift = (gift) => {
    if (collected.includes(gift.id)) return;

    setRevealed(false);
    setSelectedGift(gift);
  };

  // Collect gift
  const collectGift = () => {
    if (!selectedGift) return;

    setCollected((previous) => {
      if (previous.includes(selectedGift.id)) return previous;
      return [...previous, selectedGift.id];
    });

    setSelectedGift(null);
    setRevealed(false);
  };

  const allCollected = collected.length === gifts.length;

  return (
    <main className="finder-page">

      <div className="finder-stars">✦ · ✧ · ✦ · ✧ · ✦</div>
      <div className="finder-orb finder-orb-one" />
      <div className="finder-orb finder-orb-two" />

      <section className="finder-content">

        <p className="finder-eyebrow">
          A LITTLE ADVENTURE FOR YOU
        </p>

        <h1>Collect Your Gifts</h1>

        <p className="finder-subtitle">
          Six little surprises are waiting.
          Scratch, discover and collect them!
        </p>

        {/* Progress */}
        <div className="finder-progress">

          <div className="finder-progress-label">
            <span>Your collection</span>
            <span>{collected.length} / 6</span>
          </div>

          <div className="finder-progress-track">
            <div
              className="finder-progress-fill"
              style={{
                width: `${(collected.length / 6) * 100}%`,
              }}
            />
          </div>

        </div>

        {/* Gift cards */}
        <div className="finder-grid">

          {gifts.map((gift) => {
            const isCollected = collected.includes(gift.id);

            return (
              <motion.button
                type="button"
                key={gift.id}
                className={`finder-card ${
                  isCollected ? "is-collected" : ""
                }`}
                onClick={() => openGift(gift)}
                whileHover={!isCollected ? { y: -7, scale: 1.02 } : {}}
                whileTap={!isCollected ? { scale: 0.96 } : {}}
                disabled={isCollected}
              >

                <img
                  src={gift.image}
                  alt={`Gift ${gift.id}`}
                  className="finder-card-image"
                />

                <div className="finder-image-shade" />

                <span className="finder-card-number">
                  GIFT {String(gift.id).padStart(2, "0")}
                </span>

                <span className="finder-card-icon">
                  {isCollected ? "✓" : "♡"}
                </span>

                <span className="finder-card-footer">
                  {isCollected ? "Collected" : "Tap to open"}
                  <span>{isCollected ? "♥" : "→"}</span>
                </span>

                {isCollected && (
                  <span className="finder-collected-overlay">
                    <span>♥</span>
                    COLLECTED
                  </span>
                )}

              </motion.button>
            );
          })}

        </div>

        {/* ALWAYS VISIBLE NEXT BUTTON */}
        <motion.div
          className="finder-finish"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <p>
            {allCollected
              ? "You've collected every little surprise! 💗"
              : "Your next surprise is waiting for you 💗"}
          </p>

          <button
            type="button"
            className="finder-next-button"
            onClick={() => onNext?.()}
          >
            NEXT SURPRISE ↓
          </button>

        </motion.div>

      </section>

      {/* Scratch popup */}
      <AnimatePresence>
        {selectedGift && (

          <motion.div
            className="finder-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedGift(null);
              setRevealed(false);
            }}
          >

            <motion.div
              className="finder-modal"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(event) => event.stopPropagation()}
            >

              <button
                type="button"
                className="finder-close"
                onClick={() => {
                  setSelectedGift(null);
                  setRevealed(false);
                }}
              >
                ×
              </button>

              <img
                src={selectedGift.image}
                alt="Your surprise"
                className="finder-modal-image"
              />

              <p className="finder-modal-kicker">
                A SECRET SURPRISE FOR YOU
              </p>

              <h2>Unlock Your Little Task</h2>

              <div className="finder-reveal-area">

                <div className="finder-scratch-content">

                  {revealed ? (

                    <motion.div
                      className="finder-revealed"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >

                      <span className="finder-reveal-sparkle">
                        ✦
                      </span>

                      <p className="finder-task-title">
                        YOUR SECRET TASK
                      </p>

                      <p className="finder-task">
                        {selectedGift.task}
                      </p>

                      <p className="finder-clue">
                        YOUR SECRET LETTER
                      </p>

                      <span className="finder-clue-letter">
                        {selectedGift.clueLetter}
                      </span>

                    </motion.div>

                  ) : (

                    <div className="finder-scratch-hint">
                      <span>♡</span>
                      <p>Scratch to reveal your task</p>
                    </div>

                  )}

                </div>

                {!revealed && (
                  <canvas
                    ref={canvasRef}
                    className="finder-scratch-canvas"
                    onPointerDown={(event) => {
                      isScratching.current = true;
                      event.currentTarget.setPointerCapture(
                        event.pointerId
                      );
                      scratch(event);
                    }}
                    onPointerMove={scratch}
                    onPointerUp={() => {
                      isScratching.current = false;
                    }}
                    onPointerCancel={() => {
                      isScratching.current = false;
                    }}
                  />
                )}

              </div>

              {revealed ? (

                <button
                  type="button"
                  className="finder-collect-button"
                  onClick={collectGift}
                >
                  COLLECT THIS GIFT ♡
                </button>

              ) : (

                <p className="finder-collect-hint">
                  Use your finger or mouse to scratch
                </p>

              )}

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>

    </main>
  );
}

export default GiftFinder;
