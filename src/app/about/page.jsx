"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Navbar from "../../components/sections/Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TelemetryHUD from "@/components/TelemetryHUD";
import PhysicsTooling from "@/components/PhysicsTooling";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const layoutRef = useRef(null);

  useEffect(() => {
    if (layoutRef.current) {
      const ctx = gsap.context(() => {
        // --- 1. THE BOOT SEQUENCE ---
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(".page-wrapper", { opacity: 1, duration: 0.5 })
          .to(".navbar-wrapper", { opacity: 1, duration: 1 }, "-=0.2")
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

        // --- 2. THE SCROLL ENGINE ---
        const scrollRows = gsap.utils.toArray(".scroll-row");

        scrollRows.forEach((row) => {
          const items = row.querySelectorAll(".editorial-item");

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
        });
      }, layoutRef);

      gsap.fromTo(
        ".manifesto-text",
        { color: "#333333" },
        {
          color: "#EEEEEE",
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-container",
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          },
        },
      );

      // --- 5. THE PROCESS TIMELINE (Circuit Board) ---
      gsap.to(".process-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-container",
          start: "top 60%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      const processSteps = gsap.utils.toArray(".process-step");
      processSteps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.2, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.to(".ticker-track", {
        xPercent: -50,
        ease: "none",
        duration: 50,
        repeat: -1,
      });

      return () => ctx.revert();
    }
  }, []);

  const gridLine = "border-black/3 dark:border-white/3";
  const masterGrid =
    "w-full grid grid-cols-1 xl:grid-cols-[1fr_minmax(auto,672px)_1fr]";

  return (
    <div
      ref={layoutRef}
      className="min-h-screen text-[#888888] selection:bg-white/20 selection:text-white flex flex-col"
    >
      <div className="page-wrapper opacity-0 w-full flex flex-col flex-grow">
        <div className="navbar-wrapper opacity-0 sticky top-0 z-50 w-full">
          <Navbar />
        </div>

        <TelemetryHUD />

        <main className="relative z-10 w-full flex flex-col flex-grow pt-10">
          {/* =========================================
              ROW 1: THE FULL-VIEWPORT HERO GRID
          ========================================= */}
          <div
            className={`${masterGrid} min-h-[calc(100vh-40px)] border-b ${gridLine}`}
          >
            {/* 1. LEFT TRACK (Desktop Only) */}
            <div
              className={`hidden xl:flex flex-col justify-end items-start text-left p-6 xl:pl-8 xl:py-2 xl:border-r ${gridLine}`}
            >
              <div className="hero-item opacity-0">
                <h1 className="font-switzer text-6xl xl:text-8xl font-bold uppercase tracking-tighter text-[#121212] dark:text-[#EEEEEE] leading-[0.85] mb-4">
                  About
                  <br />
                  Me
                </h1>
              </div>
            </div>

            {/* 2. CENTER TRACK (Image + Mobile Overlap) */}
            <div
              className={`relative overflow-hidden w-full h-[60vh] md:h-full min-h-[50vh] xl:border-r border-b xl:border-b-0 ${gridLine}`}
            >
              {/* MOBILE ONLY: Overlapping 'About Me' Title (Inverted mix-blend) */}
              <div className="absolute top-6 left-6 z-20 xl:hidden pointer-events-none hero-item opacity-0 mix-blend-difference">
                <h1 className="font-switzer text-[16vw] sm:text-7xl font-bold uppercase tracking-tighter text-white leading-[0.85]">
                  About
                  <br />
                  Me
                </h1>
              </div>

              <div className="hero-item opacity-0 relative w-full h-full grayscale hover:grayscale-0 transition-[filter] duration-500 contrast-125">
                <Image
                  src="/Me.jpeg"
                  alt="Ayan Kumar Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* 3. RIGHT TRACK (TL;DR - Now visible on Mobile) */}
            <div
              className={`flex flex-col justify-start items-start text-left p-6 md:p-8 xl:p-12`}
            >
              <div className="hero-item opacity-0 flex flex-col gap-4 mt-0 xl:mt-4">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#666]">
                  TL;DR
                </span>
                <p className="font-switzer text-xl md:text-2xl leading-tight text-[#121212] dark:text-[#EEEEEE] max-w-137.5">
                  I am a multidisciplinary creative developer combining
                  engineering precision with modern visual systems. Currently
                  crafting brutalist, high-performance digital experiences.
                </p>
                <p className="font-switzer text-xl md:text-2xl leading-tight text-[#121212] dark:text-[#EEEEEE] max-w-137.5">
                  I am a multidisciplinary creative developer combining
                  engineering precision with modern visual systems. Currently
                  crafting brutalist, high-performance digital experiences.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================
              ROW 2: THE PERSPECTIVE
          ========================================= */}
          <div className={`scroll-row ${masterGrid} border-b ${gridLine}`}>
            <div
              className={`editorial-item opacity-0 hidden xl:flex flex-col justify-end items-end text-right p-6 xl:p-8 xl:border-r ${gridLine}`}
            >
              <div className="flex flex-col gap-2 mb-12">
                <span className="font-mono text-[10px] text-[#666]">(01)</span>
                <h2 className="font-switzer text-lg font-bold tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase">
                  Perspective
                </h2>
              </div>
            </div>

            {/* APPLIED: p-6 md:p-8 xl:p-12 */}
            <div
              className={`editorial-item opacity-0 p-6 md:p-8 xl:p-12 xl:border-r ${gridLine}`}
            >
              <p className="font-switzer text-xl md:text-2xl tracking-tight text-[#121212] dark:text-[#EEEEEE] leading-[1.1]">
                Coming from a self-taught, non-traditional background means my
                mind isn't boxed in by corporate dogmas or legacy workflows. I
                approach the browser as a blank canvas where engineering
                precision meets creative expression. <br />
                <br />I am driven by pure curiosity—obsessing over how a
                micro-interaction feels, how a layout scales, and how raw data
                can be shaped into an emotional experience.
              </p>
            </div>

            <div className="editorial-item opacity-0 hidden xl:flex flex-col justify-start items-start p-6 xl:p-8">
              <div className="font-mono text-lg tracking-[0.3em] text-[#121212] dark:text-[#EEEEEE] opacity-20 mt-12">
                [ * ]
              </div>
            </div>
          </div>

          {/* =========================================
              ROW 3: MECHANICS 
          ========================================= */}
          <div className={`scroll-row ${masterGrid} border-b ${gridLine}`}>
            <div
              className={`editorial-item opacity-0 hidden xl:flex flex-col justify-start items-end p-6 xl:p-8 xl:border-r ${gridLine}`}
            >
              <div className="font-mono text-lg tracking-[0.3em] text-[#121212] dark:text-[#EEEEEE] opacity-20 mt-12">
                [ * ]
              </div>
            </div>

            <div
              className={`editorial-item opacity-0 w-full grid grid-cols-1 md:grid-cols-2 xl:border-r ${gridLine}`}
            >
              {/* APPLIED: p-6 md:p-8 xl:p-12 */}
              <div
                className={`p-6 md:p-8 xl:p-12 md:border-r border-b md:border-b-0 border-black/3 dark:border-white/3`}
              >
                <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#666] block mb-6">
                  Every complex problem can be broken down into raw mechanics. I
                  don't rely on bloated templates. I dissect the challenge,
                  build custom logical systems from the ground up, and ensure
                  the foundation is mathematically sound before adding the
                  aesthetic layer.
                </p>
              </div>

              {/* APPLIED: p-6 md:p-8 xl:p-12 */}
              <div className="p-6 md:p-8 xl:p-12">
                <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#666] block mb-6">
                  Perfection is the enemy of progress. I believe in failing
                  fast, prototyping in the browser, and letting the interaction
                  dictate the next step. I solve problems by building, breaking,
                  and refining in real-time.
                </p>
              </div>
            </div>

            <div className="editorial-item opacity-0 hidden xl:flex flex-col justify-end items-start p-6 xl:p-8">
              <div className="flex flex-col gap-2 mb-12">
                <span className="font-mono text-[10px] text-[#666]">(02)</span>
                <h2 className="font-switzer text-lg font-bold tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase">
                  Mechanics
                </h2>
              </div>
            </div>
          </div>

          {/* =========================================
              ROW 4: THE ETHOS
          ========================================= */}
          <div className={`scroll-row ${masterGrid} border-b ${gridLine}`}>
            <div
              className={`editorial-item opacity-0 hidden xl:flex flex-col justify-start items-end text-right p-6 xl:p-8 xl:border-r ${gridLine}`}
            >
              <div className="flex flex-col gap-2 mt-12">
                <span className="font-mono text-[10px] text-[#666]">(03)</span>
                <h2 className="font-switzer text-lg font-bold tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase">
                  Ethos
                </h2>
              </div>
            </div>

            {/* APPLIED: p-6 md:p-8 xl:p-12 */}
            <div
              className={`editorial-item opacity-0 p-6 md:p-8 xl:p-12 xl:border-r ${gridLine}`}
            >
              <div className="font-switzer text-2xl md:text-3xl uppercase tracking-tight text-[#121212] dark:text-[#EEEEEE] leading-[1.1]">
                Zero ego.
                <br />
                Zero red tape.
                <br />
                Just direct communication
                <br />
                and relentless execution.
              </div>
              <p className="font-mono text-xs tracking-widest text-[#666] mt-8 uppercase">
                I treat every project as a partnership, not a transaction.
              </p>
            </div>

            <div className="editorial-item opacity-0 hidden xl:flex flex-col justify-start items-start p-6 xl:p-8">
              <div className="font-mono text-lg tracking-[0.3em] text-[#121212] dark:text-[#EEEEEE] opacity-20 mt-12">
                [ * ]
              </div>
            </div>
          </div>

          {/* =========================================
              ROW 5: PROCESS (Condensed Architecture)
          ========================================= */}
          <div className={`scroll-row ${masterGrid} border-b ${gridLine}`}>
            <div className={`hidden xl:block xl:border-r ${gridLine}`}></div>

            <div
              className={`relative process-container flex flex-col xl:border-r ${gridLine}`}
            >
              <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10"></div>
              <div className="process-line absolute left-6 md:left-10 top-0 bottom-0 w-px bg-[#121212] dark:bg-[#EEEEEE] origin-top scale-y-0 z-10"></div>

              {/* APPLIED: pr-6 md:pr-8 xl:pr-12 */}
              <div className="process-step relative flex flex-col justify-center py-12 md:py-16 pl-16 md:pl-24 pr-6 md:pr-8 xl:pr-12 overflow-hidden">
                <span className="absolute top-0 md:-top-4 -left-2 md:-left-4 text-[7rem] md:text-[10rem] font-switzer font-black text-black/5 dark:text-white/5 select-none -z-10 leading-none">
                  01
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase mb-4 block">
                  Observe
                </span>
                <p className="font-switzer text-base md:text-lg leading-relaxed text-[#121212] dark:text-[#EEEEEE] max-w-md">
                  Figure out the system, and more importantly, find exactly
                  where it breaks.
                </p>
              </div>

              <div className="process-step relative flex flex-col justify-center py-12 md:py-16 pl-16 md:pl-24 pr-6 md:pr-8 xl:pr-12 overflow-hidden">
                <span className="absolute top-0 md:-top-4 -left-2 md:-left-4 text-[7rem] md:text-[10rem] font-switzer font-black text-black/5 dark:text-white/5 select-none -z-10 leading-none">
                  02
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase mb-4 block">
                  Reduce
                </span>
                <p className="font-switzer text-base md:text-lg leading-relaxed text-[#121212] dark:text-[#EEEEEE] max-w-md">
                  Strip away the bloat. Break the problem down to its raw,
                  fundamental mechanics.
                </p>
              </div>

              <div className="process-step relative flex flex-col justify-center py-12 md:py-16 pl-16 md:pl-24 pr-6 md:pr-8 xl:pr-12 overflow-hidden">
                <span className="absolute top-0 md:-top-4 -left-2 md:-left-4 text-[7rem] md:text-[10rem] font-switzer font-black text-black/5 dark:text-white/5 select-none -z-10 leading-none">
                  03
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase mb-4 block">
                  Model
                </span>
                <p className="font-switzer text-base md:text-lg leading-relaxed text-[#121212] dark:text-[#EEEEEE] max-w-md">
                  Map the architecture. Translate the core idea into strict
                  logical structures before writing any piece of code.
                </p>
              </div>

              <div className="process-step relative flex flex-col justify-center py-12 md:py-16 pl-16 md:pl-24 pr-6 md:pr-8 xl:pr-12 overflow-hidden">
                <span className="absolute top-0 md:-top-4 -left-2 md:-left-4 text-[7rem] md:text-[10rem] font-switzer font-black text-black/5 dark:text-white/5 select-none -z-10 leading-none">
                  04
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase mb-4 block">
                  Prototype
                </span>
                <p className="font-switzer text-base md:text-lg leading-relaxed text-[#121212] dark:text-[#EEEEEE] max-w-md">
                  Wire the logic. Build the end-to-end pipeline as fast as
                  possible to see if the architecture actually survives contact
                  with real data.
                </p>
              </div>

              <div className="process-step relative flex flex-col justify-center py-12 md:py-16 pl-16 md:pl-24 pr-6 md:pr-8 xl:pr-12 overflow-hidden">
                <span className="absolute top-0 md:-top-4 -left-2 md:-left-4 text-[7rem] md:text-[10rem] font-switzer font-black text-black/5 dark:text-white/5 select-none -z-10 leading-none">
                  05
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase mb-4 block">
                  Refine
                </span>
                <p className="font-switzer text-base md:text-lg leading-relaxed text-[#121212] dark:text-[#EEEEEE] max-w-md">
                  Make the system stable. Fix performance issues, smooth out the
                  data flow, and handle edge cases. Once everything runs
                  reliably, polish the interface.
                </p>
              </div>
            </div>

            <div className="editorial-item opacity-0 hidden xl:flex flex-col justify-start items-start p-6 xl:p-8">
              <div className="flex flex-col gap-2 mt-12 sticky top-40">
                <span className="font-mono text-[10px] text-[#666]">(04)</span>
                <h2 className="font-switzer text-lg font-bold tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase">
                  Process
                </h2>
              </div>
            </div>
          </div>

          {/* =========================================
              ROW 6: THE STACK (Physics Playground)
          ========================================= */}
          <div className={`scroll-row ${masterGrid} border-b ${gridLine}`}>
            <div
              className={`editorial-item opacity-0 hidden xl:flex flex-col justify-start items-end text-right p-6 xl:p-8 xl:border-r ${gridLine}`}
            >
              <div className="flex flex-col gap-2 mt-4">
                <span className="font-mono text-[10px] text-[#666]">(05)</span>
                <h2 className="font-switzer text-xs font-bold tracking-[0.2em] text-[#111111] dark:text-[#EEEEEE] uppercase">
                  Tooling
                </h2>
              </div>
            </div>

            <div
              className={`editorial-item opacity-0 flex flex-col xl:border-r ${gridLine}`}
            >
              <PhysicsTooling />
            </div>

            <div className="hidden xl:block"></div>
          </div>

          {/* =========================================
              ROW 7: THE LOCALHOST (The Monolithic Manifesto)
          ========================================= */}
          <div className={`scroll-row ${masterGrid} border-b ${gridLine}`}>
            <div className={`hidden xl:block xl:border-r ${gridLine}`}></div>

            {/* APPLIED: p-6 md:p-12 xl:p-16 (Monolith Cell) */}
            <div
              className={`editorial-item opacity-0 flex flex-col justify-center p-6 md:p-12 xl:p-16 xl:border-r ${gridLine}`}
            >
              <p className="group font-switzer text-xl md:text-2xl lg:text-3xl font-medium leading-[1.3] md:leading-[1.2] tracking-tight text-[#121212] dark:text-[#EEEEEE] transition-colors duration-500 hover:text-black/10 dark:hover:text-white/10 cursor-crosshair">
                A computer science degree proves the theory, but production
                requires reps. To bridge that gap, this localhost serves as a
                live testing ground for architecting
                <span className="transition-colors duration-500 group-hover:text-[#121212] dark:group-hover:text-[#EEEEEE]">
                  {" "}
                  [ SCALABLE MICROSERVICES ]{" "}
                </span>
                and reverse-engineering complex
                <span className="transition-colors duration-500 group-hover:text-[#121212] dark:group-hover:text-[#EEEEEE]">
                  {" "}
                  [ REACT STATE TREES ]
                </span>
                . I am actively preparing for the engineering floor by
                aggressively optimizing
                <span className="transition-colors duration-500 group-hover:text-[#121212] dark:group-hover:text-[#EEEEEE]">
                  {" "}
                  [ DATABASE LATENCY ]{" "}
                </span>
                and mastering
                <span className="transition-colors duration-500 group-hover:text-[#121212] dark:group-hover:text-[#EEEEEE]">
                  {" "}
                  [ ALGORITHMIC EFFICIENCY ]
                </span>
                . I learn by breaking systems in the dark.
              </p>
            </div>

            <div className="editorial-item opacity-0 hidden xl:flex flex-col justify-start items-start p-6 xl:p-8">
              <div className="flex flex-col gap-2 mt-4">
                <span className="font-mono text-[10px] text-[#666]">(06)</span>
                <h2 className="font-switzer text-lg font-bold tracking-[0.2em] text-[#121212] dark:text-[#EEEEEE] uppercase">
                  Localhost
                </h2>
              </div>
            </div>
          </div>

          {/* =========================================
              ROW 8: VISUAL BREAKER (Telemetry Grid)
          ========================================= */}
          <div className={`scroll-row ${masterGrid} border-b ${gridLine}`}>
            <div
              className={`editorial-item opacity-0 hidden xl:flex flex-col justify-end items-end p-6 xl:p-8 xl:border-r ${gridLine}`}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#666] text-right">
                [ SYS_INFO ]<br />
                TELEMETRY
              </span>
            </div>

            <div
              className={`editorial-item opacity-0 w-full grid grid-cols-2 md:grid-cols-4 xl:border-r ${gridLine}`}
            >
              {/* APPLIED: p-6 md:p-8 xl:p-12 across all cells */}
              <div className="p-6 md:p-8 xl:p-12 border-b md:border-b-0 md:border-r border-black/3 dark:border-white/3 flex flex-col justify-between gap-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#666]">
                  LOC
                </span>
                <span className="font-mono text-xs text-[#121212] dark:text-[#EEEEEE]">
                  PURULIA, IN
                  <br />
                  23.33°N 86.36°E
                </span>
              </div>

              <div className="p-6 md:p-8 xl:p-12 border-b md:border-b-0 md:border-r border-black/3 dark:border-white/3 flex flex-col justify-between gap-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#666]">
                  TIME_ZONE
                </span>
                <span className="font-mono text-xs text-[#121212] dark:text-[#EEEEEE]">
                  IST (UTC +5:30)
                  <br />
                  SYNCED
                </span>
              </div>

              <div className="p-6 md:p-8 xl:p-12 border-b md:border-b-0 md:border-r border-black/3 dark:border-white/3 flex flex-col justify-between gap-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#666]">
                  STATUS
                </span>
                <span className="font-mono text-xs text-[#121212] dark:text-[#EEEEEE] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse"></span>
                  NOMINAL
                </span>
              </div>

              <div className="p-6 md:p-8 xl:p-12 flex flex-col justify-between gap-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#666]">
                  AVAILABILITY
                </span>
                <span className="font-mono text-xs text-[#121212] dark:text-[#EEEEEE]">
                  OPEN FOR
                  <br />
                  NEW INQUIRIES
                </span>
              </div>
            </div>

            <div className="hidden xl:block"></div>
          </div>

          {/* =========================================
              ROW 9: THE FULL-BLEED TICKER
          ========================================= */}
          <div className={`scroll-row w-full border-b ${gridLine}`}>
            <a
              href="mailto:your@email.com"
              className={`editorial-item opacity-0 block w-full relative overflow-hidden bg-[#121212] text-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#121212] hover:opacity-80 transition-opacity duration-300`}
            >
              <div className="ticker-track flex w-max whitespace-nowrap items-center py-16 md:py-24">
                <div className="flex shrink-0 items-center gap-8 md:gap-16 pr-8 md:pr-16">
                  <h2 className="font-switzer text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none">
                    Let's Make Something Together
                  </h2>
                  <span className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-current opacity-30"></span>
                  <h2 className="font-switzer text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none">
                    Available For New Projects
                  </h2>
                  <span className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-current opacity-30"></span>
                </div>

                <div className="flex shrink-0 items-center gap-8 md:gap-16 pr-8 md:pr-16">
                  <h2 className="font-switzer text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none">
                    Let's Make Something Together
                  </h2>
                  <span className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-current opacity-30"></span>
                  <h2 className="font-switzer text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none">
                    Available For New Projects
                  </h2>
                  <span className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-current opacity-30"></span>
                </div>
              </div>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutPage;
