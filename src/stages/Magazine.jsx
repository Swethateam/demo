
import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "../styles/global.css";

const magazinePages = [
  { image: "1st.jpg", quote: "Some moments become memories. Some memories become forever.", title: "A Beautiful Beginning" },
  { image: "2nd.jpg", quote: "In a world full of people, some souls feel like home.", title: "My Favourite Person" },
  { image: "3rd.jpg", quote: "Every little moment with you becomes a beautiful story.", title: "Little Moments" },
  { image: "4th.jpg", quote: "Your smile is my favourite kind of sunshine.", title: "The Little Things" },
  { image: "5th.jpg", quote: "We don't need perfect days, just beautiful memories together.", title: "Our Memories" },
  { image: "6th.jpg", quote: "Even the simplest moments feel magical with you.", title: "A Little Magic" },
  { image: "7th.jpg", quote: "Some connections are written in the stars.", title: "Written In Stars" },
  { image: "8th.jpg", quote: "If I could keep one moment, I would choose this one.", title: "A Moment To Keep" },
  { image: "9th.jpg", quote: "You make ordinary days feel extraordinary.", title: "My Happy Place" },
  { image: "10th.jpg", quote: "Distance means so little when someone means so much.", title: "Always Connected" },
  { image: "11th.jpg", quote: "One story, countless memories, and a thousand reasons to smile.", title: "Our Story" },
  { image: "12th.jpg", quote: "And if life gives me another lifetime, I hope I find you again.", title: "Forever & Always" },
];

export default function MagazineStage({ onNext }) {
  const [bookSize, setBookSize] = useState({
    width: 420,
    height: 595,
  });

  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 480) {
        setBookSize({ width: 280, height: 440 });
        setIsPortrait(true);
      } else if (width < 768) {
        setBookSize({ width: 340, height: 500 });
        setIsPortrait(true);
      } else {
        setBookSize({ width: 420, height: 595 });
        setIsPortrait(false);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <main className="magazine-world">

      {/* Background glow */}
      <div className="magazine-glow magazine-glow-one" />
      <div className="magazine-glow magazine-glow-two" />

      {/* Stars */}
      <div className="magazine-stars">
        {Array.from({ length: 45 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 29 + 7) % 100}%`,
              top: `${(i * 37 + 11) % 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Floating hearts */}
      <div className="magazine-floating-hearts">
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 19 + 5) % 100}%`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${9 + (i % 5) * 2}s`,
              fontSize: `${12 + (i % 4) * 7}px`,
            }}
          >
            {i % 3 === 0 ? "♡" : "♥"}
          </span>
        ))}
      </div>

      {/* Heading */}
      <header className="magazine-heading">
        <p>✦ THE LOVE EDITION ✦</p>
        <h1>FOREVER & ALWAYS</h1>
        <span>A COLLECTION OF OUR BEAUTIFUL MOMENTS</span>
      </header>

      {/* Flipbook */}
      <div className="magazine-book-container">

        <HTMLFlipBook
          width={bookSize.width}
          height={bookSize.height}
          size="fixed"
          minWidth={250}
          maxWidth={600}
          minHeight={350}
          maxHeight={700}
          showCover={true}
          usePortrait={isPortrait}
          mobileScrollSupport={true}
          drawShadow={true}
          maxShadowOpacity={0.4}
          flippingTime={900}
          useMouseEvents={true}
          swipeDistance={25}
          showPageCorners={true}
          className="flipbook"
        >

          {magazinePages.map((page, index) => (
            <div className="magazine-page" key={page.image}>

              <div className="magazine-page-inner">

                <div className="magazine-page-top">
                  <span>THE LOVE EDITION</span>
                  <span>NO. {String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="magazine-page-title">
                  <span>✧</span>
                  <h2>{page.title}</h2>
                  <span>✧</span>
                </div>

                <div className="magazine-photo-frame">
                  <img
                    src={`/images/magazine/${page.image}`}
                    alt={page.title}
                    draggable="false"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      console.error("Image not found:", e.currentTarget.src);
                    }}
                  />
                </div>

                <div className="magazine-quote">
                  <span className="quote-mark">“</span>
                  <p>{page.quote}</p>
                  <span className="quote-heart">♡</span>
                </div>

                <div className="magazine-page-bottom">
                  <span>MADE WITH LOVE</span>
                  <span>{index + 1} / 12</span>
                </div>

                {index === 11 && (
                  <div className="magazine-final-action">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNext?.();
                      }}
                    >
                      NEXT SURPRISE ♡
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}

        </HTMLFlipBook>

      </div>

      <p className="magazine-footer">
        TURN EVERY PAGE, RELIVE EVERY MEMORY ♡
      </p>

    </main>
  );
}
