"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiShare2,
  FiCheck,
} from "react-icons/fi";
import useSystemSound from "@/hooks/useSystemSound";

export default function ArticleLayout({
  title,
  date,
  readTime,
  tags = [],
  children,
}) {
  const { playSound } = useSystemSound();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Handle Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    playSound("click");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#EEEEEE] pb-32 pt-20 relative z-10 px-4 md:px-0">
      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 bg-green-500/20 w-full z-50">
        <div
          className="h-full bg-green-500 transition-all duration-100 ease-out shadow-[0_0_10px_#22c55e]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. THE GLASS CARD (Updated for True Glassmorphism) */}
      <main className="max-w-3xl mx-auto relative bg-white/3 backdrop-blur-xl border border-white/10 border-t-white/20 shadow-2xl rounded-2xl p-6 md:p-12">
        {/* Optional: Very subtle inner gradient to give the glass a "sheen" */}
        <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent rounded-2xl pointer-events-none" />

        {/* NAVIGATION HEADER */}
        <div className="mb-12 relative z-10">
          <Link
            href="/blogs"
            onClick={() => playSound("click2")}
            className="group flex w-max items-center gap-2 text-sm font-mono text-gray-500 hover:text-green-400 transition-colors"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>/ back_to_root</span>
          </Link>
        </div>

        {/* ARTICLE HERO */}
        <header className="mb-16 border-b border-white/10 pb-12 relative z-10">
          {/* Tags */}
          <div className="flex gap-3 mb-6">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-green-500/20 text-green-400 bg-green-500/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-editorial text-4xl md:text-6xl italic leading-tight mb-8">
            {title}
          </h1>

          {/* Meta Data */}
          <div className="flex items-center gap-6 text-sm font-sans text-gray-500">
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock />
              <span>{readTime}</span>
            </div>
          </div>
        </header>

        {/* 3. CONTENT BODY */}
        {/* Updated prose-pre to use translucent glass instead of solid #0d0d0d */}
        <article
          className="relative z-10 prose prose-invert prose-lg max-w-none 
          prose-headings:font-editorial prose-headings:italic prose-headings:text-white
          prose-p:text-[#b4b4b4] prose-p:leading-relaxed prose-p:font-sans
          prose-code:text-green-400 prose-pre:bg-white/5 prose-pre:backdrop-blur-md prose-pre:border prose-pre:border-white/10"
        >
          {children}
        </article>

        {/* FOOTER / SHARE */}
        <footer className="mt-20 pt-10 border-t border-white/10 flex items-center justify-between relative z-10">
          <span className="font-editorial italic text-xl text-gray-400">
            Thanks for reading.
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-mono text-gray-300"
          >
            {copied ? <FiCheck className="text-green-400" /> : <FiShare2 />}
            <span>{copied ? "LINK_COPIED" : "SHARE_POST"}</span>
          </button>
        </footer>
      </main>
    </div>
  );
}
