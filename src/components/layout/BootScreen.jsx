"use client";

import React, { useState } from "react";
import { FiPower } from "react-icons/fi";

const BootScreen = ({ onEnter }) => {
  // State to trigger the exit animation
  const [isFading, setIsFading] = useState(false);

  const handleStart = () => {
    // 1. Play the Startup Sound
    const audio = new Audio("/songs/startup.mp3");
    audio.volume = 0.3;
    audio.play().catch((e) => console.log("Audio play failed", e));

    // 2. Start the fade-out animation
    setIsFading(true);

    // 3. Remove the boot screen after animation finishes (e.g., 1 second)
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    // Container: Fixed covers screen, High Z-index.
    // Transition: Handles the smooth fade out and scale effect on exit.
    <div
      className={`fixed inset-0 z-9990 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* THE "FROSTED GLASS" LAYER
          - bg-[#050505]/80: Darkens the underlying portfolio so it's barely visible.
          - backdrop-blur-xl: Creates the heavy frosted effect.
      */}
      <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl"></div>

      {/* Optional: Subtle noise texture for that "tactile" feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      {/* CONTENT LAYER (Relative z-10 so it sits above the blur) */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Titles */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="font-editorial text-4xl md:text-5xl italic text-[#EEEEEE] tracking-wide leading-tight">
            Welcome
          </h1>
          <span className="font-sans text-[10px] text-green-500/80 tracking-[0.3em] uppercase animate-pulse">
            System Ready
          </span>
        </div>

        {/* The Interaction Button */}
        <button
          onClick={handleStart}
          className="group relative flex items-center gap-3 px-8 py-3 bg-black/50 border border-green-500/30 rounded-full hover:border-green-500 hover:bg-green-500/10 transition-all duration-500 scale-100 hover:scale-105 active:scale-95 outline-none"
        >
          {/* Icon pushes slightly right on hover */}
          <FiPower
            className="text-green-500 group-hover:translate-x-0.5 transition-transform"
            size={18}
          />

          <span className="font-mono text-xs text-green-400 tracking-widest font-bold uppercase">
            Unlock
          </span>

          {/* Subtle glow effect behind the button on hover */}
          <div className="absolute inset-0 rounded-full bg-green-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      </div>

      {/* Technical Footer */}
      <div className="absolute bottom-10 font-geistmono text-[9px] text-[#444] tracking-widest uppercase opacity-50">
        Secure Connection • v2026.1
      </div>
    </div>
  );
};

export default BootScreen;
