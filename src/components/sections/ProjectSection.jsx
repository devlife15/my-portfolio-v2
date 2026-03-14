"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./project/ProjectCard";
import useSystemSound from "../../hooks/useSystemSound";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({ sectionRef }) => {
  const { playSound } = useSystemSound();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal the section header first
      gsap.fromTo(
        ".project-header",
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
          clearProps: "transform", // Always good practice to clean up transforms
        },
      );

      // 2. Stagger the project cards right after the header
      gsap.fromTo(
        ".project-card-wrapper",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          clearProps: "transform",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef || containerRef} className="w-full pb-15">
      {/* 1. THE HEADER FIX: Added 'opacity-0' so it mounts completely invisible */}
      <div className="project-header opacity-0 flex items-baseline gap-3 mb-5 border-b border-black/10 dark:border-white/5 pb-6 transition-colors duration-300">
        <h2 className="font-switzer uppercase text-2xl md:text-2xl font-medium tracking-tight text-[#111111] dark:text-[#EEEEEE] transition-colors duration-300">
          Featured Projects
        </h2>
        <span className="font-mono text-xs text-[#666666] dark:text-[#555555] transition-colors duration-300">
          (02)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {/* 2. THE CARD FIX: Added 'opacity-0' to every wrapper */}
        <div className="project-card-wrapper opacity-0 w-full">
          <ProjectCard
            title="Help Deskly"
            year="2026"
            src="/projects/1.jpg"
            playSound={playSound}
          />
        </div>

        <div className="project-card-wrapper opacity-0 w-full">
          <ProjectCard
            title="Pixel Talk"
            year="2025"
            src="/projects/2.jpg"
            playSound={playSound}
          />
        </div>

        <div className="project-card-wrapper opacity-0 w-full">
          <ProjectCard
            title="Eumlet Platform"
            year="2025"
            src="/projects/3.jpg"
            playSound={playSound}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
