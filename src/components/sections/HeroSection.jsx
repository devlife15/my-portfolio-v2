"use client";

import { useEffect, useRef, forwardRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../effects/MagneticButton";
import useSystemSound from "@/hooks/useSystemSound";
import ScrollIndicator from "@/components/effects/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = forwardRef(function HeroSection(_, ref) {
  const { playSound } = useSystemSound();

  // THE FIX 1: Create a dedicated local ref just for the bio
  const bioRef = useRef(null);

  const bioText =
    "I care deeply about writing clean code, building thoughtful user experiences, and continuously improving my craft. I'm currently seeking opportunities where I can contribute, learn fast, and build software that matters. If that sounds aligned with what you're creating, let's start a conversation.";

  const words = bioText.split(" ");

  useEffect(() => {
    // THE FIX 2: Scope the context strictly to the bioRef
    let ctx = gsap.context(() => {
      // THE FIX 3: Use gsap.to() instead of fromTo() to respect Tailwind's initial opacity-20
      gsap.to(".reveal-word", {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: bioRef.current,
          // As you scroll down, the bio moves UP.
          // Start highlighting when the bio's top hits 60% of the screen.
          // Finish when the bio's bottom hits 20% of the screen.
          start: "top 60%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    }, bioRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      // Parent fully controls this ref now, no conflicts
      ref={ref}
      className="relative w-full min-h-screen flex flex-col items-start justify-center pt-[5vh] pb-12"
    >
      <div className="hero-item relative w-16 h-16 rounded-2xl bg-black/5 dark:bg-[#121212] border border-black/3 dark:border-white/3 overflow-hidden mb-6 shadow-sm shrink-0 transition-all duration-300 ease-out hover:scale-110 hover:rotate-3">
        <Image
          src="/Me.png"
          alt="Ayan Kumar"
          fill
          sizes="64px"
          className="object-cover"
          priority
        />
      </div>

      <h1 className="hero-item font-switzer text-[clamp(20px,4vw,30px)] font-medium tracking-tight text-[#121212] dark:text-[#EEEEEE] mb-8 transition-colors duration-300">
        Hey, I'm Ayan Kumar.
      </h1>

      <div
        // Attach the local ref directly to the bio container
        ref={bioRef}
        className="hero-item font-switzer text-[clamp(16px,3vw,20px)] leading-[1.2] text-left mb-10"
      >
        <p className="flex flex-wrap justify-start gap-x-[0.25em] gap-y-[0.1em]">
          {words.map((word, index) => (
            <span
              key={index}
              // THE FIX 4: Put opacity-20 back so it is hardcoded to be dim on load
              className="reveal-word opacity-20 text-[#121212] dark:text-[#EEEEEE] transition-colors duration-300"
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="hero-item flex items-center justify-start gap-2 mb-8">
        <div className="relative flex h-1.5 w-1.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
        </div>
        <span className="font-switzer text-[13px] font-light text-[#757575] dark:text-[#888888] transition-colors duration-300">
          Available for work
        </span>
      </div>

      <div className="hero-item">
        <MagneticButton
          href="mailto:kumarayanatwork@email.com"
          onMouseEnter={() => playSound("hover")}
        >
          Get in touch
        </MagneticButton>
      </div>

      <ScrollIndicator />
    </section>
  );
});

export default HeroSection;
