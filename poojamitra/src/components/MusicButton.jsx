import { Volume2, VolumeX } from "lucide-react";

function MusicButton({ isPlaying, onClick }) {
  return (
    <button
      className="music-button"
      onClick={onClick}
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? <Volume2 size={19} /> : <VolumeX size={19} />}
    </button>
  );
}

export default MusicButton;