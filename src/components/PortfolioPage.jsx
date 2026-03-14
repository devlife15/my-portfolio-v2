"use client";

import { useState, useEffect } from "react";
import PreLoader from "../components/effects/PreLoader";
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const { isPlaying, togglePlay, nextTrack } = useLofi();

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTypingOpen, setIsTypingOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("portfolioBooted");
    if (hasBooted) {
      setIsLoading(false);
      setHasEntered(true);
    }
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    sessionStorage.setItem("portfolioBooted", "true");
  };

  return (
    <div className="min-h-screen text-[#888888] selection:bg-white/20 selection:text-white flex flex-col">
      {isLoading && <PreLoader onComplete={() => setIsLoading(false)} />}
      {!isLoading && !hasEntered && <BootScreen onEnter={handleEnter} />}

      {!isLoading && hasEntered && (
        <div className="w-full flex flex-col flex-grow">
          <div className="sticky top-0 z-50 w-full">
            <Navbar />
          </div>

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
                onTerminalClick={() => setIsTerminalOpen(true)}
                onTypingClick={() => setIsTypingOpen(true)}
                onArchiveClick={() => setIsArchiveOpen(true)}
              />
            </div>

            <main className="relative z-10 w-full px-6 xl:px-12 pb-10 flex flex-col border-x-0 xl:border-x border-black/3 dark:border-white/3">
              <HeroSection />
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
              <RightSidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
