"use client";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiReact,
  SiFramer,
} from "react-icons/si";
const TECH_STACK = [
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    url: "https://nextjs.org",
    hoverColor: "group-hover:text-black",
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
    hoverColor: "group-hover:text-black",
  },
];

const FooterSection = ({ ref }) => {
  return (
    <footer
      ref={ref}
      className="pt-8 pb-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 font-sans text-[10px] text-[#EEEEEE] uppercase tracking-wider"
      style={{ opacity: 0 }}
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-1 text-center md:text-left font-sans">
        <span className="text-[#EEEEEE]">© 2026 Ayan</span>
        <span className="text-[10px] opacity-60">Crafted with care & code</span>
      </div>

      {/* RIGHT SIDE: Tech Stack */}
      <div className="flex flex-col items-center md:items-end gap-3">
        <span className="font-sans">Built with</span>

        <div className="flex items-center gap-4">
          {TECH_STACK.map((tech, index) => (
            <a
              key={index}
              href={tech.url}
              target="_blank"
              rel="noreferrer"
              className="group relative p-2 -m-2" // Negative margin increases clickable area without ruining layout
              aria-label={tech.name}
            >
              {/* THE ICON */}
              <div
                className={`text-[16px] transition-all duration-300 ease-out transform group-hover:-translate-y-1 ${tech.hoverColor}`}
              >
                {tech.icon}
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
