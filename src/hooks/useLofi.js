import { useState, useEffect, useRef } from "react";

const TRACKS = [
  "/songs/track1.mp3",
  "/songs/track2.mp3",
  "/songs/track3.mp3",
  "/songs/track4.mp3",
];

export const useLofi = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  // Initialize Audio Object once
  useEffect(() => {
    audioRef.current = new Audio(TRACKS[0]);
    audioRef.current.volume = 0.4; // Set default volume to 40% (lofi should be background)

    // Auto-play next track when one finishes
    audioRef.current.addEventListener("ended", nextTrack);

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Next Track
  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(newIndex);

    // Swap source and play
    audioRef.current.src = TRACKS[newIndex];
    if (isPlaying) audioRef.current.play();
  };

  return { isPlaying, togglePlay, nextTrack };
};
