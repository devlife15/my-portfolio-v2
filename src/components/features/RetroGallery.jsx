"use client";

import React, { useRef } from "react";
import RelicBox from "./RelicBox";
import { retroRelics } from "@/data/retroRelics";

export default function RetroGallery() {
  const scrollRef = useRef(null);

  return (
    <section className="w-full py-24 bg-[#050505] relative border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-8 bg-blue-500/50"></div>
          <h2 className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase">
            System Archive // 2000-2010
          </h2>
        </div>
        <h3 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
          The Catalysts.
        </h3>
        <p className="text-[#888] mt-4 max-w-2xl font-mono text-sm leading-relaxed">
          Before I was building full-stack applications and analyzing
          algorithms, I was trying to figure out how to burn a CD without
          ruining it. These are the artifacts, games, and systems that sparked
          the journey.
        </p>
      </div>

      {/* --- THE SCROLLING SHELF --- */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto pb-20 pt-10 px-6 md:px-12 flex gap-12 custom-scrollbar snap-x snap-mandatory relative z-10"
        style={{ perspective: "2000px" }}
      >
        {retroRelics.map((relic, index) => (
          <div
            key={relic.id}
            className="shrink-0 snap-center hover:z-20 group relative"
            style={{
              // This slight rotation makes the 3D spine visible immediately!
              transform: "rotateY(-15deg) rotateX(5deg)",
              transformStyle: "preserve-3d",
              transition: "transform 0.4s ease-out",
            }}
          >
            {/* The actual 3D Box */}
            <RelicBox relic={relic} />

            {/* Soft shadow underneath the box to ground it */}
            <div className="absolute -bottom-8 left-0 w-full h-8 bg-black/60 blur-xl rounded-[100%] [transform:rotateX(70deg)] pointer-events-none"></div>
          </div>
        ))}

        {/* Spacer to allow scrolling past the last item */}
        <div className="shrink-0 w-12 md:w-32"></div>
      </div>
    </section>
  );
}
