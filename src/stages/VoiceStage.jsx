

import { useRef, useState, useEffect } from "react";
import "../styles/global.css";

export default function VoiceStage({
  onNext,
  onMediaPlay,
  onMediaEnd,
}) {
  const [selectedGift, setSelectedGift] = useState(null);
  const [boxOpen, setBoxOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [wrongGift, setWrongGift] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioFinished, setAudioFinished] = useState(false);

  const audioRef = useRef(null);
  const wrongTimerRef = useRef(null);

  const SECRET_PASSWORD = "LOVE";

  const gifts = [
    { id: 1, color: "pink", name: "A LITTLE LOVE" },
    { id: 2, color: "purple", name: "A SWEET MEMORY" },
    { id: 3, color: "rose", name: "A SECRET GIFT" },
  ];

  // ONLY CENTER GIFT CAN OPEN
  const selectGift = (gift) => {
    if (selectedGift || boxOpen || unlocked) return;

    if (gift.id === 2) {
      setSelectedGift(gift);
      setWrongGift(null);
      setError("");
      return;
    }

    setWrongGift(gift.id);

    if (wrongTimerRef.current) {
      clearTimeout(wrongTimerRef.current);
    }

    wrongTimerRef.current = setTimeout(() => {
      setWrongGift(null);
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (wrongTimerRef.current) {
        clearTimeout(wrongTimerRef.current);
      }
    };
  }, []);

  const unlockGift = () => {
    if (password.trim().toUpperCase() === SECRET_PASSWORD) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Oops! Try the secret password again ♡");
    }
  };

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        if (audio.ended) {
          audio.currentTime = 0;
          setProgress(0);
          setAudioFinished(false);
        }

        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setError("Audio could not play. Check your audio file.");
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !unlocked) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    const finishAudio = () => {
      setPlaying(false);
      setProgress(100);
      setAudioFinished(true);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", finishAudio);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", finishAudio);
    };
  }, [unlocked]);

  return (
    <main className="secret-love-world">
      <div className="photo-overlay" />

      <div className="floating-hearts">
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 8) % 100}%`,
              animationDelay: `${i * 0.4}s`,
              fontSize: `${14 + (i % 4) * 5}px`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* GIFT SELECTION */}
      {!selectedGift && !unlocked && (
        <section className="secret-box-section">
          <p className="secret-eyebrow">
            A LITTLE SECRET FOR YOU
          </p>

          <h1>Choose Your Surprise ♡</h1>

          <p className="secret-description">
            Three little gifts, one special surprise...
          </p>

          <div className="gift-collection">
            {gifts.map((gift) => (
              <button
                key={gift.id}
                type="button"
                className={`voice-gift-option ${gift.color} ${
                  wrongGift === gift.id ? "voice-wrong-gift-shake" : ""
                }`}
                onClick={() => selectGift(gift)}
                disabled={!!selectedGift}
              >
                <span className="voice-gift-sparkle">✦</span>

                <span className="voice-gift-lid">
                  <span className="voice-gift-lid-ribbon" />
                  <span className="voice-gift-bow">♡</span>
                </span>

                <span className="voice-gift-base">
                  <span className="voice-gift-base-ribbon" />
                </span>

                <span className="voice-gift-option-name">
                  {gift.name}
                </span>
              </button>
            ))}
          </div>

          {wrongGift !== null && (
            <p className="wrong-gift-message">
              Wrong gift! Try again ♡
            </p>
          )}

          <p className="gift-hint">
            TOUCH ANY GIFT TO OPEN ♡
          </p>
        </section>
      )}

      {/* CENTER GIFT OPENING */}
      {selectedGift && !boxOpen && !unlocked && (
        <section className="opening-gift-section">
          <p className="secret-eyebrow">
            YOUR SURPRISE IS OPENING
          </p>

          <div
            className={`voice-gift-option voice-selected-gift ${selectedGift.color} voice-gift-opening`}
            onAnimationEnd={(event) => {
              if (
                event.target.classList.contains("voice-gift-lid")
              ) {
                setBoxOpen(true);
              }
            }}
          >
            <span className="voice-gift-lid">
              <span className="voice-gift-lid-ribbon" />
              <span className="voice-gift-bow">♡</span>
            </span>

            <span className="voice-gift-base">
              <span className="voice-gift-base-ribbon" />
            </span>

            <span className="voice-gift-sparkle">✧</span>
          </div>

          <p className="secret-description">
            A little surprise just for you...
          </p>
        </section>
      )}

      {/* PASSWORD */}
      {boxOpen && !unlocked && (
        <section className="secret-password-card">
          <div className="lock-icon">🔐</div>

          <h2>Our Little Secret</h2>

          <p>
            Enter the password to unlock your surprise
          </p>

          <input
            type="password"
            placeholder="Enter secret password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") unlockGift();
            }}
          />

          {error && (
            <p className="secret-error">{error}</p>
          )}

          <button onClick={unlockGift}>
            UNLOCK ♡
          </button>
        </section>
      )}

      {/* UNLOCKED CONTENT */}
      {unlocked && (
        <section className="dudu-pupu-world">
          <p className="secret-eyebrow">
            A LOVE STORY IN SOUND
          </p>

          <h1>Distance Means Nothing ♡</h1>

          <p className="dudu-subtitle">
            Two little hearts, one beautiful journey.
          </p>

          <div className="character-stage">
            <div className="character-track">
              <img
                className="dudu-character"
                src="/images/BUBU.png"
                alt="Bubu"
                style={{ left: `${progress * 0.3}%` }}
              />

              <img
                className="pupu-character"
                src="/images/DUDU.png"
                alt="Dudu"
                style={{ right: `${progress * 0.4}%` }}
              />

              {progress >= 95 && (
                <span className="kiss-heart">♥</span>
              )}
            </div>

            <div className="character-names">
              <span>BUBU ♡</span>
              <span>DUDU ♡</span>
            </div>
          </div>

          <div className="secret-audio-card">
            <div className="audio-heart">♡</div>

            <h2>A Message From My Heart</h2>

            <p>Listen to my little secret...</p>

          <audio
  ref={audioRef}
  src="/AUDIO/bgsong.mp3"
  preload="metadata"
  onPlay={() => {
    onMediaPlay?.();
  }}
  onPause={(e) => {
    if (!e.currentTarget.ended) {
      onMediaEnd?.();
    }
  }}
  onEnded={() => {
    console.log("VOICE AUDIO FINISHED");
    onMediaEnd?.();
  }}
/>

            <div className="audio-progress">
              <div
                className="audio-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              className="audio-play-button"
              onClick={playAudio}
            >
              {playing ? "Ⅱ PAUSE" : "▶ PLAY OUR SONG"}
            </button>

            <p className="audio-caption">
              MADE WITH LOVE, JUST FOR YOU ♡
            </p>
          </div>

          <p className="final-love-message">
            Even if the world keeps us apart,
            <span>
              our hearts will always find each other. ♡
            </span>
          </p>

          <button
            type="button"
            className="voice-next-button"
            onClick={() => onNext?.()}
          >
            NEXT ↓
          </button>
        </section>
      )}
    </main>
  );
}
