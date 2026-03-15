"use client";

import React, { useState, useEffect } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // 👇 NEW: State to hold our client-side opacity calculation
  const [flickerOpacity, setFlickerOpacity] = useState(1);

  useEffect(() => {
    let currentProgress = 0;

    // Aggressive, fast interval for that "computing" feel
    const timer = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 1;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setFlickerOpacity(1); // 👇 Lock to solid white when complete
        clearInterval(timer);

        // Hold at 100% for exactly half a second so it registers mentally
        setTimeout(() => setIsExiting(true), 500);

        // Wait 1 second for the scale/blur exit animation to finish before unmounting
        setTimeout(onComplete, 1500);
      } else {
        setProgress(currentProgress);
        // 👇 Safely calculate the flicker on the client side only
        setFlickerOpacity(0.7 + Math.random() * 0.3);
      }
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>

      <div
        className={`relative z-10 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting
            ? "opacity-0 scale-75 blur-md"
            : "opacity-100 scale-100 blur-0"
        }`}
      >
        <span
          className="font-editorial text-6xl md:text-8xl font-light tracking-tight text-[#EEEEEE] tabular-nums flex items-baseline"
          // 👇 Simply read the safe state value here. Zero mismatch!
          style={{ opacity: flickerOpacity }}
        >
          {progress}
          <span className="text-3xl md:text-5xl text-[#555555] ml-2 font-light">
            %
          </span>
        </span>
      </div>

      <div
        className={`absolute bottom-12 font-switzer text-[10px] uppercase tracking-[0.4em] text-[#444444] transition-all duration-700 delay-100 ${
          isExiting ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {progress === 100 ? "System Ready" : "Initializing"}
      </div>
    </div>
  );
};

export default Preloader;
