"use client";

import { TECH_DATA } from "../../../data/techData";
import "../../../../marqueeStyle.css";

const TechIcon = ({ icon, name }) => (
  <div className="group relative w-7 h-7 flex items-center justify-center">
    {/* 1. The Tooltip: High contrast in both modes */}
    <div
      className="absolute -top-10 left-1/2 -translate-x-1/2 
                    bg-[#111111] dark:bg-[#EEEEEE] text-[#EEEEEE] dark:text-[#111111] 
                    text-[10px] font-bold font-mono px-2 py-1 rounded-md 
                    opacity-0 group-hover:opacity-100 transition-all duration-300 
                    whitespace-nowrap pointer-events-none z-50 shadow-lg"
    >
      {name}

      {/* Down triangle: matches the tooltip background */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                      border-4 border-transparent border-t-[#111111] dark:border-t-[#EEEEEE]"
      ></div>
    </div>

    {/* 2. The Logo: Black in Light Mode, White in Dark Mode, Full Color on Hover */}
    <img
      src={icon}
      alt={name}
      className="w-full h-full object-contain transition-all duration-300 ease-out
                 opacity-60 dark:opacity-80
                 brightness-0 invert-0
                 dark:brightness-0 dark:invert 
                 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100
                 dark:group-hover:brightness-100 dark:group-hover:invert-0 dark:group-hover:opacity-100"
    />
  </div>
);

const TechStack = () => {
  return (
    <div className="w-full">
      <div>
        <p className="text-[#757575] dark:text-[#ABABAB] text-lg leading-relaxed font-editorial italic transition-colors duration-300">
          While I like experimenting with many tools, this stack represents
          where my <br className="hidden md:block" /> strongest experience lies:
        </p>
      </div>

      {/* Icon Marquee */}
      {/* (Assuming your .mask-gradient in CSS uses `mask-image: linear-gradient(...)` so it is already theme-agnostic!) */}
      <div className="relative flex overflow-hidden mask-gradient w-full">
        <div className="animate-marquee flex items-center py-14 whitespace-nowrap">
          {[...TECH_DATA.core, ...TECH_DATA.core, ...TECH_DATA.core].map(
            (item, idx) => (
              <div
                key={idx}
                className="text-4xl pr-15 transition-all duration-500 cursor-pointer"
              >
                <div className="scale-130">
                  <TechIcon icon={item.icon} name={item.name} />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
