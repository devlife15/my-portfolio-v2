"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import RelicBox from "./RelicBox"; // We will still use this for the main image
import { retroRelics } from "@/data/retroRelics";
import useSystemSound from "@/hooks/useSystemSound";
import useScrollLock from "@/hooks/useScrollLock";

// ---------------------------------------------------------------------------
// 1. HARDWARE CSS (CRT Glitch)
// ---------------------------------------------------------------------------
const ARCHIVE_STYLES = `
  @keyframes crt-hard-cut {
    0% { filter: contrast(400%) brightness(200%) hue-rotate(90deg) grayscale(100%); transform: scale(1.03) translate(4px, -2px); opacity: 0.8; }
    20% { filter: contrast(50%) brightness(50%) hue-rotate(-90deg) grayscale(0%); transform: scale(1.01) translate(-4px, 2px); opacity: 0.4; }
    40% { filter: contrast(200%) brightness(150%) hue-rotate(45deg) grayscale(50%); transform: scale(1.02) translate(2px, -1px); opacity: 0.9; }
    100% { filter: contrast(100%) brightness(100%) hue-rotate(0deg) grayscale(0%); transform: scale(1) translate(0, 0); opacity: 1; }
  }
  .animate-hard-cut {
    animation: crt-hard-cut 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  .surveillance-scanline {
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.03) 50%, rgba(255,255,255,0));
    background-size: 100% 6px;
  }
`;

const RELIC_COUNT = retroRelics.length;

