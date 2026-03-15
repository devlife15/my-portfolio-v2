"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PodcastCard from "./library/PodcastCard";
import useSystemSound from "@/hooks/useSystemSound";

gsap.registerPlugin(ScrollTrigger);

const PodcastsSection = ({ sectionRef }) => {
  const { playSound } = useSystemSound();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal the master header
      gsap.fromTo(
        ".podcast-header",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // 2. Stagger the individual podcast cards
      gsap.fromTo(
        ".podcast-card-wrapper",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef || containerRef} className="w-full pb-15">
      {/* 1. The Architectural Header */}
      {/* 👇 Matches the exact layout, borders, and dual-theme colors of your other sections */}
      <div className="podcast-header flex items-baseline gap-3 mb-5 border-b border-black/10 dark:border-white/5 pb-6 transition-colors duration-300">
        <h2 className="font-switzer uppercase text-2xl md:text-2xl font-medium tracking-tight text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
          Listening
        </h2>
        <span className="font-mono text-xs text-[#666666] dark:text-[#555555] transition-colors duration-300">
          (08)
        </span>
      </div>

      {/* 2. The 3-Column Grid */}
      {/* 👇 Tightened the gaps slightly to match the Book grid proportions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        <div className="podcast-card-wrapper">
          <PodcastCard
            show="Syntax.fm"
            title="Should a New Coder Use AI"
            episode="978"
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/37/48/97/3748974f-e0ae-159f-d869-37e1a146b2ea/mza_6771083142990398129.jpeg/300x300bb.webp"
            link="https://syntax.fm/show/978/should-a-new-coder-use-ai"
            playSound={playSound}
          />
        </div>

        <div className="podcast-card-wrapper">
          <PodcastCard
            show="Lex Fridman"
            title="Sam Altman: OpenAI, GPT-5, and AGI"
            episode="367"
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/3e/e3/9c/3ee39c89-de08-47a6-7f3d-3849cef6d255/mza_16657851278549137484.png/300x300bb.webp"
            link="https://lexfridman.com/sam-altman-2"
            playSound={playSound}
          />
        </div>

        <div className="podcast-card-wrapper">
          <PodcastCard
            show="Decoder"
            title="Siemens CEO's Mission to Automate Everything"
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/35/2c/4e/352c4ee6-46db-7aff-4287-fc9b7cc3e1b6/mza_3811812518505699598.jpg/300x300bb.webp"
            link="https://podcasts.apple.com/in/podcast/siemens-ceos-mission-to-automate-everything/id1011668648?i=1000748886990"
            playSound={playSound}
          />
        </div>
      </div>
    </section>
  );
};

export default PodcastsSection;
