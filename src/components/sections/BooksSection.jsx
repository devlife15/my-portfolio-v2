"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LibraryCard from "./library/LibraryCard";

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
      gsap.fromTo(
        ".library-row-wrapper",
        { opacity: 0, y: 20 },
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
      {/* 👇 Added dual-theme borders and color transitions */}
      <div className="library-header flex items-baseline gap-3 mb-5 border-b border-black/10 dark:border-white/5 pb-6 transition-colors duration-300">
        <h2 className="font-switzer uppercase text-2xl md:text-2xl font-medium tracking-tight text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
          Reading
        </h2>
        <span className="font-mono text-xs text-[#666666] dark:text-[#555555] transition-colors duration-300">
          (06)
        </span>
      </div>

      {/* 2. The Ledger-Style List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        <div className="library-card-wrapper">
          <LibraryCard
            title="Functional Programming in Scala"
            author="Michael Pilquist, Rúnar Bjarnason & Paul Chiusano"
            status="Reading"
            cover="https://images.manning.com/360/480/resize/book/7/28e607e-d1f1-4a84-badc-d8f436f4e4b9/Pilquist-2ed-HI.png"
            link="https://www.manning.com/books/functional-programming-in-scala-second-edition"
          />
        </div>

        <div className="library-card-wrapper">
          <LibraryCard
            title="Atomic Habits"
            author="James Clear"
            status="Reading"
            cover="https://www.crossword.in/cdn/shop/files/Atomic_Habits_1_1.webp"
            link="https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834"
          />
        </div>
        <div className="library-card-wrapper">
          <LibraryCard
            title="Source Code"
            author="Bill Gates"
            status="To Read"
            cover="https://www.crossword.in/cdn/shop/files/71yR_jQLqXL._SL1500.jpg"
            link="https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834"
          />
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
