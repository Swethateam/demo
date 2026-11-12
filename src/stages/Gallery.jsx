
import { useState } from "react";
import "../styles/global.css";

const photos = [
  { id: 1, src: "/images/gallery/1st.jpg" },
  { id: 2, src: "/images/gallery/2nd.jpg" },
  { id: 3, src: "/images/gallery/3rd.jpg" },
  { id: 4, src: "/images/gallery/4th.jpg" },
  { id: 5, src: "/images/gallery/5th.jpg" },
  { id: 6, src: "/images/gallery/6th.jpg" },
  { id: 7, src: "/images/gallery/7th.jpg" },
  { id: 8, src: "/images/gallery/8th.jpg" },
  { id: 9, src: "/images/gallery/9th.jpg" },
];

const ANGLE = 360 / photos.length;

export default function GalleryStage({ onNext }) {
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState(null);
  const [touchStart, setTouchStart] = useState(0);

  const rotateGallery = (direction) => {
    setSelected(null);
    setRotation((prev) => prev + direction * ANGLE);
  };

  const selectPhoto = (index) => {
    setRotation(-index * ANGLE);
    setSelected(index);
  };

  const handleWheel = (event) => {
    event.preventDefault();

    if (Math.abs(event.deltaY) > 5) {
      rotateGallery(event.deltaY > 0 ? -1 : 1);
    }
  };

  const handleTouchEnd = (event) => {
    const difference =
      event.changedTouches[0].clientX - touchStart;

    if (Math.abs(difference) > 35) {
      rotateGallery(difference < 0 ? -1 : 1);
    }
  };

  return (
    <main className="gallery-world">

      {/* Romantic Background */}
      <div className="gallery-decoration">

        {/* Moon Glow */}
        <div className="gallery-moon"></div>

        {/* Falling Petals */}
        <div className="floating-petal petal-one">🌸</div>
        <div className="floating-petal petal-two">🌸</div>
        <div className="floating-petal petal-three">🌹</div>
        <div className="floating-petal petal-four">✿</div>
        <div className="floating-petal petal-five">🌸</div>

        {/* Stars */}
        <div className="gallery-stars">
          ✦　·　✧　·　✦　·　✧　·　♡　·　✦
        </div>

      </div>

      {/* Heading */}
      <header className="gallery-heading">
        <p>OUR LITTLE MEMORIES</p>
        <h1>Moments With You ♡</h1>
        <span>Touch a photo to bring it closer</span>
      </header>

      {/* 3D Gallery */}
      <section
        className="gallery-scene"
        onWheel={handleWheel}
        onTouchStart={(e) =>
          setTouchStart(e.touches[0].clientX)
        }
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="gallery-cylinder"
          style={{
            transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
          }}
        >
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              className={`gallery-photo ${
                selected === index ? "photo-selected" : ""
              }`}
              style={{
                transform: `translate(-50%, -50%) rotateY(${index * ANGLE}deg) translateZ(300px)`,
              }}
              onClick={() => selectPhoto(index)}
              type="button"
            >
              <img
                src={photo.src}
                alt={`Memory ${index + 1}`}
                draggable="false"
                onError={(e) => {
                  console.error(
                    "Gallery image not found:",
                    e.currentTarget.src
                  );
                }}
              />

              <span>♡</span>
            </button>
          ))}
        </div>
      </section>

      {/* Controls */}
      <div className="gallery-controls">

        <button
          type="button"
          onClick={() => rotateGallery(1)}
          aria-label="Previous photo"
        >
          ←
        </button>

        <p>SWIPE / SCROLL TO EXPLORE</p>

        <button
          type="button"
          onClick={() => rotateGallery(-1)}
          aria-label="Next photo"
        >
          →
        </button>

      </div>

      {/* Caption */}
      {selected !== null && (
        <p className="gallery-caption">
          A memory I'll keep forever ♡
        </p>
      )}

      {/* Next Button */}
      <button
        type="button"
        className="gallery-next"
        onClick={() => onNext?.()}
      >
        NEXT SURPRISE ↓
      </button>

    </main>
  );
}
