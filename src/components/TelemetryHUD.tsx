"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TelemetryHUD = () => {
  const [scrollProgress, setScrollProgress] = useState("000");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. The Telemetry Scrubber (Updates the numbers)
    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const pct = Math.round(self.progress * 100)
          .toString()
          .padStart(3, "0");
        setScrollProgress(pct);

        // Turn on the HUD only after 2% scroll
        if (self.progress > 0.02) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
    });

    // 2. The Kinetic Crosshairs (Gear-locked rotation)
    gsap.to(".kinetic-crosshair", {
      rotate: 360,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // The 0.5 adds a tiny bit of heavy momentum to the spin
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    // pointer-events-none is CRITICAL so this invisible layer doesn't block you from clicking links
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-6 md:p-8 xl:p-12 transition-colors duration-300">
      {/* TOP ROW */}
      <div className="flex justify-between items-start mt-12 md:mt-10">
        {/* Top Left: Left empty because your Navbar logo is here */}
        <div></div>

        {/* Top Right: Kinetic Crosshair */}
        {/* <div className="kinetic-crosshair font-mono text-sm text-[#111111]/40 dark:text-[#EEEEEE]/40 origin-center">
          ✛
        </div> */}
      </div>

      {/* BOTTOM ROW */}
      <div className="flex justify-between items-end mb-2 md:mb-0">
        {/* Bottom Left: The Y-Axis Scrubber */}
        <div
          className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"} font-mono text-[10px] tracking-[0.2em] uppercase text-[#111111] dark:text-[#EEEEEE]`}
        >
          <span className="opacity-40">[ Y-AXIS ]</span>
          <span className="ml-4 font-bold tracking-widest">
            {scrollProgress}%
          </span>
        </div>

        {/* Bottom Right: Kinetic Crosshair */}
        {/* <div className="kinetic-crosshair font-mono text-sm text-[#111111]/40 dark:text-[#EEEEEE]/40 origin-center">
          ✛
        </div> */}
      </div>
    </div>
  );
};

export default TelemetryHUD;
