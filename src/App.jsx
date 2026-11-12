
import { useState, useRef } from "react";

import Opening from "./stages/Opening.jsx";
import Password from "./stages/passwordstage.jsx";
import GreetingCard from "./stages/GreetingCard.jsx";
import LoveWorld from "./stages/VideoStage.jsx";
import VoiceStage from "./stages/VoiceStage.jsx";
import MagazineStage from "./stages/Magazine.jsx";
import PuzzleStage from "./stages/Puzzle.jsx";
import GalleryStage from "./stages/Gallery.jsx";
import GiftFinder from "./stages/GiftFinder.jsx";
import FinalMessage from "./stages/FinalMessage.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("opening");
  const audioRef = useRef(null);

  // Gift open ஆனதும் background music start
  const startBackgroundMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();
      console.log("BACKGROUND MUSIC STARTED");
    } catch (error) {
      console.error("BACKGROUND MUSIC ERROR:", error);
    }
  };

  // Video / Voice play ஆகும்போது background music pause
  const pauseBackgroundMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    console.log("BACKGROUND MUSIC PAUSED");
  };

  // Video / Voice முடிந்ததும் background music resume
  const resumeBackgroundMusic = async () => {
    const audio = audioRef.current;

    if (!audio || !audio.paused) return;

    try {
      await audio.play();
      console.log("BACKGROUND MUSIC RESUMED");
    } catch (error) {
      console.error("BACKGROUND MUSIC RESUME ERROR:", error);
    }
  };

  return (
    <>
      {/* Single background music player */}
      <audio
        ref={audioRef}
        src="/AUDIO/BG.mp3"
        loop
        preload="auto"
      />

      {/* OPENING */}
      {currentPage === "opening" && (
        <Opening
          onContinue={() => {
            startBackgroundMusic();
            setCurrentPage("password");
          }}
        />
      )}

      {/* PASSWORD */}
      {currentPage === "password" && (
        <Password
          onContinue={() => setCurrentPage("greeting")}
        />
      )}

      {/* GREETING */}
      {currentPage === "greeting" && (
        <GreetingCard
          onNext={() => setCurrentPage("love")}
        />
      )}

      {/* VIDEO */}
      {currentPage === "love" && (
        <LoveWorld
          onNext={() => setCurrentPage("voice")}
          onMediaPlay={pauseBackgroundMusic}
          onMediaEnd={resumeBackgroundMusic}
        />
      )}

      {/* VOICE NOTE */}
      {currentPage === "voice" && (
        <VoiceStage
          onNext={() => setCurrentPage("magazine")}
          onMediaPlay={pauseBackgroundMusic}
          onMediaEnd={resumeBackgroundMusic}
        />
      )}

      {/* MAGAZINE */}
      {currentPage === "magazine" && (
        <MagazineStage
          onNext={() => setCurrentPage("puzzle")}
        />
      )}

      {/* PUZZLE */}
      {currentPage === "puzzle" && (
        <PuzzleStage
          onNext={() => setCurrentPage("gallery")}
        />
      )}

      {/* GALLERY */}
      {currentPage === "gallery" && (
        <GalleryStage
          onNext={() => setCurrentPage("giftfinder")}
        />
      )}

      {/* GIFT FINDER */}
      {currentPage === "giftfinder" && (
        <GiftFinder
          onNext={() => setCurrentPage("final")}
        />
      )}

      {/* FINAL */}
      {currentPage === "final" && (
        <FinalMessage />
      )}
    </>
  );
}

export default App;
