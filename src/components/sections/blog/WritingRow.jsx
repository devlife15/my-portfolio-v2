import { FiArrowUpRight } from "react-icons/fi";
import useSystemSound from "../../../hooks/useSystemSound";
import Link from "next/link";

const WritingRow = ({ title, date, href }) => {
  const { playSound } = useSystemSound();

  return (
    <Link
      href={href}
      // 👇 Swapped hover background: subtle black tint in light mode, subtle white tint in dark mode
      className="group flex items-center justify-between py-4 hover:bg-black/3 dark:hover:bg-white/2 px-4 -mx-4 transition-colors duration-300 cursor-pointer"
      onMouseEnter={() => playSound("hover")}
      onClick={() => playSound("click")}
    >
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 w-full">
        {/* 👇 Date: Rests at a muted gray, snaps to black on hover in light mode */}
        <span className="font-mono text-[12px] uppercase tracking-widest text-[#757575] dark:text-[#ABABAB] shrink-0 md:w-28 transition-colors duration-300 group-hover:text-[#111111] dark:group-hover:text-[#757575]">
          {date}
        </span>

        {/* 👇 Title: Rests at a deep charcoal in light mode, snaps to sharp black on hover */}
        <h3 className="font-editorial text-[16px] md:text-[20px] italic text-[#444444] dark:text-[#CCCCCC] group-hover:text-[#111111] dark:group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* 👇 Arrow: Matches the text hover logic (snaps to black in light mode, white in dark mode) */}
      <div className="relative overflow-hidden w-6 h-6 flex items-center justify-center shrink-0 text-[#999999] dark:text-[#757575] group-hover:text-[#111111] dark:group-hover:text-white transition-colors duration-300 ml-4">
        <FiArrowUpRight className="absolute -translate-x-6 group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
        <FiArrowUpRight className="absolute translate-x-0 group-hover:translate-x-6 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-30" />
      </div>
    </Link>
  );
};

export default WritingRow;
