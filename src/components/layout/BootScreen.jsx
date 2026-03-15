"use client";

import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import useSystemSound from "@/hooks/useSystemSound";
import MagneticButton from "../effects/MagneticButton";

const BootScreen = ({ onEnter }) => {
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState("");
  const { playSound } = useSystemSound();

  // 1. Entrance Trigger
  useEffect(() => {
    // Wait a brief moment after the Preloader vanishes to start the waterfall
    const timer = setTimeout(() => setIsMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // 2. Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Exit Trigger
  const handleStart = () => {
    playSound("startup");
    setIsFading(true);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  // Shared animation classes for the deep, cinematic drift
  const baseTransition =
    "transform transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
  const hiddenState = "opacity-0 translate-y-8 blur-[4px]";
  const visibleState = "opacity-100 translate-y-0 blur-0";

  return (
    // Outer wrapper still handles the EXIT (pulling the curtain up to reveal the site)
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isFading
          ? "opacity-0 -translate-y-12 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* 1. Metadata Top Bar (Fires first: 300ms delay) */}
        <div
          className={`overflow-hidden mb-8 delay-[300ms] ${baseTransition} ${
            isMounted ? visibleState : hiddenState
          }`}
        >
          {/* <div className="font-mono text-[10px] text-[#666666] tracking-[0.2em] uppercase">
            [ PORTFOLIO / {new Date().getFullYear()} ] — {time}
          </div> */}
        </div>

        {/* 2. Master Typography (Fires second: 700ms delay) */}
        <div
          className={`mb-12 text-center flex flex-col items-center delay-700 ${baseTransition} ${
            isMounted ? visibleState : hiddenState
          }`}
        >
          <h1 className="font-editorial text-6xl md:text-7xl italic text-[#EEEEEE] leading-none mb-2 px-2">
            Welcome
          </h1>
          {/* <p className="font-switzer text-[11px] text-[#888888] tracking-widest uppercase">
            Creative Developer & Engineer
          </p> */}
        </div>

        <div
          className={`delay-1100 ${baseTransition} ${
            isMounted ? visibleState : hiddenState
          }`}
        >
          <MagneticButton
            onClick={handleStart}
            onMouseEnter={() => playSound("hover")}
            className="gap-3 px-8 py-3.5 border border-white/10"
          >
            Boot
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
