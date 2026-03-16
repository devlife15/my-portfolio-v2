"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSystemSound from "@/hooks/useSystemSound";

gsap.registerPlugin(ScrollTrigger);

// --- 1. CUSTOM CSS FOR THE HARDWARE GLARE & GLITCH ---
const CRT_STYLES = `
  @keyframes signal-tune {
    0% { filter: contrast(300%) brightness(200%) hue-rotate(90deg) blur(2px); transform: translateX(-2px) scale(1.05); }
    20% { filter: contrast(200%) brightness(50%) hue-rotate(-90deg) blur(1px); transform: translateX(2px) scale(1.05); }
    40% { filter: contrast(250%) brightness(150%) hue-rotate(45deg) blur(0px); transform: translateX(-1px) scale(1.05); }
    60% { filter: contrast(150%) brightness(80%) hue-rotate(-45deg) blur(1px); transform: translateX(1px) scale(1.05); }
    80% { filter: contrast(120%) brightness(110%) hue-rotate(0deg) blur(0px); transform: translateX(0) scale(1.05); }
    100% { filter: grayscale(100%) contrast(120%) brightness(90%) hue-rotate(0deg) blur(0px); transform: translateX(0) scale(1.05); }
  }
  .animate-tune-in {
    animation: signal-tune 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  .scanlines {
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3));
    background-size: 100% 4px;
  }
`;

// --- 2. ARCHIVE DATA ---
const ARCHIVE_PROJECTS = [
  {
    id: "01",
    year: "2026",
    title: "Placeholder Title",
    description: "Placeholder description to be filled with actual data later.",
    tags: ["Next.js", "WebGL", "GSAP"],
    image: "/projects/1.jpg",
  },
  {
    id: "02",
    year: "2025",
    title: "Placeholder Title",
    description: "Placeholder description to be filled with actual data later.",
    tags: ["React", "Framer Motion", "Tailwind"],
    image: "/projects/2.jpg",
  },
  {
    id: "03",
    year: "2024",
    title: "Placeholder Title",
    description: "Placeholder description to be filled with actual data later.",
    tags: ["Node.js", "Three.js", "WebSockets"],
    image: "/projects/3.jpg",
  },
  {
    id: "04",
    year: "2024",
    title: "Placeholder Title",
    description: "Placeholder description to be filled with actual data later.",
    tags: ["Next.js", "Shopify API", "Redis"],
    image: "/projects/1.jpg",
  },
];

// --- 3. THE MICRO-INTERACTION COMPONENT ---
const SignalThumbnail = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full md:w-56 h-32 rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 shrink-0 flex items-center justify-center cursor-pointer transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay z-10 pointer-events-none"></div>

      <div className="absolute inset-0 overflow-hidden bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            isHovered ? "animate-tune-in" : "opacity-0 scale-100 grayscale"
          }`}
        />
      </div>

      <div
        className={`scanlines absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-30" : "opacity-100"}`}
      ></div>

      <div
        className={`relative z-30 font-switzer text-xs text-[#EEEEEE] transition-all duration-300 ${
          isHovered ? "opacity-0 scale-95" : "opacity-50 scale-100"
        }`}
      >
        [ HOVER ]
      </div>

      <div
        className={`absolute inset-2 border border-white/20 transition-all duration-500 ease-out z-30 pointer-events-none ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
        }`}
        style={{
          clipPath:
            "polygon(0 0, 10% 0, 10% 100%, 0 100%, 0 0, 90% 0, 100% 0, 100% 100%, 90% 100%, 90% 10%, 10% 10%, 10% 90%, 90% 90%, 90% 100%, 0 100%)",
        }}
      ></div>
    </div>
  );
};

