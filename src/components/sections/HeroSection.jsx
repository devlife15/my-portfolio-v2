"use client";

import ScrambleText from "../effects/ScrambleText";
import Tagline from "./about/Tagline";

const HeroSection = ({ ref, aboutRef }) => {
  return (
    <section ref={ref} className="flex flex-col gap-8" style={{ opacity: 0 }}>
      {" "}
      {/* Start invisible */}
      <div className="flex items-center justify-between w-full">
        {/* LEFT SIDE: Avatar + Name/Tagline */}
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-neutral-800 border border-white/5 overflow-hidden shadow-inner shrink-0">
            <img
              src="https://github.com/devlife15.png"
              alt="Ayan"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="flex flex-col">
            <ScrambleText
              text={"Ayan Kumar"}
              className="font-editorial text-[20px] italic text-[#EEEEEE] leading-tight"
            />
            <Tagline />
          </div>
        </div>

        {/* RIGHT SIDE: The Badge */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="hidden md:inline font-sans">Available for work</span>
          <span className="md:hidden font-sans">Available</span>{" "}
          {/* Optional: Shorten text on mobile */}
        </span>
      </div>
      <div
        ref={aboutRef}
        className="font-saans text-[16px] leading-[1.6] space-y-5 text-[#999999]"
      >
        <p>I'm a full-stack engineer based in Kolkata, India.</p>
        <p>
          I care deeply about writing clean code, building thoughtful user
          experiences, and continuously improving my craft.
        </p>
        <p>
          I’m currently seeking opportunities where I can contribute, learn
          fast, and build software that matters. If that sounds aligned with
          what you’re creating, let’s start a conversation.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
