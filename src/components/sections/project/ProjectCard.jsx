import React from "react";
import Image from "next/image";
import useSystemSound from "../../../hooks/useSystemSound";

const ProjectCard = ({ title, description, year, src }) => {
  const { playSound } = useSystemSound();
  return (
    <div
      className="group cursor-pointer w-full mb-6"
      onMouseEnter={() => {
        playSound("hover");
      }}
      onClick={() => playSound("click")}
    >
      <div className="w-full aspect-video bg-[#111111] border border-white/5 rounded-sm mb-4 overflow-hidden relative">
        {src ? (
          // REAL IMAGE
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
        ) : (
          // FALLBACK PLACEHOLDER (If no image is provided)
          <>
            <div className="absolute inset-0 bg-neutral-900 group-hover:scale-[1.02] transition-transform duration-700 ease-out"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[#333] font-editorial italic">
              Project Image
            </div>
          </>
        )}
      </div>

      {/* 2. TEXT INFO */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="font-editorial text-[18px] italic text-[#EEEEEE] group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="font-sans text-[14px] text-[#888888] line-clamp-2">
            {description}
          </p>
        </div>
        <span className="font-mono text-[12px] text-[#444444] mt-1.5 shrink-0">
          {year}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
