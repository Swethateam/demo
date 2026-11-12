
import { useState } from "react";
import MoonScene from "../three/MoonScene";

export default function Opening({ onContinue }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleGiftClick = () => {
    if (isOpening) return;

    setIsOpening(true);

    setTimeout(() => {
      onContinue();
    }, 1200);
  };

  return (
    <main className="opening-page">
      <MoonScene />

      <div className="couple-container">
        <img
          src="/images/openingimage.png"
          alt="Romantic couple"
          className="couple-image"
        />

<button
  type="button"
  className={`tiny-gift ${isOpening ? "gift-opening" : ""}`}
  onClick={handleGiftClick}
  disabled={isOpening}
  aria-label="Open gift"
>
  <span className="gift-glow" />

  <span className="gift-body">
    <span className="gift-ribbon" />
  </span>

  <span className="gift-lid">
    <span className="gift-bow" />
  </span>
</button>

      

      </div>

     {!isOpening && (
  <p className="gift-hint">Open the Gift Box ✨</p>
)}
    </main>
  );
}
