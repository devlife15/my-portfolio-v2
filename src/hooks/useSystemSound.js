import { useCallback } from "react";

const useSystemSound = () => {
  const playSound = useCallback((type) => {
    let file = "";
    let volume = 0.5;
    let playbackRate = 1.0;

    switch (type) {
      case "hover":
        file = "/songs/hover.mp3";
        volume = 0.15;
        playbackRate = 1.8;
        break;
      case "click":
        file = "/songs/click2.mp3";
        volume = 0.25;
        playbackRate = 1.0;
        break;
      case "open":
        file = "/sounds/open.ogg";
        volume = 0.3;
        break;
      default:
        return;
    }

    try {
      const audio = new Audio(file);
      audio.volume = volume;

      // Slight randomization for organic feel
      if (type === "hover") {
        audio.playbackRate = playbackRate + (Math.random() * 0.15 - 0.075);
      } else if (type !== "open") {
        audio.playbackRate = playbackRate + (Math.random() * 0.1 - 0.05);
      }

      audio.play().catch(() => {});
    } catch (error) {
      console.error("Audio error:", error);
    }
  }, []);

  return { playSound };
};

export default useSystemSound;
