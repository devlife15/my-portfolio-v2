"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LibraryCard from "./library/LibraryCard"; // Adjust import path if needed

gsap.registerPlugin(ScrollTrigger);

const BooksSection = ({ sectionRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal the master header
      gsap.fromTo(
        ".library-header",
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

      // 2. Stagger the individual book rows
      // THE FIX: This now correctly targets the wrappers below
      gsap.fromTo(
        ".library-row-wrapper",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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
      <div className="library-header flex items-baseline gap-3 mb-2 border-b border-black/10 dark:border-white/5 pb-6 transition-colors duration-300">
        <h2 className="font-switzer uppercase text-2xl md:text-2xl font-medium tracking-tight text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
          Reading
        </h2>
        <span className="font-mono text-xs text-[#666666] dark:text-[#555555] transition-colors duration-300">
          (06)
        </span>
      </div>

      {/* 2. The Horizontal Ledger List */}
      {/* THE FIX: Changed from grid layout to a simple vertical flex column */}
      <div className="flex flex-col w-full">
        {/* Row 1 */}
        <div className="library-row-wrapper border-b border-black/3 dark:border-white/5 last:border-0">
          <LibraryCard
            title="Spring Starts Here"
            author="Laurentiu Spilca"
            status="Reading"
            cover="https://images.manning.com/360/480/resize/book/d/8767025-cf7f-4249-94f4-083c2b16b2e7/Spilca2-HI.png"
            link="https://www.manning.com/books/spring-start-here"
          />
        </div>

        {/* Row 2 */}
        <div className="library-row-wrapper border-b border-black/3 dark:border-white/5 last:border-0">
          <LibraryCard
            title="Atomic Habits"
            author="James Clear"
            status="Reading"
            cover="/Me.png"
            link="https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834"
          />
        </div>

        {/* Row 3 */}
        <div className="library-row-wrapper border-b border-black/3 dark:border-white/5 last:border-0">
          <LibraryCard
            title="Source Code"
            author="Bill Gates"
            status="To Read"
            cover="/Me.png"
            link="https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834"
          />
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
