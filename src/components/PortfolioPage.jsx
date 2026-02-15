"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PreLoader from "../components/effects/PreLoader";
import BootScreen from "./layout/BootScreen";
import Dock from "./features/Dock";
import { useLofi } from "../hooks/useLofi";
import TerminalModal from "./features/terminal/TerminalModal";
import HeroSection from "./sections/HeroSection";
import ProjectSection from "./sections/ProjectSection";
import TechStackSection from "./sections/TechStackSection";
import WorkExpSection from "./sections/WorkExpSection";
import BlogsSection from "./sections/BlogsSection";
import GithubSection from "./sections/GithubSection";
import BooksSection from "./sections/BooksSection";
import ArticleSection from "./sections/ArticleSection";
import PodcastsSection from "./sections/PodcastsSection";
import FooterSection from "./sections/FooterSection";

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const { isPlaying, togglePlay, nextTrack } = useLofi();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const techSectionRef = useRef(null);
  const writingsSectionRef = useRef(null);
  const activitySectionRef = useRef(null);
  const librarySectionRef = useRef(null);
  const bookmarksSectionRef = useRef(null);
  const podcastsSectionRef = useRef(null);
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    // 1. Safety check
    if (isLoading || !hasEntered) return;

    const ctx = gsap.context(() => {
      // Create the Master Timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // --- STEP 1: Hero Header ---
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )

        // --- STEP 2: About Text ---
        .fromTo(
          aboutRef.current?.querySelectorAll("p") || [],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.3", // Slight overlap with header
        )

        // --- STEP 3: Experience Cards (The Change) ---
        // We attach this directly to the timeline.
        // It will NOT start until Step 2 finishes.
        .fromTo(
          experienceRef.current?.querySelectorAll(".work-card") || [],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            force3D: true, // Keep the GPU fix!
            // 🚨 Notice: No scrollTrigger here! The timeline controls the timing now.
          },
          "-=0.1", // Starts 0.1s before the text finishes (smooth handoff)
        );

      // --- REMAINING SECTIONS (Keep these on ScrollTrigger) ---
      // These are further down the page, so they should wait for scrolling.

      // Helper function (unchanged)
      const scrollReveal = (element) => {
        if (!element) return;
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      };

      // Projects (Still needs ScrollTrigger as it's likely below the fold)
      gsap.fromTo(
        projectsSectionRef.current?.querySelectorAll(".project-card") || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // Initialize other sections
      scrollReveal(techSectionRef.current);
      scrollReveal(writingsSectionRef.current);
      scrollReveal(activitySectionRef.current);
      scrollReveal(librarySectionRef.current);
      scrollReveal(bookmarksSectionRef.current);
      scrollReveal(podcastsSectionRef.current);
      scrollReveal(footerRef.current);

      // Refresh positions to prevent jitter
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [isLoading, hasEntered]);

  return (
    <div className="min-h-screen text-[#888888] font-sans selection:bg-white/20 selection:text-white">
      {isLoading && <PreLoader onComplete={() => setIsLoading(false)} />}

      {!hasEntered && <BootScreen onEnter={() => setHasEntered(true)} />}

      {!isLoading && hasEntered && (
        <>
          <Dock onTerminalClick={() => setIsTerminalOpen(true)} />

          <TerminalModal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            musicState={{ isPlaying, togglePlay, nextTrack }}
          />

          <div className="relative z-10 max-w-160 mx-auto px-6 py-24 md:py-32 flex flex-col gap-15">
            <HeroSection ref={headerRef} aboutRef={aboutRef} />
            <WorkExpSection ref={experienceRef} />
            <ProjectSection ref={projectsSectionRef} />
            <TechStackSection ref={techSectionRef} />
            <GithubSection ref={activitySectionRef} />
            <BlogsSection ref={writingsSectionRef} />
            <BooksSection ref={librarySectionRef} />
            <ArticleSection ref={bookmarksSectionRef} />
            <PodcastsSection ref={podcastsSectionRef} />
            <FooterSection ref={footerRef} />
          </div>
        </>
      )}
    </div>
  );
};

export default PortfolioPage;
