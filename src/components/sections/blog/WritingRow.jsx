import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import useSystemSound from "../../../hooks/useSystemSound";

const WritingRow = ({ title, date, link }) => {
  const { playSound } = useSystemSound();
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-baseline justify-between py-5 border-b border-white/5 hover:border-white/20 hover:bg-white/5 px-2 -mx-2 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => {
        playSound("hover");
      }}
      onClick={() => playSound("click")}
    >
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 w-full">
        <span className="font-saansmono text-xs text-[#444444] shrink-0 w-24">
          {date}
        </span>

        <h3 className="font-editorial text-[18px] md:text-[20px] italic text-[#BBBBBB] group-hover:text-white transition-colors">
          {title}
        </h3>
      </div>

      {/* Arrow: Slides in from left on hover */}
      <div className="relative overflow-hidden w-6 h-6 flex items-center justify-center shrink-0 text-white">
        <FiArrowUpRight className="absolute -translate-x-6 group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
        <FiArrowUpRight className="absolute translate-x-0 group-hover:translate-x-6 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-30" />
      </div>
    </a>
  );
};

export default WritingRow;
