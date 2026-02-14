import React, { useState, useEffect } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Logic to increment the counter
    // We use a slightly randomized interval to make it feel like "real" loading
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random jump between 1 and 15
        const jump = Math.floor(Math.random() * 15) + 1;
        // Ensure we don't exceed 100
        return Math.min(prev + jump, 100);
      });
    }, 150); // Update every 150ms

    return () => clearInterval(timer);
  }, []);

  // 2. Trigger Exit when 100% is reached
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsExiting(true); // Trigger slide-up animation
        setTimeout(onComplete, 1000); // Unmount component after animation finishes
      }, 500); // Wait 0.5s at 100% before sliding up
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-9999 bg-black text-[#888888] flex flex-col justify-between px-6 py-8 md:px-12 md:py-10 
      transition-opacity duration-1000 ease-out 
      ${isExiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* --- TOP ROW --- */}
      <div className="flex justify-between items-start font-geist text-xs md:text-sm tracking-[0.2em] uppercase opacity-80">
        <span>Ayan Kumar</span>
        <span>Portfolio ©2026</span>
      </div>

      {/* --- BOTTOM ROW --- */}
      <div className="flex justify-between items-end">
        {/* Location (Bottom Left) */}
        <div className="font-geist text-xs md:text-sm tracking-[0.2em] uppercase opacity-80 mb-2 md:mb-4">
          Purulia, India
        </div>

        {/* Big Counter (Bottom Right) 
            - font-editorial: Your serif font
            - text-[18vw]: Massive responsive size based on viewport width
            - leading-none: Tight line height
            - italic: Matches the reference vibe
        */}
        <div className="font-editorial text-[20vw] md:text-[9vw] leading-[0.8] text-[#EEEEEE] italic -mr-2 md:-mr-4">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
