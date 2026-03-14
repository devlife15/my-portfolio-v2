import React from "react";
import { FiBookOpen, FiClock, FiCheckCircle } from "react-icons/fi";
import useSystemSound from "../../../hooks/useSystemSound";

const LibraryCard = ({ title, author, status, cover, link }) => {
  const { playSound } = useSystemSound();

  const getStatusStyle = () => {
    switch (status) {
      case "Reading":
        return "text-emerald-600 bg-emerald-600/10 border-emerald-600/20 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20";
      case "To Read":
        return "text-[#666666] bg-black/5 border-black/10 dark:text-[#888888] dark:bg-white/5 dark:border-white/10";
      case "Finished":
        return "text-amber-600 bg-amber-600/10 border-amber-600/20 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20";
      default:
        return "text-[#666666] dark:text-[#888888]";
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
      className="group flex flex-col w-full cursor-pointer"
      onMouseEnter={() => playSound("hover")}
      onClick={() => playSound("click")}
    >
      {/* 1. MASSIVE ARTWORK COVER */}
      <div className="w-full aspect-[4/5] bg-black/5 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-sm overflow-hidden relative shadow-md mb-5 transition-colors duration-300">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover opacity-60 dark:opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        />

        {/* Status Badge moved inside the image as a sleek floating tag! */}
        <div className="absolute top-3 right-3 z-10">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-md text-[9px] uppercase font-plex tracking-widest transition-colors duration-300 ${getStatusStyle()}`}
          >
            {getStatusIcon()}
            <span>{status}</span>
          </div>
        </div>
      </div>

      {/* 2. READABLE TYPOGRAPHY */}
      <div className="flex flex-col gap-1.5 px-1">
        <h3 className="font-editorial italic text-[20px] leading-tight text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
          {title}
        </h3>
        {/* 👇 Fixed the pixelation: Swapped mono for switzer, bumped to 13px, removed uppercase */}
        <span className="font-plex text-[13px] text-[#666666] dark:text-[#888888] transition-colors duration-300">
          by {author}
        </span>
      </div>
    </a>
  );
};

export default LibraryCard;
