"use client";

import { forwardRef } from "react";
import useSystemSound from "../../hooks/useSystemSound";

const RightSidebar = forwardRef(function RightSidebar(_, ref) {
  const { playSound } = useSystemSound();

  return (
    <aside
      ref={ref}
      className="hidden xl:flex w-full h-screen sticky top-0 flex-col justify-between pt-45 pb-3 pr-8 pl-12 z-40"
    >
      <div className="flex flex-col w-full text-right text-[14px] font-switzer uppercase font-medium text-[#121212] dark:text-[#EEEEEE] transition-colors duration-300">
        {[
          {
            label: "GITHUB",
            href: "https://github.com/yourusername",
            target: "_blank",
          },
          {
            label: "X (TWITTER)",
            href: "https://x.com/yourusername",
            target: "_blank",
          },
          { label: "EMAIL", href: "mailto:your@email.com", target: undefined },
          { label: "RESUME", href: "/resume.pdf", target: "_blank" },
        ].map(({ label, href, target }) => (
          /* THE FIREWALL: GSAP strictly controls this outer div */
          <div key={label} className="sidebar-item-right w-full">
            {/* CSS strictly controls this inner anchor's hover transition */}
            <a
              href={href}
              target={target}
              rel={target ? "noreferrer" : undefined}
              onMouseEnter={() => playSound("hover")}
              className="block w-full py-2 border-t border-black/3 dark:border-white/3 hover:pr-3 transition-all duration-300"
            >
              {label}
            </a>
          </div>
        ))}
      </div>

      {/* This bottom section doesn't have a transition-all conflict, so it is safe to target directly */}
      <div className="sidebar-item-right flex flex-col items-start font-switzer text-[14px] w-full cursor-default">
        <span className="font-light text-[#666666] dark:text-[#555555] transition-colors duration-300">
          ( crafted with care & code )
        </span>
        <span className="font-medium text-[#121212] dark:text-[#ABABAB] transition-colors duration-300">
          © {new Date().getFullYear()} All rights reserved
        </span>
      </div>
    </aside>
  );
});

export default RightSidebar;
