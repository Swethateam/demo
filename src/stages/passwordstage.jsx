
import { useEffect, useRef, useState } from "react";

const WORDS = ["LOVE", "HEART", "MY BEAT", "SWE", "VMK"];
const STORAGE_KEY = "memora-secret-visit";

function getWordIndex() {
  const saved = Number(localStorage.getItem(STORAGE_KEY) || 0);
  return saved % WORDS.length;
}

export default function PasswordStage({ onContinue }) {
  const canvasRef = useRef(null);

  const [wordIndex] = useState(getWordIndex);
  const [revealed, setRevealed] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const secretWord = WORDS[wordIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f7d9e9");
    gradient.addColorStop(0.5, "#e8b9d8");
    gradient.addColorStop(1, "#d5b9ee");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.arc(45, 42, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width - 45, height - 35, 38, 0, Math.PI * 2);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = "#583653";
    ctx.font = "bold 13px Georgia";
    ctx.fillText("A SECRET MESSAGE", width / 2, height / 2 - 10);

    ctx.font = "11px Georgia";
    ctx.fillText("Scratch gently to reveal", width / 2, height / 2 + 14);

    ctx.globalCompositeOperation = "destination-out";

    let isDrawing = false;

    const scratch = (event) => {
      if (!isDrawing) return;

      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      ctx.beginPath();
      ctx.arc(x, y, 23, 0, Math.PI * 2);
      ctx.fill();

      const pixels = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      let cleared = 0;
      const total = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 80) cleared++;
      }

      if (cleared / total > 0.35) {
        setRevealed(true);
      }
    };

    const startScratch = (event) => {
      isDrawing = true;
      canvas.setPointerCapture?.(event.pointerId);

      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      ctx.beginPath();
      ctx.arc(x, y, 23, 0, Math.PI * 2);
      ctx.fill();
    };

    const stopScratch = () => {
      isDrawing = false;
    };

    canvas.addEventListener("pointerdown", startScratch);
    canvas.addEventListener("pointermove", scratch);
    canvas.addEventListener("pointerup", stopScratch);
    canvas.addEventListener("pointercancel", stopScratch);

    return () => {
      canvas.removeEventListener("pointerdown", startScratch);
      canvas.removeEventListener("pointermove", scratch);
      canvas.removeEventListener("pointerup", stopScratch);
      canvas.removeEventListener("pointercancel", stopScratch);
    };
  }, [revealed]);

  const handleOpen = () => {
    if (!revealed) {
      setMessage("Scratch the card first to discover your secret.");
      return;
    }

    if (password.trim().toUpperCase() !== secretWord) {
      setMessage("Incorrect password. Try again!");
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      String((wordIndex + 1) % WORDS.length)
    );

    setMessage("Your little world is opening...");

    setTimeout(() => {
      onContinue?.();
    }, 700);
  };

  return (
    <main className="password-page">
      <div className="password-stars" />
      <div className="password-moon" />

      <div className="password-container">

        {/* LEFT IMAGE */}
        <section className="password-visual">
          <div className="visual-glow" />

          <img
            src="/images/passwordimage-removebg-preview.png"
            alt="Romantic couple under the moon"
            className="couple-image"
          />

          <p className="visual-caption">
            Somewhere in this universe, a little world awaits you.
          </p>
        </section>

        {/* RIGHT PASSWORD PANEL */}
        <section className="password-card">

          <div className="password-eyebrow">
            ✦ A LITTLE WORLD MADE FOR YOU ✦
          </div>

          <h1>
            Unlock Your
            <span>Little World</span>
          </h1>

          <p className="password-description">
            Every beautiful memory begins with a little secret.
            Find yours below.
          </p>

          {/* HORIZONTAL SCRATCH + PASSWORD */}
          <div className="unlock-row">

            {/* SCRATCH CARD */}
            <div className="secret-section">

              <div className="secret-heading">
                ✦ DISCOVER YOUR SECRET
              </div>

              <div className="scratch-wrapper">

                <div className="revealed-word">
                  <span className="revealed-label">
                    YOUR SECRET WORD
                  </span>

                  <strong>{secretWord}</strong>

                  <span className="revealed-hint">
                    Your key to this little world
                  </span>
                </div>

                {!revealed && (
                  <canvas
                    ref={canvasRef}
                    className="scratch-canvas"
                  />
                )}

              </div>

              <p className="scratch-caption">
                {revealed
                  ? "✦ Secret revealed ✦"
                  : "Scratch gently to reveal"}
              </p>

            </div>

            {/* PASSWORD INPUT */}
            <div className="password-entry">

              <div className="secret-heading">
                ✦ YOUR PASSWORD
              </div>

              <label htmlFor="secret-password">
                ENTER THE SECRET WORD
              </label>

              <input
                id="secret-password"
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleOpen();
                }}
                placeholder={
                  revealed
                    ? "Type your secret word..."
                    : "Reveal the word first"
                }
                disabled={!revealed}
                autoComplete="off"
              />

              <button
                type="button"
                className="open-world-button"
                onClick={handleOpen}
                disabled={!revealed || !password.trim()}
              >
                OPEN MY WORLD ✧
              </button>

              {message && (
                <p className="password-message" role="status">
                  {message}
                </p>
              )}

              <div className="input-hint">
                A little secret unlocks a whole universe.
              </div>

            </div>
          </div>

          <div className="password-footer">
            MADE WITH LOVE, JUST FOR YOU ♡
          </div>

        </section>
      </div>
    </main>
  );
}
