"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WritingRow from "./blog/WritingRow";
import { FiArrowRight } from "react-icons/fi";
import { ARTICLES } from "@/data/articles";

gsap.registerPlugin(ScrollTrigger);

const BlogsSection = ({ sectionRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal the master header
      gsap.fromTo(
        ".blog-header",
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

      // 2. Stagger the individual blog rows
      gsap.fromTo(
        ".writing-row-wrapper",
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

  // Display only the latest 4-5 articles on the home page
  const displayArticles = ARTICLES.slice(0, 5);

  return (
    <section ref={sectionRef || containerRef} className="w-full pb-15">
      {/* 1. The Architectural Header */}
      {/* 👇 Added dark: modifiers for borders and smooth color transitions */}
      <div className="blog-header flex items-baseline gap-3 mb-5 border-b border-black/10 dark:border-white/5 pb-6 transition-colors duration-300">
        <h2 className="font-switzer uppercase text-2xl md:text-2xl font-medium tracking-tight text-[#121212] dark:text-[#EEEEEE] transition-colors duration-300">
          Writings
        </h2>
        <span className="font-mono text-xs text-[#666666] dark:text-[#555555] transition-colors duration-300">
          (05)
        </span>
      </div>

      {/* 2. The Ledger-Style List */}
      <div className="flex flex-col">
        {displayArticles.map((article) => (
          <div
            key={article.id}
            className="writing-row-wrapper border-b border-black/10 dark:border-white/5 transition-colors duration-300"
          >
            <WritingRow
              href={`/blogs/${article.slug}`}
              title={article.title}
              date={article.date}
            />
          </div>
        ))}
      </div>

      {/* 3. The "Read All" Footer */}
      <div className="writing-row-wrapper mt-8 flex justify-end">
        {/* 👇 Updated text colors: snaps to pure black on hover in Light Mode, white in Dark Mode */}
        <a
          href="/blogs"
          className="group inline-flex items-center gap-2 text-[13px] font-mono tracking-wide text-[#757575] dark:text-[#ABABAB] hover:text-[#121212] dark:hover:text-[#EEEEEE] transition-colors duration-300"
        >
          <span>VIEW ALL</span>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
};

export default BlogsSection;
