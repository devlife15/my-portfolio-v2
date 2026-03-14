"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
// 👇 1. Import your cursor context
import { useCursor } from "../../../utils/CursorContext";

const ProjectCard = ({ title, description, year, src, playSound }) => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  // 👇 2. Destructure the setter function
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => {
    playSound("hover");

    // 👇 3. Hide the global dot cursor immediately
    setCursorVariant("hidden");

    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.5)",
    });
  };

  const handleMouseMove = (e) => {
    const { left, top } = containerRef.current.getBoundingClientRect();

    const x = e.clientX - left - 40;
    const y = e.clientY - top - 40;

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    // 👇 4. Bring the global dot cursor back when leaving the image!
    setCursorVariant("default");

    gsap.to(cursorRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="group w-full mb-6 cursor-pointer"
      onClick={() => playSound("click")}
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full aspect-video bg-black/5 dark:bg-[#111111] border border-black/10 dark:border-white/5 mb-4 overflow-hidden relative transition-colors duration-300 cursor-none"
      >
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 w-20 h-20 rounded-full bg-[#111111] text-[#EEEEEE] dark:bg-white dark:text-black flex items-center justify-center font-plex text-[11px] tracking-widest uppercase z-20 pointer-events-none opacity-0 scale-50"
        >
          View
        </div>

        {src ? (
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-black/5 dark:bg-neutral-900 group-hover:scale-[1.02] transition-transform duration-700 ease-out"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[#999999] dark:text-[#333333] font-editorial italic transition-colors duration-300">
              Project Image
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="font-switzer font-light uppercase text-[13px] text-[#111111] dark:text-[#EEEEEE] group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="font-mono text-[14px] text-[#666666] dark:text-[#888888] line-clamp-2 transition-colors duration-300">
            {description}
          </p>
        </div>
        <span className="font-mono text-[12px] text-[#999999] dark:text-[#444444] shrink-0 transition-colors duration-300">
          {year}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
