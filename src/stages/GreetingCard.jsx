
import { useState } from "react";

const butterflies = Array.from({ length: 30 }, (_, i) => ({
  x: `${Math.cos(i * 2.1) * (120 + (i % 5) * 35)}px`,
  y: `${-120 - (i % 6) * 65}px`,
  delay: `${i * 0.045}s`,
  rotate: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 12)}deg`,
}));

const hearts = [
  ["10%", "12%", "22px"],
  ["80%", "10%", "25px"],
  ["18%", "35%", "18px"],
  ["85%", "40%", "20px"],
  ["12%", "75%", "24px"],
  ["85%", "78%", "22px"],
  ["48%", "8%", "17px"],
  ["50%", "90%", "20px"],
  ["30%", "18%", "15px"],
  ["70%", "22%", "16px"],
  ["25%", "85%", "19px"],
  ["75%", "88%", "17px"],
];

export default function GreetingCard({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="greeting-world">
      <div className="greeting-stars" />

      <section className="greeting-content">
        <p className="greeting-label">
          A LITTLE WORLD MADE FOR YOU
        </p>

        <h1 className="greeting-heading">
          Happy <span>Anniversary</span>
        </h1>

        <p className="greeting-subheading">
          Celebrating our beautiful little story ♡
        </p>

        <div className={`portrait-book ${isOpen ? "is-open" : ""}`}>
          <div className="portrait-paper">
            <div className="portrait-border">
              <span className="portrait-flower">❦</span>

              <p className="portrait-small-title">
                A MESSAGE FROM MY HEART
              </p>

              <div className="portrait-divider">✦ ❦ ✦</div>

              <h2 className="anniversary-message-title">
                Hey, My LOVE
                <span>♡</span>
              </h2>

              <div className="portrait-divider">❧</div>

              <p className="portrait-message">
                Happy Anniversary, my love!
              </p>

              <p className="portrait-message">
                I created this little world to remind you how special you are to me.
              </p>

              <p className="portrait-message">
                Every page has a little piece of my heart.
              </p>

              <div className="portrait-signature">
                With Love, Always ♡
              </div>

              <span className="portrait-bottom-flower">❦</span>
            </div>
          </div>

          {isOpen && (
            <div className="butterfly-sky">
              {butterflies.map((butterfly, index) => (
                <span
                  key={index}
                  className="flying-butterfly"
                  style={{
                    "--x": butterfly.x,
                    "--y": butterfly.y,
                    "--delay": butterfly.delay,
                    "--rotate": butterfly.rotate,
                  }}
                >
                  🦋
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            className="portrait-cover"
            onClick={() => setIsOpen(true)}
            disabled={isOpen}
            aria-label="Touch to open anniversary greeting card"
          >
            <div className="portrait-cover-design">
              <div className="cover-hearts">
                {hearts.map((heart, index) => (
                  <span
                    key={index}
                    style={{
                      left: heart[0],
                      top: heart[1],
                      "--heart-size": heart[2],
                      "--heart-delay": `${index * 0.12}s`,
                    }}
                  >
                    ♥
                  </span>
                ))}
              </div>

              <span className="cover-flower">❦</span>

              <p className="cover-edition">
                TO MY FAVOURITE PERSON
              </p>

              <div className="cover-heart">♡</div>

              <h2>
                Happy
                <span>Anniversary</span>
              </h2>

              <div className="cover-decoration">
                ✦ ♥ ❦ ♥ ✦
              </div>

              <div className="touch-me">
                <span>♡</span>
                TOUCH ME
                <span>♡</span>
              </div>

              <p className="cover-open-text">
                OPEN THIS WITH LOVE
              </p>

              <span className="cover-bottom-ornament">❧</span>
            </div>
          </button>
        </div>

        <p className="greeting-instruction">
          {isOpen
            ? "Let these little butterflies carry my love 🦋"
            : "✦ TOUCH THE CARD TO OPEN ✦"}
        </p>

        <button
          type="button"
          className="portrait-continue"
          onClick={() => onNext?.()}
        >
          CONTINUE ♡ →
        </button>
      </section>
    </main>
  );
}
