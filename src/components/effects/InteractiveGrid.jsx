"use client";

import { useEffect, useState } from "react";

const InteractiveGrid = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // Locked background color to #1A1A1A
    <div className="fixed inset-0 z-[-10] bg-[#1A1A1A] overflow-hidden pointer-events-none">
      {/* 1. BASE LAYER: Very dim, razor-sharp pixel dots */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 32x32 grid spacing */}
            <pattern
              id="base-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              {/* Perfect 1.5px square pixel instead of a circle */}
              <rect width="1.5" height="1.5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#base-grid)" />
        </svg>
      </div>

      {/* 2. INTERACTIVE LAYER: Brighter dots revealed by the cursor */}
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-300"
        style={{
          WebkitMaskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hover-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <rect width="1.5" height="1.5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hover-grid)" />
        </svg>
      </div>
    </div>
  );
};

export default InteractiveGrid;
