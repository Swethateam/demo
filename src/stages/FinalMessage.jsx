
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function LoveLetter({ onNext }) {
  const [text, setText] = useState("");
  const [hearts, setHearts] = useState([]);

  const fullText =
    "From the very first moment you entered my life, everything changed in the most beautiful way. Your laughter became my favorite sound, your presence my safest place, and your love my greatest gift. With you, even the ordinary moments feel extraordinary. I promise to cherish you, to stand by you, and to love you deeper with every passing day. You are my today, my tomorrow, and every dream in between. Forever isn’t long enough when it’s with you ❤️";

  // Typewriter effect
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setText(fullText.slice(0, i));

      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, 32);

    return () => clearInterval(interval);
  }, []);

  // Floating hearts
  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random();

      setHearts((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 14 + Math.random() * 20,
          duration: 6 + Math.random() * 8,
        },
      ]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 14000);
    };

    const interval = setInterval(createHeart, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="letter-page">

      {/* Floating hearts */}
      <div className="letter-hearts">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      {/* Letter card */}
      <section className="letter-box">

        <p className="letter-eyebrow">
          A MESSAGE FROM MY HEART
        </p>

        <h1 className="letter-title">
          A Letter From My Heart 💖
        </h1>

        <div className="letter-image-frame">
          <img
            src="/images/loveletter.png"
            alt="A special memory"
            className="letter-image"
          />
        </div>

        <p className="letter-text">
          {text}
          <span className="typing-cursor">|</span>
        </p>

        <p className="letter-signature">
          With all my love, forever ♡
        </p>

      </section>

      {/* Next button */}
      <button
        type="button"
        className="letter-next-button"
        onClick={() => onNext?.()}
      >
        ONE LAST SURPRISE ↓
      </button>

    </main>
  );
}
