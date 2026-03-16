"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
// THE FIX: Removed PreLoader import entirely
import BootScreen from "./layout/BootScreen";
import { useLofi } from "../hooks/useLofi";
import TerminalModal from "./features/terminal/TerminalModal";
import TypingModal from "./features/terminal/TypingModal";
import CoverFlowModal from "./features/CoverFlowModal";
import Navbar from "./sections/Navbar";
import LeftSidebar from "./sections/LeftSidebar";
import RightSidebar from "./sections/RightSidebar";
import HeroSection from "./sections/HeroSection";
import ProjectSection from "./sections/ProjectSection";
import TechStackSection from "./sections/TechStackSection";
import GithubSection from "./sections/GithubSection";
import BlogsSection from "./sections/BlogsSection";
import ArticleSection from "./sections/ArticleSection";
import BooksSection from "./sections/BooksSection";
import PodcastsSection from "./sections/PodcastsSection";
import FooterSection from "./sections/FooterSection";

const PortfolioPage = () => {
  // THE FIX: Removed isLoading state completely. We only care if they have booted.
  const [hasEntered, setHasEntered] = useState(false);
  const { isPlaying, togglePlay, nextTrack } = useLofi();

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTypingOpen, setIsTypingOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const navbarRef = useRef(null);
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("portfolioBooted");
    if (hasBooted) {
      setHasEntered(true);
    }
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    sessionStorage.setItem("portfolioBooted", "true");
  };

  useEffect(() => {
    if (!hasEntered) return;

    const timer = setTimeout(() => {
      if (!navbarRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        navbarRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, clearProps: "transform" },
      )
        .fromTo(
          ".hero-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            clearProps: "transform",
          },
        )
        .fromTo(
          ".sidebar-item, .sidebar-item-right",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            clearProps: "transform",
          },
          "-=0.4",
        );
    }, 100);

    return () => clearTimeout(timer);
  }, [hasEntered]);

  return (
    <div className="min-h-screen text-[#888888] selection:bg-white/20 selection:text-white flex flex-col">
      {/* THE FIX: Replaced complex loading logic with a simple binary gate */}
      {!hasEntered && <BootScreen onEnter={handleEnter} />}

      {hasEntered && (
        <div className="w-full flex flex-col grow relative">
          <Navbar ref={navbarRef} />

          <TerminalModal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            musicState={{ isPlaying, togglePlay, nextTrack }}
          />
          <TypingModal
            isOpen={isTypingOpen}
            onClose={() => setIsTypingOpen(false)}
          />
          <CoverFlowModal
            isOpen={isArchiveOpen}
            onClose={() => setIsArchiveOpen(false)}
          />

          <div className="w-full min-h-screen grid grid-cols-1 xl:grid-cols-[1fr_minmax(auto,672px)_1fr]">
            <div className="hidden xl:block z-40">
              <LeftSidebar
                ref={leftSidebarRef}
                onTerminalClick={() => setIsTerminalOpen(true)}
                onTypingClick={() => setIsTypingOpen(true)}
                onArchiveClick={() => setIsArchiveOpen(true)}
              />
            </div>

            <main className="relative z-10 w-full px-6 xl:px-12 pb-10 flex flex-col border-x-0 xl:border-x border-black/3 dark:border-white/3">
              <HeroSection ref={heroRef} />
              <ProjectSection />
              <TechStackSection />
              <GithubSection />
              <BlogsSection />
              <BooksSection />
              <ArticleSection />
              <PodcastsSection />
              <FooterSection />
            </main>

            <div className="hidden xl:block z-40">
              <RightSidebar ref={rightSidebarRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
