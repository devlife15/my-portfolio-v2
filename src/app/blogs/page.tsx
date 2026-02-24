"use client";

import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import useSystemSound from "@/hooks/useSystemSound";
import { ARTICLES } from "@/data/articles";

export default function BlogsArchivePage() {
  const { playSound } = useSystemSound();

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 relative z-10 flex justify-center">
      <div className="w-full max-w-4xl">
        {" "}
        {/* Scaled down max-width */}
        {/* HEADER SECTION */}
        <header className="mb-9">
          <Link
            href="/"
            onClick={() => playSound("click")}
            className="group flex w-max items-center gap-2 text-xs font-mono text-[#666666] hover:text-green-400 transition-colors mb-10"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>/ back_to_root</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            {/* Reduced from text-8xl to text-5xl */}
            <h1 className="font-editorial text-4xl md:text-5xl italic text-[#EEEEEE] tracking-tight leading-none">
              Archive Log
            </h1>
            <div className="font-mono text-[10px] md:text-xs text-[#555555] uppercase tracking-widest text-right pb-1">
              <p>Directory: /blogs</p>
              <p className="text-green-500/50 mt-1">
                Total Entries: {ARTICLES.length}
              </p>
            </div>
          </div>
        </header>
        {/* THE LEDGER LIST */}
        <div className="flex flex-col">
          {ARTICLES.map((article, index) => (
            <Link
              key={article.id}
              href={`/blogs/${article.slug}`}
              onMouseEnter={() => playSound("hover")}
              onClick={() => playSound("click")}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-white/5 hover:border-white/20 hover:bg-white/2 px-4 -mx-4 transition-all duration-500 cursor-pointer"
            >
              {/* Left Side: Index & Date */}
              <div className="flex items-baseline gap-6 md:gap-12 mb-2 md:mb-0">
                <span className="font-mono text-[10px] md:text-xs text-[#333333] group-hover:text-green-500/50 transition-colors">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-[#666666] group-hover:text-[#888888] transition-colors w-20">
                  {article.date}
                </span>
              </div>

              {/* Center: Scaled Title */}
              <div className="flex-1 md:px-6">
                {/* Reduced from text-5xl to text-2xl */}
                <h2 className="font-editorial text-xl md:text-2xl italic text-[#999999] group-hover:text-[#EEEEEE] transition-colors duration-300">
                  {article.title}
                </h2>

                {/* Tags */}
                <div className="flex gap-3 mt-2 opacity-100 md:opacity-0 md:-translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {article.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-[#555555]"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Scaled down Animated Arrow */}
              <div className="relative overflow-hidden w-6 h-6 items-center justify-center shrink-0 text-[#555555] group-hover:text-[#EEEEEE] hidden md:flex transition-colors">
                <FiArrowUpRight
                  className="absolute -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  size={20}
                />
                <FiArrowUpRight
                  className="absolute translate-x-0 translate-y-0 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-30"
                  size={20}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
