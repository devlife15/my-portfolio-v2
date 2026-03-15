"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import useSystemSound from "../../hooks/useSystemSound";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { playSound } = useSystemSound();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-12 h-4"></div>; // Placeholder to prevent layout shift
  }

  const handleToggle = () => {
    playSound("click");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => playSound("hover")}
      className="group flex items-center gap-2 font-switzer font-medium uppercase text-[14px] text-[#ababab] hover:text-[#EEEEEE] transition-colors"
    >
      <div className="w-1.5 h-1.5 rounded-full border border-[#888888] group-hover:bg-[#EEEEEE] group-hover:border-[#EEEEEE] transition-all duration-300"></div>
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;
