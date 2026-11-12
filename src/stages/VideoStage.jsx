
const floatingHearts = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 17 + 5) % 95}%`,
  top: `${(i * 23 + 8) % 90}%`,
  delay: `${i * 0.7}s`,
  duration: `${5 + (i % 5)}s`,
  size: `${14 + (i % 4) * 6}px`,
}));

const butterflies = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 29 + 8) % 90}%`,
  top: `${(i * 19 + 10) % 85}%`,
  delay: `${i * 1.2}s`,
  duration: `${7 + (i % 3) * 2}s`,
}));

const stars = Array.from({ length: 45 }, (_, i) => ({
  left: `${(i * 37 + 3) % 100}%`,
  top: `${(i * 31 + 5) % 100}%`,
  delay: `${i * 0.25}s`,
}));

export default function LoveWorld({ onNext,onMediaPlay,
  onMediaEnd, }) {
  return (
    <main className="love-world">

      {/* Background glow */}
      <div className="love-glow glow-one" />
      <div className="love-glow glow-two" />
      <div className="love-glow glow-three" />

      {/* Stars */}
      <div className="love-stars">
        {stars.map((star, i) => (
          <span
            key={i}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="love-floating-hearts">
        {floatingHearts.map((heart, i) => (
          <span
            key={i}
            style={{
              left: heart.left,
              top: heart.top,
              "--delay": heart.delay,
              "--duration": heart.duration,
              "--size": heart.size,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* Flying butterflies */}
      <div className="love-butterflies">
        {butterflies.map((butterfly, i) => (
          <span
            key={i}
            style={{
              left: butterfly.left,
              top: butterfly.top,
              "--delay": butterfly.delay,
              "--duration": butterfly.duration,
            }}
          >
            🦋
          </span>
        ))}
      </div>

      {/* Main content */}
      <section className="love-content">

        <p className="love-eyebrow">
          ✦ A JOURNEY WRITTEN IN THE STARS ✦
        </p>

        <h1 className="love-title">
          Our Little
          <span>Love Story ♡</span>
        </h1>

        <p className="love-subtitle">
          Every moment with you is a beautiful memory.
        </p>

        {/* Video orbit */}
        <div className="love-video-orbit">

          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          {/* Video frame */}
          <div className="love-video-frame">

            <div className="video-top-label">
              <span>♡</span>
              OUR MEMORIES
              <span>♡</span>
            </div>

            {/* Replace placeholder with your video later */}
           <div className="love-video-screen">
<video
  className="love-story-video"
  controls
  playsInline
  preload="metadata"
  onPlay={() => {
    console.log("VIDEO PLAYING");
    onMediaPlay?.();
  }}
  onPause={(e) => {
    if (!e.currentTarget.ended) {
      console.log("VIDEO PAUSED");
      onMediaEnd?.();
    }
  }}
  onEnded={() => {
    console.log("VIDEO FINISHED");
    onMediaEnd?.();
  }}
>
  <source src="/video/video.mp4" type="video/mp4" />
  Your browser does not support video.
</video>
</div>

            <div className="video-bottom-label">
              FOREVER IN MY HEART ✦
            </div>

          </div>
        </div>

        <p className="love-bottom-message">
          Some moments become memories,
          <span>some memories become forever. ♡</span>
        </p>
        <button
  className="love-next-button"
  onClick={onNext}
>
  NEXT →
</button>

      </section>

    </main>
  );
}
