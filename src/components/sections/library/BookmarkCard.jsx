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
      className="group relative flex flex-col justify-between p-5 border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all duration-300 rounded-sm"
      onMouseEnter={() => playSound("hover")}
      onClick={() => playSound("click")}
    >
      {/* Top Row: Source & Icon */}
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-[10px] text-[#555555] uppercase tracking-wider border border-white/10 px-2 py-1 rounded-full group-hover:text-[#888888] group-hover:border-white/20 transition-colors">
          {source}
        </span>
        <FiArrowUpRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
      </div>

      {/* Title */}
      <h3 className="font-editorial text-[18px] text-[#DDDDDD] group-hover:text-white italic leading-tight pr-4">
        {title}
      </h3>

      {/* Decorative Corner (Optional subtle detail) */}
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-white/30 transition-colors rounded-br-sm"></div>
    </a>
  );
};

export default BookmarkCard;
