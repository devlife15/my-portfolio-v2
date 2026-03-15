"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookmarkCard from "./library/BookmarkCard";

gsap.registerPlugin(ScrollTrigger);

const ArticleSection = ({ sectionRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal the master header
      gsap.fromTo(
        ".bookmark-header",
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

      // 2. Stagger the individual bookmark cards
      gsap.fromTo(
        ".bookmark-card-wrapper",
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
      {/* 👇 Matches the exact layout, borders, and dual-theme colors of your other sections */}
      <div className="bookmark-header flex items-baseline gap-3 mb-5 border-b border-black/10 dark:border-white/5 pb-6 transition-colors duration-300">
        <h2 className="font-switzer uppercase text-2xl md:text-2xl font-medium tracking-tight text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
          Bookmarks
        </h2>
        <span className="font-mono text-xs text-[#666666] dark:text-[#555555] transition-colors duration-300">
          (07)
        </span>
      </div>

      {/* 2. The 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="bookmark-card-wrapper">
          <BookmarkCard
            title="The end of localhost"
            source="DX Tips"
            link="https://dx.tips/the-end-of-localhost"
          />
        </div>

        <div className="bookmark-card-wrapper">
          <BookmarkCard
            title="Just JavaScript: The Mental Models"
            source="Dan Abramov"
            link="https://..."
          />
        </div>

        <div className="bookmark-card-wrapper">
          <BookmarkCard
            title="Design Engineering as a process"
            source="Vercel"
            link="https://..."
          />
        </div>

        <div className="bookmark-card-wrapper">
          <BookmarkCard
            title="Why I'm betting on Rust"
            source="Discord"
            link="https://..."
          />
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
