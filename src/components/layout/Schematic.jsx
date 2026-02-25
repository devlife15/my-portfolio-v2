"use client";

export default function Schematic({ src, alt, caption, invert }) {
  return (
    <figure className="my-10 border border-white/10 rounded-xl overflow-hidden bg-[#050505] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between px-4 py-2 bg-white/3 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/50 border border-[#ff5f56]/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/50 border border-[#ffbd2e]/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/50 border border-[#27c93f]/20" />
        </div>

        <span className="font-mono text-[10px] text-[#666666] uppercase tracking-widest">
          sys.viewer // diagram
        </span>
      </div>

      <div className="relative p-2 md:p-6 flex justify-center items-center bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/3 to-transparent">
        <img
          src={src}
          alt={alt || "System Diagram"}
          // THE MAGIC CSS: If invert is true, flip the white background to black and rotate the hues back to normal
          className={`max-w-full h-auto rounded-md transition-all duration-500 ${
            invert
              ? "invert-[.95] hue-rotate-180 contrast-125"
              : "opacity-90 hover:opacity-100"
          }`}
        />
      </div>

      {caption && (
        <figcaption className="px-4 py-3 border-t border-white/5 bg-white/1 font-mono text-xs text-[#666666] text-center">
          <span className="text-green-500/50 mr-2">↳</span>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