// --- 4. THE MAIN PAGE ---
const ProjectsPage = () => {
  const layoutRef = useRef(null);
  const navbarRef = useRef(null);
  const { playSound } = useSystemSound();

  useEffect(() => {
    if (!layoutRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".page-wrapper", { opacity: 1, duration: 0.5 })
        .fromTo(
          navbarRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1, clearProps: "transform" },
          "-=0.2",
        )
        .fromTo(
          ".hero-item",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            clearProps: "transform",
          },
          "-=0.8",
        );

      const scrollRows = gsap.utils.toArray(".scroll-row");
      scrollRows.forEach((row) => {
        const items = row.querySelectorAll(".editorial-item");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: "power4.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      const cards = gsap.utils.toArray(".stack-card");
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top 128px",
            scrub: true,
          },
        });
      });
    }, layoutRef);

    return () => ctx.revert();
  }, []);

  const gridLine = "border-black/3 dark:border-white/3";
  const masterGrid =
    "w-full grid grid-cols-1 xl:grid-cols-[1fr_minmax(auto,672px)_1fr]";

  return (
    <>
      <style>{CRT_STYLES}</style>
      <div
        ref={layoutRef}
        className="min-h-screen bg-[#121212] text-[#888888] selection:bg-white/20 selection:text-white flex flex-col relative"
      >
        <Navbar ref={navbarRef} />

        <div className="page-wrapper opacity-0 w-full flex flex-col flex-grow">
          <main className="relative z-10 w-full flex flex-col flex-grow">
            {/* =========================================
                ROW 1: THE FULL-VIEWPORT HERO GRID
            ========================================= */}
            <div className={`${masterGrid} min-h-screen border-b ${gridLine}`}>
              <div
                className={`hidden xl:flex flex-col justify-end items-start text-left p-6 xl:pl-8 xl:py-2 xl:border-r ${gridLine}`}
              >
                <div className="hero-item opacity-0">
                  <h1 className="font-switzer text-6xl xl:text-8xl font-bold uppercase tracking-tighter text-[#121212] dark:text-[#EEEEEE] leading-[0.85] mb-4">
                    The
                    <br />
                    Projects
                  </h1>
                </div>
              </div>

              {/* === THE FIX IS HERE: The City Image replacing the empty noise box === */}
              <div
                className={`relative overflow-hidden w-full h-[60vh] md:h-full xl:border-r border-b xl:border-b-0 ${gridLine} bg-[#0a0a0a]`}
              >
                <div className="absolute top-6 left-6 z-20 xl:hidden pointer-events-none hero-item opacity-0 mix-blend-difference">
                  <h1 className="font-switzer text-[16vw] sm:text-7xl font-bold uppercase tracking-tighter text-white leading-[0.85]">
                    The
                    <br />
                    Projects
                  </h1>
                </div>

                <div className="hero-item opacity-0 relative w-full h-full grayscale contrast-125 group">
                  <Image
                    src="/city.jpg"
                    alt="City Architecture"
                    fill
                    className="object-cover opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                    priority
                  />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>

              <div
                className={`flex flex-col justify-start items-start text-left p-6 md:p-8 xl:p-12 pt-24 md:pt-28 xl:pt-32`}
              >
                <div className="hero-item opacity-0 flex flex-col gap-4 mt-0 xl:mt-4">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#666]">
                    INDEX_
                  </span>
                  <p className="font-switzer text-xl md:text-2xl leading-tight text-[#121212] dark:text-[#EEEEEE] max-w-137.5">
                    A complete archive of engineered interfaces, experimental
                    architecture, and past builds.
                  </p>
                </div>
              </div>
            </div>

            {/* =========================================
                ROW 2: THE STICKY STACK ARCHIVE
            ========================================= */}
            <div className={`scroll-row ${masterGrid} border-b ${gridLine}`}>
              <div
                className={`editorial-item opacity-0 hidden xl:flex flex-col justify-start items-end text-right p-6 xl:p-8 xl:border-r ${gridLine}`}
              >
                <div className="flex flex-col gap-2 mt-12 sticky top-32">
                  <span className="font-mono text-[10px] text-[#666]">
                    (01)
                  </span>
                  <h2 className="font-switzer text-lg font-bold tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase">
                    Archive
                  </h2>
                </div>
              </div>

              <div
                className={`editorial-item opacity-0 p-6 md:p-8 xl:p-12 xl:border-r ${gridLine}`}
              >
                <div className="w-full relative flex flex-col pt-12 pb-48">
                  {ARCHIVE_PROJECTS.map((project) => (
                    <div
                      key={project.id}
                      className="stack-card group sticky top-32 w-full mb-[40vh] last:mb-0 origin-top"
                      onMouseEnter={() => playSound("hover")}
                    >
                      <div className="w-full bg-[#111111] border border-white/10 group-hover:border-white/20 rounded-3xl p-8 flex flex-col shadow-2xl transition-colors duration-500">
                        <div className="flex justify-between items-center mb-12">
                          <span className="font-switzer text-sm font-medium text-[#EEEEEE]">
                            {project.id}
                          </span>
                          <span className="font-mono text-[11px] tracking-widest text-[#666666]">
                            {project.year}
                          </span>
                        </div>

                        <div className="flex flex-col mb-12">
                          <h2 className="font-switzer text-3xl md:text-4xl font-medium tracking-tight text-[#EEEEEE] mb-4">
                            {project.title}
                          </h2>
                          <p className="font-switzer text-base leading-relaxed text-[#888888] max-w-lg">
                            {project.description}
                          </p>
                        </div>

                        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mt-auto">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="font-switzer text-[11px] tracking-wide text-[#EEEEEE]/80 px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* THE MICRO-INTERACTION TRIGGER */}
                          <SignalThumbnail
                            src={project.image}
                            alt={project.title}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="editorial-item opacity-0 hidden xl:flex flex-col justify-start items-start p-6 xl:p-8">
                <div className="font-mono text-lg tracking-[0.3em] text-[#121212] dark:text-[#EEEEEE] opacity-20 mt-12 sticky top-32">
                  [ * ]
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
