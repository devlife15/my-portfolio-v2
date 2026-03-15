"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import { FiPlay, FiPause, FiSkipForward } from "react-icons/fi";
import useSystemSound from "../../hooks/useSystemSound";

const PLAYLIST = [
  { title: "Track 1", src: "/songs/Track 1.mp3" },
  { title: "Track 2", src: "/songs/Track 2.mp3" },
  { title: "Track 3", src: "/songs/Track 3.mp3" },
  { title: "Track 4", src: "/songs/Track 4.mp3" },
  { title: "Track 5", src: "/songs/Track 5.mp3" },
  { title: "Track 6", src: "/songs/Track 6.mp3" },
];

const LeftSidebar = forwardRef(function LeftSidebar(
  { onTerminalClick, onTypingClick, onArchiveClick },
  ref,
) {
  const { playSound } = useSystemSound();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(PLAYLIST[0].src);
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playNext = (e) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    audioRef.current.src = PLAYLIST[nextIndex].src;
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTrackEnd = () => playNext();
    audio.addEventListener("ended", handleTrackEnd);
    return () => audio.removeEventListener("ended", handleTrackEnd);
  }, [currentTrackIndex]);

  return (
    <aside
      ref={ref}
      className="hidden xl:flex w-full h-screen sticky top-0 flex-col justify-end pb-10 pl-5 pr-12 z-40"
    >
      <div className="flex flex-col w-full text-[14px] font-switzer uppercase font-medium text-[#121212] dark:text-[#EEEEEE] transition-colors duration-300">
        {/* ITEM 1: Firewalled */}
        <div className="sidebar-item w-full">
          <button
            onClick={() => {
              playSound("terminalopen");
              onTerminalClick();
            }}
            onMouseEnter={() => playSound("hover")}
            className="w-full text-left py-2 border-t border-black/3 dark:border-white/3 hover:pl-3 transition-all duration-300 cursor-pointer"
          >
            {">_ TERMINAL"}
          </button>
        </div>

        {/* ITEM 2: Firewalled */}
        <div className="sidebar-item w-full">
          <button
            onClick={() => {
              playSound("terminalopen");
              onTypingClick();
            }}
            onMouseEnter={() => playSound("hover")}
            className="w-full text-left py-2 border-t border-black/3 dark:border-white/3 hover:pl-3 transition-all duration-300 cursor-pointer"
          >
            {"TYPE ENGINE"}
          </button>
        </div>

        {/* ITEM 3: Firewalled */}
        <div className="sidebar-item w-full">
          <button
            onClick={() => onArchiveClick()}
            onMouseEnter={() => playSound("hover")}
            className="w-full text-left py-2 border-t border-black/3 dark:border-white/3 hover:pl-3 transition-all duration-300 cursor-pointer"
          >
            {"A TRIP DOWN MEMORY LANE"}
          </button>
        </div>

        {/* ITEM 4: Firewalled Audio Player */}
        <div className="sidebar-item w-full">
          <div className="flex items-center justify-between py-2 border-y border-black/3 dark:border-white/3 transition-colors duration-300 group">
            <div className="flex items-center gap-3 overflow-hidden pr-2">
              <button
                onClick={togglePlay}
                onMouseEnter={() => playSound("hover")}
                className="text-[#888888] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#EEEEEE] transition-colors duration-300"
              >
                {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
              </button>
              <span className="font-switzer uppercase font-medium text-[#121212] dark:text-[#EEEEEE] truncate transition-colors duration-300">
                {PLAYLIST[currentTrackIndex].title}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-end gap-0.5 h-2.5 opacity-80">
                <div
                  className={`w-0.5 bg-[#121212] dark:bg-[#EEEEEE] transition-all duration-300 ${isPlaying ? "h-full animate-pulse" : "h-0.5"}`}
                ></div>
                <div
                  className={`w-0.5 bg-[#121212] dark:bg-[#EEEEEE] transition-all duration-300 ${isPlaying ? "h-2/3 animate-pulse [animation-delay:150ms]" : "h-0.5"}`}
                ></div>
                <div
                  className={`w-0.5 bg-[#121212] dark:bg-[#EEEEEE] transition-all duration-300 ${isPlaying ? "h-full animate-pulse [animation-delay:300ms]" : "h-0.5"}`}
                ></div>
              </div>
              <button
                onClick={playNext}
                onMouseEnter={() => playSound("hover")}
                className="text-[#888888] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#EEEEEE] transition-colors duration-300"
              >
                <FiSkipForward size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
});

export default LeftSidebar;
