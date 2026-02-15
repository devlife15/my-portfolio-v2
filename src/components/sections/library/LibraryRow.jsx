import React from "react";
import { FiBookOpen, FiClock, FiCheckCircle } from "react-icons/fi";
import useSystemSound from "../../../hooks/useSystemSound";

const LibraryRow = ({ title, author, status, rating, cover, link }) => {
  const { playSound } = useSystemSound();
  // 1. Status Logic: Color-coded badges
  const getStatusStyle = () => {
    switch (status) {
      case "Reading":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "To Read":
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
      case "Finished":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Reading":
        return <FiBookOpen className="animate-pulse" />;
      case "To Read":
        return <FiClock />;
      case "Finished":
        return <FiCheckCircle />;
      default:
        return null;
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/5 px-3 -mx-3 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => {
        playSound("hover");
      }}
      onClick={() => playSound("click")}
    >
      <div className="flex items-center gap-6">
        {/* COVER IMAGE (Small, 3:4 aspect ratio) */}
        <div className="w-10 h-14 bg-[#111] border border-white/10 rounded-sm overflow-hidden shrink-0 relative shadow-md group-hover:shadow-white/10 group-hover:scale-110 transition-all duration-500">
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-1">
          <h3 className="font-editorial italic text-[16px] md:text-[18px] text-[#DDDDDD] group-hover:text-white transition-colors">
            {title}
          </h3>
          <span className="font-saans text-xs text-[#666666] group-hover:text-[#888888] transition-colors">
            by {author}
          </span>
        </div>
      </div>

      {/* META (Right Side) */}
      <div className="flex flex-col items-end gap-2">
        {/* Status Badge */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase font-saans font-bold tracking-wider ${getStatusStyle()}`}
        >
          {getStatusIcon()}
          <span>{status}</span>
        </div>

        {/* Rating (Only if finished) */}
        {rating && (
          <div className="flex gap-0.5 text-yellow-500/80 text-[10px]">
            {"★".repeat(rating)}
            <span className="opacity-30">{"★".repeat(5 - rating)}</span>
          </div>
        )}
      </div>
    </a>
  );
};

export default LibraryRow;
