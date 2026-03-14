"use client";

export default function RelicBox({ relic, onClick }) {
  let dimensions = "w-64 h-96";

  if (relic.shape === "square") {
    dimensions = "w-80 h-80";
  } else if (relic.shape === "wide") {
    dimensions = "w-96 h-64";
  }

  return (
    // 👇 The wrapper now simply fires the onClick prop passed from CoverFlow
    <div
      className={`relative ${dimensions} cursor-pointer group perspective-distant`}
      onClick={onClick}
    >
      <div className="w-full h-full relative transform-3d">
        {/* --- FRONT FACE --- */}
        <div className="absolute inset-0 backface-hidden transform-[translateZ(16px)] bg-black rounded-r-md shadow-2xl overflow-hidden">
          <img
            src={relic.coverImage}
            alt={relic.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          {/* Plastic Glossy Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"></div>
          {/* Jewel Case Edge Detail */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-linear-to-r from-black/60 to-transparent border-l border-white/20"></div>
        </div>

        {/* --- BACK FACE HAS BEEN DELETED! --- */}

        {/* --- THE STRUCTURAL WALLS --- */}
        {/* LEFT SPINE */}
        <div
          className="absolute top-0 -left-4 w-8 h-full flex items-center justify-center overflow-hidden border-y border-l border-black/50 transform-[rotateY(-90deg)] shadow-inner"
          style={{ backgroundColor: relic.spineColor }}
        >
          <span className="text-white/80 font-bold text-[10px] font-sans whitespace-nowrap transform-[rotate(-90deg)] tracking-widest drop-shadow-md">
            {relic.title}
          </span>
        </div>

        {/* RIGHT EDGE */}
        <div className="absolute top-0 -right-4 w-8 h-full bg-[#111] border-y border-r border-[#222] transform-[rotateY(90deg)]"></div>
        {/* TOP EDGE */}
        <div className="absolute -top-4 left-0 w-full h-8 bg-[#111] border-x border-t border-[#222] transform-[rotateX(90deg)]"></div>
        {/* BOTTOM EDGE */}
        <div className="absolute -bottom-4 left-0 w-full h-8 bg-[#050505] border-x border-b border-[#111] transform-[rotateX(-90deg)]"></div>
      </div>
    </div>
  );
}