// ---------------------------------------------------------------------------
// Main System Component
// ---------------------------------------------------------------------------
const CoverFlowModal = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeReadMe, setActiveReadMe] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { playSound } = useSystemSound();
  const [touchStartX, setTouchStartX] = useState(null);
  const minSwipeDistance = 50;
  const closeTimerRef = useRef();

  useScrollLock(isOpen);

  // ---------------------------------------------------------------------------
  // Navigation Logic
  // ---------------------------------------------------------------------------
  const handleNext = useCallback(() => {
    playSound("memoryswipe");
    setActiveIndex((prev) => Math.min(prev + 1, RELIC_COUNT - 1));
  }, [playSound]);

  const handlePrev = useCallback(() => {
    playSound("memoryswipe");
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, [playSound]);

  const handleClose = useCallback(() => {
    playSound("terminalclose");
    onClose();
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveIndex(0);
      setActiveReadMe(null);
      setActiveImageIndex(0);
    }, 400);
  }, [onClose, playSound]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      // If the Split-Screen Modal is open
      if (activeReadMe) {
        if (e.key === "Escape") {
          playSound("terminalclose");
          setActiveReadMe(null);
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          const totalImages = activeReadMe.images?.length || 2;
          setActiveImageIndex((prev) => Math.min(prev + 1, totalImages - 1));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          setActiveImageIndex((prev) => Math.max(prev - 1, 0));
        }
        // If they press enter, maybe close the readme? Or do nothing.
        return;
      }

      // If just the Scrubber is open
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") handleClose();
      else if (e.key === "Enter") {
        playSound("memoryclick");
        setActiveReadMe(retroRelics[activeIndex]);
        setActiveImageIndex(0);
      }
    },
    [
      isOpen,
      handleNext,
      handlePrev,
      activeReadMe,
      activeIndex,
      playSound,
      handleClose,
    ],
  );

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      playSound("openmemory");
    } else {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => setIsRendered(false), 400);
    }
    return () => clearTimeout(closeTimerRef.current);
  }, [isOpen, playSound]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const onTouchStart = useCallback((e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  }, []);

  const onTouchEndHandler = useCallback(
    (e) => {
      if (touchStartX === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const distance = touchStartX - touchEndX;

      if (activeReadMe) {
        const totalImages = activeReadMe.images?.length || 2;
        if (distance > minSwipeDistance)
          setActiveImageIndex((p) => Math.min(p + 1, totalImages - 1));
        if (distance < -minSwipeDistance)
          setActiveImageIndex((p) => Math.max(p - 1, 0));
      } else {
        if (distance > minSwipeDistance) handleNext();
        if (distance < -minSwipeDistance) handlePrev();
      }
      setTouchStartX(null);
    },
    [touchStartX, activeReadMe, handleNext, handlePrev],
  );

  if (!isRendered) return null;

  const activeRelic = retroRelics[activeIndex];
  const canvasImages = activeReadMe?.images?.length
    ? activeReadMe.images
    : [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
      ];

  return (
    <>
      <style>{ARCHIVE_STYLES}</style>
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 bg-[#050505]/95 backdrop-blur-xl ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Telemetry Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

        {/* ── Top Bar (Strict System UI) ── */}
        <div className="absolute top-0 left-0 w-full h-16 border-b border-white/5 bg-black/50 flex items-center justify-between px-4 md:px-8 z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] md:text-[12px] font-jetmono text-[#757575] uppercase tracking-widest">
              <span className="w-2 h-2 bg-[#121212] dark:bg-[#EEEEEE] rounded-full animate-pulse"></span>
              <span className="hidden md:inline">
                ROOT / SYS_ARCHIVE / CORE_MEMORIES
              </span>
              <span className="md:hidden">SYS_ARCHIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
            <div className="hidden md:flex gap-4 text-[10px] md:text-[12px] font-jetmono text-white/40 tracking-widest uppercase">
              <span>[ ←/→ ] SCRUB</span>
              <span>[ ENTER ] DECRYPT</span>
            </div>
            <button
              onClick={handleClose}
              className="text-[#666] hover:text-white transition-colors p-2"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* ── MAIN STAGE: The Active Relic ── */}
        <div
          className="relative w-full flex-grow flex flex-col items-center justify-center touch-action-none z-10"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEndHandler}
        >
          {/* ── THE TYPOGRAPHIC WATERMARK (Background Context) ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.04] mix-blend-screen">
            <h1 className="font-switzer text-[11vw] font-black uppercase tracking-tighter leading-[0.8] text-white whitespace-nowrap">
              The Reason I Fell In Love
            </h1>
            <h1 className="font-switzer text-[11vw] font-black uppercase tracking-tighter leading-[0.8] text-white whitespace-nowrap md:ml-32">
              With Computers & Tech
            </h1>
          </div>
          {/* Target Brackets around the item */}
          <div
            className="relative group cursor-pointer"
            onClick={() => {
              playSound("memoryclick");
              setActiveReadMe(activeRelic);
              setActiveImageIndex(0);
            }}
          >
            {/* Corner Brackets */}
            <div className="absolute -inset-6 md:-inset-10 border border-white/5 pointer-events-none transition-all duration-500 group-hover:border-white/20">
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-white/40 transition-all duration-500 group-hover:border-white"></div>
              <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-white/40 transition-all duration-500 group-hover:border-white"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-white/40 transition-all duration-500 group-hover:border-white"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-white/40 transition-all duration-500 group-hover:border-white"></div>
            </div>

            {/* The Image Viewer */}
            <div className="relative z-10">
              {/* React Key forces the component to remount and trigger the CRT Hard Cut animation */}
              <div key={activeIndex} className="animate-hard-cut">
                <RelicBox relic={activeRelic} onClick={() => {}} />
              </div>
            </div>

            {/* Floating 'Click to Examine' Prompt */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 font-jetmono text-[10px] tracking-widest text-white/30 uppercase transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
              [ Click To Decrypt Data ]
            </div>
          </div>

          {/* Title & Metadata above Scrubber */}
          <div className="absolute bottom-32 md:bottom-36 w-full text-center px-6 pointer-events-none">
            <h2
              key={`title-${activeIndex}`}
              className="text-2xl md:text-4xl font-switzer font-bold text-[#EEEEEE] mb-2 tracking-tight animate-hard-cut"
            >
              {activeRelic?.title}
            </h2>
            <div className="flex items-center justify-center gap-4 text-[10px] md:text-xs font-jetmono tracking-widest uppercase text-[#555]">
              <span className="text-[#121212] dark:text-[#757575]">
                CLASS: {activeRelic?.category}
              </span>
            </div>
          </div>
        </div>

        {/* ── THE SEISMIC SCRUBBER (Timeline) ── */}
        <div className="absolute bottom-12 w-full max-w-4xl px-8 z-20">
          <div className="relative w-full h-[1px] bg-white/10">
            {/* The Playhead (Moving vertical bar) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[2px] h-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-10"
              style={{ left: `${(activeIndex / (RELIC_COUNT - 1)) * 100}%` }}
            />

            {/* The Timeline Ticks */}
            {retroRelics.map((relic, index) => {
              const leftPos = `${(index / (RELIC_COUNT - 1)) * 100}%`;
              const isPastOrActive = index <= activeIndex;
              const isActive = index === activeIndex;

              return (
                <div
                  key={relic.id}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
                  style={{ left: leftPos }}
                  onClick={() => {
                    playSound("memoryswipe");
                    setActiveIndex(index);
                  }}
                >
                  {/* Tick Mark */}
                  <div
                    className={`w-[1px] transition-all duration-300 ${isActive ? "h-4 bg-white" : isPastOrActive ? "h-2 bg-white/40" : "h-2 bg-white/10 group-hover:bg-white/30 group-hover:h-3"}`}
                  ></div>

                  {/* Year Label */}
                  <span
                    className={`absolute top-6 font-jetmono text-[10px] tracking-wider transition-all duration-300 ${isActive ? "text-white font-bold" : "text-white/20 group-hover:text-white/50"}`}
                  >
                    {relic.year}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Buttons (Keep for touch accessibility) */}
          <div className="md:hidden w-full flex justify-between mt-12 px-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="p-2 bg-white/5 rounded-full text-white/50 disabled:opacity-20"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === RELIC_COUNT - 1}
              className="p-2 bg-white/5 rounded-full text-white/50 disabled:opacity-20"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* =========================================================
            THE ASYMMETRICAL DATA TERMINAL (40/60 Split)
            ========================================================= */}
        {activeReadMe && (
          <div
            className="absolute inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-8 lg:p-12 transition-opacity duration-500"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEndHandler}
            data-lenis-prevent
          >
            <div className="relative w-full max-w-[90rem] h-full max-h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

              <button
                onClick={() => {
                  playSound("terminalclose");
                  setActiveReadMe(null);
                }}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-[#0a0a0a] border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all shadow-lg"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* --- LEFT PANE (40%) --- */}
              <div className="relative z-10 w-full md:w-[40%] xl:w-[35%] h-[40vh] md:h-full border-b md:border-b-0 md:border-r border-white/5 bg-[#050505] flex flex-col pt-8 md:pt-12">
                <div className="px-8 md:px-12 shrink-0">
                  <div className="font-jetmono text-[10px] tracking-[0.2em] text-blue-400/80 uppercase mb-4 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                    [ LOG_FILE: {activeReadMe.id || "SYS_FILE"} ]
                  </div>
                  <h2 className="font-switzer text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#EEEEEE] mb-8 leading-[1.1]">
                    {activeReadMe.title}
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 pb-8">
                  <p className="font-switzer text-base md:text-lg text-[#888888] leading-relaxed whitespace-pre-wrap">
                    {activeReadMe.memory}
                  </p>
                </div>

                <div className="px-8 md:px-12 py-6 border-t border-white/5 bg-[#0a0a0a] shrink-0 font-jetmono text-[10px] tracking-[0.2em] text-[#555555] uppercase flex items-center justify-between">
                  <span>CLASS: {activeReadMe.category}</span>
                  <span>YEAR: {activeReadMe.year}</span>
                </div>
              </div>

              {/* --- RIGHT PANE (60%) --- */}
              <div className="relative z-10 w-full md:w-[60%] xl:w-[65%] h-[45vh] md:h-full bg-black flex flex-col md:flex-row">
                <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center p-4 md:p-8">
                  <div className="relative w-full h-full border border-white/10 rounded-lg overflow-hidden bg-[#050505] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                    <img
                      key={activeImageIndex}
                      src={
                        canvasImages[activeImageIndex]?.src ||
                        canvasImages[activeImageIndex]
                      }
                      alt="System Asset"
                      className="absolute inset-0 w-full h-full object-contain animate-hard-cut pointer-events-none"
                    />

                    <div className="surveillance-scanline absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"></div>

                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded font-jetmono text-[10px] tracking-widest text-[#EEEEEE]">
                      [ {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                      {String(canvasImages.length).padStart(2, "0")} ]
                    </div>
                    <div className="absolute top-4 left-4 font-jetmono text-[11px] tracking-widest text-red-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                      Image Viewer
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-28 lg:w-32 h-24 md:h-full border-t md:border-t-0 md:border-l border-white/5 bg-[#0a0a0a] flex md:flex-col overflow-x-auto md:overflow-y-auto custom-scrollbar p-4 gap-3 shrink-0">
                  {canvasImages.map((img, idx) => {
                    const isActive = idx === activeImageIndex;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 md:w-full md:h-20 shrink-0 cursor-pointer transition-all duration-300 ${
                          isActive
                            ? "opacity-100 grayscale-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            : "opacity-30 grayscale hover:opacity-60"
                        }`}
                      >
                        <img
                          src={img?.src || img}
                          alt={`Thumbnail ${idx}`}
                          className="w-full h-full object-cover rounded"
                          draggable={false}
                        />
                        {isActive && (
                          <div className="absolute inset-0 border border-white/20 rounded pointer-events-none">
                            <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-white"></div>
                            <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-white"></div>
                            <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-white"></div>
                            <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-white"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoverFlowModal;
