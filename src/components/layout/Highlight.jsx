"use client";

export default function Highlight({ children, variant = "glow" }) {
  // Variant 1: The solid, blocky terminal selection look
  if (variant === "terminal") {
    return (
      <span className="bg-green-500 text-[#050505] px-1.5 py-0.5 mx-0.5 font-mono text-[0.9em] font-bold rounded-sm inline-block shadow-[0_0_10px_rgba(34,197,94,0.3)] selection:bg-white selection:text-black hover:bg-green-400 transition-colors cursor-text">
        {children}
      </span>
    );
  }

  // Variant 2: The sleek, dark-mode neon glass look (Default)
  return (
    <span className="relative inline-block px-1.5 py-0.5 mx-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[0.9em] shadow-[0_0_8px_rgba(34,197,94,0.15)] transition-all duration-300 hover:bg-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:-translate-y-px cursor-text">
      {children}
    </span>
  );
}
