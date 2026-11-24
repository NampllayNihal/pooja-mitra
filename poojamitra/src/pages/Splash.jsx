import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import MusicButton from "../components/MusicButton";

import "../styles/splash.css";

function Splash() {
  const navigate = useNavigate();

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.45;

    const startMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Autoplay blocked by browser.");
      }
    };

    startMusic();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
        setAudioError(false);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Music error:", error);
      setAudioError(true);
      setIsPlaying(false);
    }
  };

  return (
    <main className="splash-page">

      <audio
        ref={audioRef}
        src="/audio/splash-devotional.mp3"
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setAudioError(true)}
      />

      <div className="splash-decoration splash-decoration-top">
        🪷
      </div>

      <div className="splash-content">

        <div className="splash-logo-wrapper">
          <Logo className="splash-logo" />
        </div>

        <div className="splash-divider">
          <span>✦</span>
          <span>ॐ</span>
          <span>✦</span>
        </div>

        <h1>Welcome to PoojaMitra</h1>

        <p>
          Your spiritual journey,
          <br />
          beautifully connected.
        </p>

        <div className="splash-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {audioError && (
          <p
            style={{
              marginTop: "15px",
              fontSize: "11px",
              color: "#9f1717",
            }}
          >
            Music file could not be loaded.
          </p>
        )}

      </div>

      <MusicButton
        isPlaying={isPlaying}
        onClick={toggleMusic}
      />

      <div className="splash-decoration splash-decoration-bottom">
        🪔
      </div>

    </main>
  );
}

export default Splash;