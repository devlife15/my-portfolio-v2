"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiMove } from "react-icons/fi";
import RelicBox from "./RelicBox";
import { retroRelics } from "@/data/retroRelics";
import useSystemSound from "@/hooks/useSystemSound";
import useScrollLock from "@/hooks/useScrollLock";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pure function – compute CSS transform string for a cover-flow item. */
const getRelicTransform = (offset) => {
  if (offset === 0) return "translateX(0px) translateZ(0px) rotateY(0deg)";
  const dir = Math.sign(offset);
  const abs = Math.abs(offset);
  return `translateX(calc(${dir * (abs * 120 + 100)}px + ${dir * 5}vw)) translateZ(-${abs * 100}px) rotateY(${-dir * 60}deg)`;
};

const RELIC_COUNT = retroRelics.length;

// ---------------------------------------------------------------------------
// DraggablePolaroid
// ---------------------------------------------------------------------------

/**
 * Wrapped in React.memo so it only re-renders when its own props change.
 * The `bringToFront` callback must be stable (useCallback in parent).
 */
const DraggablePolaroid = memo(({ src, index, bringToFront }) => {
  const [rotation] = useState(() => Math.random() * 16 - 8);

  // SSR-safe: start with a placeholder, correct in useEffect.
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setPos({
      x: isMobile ? 20 + index * 20 : 450 + index * 40,
      y: isMobile ? 20 + index * 20 : 60 + index * 40,
    });
    setMounted(true);
  }, [index]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(index);

  const handlePointerDown = useCallback(
    (e) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      bringToFront((newZ) => setZIndex(newZ));
      setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    },
    [bringToFront, pos.x, pos.y],
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    },
    [isDragging, dragOffset.x, dragOffset.y],
  );

  const handlePointerUp = useCallback((e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  // Don't render until client position is resolved to avoid a flash.
  if (!mounted) return null;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`absolute cursor-grab active:cursor-grabbing p-2 sm:p-3 bg-white border border-[#dfdfdf] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-transform duration-75 select-none rounded-sm ${
        isDragging ? "scale-105 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)]" : ""
      }`}
      style={{
        left: pos.x,
        top: pos.y,
        zIndex,
        transform: `rotate(${isDragging ? 0 : rotation}deg)`,
        touchAction: "none",
        // Promote to its own compositor layer – eliminates layout recalc during drag.
        willChange: "transform",
      }}
    >
      <div className="w-48 h-36 sm:w-64 sm:h-48 md:w-80 md:h-60 bg-[#111] overflow-hidden pointer-events-none rounded-sm">
        <img
          src={src}
          alt="Memory"
          className="w-full h-full object-cover opacity-90"
          draggable={false}
          // Images that are not in the initial viewport should load lazily.
          loading="lazy"
        />
      </div>
      <div className="h-8 sm:h-12 flex items-end justify-center pb-1 sm:pb-2 pointer-events-none">
        <FiMove className="text-[#aaa]" size={16} />
      </div>
    </div>
  );
});

DraggablePolaroid.displayName = "DraggablePolaroid";

// ---------------------------------------------------------------------------
// CoverFlowModal
// ---------------------------------------------------------------------------

