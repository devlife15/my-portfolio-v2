"use client";

import React, { useState, useEffect } from "react";
import useSystemSound from "@/hooks/useSystemSound";

const BootScreen = ({ onEnter }) => {
  const [isBooting, setIsBooting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState("00:00:00");
  const { playSound } = useSystemSound();

  // 1. Entrance Trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // 2. Live Telemetry Clock
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

  // 3. The Boot Sequence Interaction
  const handleStart = () => {
    if (isBooting) return; // Prevent double clicks

    playSound("startup");
    setIsBooting(true); // Triggers the LED flip, rapid spin, and collapse

    // Wait for the collapse animation to finish, then unmount
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  const hiddenState = "opacity-0 blur-sm scale-105";
  const visibleState = "opacity-100 blur-0 scale-100";
  const baseTransition =
    "transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    // THE MASTER WRAPPER: Matches the main site's #121212 exactly
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#121212] overflow-hidden transition-opacity duration-700 ${
        isBooting ? "opacity-0 pointer-events-none delay-500" : "opacity-100"
      }`}
    >
      {/* =========================================
          THE ENVIRONMENT
      ========================================= */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      {/* Radial mask matches #121212 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#121212_80%)]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      {/* =========================================
          THE HUD (Corner Data)
      ========================================= */}
      <div
        className={`absolute inset-6 md:inset-10 pointer-events-none flex flex-col justify-between ${baseTransition} ${
          isMounted ? visibleState : hiddenState
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-[#666] flex flex-col gap-1">
            <span className="text-[#EEEEEE]/70">SYS.LOC</span>
            <span>KOLKATA, IN</span>
            <span>22.57°N 88.36°E</span>
          </div>
          <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-[#666] flex flex-col gap-1 text-right">
            <span className="text-[#EEEEEE]/70">SYNCED</span>
            <span>IST (UTC +5:30)</span>
            <span>{time}</span>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-[#666] flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${isBooting ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-red-500/80"}`}
              ></span>
              STATUS: {isBooting ? "INITIALIZING" : "NOMINAL"}
            </span>
            <span>A_KUMAR_PORTFOLIO v2.1</span>
          </div>
          <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-[#666] flex flex-col gap-1 text-right">
            <span>PWR: 100%</span>
            <span>AUDIO_ENGINE: {isBooting ? "ACTIVE" : "WAITING"}</span>
          </div>
        </div>
      </div>

      {/* =========================================
          THE REACTOR CORE & NEUMORPHIC SWITCH
      ========================================= */}
      <div
        className={`relative z-10 flex items-center justify-center ${baseTransition} delay-300 ${
          isMounted ? visibleState : hiddenState
        }`}
      >
        {/* OUTER RING */}
        <svg
          className={`absolute w-40 h-40 pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${
            isBooting
              ? "scale-0 opacity-0 animate-[spin_0.3s_linear_infinite]"
              : "scale-100 opacity-100 animate-[spin_10s_linear_infinite]"
          }`}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
        </svg>

        {/* INNER RING */}
        <svg
          className={`absolute w-32 h-32 pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${
            isBooting
              ? "scale-0 opacity-0"
              : "scale-100 opacity-100 animate-[spin_15s_linear_infinite_reverse]"
          }`}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeDasharray="20 10"
          />
        </svg>

        {/* THE NEUMORPHIC BUTTON */}
        <div
          className={`transition-all duration-[600ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${isBooting ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        >
          <button
            onClick={handleStart}
            onMouseEnter={() => playSound("hover")}
            // THE NEW MATH: Base #121212. Darker shadows (0.9), brighter highlights (0.05) to pop.
            className="group flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#121212] outline-none transition-all duration-150 ease-out
              shadow-[6px_6px_14px_rgba(0,0,0,0.9),-6px_-6px_14px_rgba(255,255,255,0.05)]
              active:shadow-[inset_6px_6px_10px_rgba(0,0,0,0.9),inset_-6px_-6px_10px_rgba(255,255,255,0.04)]
              active:scale-[0.98]"
          >
            {/* Inner Content (LED + Text) */}
            <div className="flex flex-col items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                  isBooting
                    ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                    : "bg-red-500 shadow-[0_0_4px_#ef4444]"
                }`}
              />

              <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-[#EEEEEE] ml-1 select-none">
                BOOT
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
