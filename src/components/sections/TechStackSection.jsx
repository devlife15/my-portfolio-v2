"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechStack from "./about/TechStack";

gsap.registerPlugin(ScrollTrigger);

const TechStackSection = ({ sectionRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal the header first (sliding in slightly from the left)
      gsap.fromTo(
        ".tech-header",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // 2. Reveal the inner stack content right after
      gsap.fromTo(
        ".tech-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%", // Triggers just a fraction after the header
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef || containerRef} className="w-full pb-15">
      {/* 👇 Added dark: modifiers and smooth color transitions */}
      <div className="tech-header flex items-baseline gap-3 mb-5 border-b border-black/10 dark:border-white/5 pb-6 transition-colors duration-300">
        <h2 className="font-switzer uppercase text-2xl md:text-2xl font-medium tracking-tight text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
          Tech Stack
        </h2>
        <span className="font-mono text-xs text-[#757575] dark:text-[#555555] transition-colors duration-300">
          (03)
        </span>
      </div>

      {/* The opacity-60 hover effect is a nice touch! 
        It keeps the screen quiet until the user interacts with it.
      */}
      <div className="tech-content opacity-60 hover:opacity-100 transition-opacity duration-500">
        <TechStack />
      </div>
    </section>
  );
};

export default TechStackSection;