const CoverFlowModal = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeReadMe, setActiveReadMe] = useState(null);

  // Highest z-index counter for the draggable canvas images.
  const [canvasZIndex, setCanvasZIndex] = useState(10);

  const { playSound } = useSystemSound();

  const [touchStartX, setTouchStartX] = useState(null);
  const minSwipeDistance = 50;

  // Ref to track the close-animation timer so it can be cleared on unmount.
  const closeTimerRef = useRef();

  useScrollLock(isOpen);

  // ---------------------------------------------------------------------------
  // Stable callbacks
  // ---------------------------------------------------------------------------

  const handleNext = useCallback(() => {
    playSound("memoryswipe");
    setActiveIndex((prev) => Math.min(prev + 1, RELIC_COUNT - 1));
  }, [playSound]);

  const handlePrev = useCallback(() => {
    playSound("memoryswipe");
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, [playSound]);

  /**
   * Stable handleClose – wrapped in useCallback so it can safely appear in
   * handleKeyDown's dependency array without causing stale closures.
   */
  const handleClose = useCallback(() => {
    playSound("terminalclose");
    onClose();
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveIndex(0);
      setActiveReadMe(null);
    }, 400);
  }, [onClose, playSound]);

  /**
   * Stable bringToFront – passed to every DraggablePolaroid.
   * Because it's stable, React.memo on DraggablePolaroid actually works.
   */
  const bringToFront = useCallback(
    (callback) => {
      setCanvasZIndex((prev) => {
        const next = prev + 1;
        callback(next);
        return next;
      });
    },
    [], // no dependencies – only touches setState
  );

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      if (activeReadMe) {
        if (e.key === "Escape") {
          playSound("terminalclose");
          setActiveReadMe(null);
        }
        return;
      }

      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") handleClose();
    },
    [isOpen, handleNext, handlePrev, activeReadMe, playSound, handleClose],
  );

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      playSound("openmemory");
    } else {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => setIsRendered(false), 400);
    }
    // Cleanup if component unmounts mid-animation.
    return () => clearTimeout(closeTimerRef.current);
  }, [isOpen, playSound]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Unmount cleanup – clear any pending timers.
  useEffect(() => {
    return () => clearTimeout(closeTimerRef.current);
  }, []);

  // ---------------------------------------------------------------------------
  // Touch handlers
  // ---------------------------------------------------------------------------

  const onTouchStart = useCallback(
    (e) => {
      // Don't hijack touch events when the canvas overlay is open – that would
      // interfere with polaroid dragging on mobile.
      if (activeReadMe) return;
      setTouchStartX(e.targetTouches[0].clientX);
    },
    [activeReadMe],
  );

  const onTouchEndHandler = useCallback(
    (e) => {
      if (touchStartX === null || activeReadMe) return;

      const touchEndX = e.changedTouches[0].clientX;
      const distance = touchStartX - touchEndX;

      if (distance > minSwipeDistance) handleNext();
      if (distance < -minSwipeDistance) handlePrev();

      setTouchStartX(null);
    },
    [touchStartX, activeReadMe, handleNext, handlePrev],
  );

  // ---------------------------------------------------------------------------
  // Early return (after all hooks)
  // ---------------------------------------------------------------------------

  if (!isRendered) return null;

  // Warn in development if a relic is missing its images array.
  if (
    process.env.NODE_ENV === "development" &&
    activeReadMe &&
    !activeReadMe.images?.length
  ) {
    console.warn(
      `[CoverFlowModal] relic "${activeReadMe.id}" has no images array – falling back to placeholder URLs.`,
    );
  }

  const canvasImages = activeReadMe?.images?.length
    ? activeReadMe.images
    : [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
      ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 bg-black/95 backdrop-blur-xl ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 w-full h-16 border-b border-white/5 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-4 md:px-8 z-50 pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] md:text-[14px] font-mono text-amber-500/80 uppercase tracking-[0.3em]">
            <span className="animate-pulse">●</span>
            <span className="hidden md:inline">
              THE REASON WHY I FELL IN LOVE WITH COMPUTERS & TECH IN THE FIRST
              PLACE
            </span>
            <span className="md:hidden">SYS_ARCHIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <div className="hidden md:flex gap-4 text-[12px] md:text-[14px] font-mono text-white/50 tracking-widest uppercase">
            <span>[ ← ] PREV</span>
            <span>[ → ] NEXT</span>
            <span>[ CLICK ] EXAMINE</span>
          </div>
          <button
            onClick={handleClose}
            className="text-[#666] hover:text-white transition-colors p-2"
          >
            <FiX size={24} />
          </button>
        </div>
      </div>

      {/* ── Cover Flow ── */}
      <div
        className="relative w-full max-w-[100vw] h-[60vh] flex items-center justify-center [perspective:1200px] overflow-hidden mt-8 md:mt-12 touch-action-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEndHandler}
      >
        {retroRelics.map((relic, index) => {
          const offset = index - activeIndex;
          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          return (
            <div
              key={relic.id}
              className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                !isCenter ? "max-md:opacity-0 max-md:pointer-events-none" : ""
              }`}
              style={{
                // Use the pure helper – no inline object creation on every render.
                transform: getRelicTransform(offset),
                zIndex: RELIC_COUNT - absOffset,
                opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.15,
                pointerEvents: absOffset > 3 ? "none" : "auto",
              }}
            >
              <div className="relative">
                {!isCenter && (
                  <div
                    className="absolute inset-0 z-50 cursor-pointer hidden md:block"
                    onClick={() => setActiveIndex(index)}
                  />
                )}

                <div
                  className={`transition-all duration-500 ${
                    !isCenter
                      ? "brightness-50 blur-[2px]"
                      : "shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  <RelicBox
                    relic={relic}
                    onClick={() => {
                      if (isCenter) {
                        playSound("memoryclick");
                        setActiveReadMe(relic);
                        setCanvasZIndex(10); // Reset z-index counter for new canvas.
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile prev/next controls ── */}
      <div className="md:hidden flex items-center justify-center gap-8 mt-4 z-40">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
        >
          <FiChevronLeft size={24} />
        </button>
        <span className="text-[10px] font-mono text-[#666] tracking-[0.2em]">
          {activeIndex + 1} / {RELIC_COUNT}
        </span>
        <button
          onClick={handleNext}
          disabled={activeIndex === RELIC_COUNT - 1}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* ── Bottom title / meta ── */}
      <div className="absolute bottom-8 md:bottom-12 w-full max-w-2xl text-center px-6 transition-all duration-300 z-10 pointer-events-none">
        <h2 className="text-xl md:text-3xl font-pixel-circle font-bold text-white mb-2 drop-shadow-lg leading-tight">
          {retroRelics[activeIndex]?.title}
        </h2>
        <div className="flex items-center justify-center gap-3 md:gap-4 text-[10px] md:text-xs font-mono tracking-widest uppercase text-[#888]">
          <span className="text-amber-500/80">
            CLASS: {retroRelics[activeIndex]?.category}
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">
            YEAR: {retroRelics[activeIndex]?.year}
          </span>
        </div>
      </div>

      {/* ── Spatial Floating Canvas Overlay ── */}
      {activeReadMe && (
        <div className="absolute inset-0 z-100 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-md transition-all duration-300">
          {/* Click background to close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => {
              playSound("terminalclose");
              setActiveReadMe(null);
            }}
          />

          {/* Floating Modal Container */}
          <div className="relative w-full max-w-6xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:block">
            {/* Minimalist Dot Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-size-[24px_24px]" />

            {/* Top Right Close Button */}
            <button
              onClick={() => {
                playSound("terminalclose");
                setActiveReadMe(null);
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-200 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white backdrop-blur-md border border-white/10 transition-all shadow-lg"
            >
              <FiX size={20} />
            </button>

            {/* 1. Story Card */}
            <div className="md:absolute top-6 left-6 bottom-6 md:w-95 lg:w-112.5 h-[40vh] md:h-auto bg-[#050505]/80 backdrop-blur-2xl border-b md:border border-white/10 md:rounded-2xl flex flex-col z-150 shadow-2xl">
              <div className="px-6 py-5 border-b border-white/5 shrink-0">
                <span className="text-[10px] font-mono text-blue-400 tracking-[0.2em] uppercase mb-1 block drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                  [LOG_FILE: {activeReadMe.id}]
                </span>
                <h2 className="text-xl md:text-2xl font-bold font-pixel-square text-white tracking-wide">
                  {activeReadMe.title}
                </h2>
              </div>

              <div
                className="flex-1 overflow-y-auto custom-scrollbar p-6"
                data-lenis-prevent
              >
                <p className="text-[#a0a0a0] font-sans text-sm md:text-base leading-relaxed md:leading-loose whitespace-pre-wrap font-light">
                  {activeReadMe.memory}
                </p>
              </div>

              {/* Meta Footer */}
              <div className="px-6 py-4 border-t border-white/5 shrink-0 text-[10px] font-mono text-white/30 uppercase flex justify-between">
                <span>CLASS: {activeReadMe.category}</span>
                <span>YEAR: {activeReadMe.year}</span>
              </div>
            </div>

            {/* 2. Freeform Image Canvas */}
            <div className="flex-1 relative md:absolute md:inset-0 overflow-hidden z-100">
              {/* "Drag Me" Watermark */}
              <div className="absolute inset-0 flex items-center justify-center md:pl-112.5 pointer-events-none z-0 select-none">
                <div className="flex flex-col items-center text-white/20 transform -rotate-6 transition-opacity duration-1000">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-3 opacity-70"
                  >
                    <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M9 19l3 3 3-3M2 12h20M12 2v20" />
                  </svg>
                  <span className="text-3xl md:text-5xl font-serif italic tracking-wider mb-2 drop-shadow-sm">
                    Grab & Drag
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-60">
                    To Explore Memories
                  </span>
                </div>
              </div>

              {/* Draggable Polaroids */}
              {canvasImages.map((src, idx) => (
                <DraggablePolaroid
                  key={idx}
                  src={src}
                  index={idx}
                  bringToFront={bringToFront}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverFlowModal;
