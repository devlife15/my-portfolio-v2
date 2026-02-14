import { useCallback, useEffect, useRef } from "react";

const useSystemSound = () => {
  const soundBank = useRef({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const soundFiles = {
      hover: "/songs/hover.mp3",
      click: "/songs/click2.mp3",
      open: "/songs/open.ogg",
      dock: "/songs/dockhover.mp3",
      startup: "/songs/startup.mp3",
      terminalopen: "/songs/terminal-open.wav",
      terminalclose: "/songs/terminal-close.wav",
    };

    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = "auto";
      audio.load();
      soundBank.current[key] = audio;
    });
  }, []);

  const playSound = useCallback((type) => {
    if (typeof window === "undefined") return;

    if (type === "hover" && window.matchMedia("(hover: none)").matches) {
      return;
    }

    const originalAudio = soundBank.current[type];

    if (!originalAudio) return;

    // 4. CLONE the node for instant playback
    // (This allows multiple sounds to overlap without cutting each other off)
    const audio = originalAudio.cloneNode();

    // Set properties
    let volume = 0.5;
    let playbackRate = 1.0;

    switch (type) {
      case "hover":
        volume = 0.15;
        playbackRate = 1.8;
        break;
      case "click":
        volume = 0.25;
        playbackRate = 1.0;
        break;
      case "open":
        volume = 0.3;
        break;
      case "dock":
        volume = 0.2;
        playbackRate = 2.0;
        break;
      case "startup":
        volume = 0.3;
        break;
      case "terminalopen":
        volume = 0.5;
        break;
      case "terminalclose":
        volume = 0.5;
        break;
    }

    audio.volume = volume;

    // Randomize pitch
    if (type === "hover") {
      audio.playbackRate = playbackRate + (Math.random() * 0.15 - 0.075);
    } else if (type !== "open") {
      audio.playbackRate = playbackRate + (Math.random() * 0.1 - 0.05);
    }

    audio.play().catch(() => {});
  }, []);

  return { playSound };
};

export default useSystemSound;
