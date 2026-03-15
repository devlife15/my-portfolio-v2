"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ScrollIndicator = () => {
  const wheelRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  // --- 1. THE FADE ENGINE ---
  useEffect(() => {
    const handleScroll = () => {
      // Calculates opacity based on scroll distance.
      // At 0px = 1 (100% visible). At 150px = 0 (Invisible).
      const currentScroll = window.scrollY;
      const calculatedOpacity = Math.max(0, 1 - currentScroll / 150);
      setOpacity(calculatedOpacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to check initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 2. THE INFINITE GSAP LOOP ---
  useEffect(() => {
    if (!wheelRef.current) return;

    gsap.to(wheelRef.current, {
      y: 10, // Drops down 10px
      opacity: 0, // Fades out as it drops
      duration: 1.5, // Smooth, deliberate pacing
      repeat: -1, // Loop forever
      ease: "power2.out", // Gravity-like easing
    });
  }, []);

  return (
    // Positioned absolute bottom-center of its parent container
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none transition-opacity duration-75"
      style={{ opacity: opacity }}
    >
      {/* Tiny editorial label */}
      <span className="font-mono text-[11px] tracking-[0.3em] text-[#121212]/40 dark:text-[#EEEEEE]/40 uppercase">
        Scroll
      </span>

      {/* The Mouse Pill */}
      <div className="w-[22px] h-[36px] rounded-full border border-black/20 dark:border-white/20 flex justify-center pt-1.5">
        {/* The Animated Wheel */}
        <div
          ref={wheelRef}
          className="w-1 h-1.5 rounded-full bg-[#121212]/60 dark:bg-[#EEEEEE]/60"
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
