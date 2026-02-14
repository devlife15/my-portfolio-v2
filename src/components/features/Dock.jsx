"use client";

import { useEffect, useState, useRef } from "react";
import {
  FiGithub,
  FiMail,
  FiTerminal,
  FiSkipForward,
  FiFileText,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import useSystemSound from "../../hooks/useSystemSound";

const DOCK_LINKS = [
  { icon: FiFileText, href: "/resume.pdf", label: "Resume" },
  { icon: FiGithub, href: "https://github.com/devlife15", label: "GitHub" },
  {
    icon: FaXTwitter,
    href: "https://twitter.com/kumarayan990",
    label: "X (Twitter)",
  },
  { icon: FiMail, href: "mailto:kumarayanatwork@email.com", label: "Email" },
];

const PLAYLIST = [
  {
    title: "Midnight Jazz",
    src: "/songs/ambient.mp3",
  },
  {
    title: "Code & Chill",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3",
  },
  {
    title: "Empty Mind",
    src: "https://cdn.pixabay.com/download/audio/2022/09/02/audio_72502a492a.mp3?filename=empty-mind-118973.mp3",
  },
];

const Dock = ({ onTerminalClick }) => {
  const { playSound } = useSystemSound();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [bouncing, setBouncing] = useState(false);

  // 👇 NEW: Controls the visibility of the "Play Music" hint
  const [showHint, setShowHint] = useState(false);

  // Clock Timer
  useEffect(() => {
    // Avoid hydration mismatch by updating time only on client
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Bounce Animation Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setBouncing(true);
      setTimeout(() => setBouncing(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 👇 CHANGED: Removed auto-play logic. Just load the file.
  useEffect(() => {
    audioRef.current = new Audio(PLAYLIST[0].src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.05;

    // No attemptPlay() here. Silent by default.

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 👇 NEW: The "Gentle Nudge" Timer Logic
  useEffect(() => {
    // 1. Wait 2 seconds before showing the hint
    const startTimer = setTimeout(() => {
      setShowHint(true);
    }, 2000);

    // 2. Hide it automatically after 8 seconds (so it doesn't get annoying)
    const hideTimer = setTimeout(() => {
      setShowHint(false);
    }, 8000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    // Add feedback sound
    playSound("click");

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      setShowHint(false); // Hide hint immediately if they play
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = (e) => {
    e.stopPropagation();

    // Add feedback sound
    playSound("click");

    if (!audioRef.current) return;
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    audioRef.current.src = PLAYLIST[nextIndex].src;
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 px-5 h-14 rounded-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 transition-all duration-300 hover:border-white/20 hover:scale-[1.02]">
        {/* MUSIC BUTTON WRAPPER */}
        <div className="group relative flex items-center justify-center">
          {/* 👇 THE NEW TOOLTIP COMPONENT */}
          <div
            className={`absolute bottom-full mb-3 px-3 py-1.5 rounded-lg bg-[#222] border border-white/10 text-[10px] text-green-400 font-mono tracking-wide whitespace-nowrap shadow-xl transition-all duration-700 transform pointer-events-none z-50
            ${showHint && !isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            Click to play radio 🎵
            {/* Little triangle arrow pointing down */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#222] border-b border-r border-white/10 rotate-45"></div>
          </div>

          <button
            onClick={togglePlay}
            onMouseEnter={() => playSound("dock")}
            className={`relative w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 overflow-hidden ${isPlaying ? "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "hover:border-white/40"}`}
          >
            <div
              className={`w-full h-full bg-[#111] relative rounded-full flex items-center justify-center ${isPlaying ? "animate-[spin_3s_linear_infinite]" : ""}`}
            >
              <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(#222_0px,#222_2px,#111_3px,#111_4px)]"></div>
              <div className="absolute w-3 h-3 bg-green-900/50 rounded-full border border-green-500/30 z-10"></div>
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/80 rounded-full shadow-sm z-20"></div>
            </div>
          </button>

          {/* NOW PLAYING POPUP (Original) */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pb-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
            <div className="w-40 bg-[#111] border border-white/10 rounded-lg p-3 shadow-2xl relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] uppercase tracking-widest text-green-400 font-sans font-bold">
                  Now Playing
                </span>
                <button
                  onClick={playNext}
                  onMouseEnter={() => playSound("dock")}
                  className="hover:text-white text-gray-400 transition-colors p-1 hover:bg-white/10 rounded"
                >
                  <FiSkipForward size={12} />
                </button>
              </div>
              <p className="text-[11px] text-white font-editorial italic truncate">
                {PLAYLIST[currentTrackIndex].title}
              </p>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111] border-b border-r border-white/10 rotate-45"></div>
            </div>
          </div>
        </div>

        <div className="w-px h-6 bg-white/10" />

        {DOCK_LINKS.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playSound("dock")}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 active:scale-90"
          >
            <link.icon size={18} />
          </a>
        ))}

        <button
          onClick={onTerminalClick}
          onMouseEnter={() => playSound("dock")}
          className={`p-2 rounded-full hover:bg-white/10 transition-all duration-300 active:scale-90 ${
            bouncing
              ? "animate-bounce text-green-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <FiTerminal size={18} />
        </button>

        <div className="w-px h-6 bg-white/10" />

        <div
          className="font-mono text-[11px] text-[#666666] hover:text-white transition-colors cursor-default tracking-wide flex items-center"
          title={time.toDateString()}
        >
          <span>{time.getHours().toString().padStart(2, "0")}</span>
          <span
            className={`mx-px transition-opacity duration-200 ${time.getSeconds() % 2 === 0 ? "opacity-100" : "opacity-0"}`}
          >
            :
          </span>
          <span>{time.getMinutes().toString().padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
};

export default Dock;
