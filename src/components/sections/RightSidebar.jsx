"use client";

import useSystemSound from "../../hooks/useSystemSound";

const RightSidebar = () => {
  const { playSound } = useSystemSound();

  return (
    <aside className="hidden xl:flex w-full h-screen sticky top-0 flex-col justify-between pt-45 pb-3 pr-8 pl-12 z-40">
      {/* 1. TOP: The Connect Hub */}
      {/* 👇 Locked to #121212 (Light) and #EEEEEE (Dark) to match the left pillar */}
      <div className="flex flex-col w-full text-right text-[14px] font-switzer uppercase font-medium text-[#121212] dark:text-[#EEEEEE] transition-colors duration-300">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => playSound("hover")}
          // 👇 Removed hover:text, kept the slide animation (hover:pr-3)
          className="py-2 border-t border-black/3 dark:border-white/3 hover:pr-3 transition-all duration-300"
        >
          GITHUB
        </a>
        <a
          href="https://x.com/yourusername"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => playSound("hover")}
          className="py-2 border-t border-black/3 dark:border-white/3 hover:pr-3 transition-all duration-300"
        >
          X (TWITTER)
        </a>
        <a
          href="mailto:your@email.com"
          onMouseEnter={() => playSound("hover")}
          className="py-2 border-t border-black/3 dark:border-white/3 hover:pr-3 transition-all duration-300"
        >
          EMAIL
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => playSound("hover")}
          className="py-2 border-y border-black/3 dark:border-white/3 hover:pr-3 transition-all duration-300"
        >
          RESUME
        </a>
      </div>

      {/* 2. BOTTOM: The Ledger */}
      <div className="flex flex-col items-start font-switzer text-[14px] w-full cursor-default">
        {/* 👇 Muted gray in light mode, muted dark gray in dark mode */}
        <span className="font-light text-[#666666] dark:text-[#555555] transition-colors duration-300">
          ( crafted with care & code )
        </span>
        {/* 👇 Sharp black in light mode, soft white in dark mode to ground the text */}
        <span className="font-medium text-[#121212] dark:text-[#ABABAB] transition-colors duration-300">
          © {new Date().getFullYear()} All rights reserved
        </span>
      </div>
    </aside>
  );
};

export default RightSidebar;
