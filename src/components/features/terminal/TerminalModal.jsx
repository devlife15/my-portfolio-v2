"use client";

import React, { useEffect, useState } from "react";
import { FiX, FiMaximize2, FiWifi } from "react-icons/fi";
import Terminal from "./Terminal";
import Leo from "./Leo";

const TerminalModal = ({ isOpen, onClose, musicState }) => {
  const [isRendered, setIsRendered] = useState(false);

  const playSound = (type) => {
    const audio = new Audio(
      type === "open"
        ? "/songs/terminal-open.wav"
        : "/songs/terminal-close.wav",
    );
    audio.volume = 0.5; // Lower volume for subtlety
    audio.play().catch((e) => console.error("Audio failed:", e));
  };

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      playSound("open");
    } else {
      setTimeout(() => setIsRendered(false), 300);
    }
  }, [isOpen]);

  const handleClose = () => {
    playSound("close");
    onClose();
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen
          ? "opacity-100 backdrop-blur-sm"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* 1. BACKDROP (Click to close) */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* 2. THE HUD WINDOW */}
      <div
        className={`relative w-full max-w-3xl flex flex-col transform transition-all duration-500 ease-out border border-white/10 rounded-lg overflow-hidden shadow-[0_0_50px_-10px_rgba(74,222,128,0.1)] ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-10 opacity-0"
        }`}
        style={{
          height: "min(600px, 80vh)",
          // The "Glass" Effect
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* --- HEADER: TECHNICAL STATUS BAR --- */}
        <div className="h-9 shrink-0 bg-white/3 border-b border-white/5 flex items-center justify-between px-4 select-none">
          {/* Left: Status Indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-green-500/80 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              System Online
            </div>
          </div>

          {/* Center: Title */}
          <div className="text-[10px] font-geistmono text-gray-500 uppercase tracking-[0.2em] hidden md:block opacity-50">
            Portfolio_Mainframe_v1.25
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-4">
            <FiWifi size={12} className="text-gray-600" />
            <div className="w-px h-3 bg-white/10"></div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FiX size={14} />
            </button>
          </div>
        </div>

        {/* --- BODY: THE TERMINAL ENGINE --- */}
        <div className="flex-1 overflow-hidden relative">
          {/* Scanline Effect (Optional overlay) */}
          <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-10"></div>

          <Terminal musicState={musicState} />
        </div>
      </div>

      <Leo isOpen={isOpen} />
    </div>
  );
};

export default TerminalModal;
