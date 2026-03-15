import React from "react";
import { FiArrowUpRight, FiLink } from "react-icons/fi";
import useSystemSound from "../../../hooks/useSystemSound";

const BookmarkCard = ({ title, source, link }) => {
  const { playSound } = useSystemSound();

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      // 👇 Base Card: Subtle black tint/border in light mode, white tint in dark mode
      className="group relative flex flex-col h-full justify-between p-5 border border-black/10 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/10 transition-all duration-300 rounded-sm"
      onMouseEnter={() => playSound("hover")}
      onClick={() => playSound("click")}
    >
      {/* Top Row: Source & Icon */}
      <div className="flex justify-between items-start mb-4">
        {/* 👇 Source Pill: Rests at a muted gray, border darkens on hover */}
        <span className="font-saansmono text-[10px] text-[#888888] dark:text-[#555555] uppercase tracking-wider border border-black/10 dark:border-white/10 px-2 py-1 rounded-full group-hover:text-[#111111] dark:group-hover:text-[#888888] group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors duration-300">
          {source}
        </span>

        {/* 👇 Arrow Icon: Faded out normally, snaps to solid contrast on hover */}
        <FiArrowUpRight className="text-black/20 dark:text-white/20 group-hover:text-[#111111] dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
      </div>

      {/* Title */}
      {/* 👇 Title: Deep charcoal in light mode, pure black on hover */}
      <h3 className="font-editorial text-[18px] text-[#444444] dark:text-[#DDDDDD] group-hover:text-[#111111] dark:group-hover:text-white italic leading-tight pr-4 transition-colors duration-300">
        {title}
      </h3>

      {/* Decorative Corner */}
      {/* 👇 Corner Detail: Perfectly matches the border contrast shifts */}
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-black/10 dark:border-white/10 group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors duration-300 rounded-br-sm"></div>
    </a>
  );
};

export default BookmarkCard;
