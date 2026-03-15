"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GithubStats from "./project/GithubStats";

gsap.registerPlugin(ScrollTrigger);

const GithubSection = ({ sectionRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal the header
      gsap.fromTo(
        ".github-header",
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

      // 2. Reveal the calendar content
      gsap.fromTo(
        ".github-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef || containerRef} className="w-full pb-15">
      {/* 1. The Architectural Header */}
      <div className="github-header flex items-baseline gap-3 mb-5 border-b border-black/10 dark:border-white/5 pb-6 transition-colors duration-300">
        <h2 className="font-switzer uppercase text-2xl md:text-2xl font-medium tracking-tight text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
          Github Activity
        </h2>
        <span className="font-mono text-xs text-[#666666] dark:text-[#555555] transition-colors duration-300">
          (04)
        </span>
      </div>

      {/* 2. The Content Wrapper */}
      {/* Kept your brilliant opacity-60 hover effect, and added overflow-x-auto just in case the calendar overflows on mobile */}
      <div className="github-content opacity-60 hover:opacity-100 transition-opacity duration-500 overflow-x-auto pb-4">
        <GithubStats username="devlife15" />
      </div>
    </section>
  );
};

export default GithubSection;
