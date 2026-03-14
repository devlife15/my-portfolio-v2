"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiReact,
  SiFramer,
} from "react-icons/si";
import useSystemSound from "../../hooks/useSystemSound";

gsap.registerPlugin(ScrollTrigger);

// Note: You aren't rendering the TECH_STACK in this component anymore,
// but I updated the hover colors for Next.js and Vercel just in case you use them!
const TECH_STACK = [
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    url: "https://nextjs.org",
    hoverColor: "group-hover:text-[#111111] dark:group-hover:text-white",
  },
  {
    name: "React",
    icon: <SiReact />,
    url: "https://react.dev",
    hoverColor: "group-hover:text-[#61DAFB]",
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss />,
    url: "https://tailwindcss.com",
    hoverColor: "group-hover:text-[#38B2AC]",
  },
  {
    name: "Framer",
    icon: <SiFramer />,
    url: "https://www.framer.com/motion/",
    hoverColor: "group-hover:text-[#FF0055]",
  },
  {
    name: "Vercel",
    icon: <SiVercel />,
    url: "https://vercel.com",
    hoverColor: "group-hover:text-[#111111] dark:group-hover:text-white",
  },
];

const FooterSection = ({ sectionRef }) => {
  const containerRef = useRef(null);
  const { playSound } = useSystemSound();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade and slide the entire footer up when reached
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef || containerRef}
      className="w-full flex flex-col pb-15"
    >
      {/* 1. THE BILLBOARD (Massive CTA) */}
      <a
        href="mailto:kumarayanatwork@gmail.com"
        onMouseEnter={() => playSound("hover")}
        onClick={() => playSound("click")}
        // 👇 Ledger line updated for dual-theme
        className="group flex flex-col items-center justify-center mb-8 cursor-pointer w-full relative transition-colors duration-300"
      >
        {/* 👇 Subtitle: Rests at a muted gray, snaps to solid black/white on hover */}
        <span className="font-switzer text-[20px] leading-6 text-[#666666] dark:text-[#ABABAB] mb-6 group-hover:text-[#111111] dark:group-hover:text-[#EEEEEE] transition-colors duration-300 text-center">
          Ready to work together? Let's talk about{" "}
          <br className="hidden md:block" /> freelance projects, collaborations,
          and full-time roles.
        </span>

        <div className="flex items-center gap-4 md:gap-8">
          {/* 👇 "LET'S": Starts muted, explodes into full contrast on hover */}
          <h2 className="text-[40px] md:text-[80px] font-switzer font-bold text-[#999999] dark:text-[#444444] transition-colors duration-500 group-hover:text-[#111111] dark:group-hover:text-[#EEEEEE]">
            LET'S
          </h2>

          {/* 👇 "WORK": Always high contrast */}
          <h2 className="text-[40px] md:text-[80px] leading-none font-switzer font-bold text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
            WORK
          </h2>

          {/* 👇 The Animating Arrow Container: Fills with black in Light Mode, white in Dark Mode */}
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-[#111111] dark:group-hover:bg-white group-hover:border-[#111111] dark:group-hover:border-white transition-all duration-500 overflow-hidden relative">
            {/* Arrow 1 (Leaves the circle) */}
            <FiArrowUpRight className="text-xl md:text-3xl text-[#111111] dark:text-white group-hover:text-white dark:group-hover:text-black absolute transition-transform duration-500 group-hover:translate-x-12 group-hover:-translate-y-12" />

            {/* Arrow 2 (Enters the circle) */}
            <FiArrowUpRight className="text-xl md:text-3xl text-white dark:text-black absolute -translate-x-12 translate-y-12 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
        </div>
      </a>
    </footer>
  );
};

export default FooterSection;
