"use client";

// --- 1. THE MECHANICAL KEYCAP ---
export const Keycap = () => (
  <div className="relative w-20 h-20 rounded-xl bg-[#1a1a1a] shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0px_-6px_0px_rgba(0,0,0,0.6),inset_0px_2px_0px_rgba(255,255,255,0.05)] flex items-center justify-center border border-[#222]">
    {/* The top indented surface of the keycap */}
    <div className="w-14 h-14 rounded-lg bg-[#141414] shadow-[inset_0px_4px_10px_rgba(0,0,0,0.8),0px_1px_0px_rgba(255,255,255,0.02)] flex items-center justify-center">
      <span className="font-mono text-xs font-bold text-green-500/70 tracking-widest">
        ESC
      </span>
    </div>
  </div>
);

// --- 2. THE SILICON CPU CHIP ---
export const CPUChip = () => (
  <div className="relative w-28 h-28 bg-[#0a0a0a] rounded-md flex items-center justify-center border border-[#333] shadow-2xl">
    {/* The Gold Pins (Using CSS repeating linear gradients) */}
    <div className="absolute inset-1 border-2 border-dashed border-[#8c7335]/40 rounded-sm" />
    <div className="absolute inset-2 border-2 border-dashed border-[#8c7335]/30 rounded-sm" />

    {/* The Core Silicon Plate */}
    <div className="relative w-16 h-16 bg-[#111] rounded shadow-[inset_0_0_15px_rgba(0,0,0,1)] border border-white/5 flex flex-col items-center justify-center overflow-hidden">
      {/* Circuit lines trace effect */}
      <div className="absolute w-full h-px bg-green-500/10 top-1/4" />
      <div className="absolute w-full h-px bg-green-500/10 bottom-1/4" />
      <div className="absolute h-full w-px bg-green-500/10 left-1/4" />
      <div className="absolute h-full w-px bg-green-500/10 right-1/4" />

      {/* Branding */}
      <span className="font-mono text-[10px] text-[#555] z-10">x86_64</span>
      <div className="w-2 h-2 rounded-full bg-green-500/20 mt-1 z-10 animate-pulse" />
    </div>
  </div>
);
