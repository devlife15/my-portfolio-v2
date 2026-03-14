"use client";

import React, { useEffect, useState } from "react";
import useSystemSound from "@/hooks/useSystemSound";
import Terminal from "./Terminal";

const TerminalModal = ({ isOpen, onClose, musicState }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // NEW: The Focus State Trigger
  const { playSound } = useSystemSound();

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      playSound("terminalopen");
    } else {
      setIsExpanded(false); // Reset to standard size when closed
      setTimeout(() => setIsRendered(false), 500);
    }
  }, [isOpen, playSound]);

  const handleClose = () => {
    playSound("terminalclose");
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center transition-all duration-500">
      {/* 1. THE DIMMING BACKDROP */}
      <div
        // Notice the heavy backdrop-blur-md. When maximized, this makes the site behind it look like frosted glass.
        className={`absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-md transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      {/* 2. THE COMMAND DRAWER */}
      <div
        // NEW: Dynamic height. Switches between h-[60vh]/[50vh] and a massive h-[95vh]
        className={`relative w-full bg-white dark:bg-[#111111] border-t border-black/10 dark:border-white/10 flex flex-col transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } ${isExpanded ? "h-[95vh]" : "h-[60vh] md:h-[50vh]"}`}
      >
        {/* --- HEADER --- */}
        <div className="h-12 shrink-0 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between px-6 md:px-12 select-none">
          <div className="flex items-center gap-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#121212] dark:bg-[#EEEEEE]"></span>
            </span>
            <span className="font-jetmono text-[10px] tracking-[0.2em] uppercase text-[#121212] dark:text-[#EEEEEE]">
              SYS_TERMINAL // LIVE
            </span>
          </div>

          <div className="hidden md:block font-jetmono text-[10px] tracking-[0.2em] uppercase text-[#666]">
            PORTFOLIO_MAINFRAME_v2.0
          </div>

          <div className="flex items-center gap-6">
            {/* NEW: The Maximize/Minimize Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-jetmono text-[10px] tracking-[0.2em] uppercase text-[#666] hover:text-[#121212] dark:hover:text-[#EEEEEE] transition-colors"
            >
              [ {isExpanded ? "MINIMIZE" : "MAXIMIZE"} ]
            </button>
            <button
              onClick={handleClose}
              className="font-jetmono text-[10px] tracking-[0.2em] uppercase text-[#666] hover:text-[#121212] dark:hover:text-[#EEEEEE] transition-colors"
            >
              [ ESC TO CLOSE ]
            </button>
          </div>
        </div>

        {/* --- BODY --- */}
        <div className="flex-1 overflow-hidden relative bg-transparent">
          <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] z-10 mix-blend-overlay"></div>
          <Terminal musicState={musicState} />
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
