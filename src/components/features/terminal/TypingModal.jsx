"use client";

import React, { useEffect, useState } from "react";
import { FiX, FiRefreshCcw } from "react-icons/fi";
import useSystemSound from "@/hooks/useSystemSound";
import useTypingEngine from "@/hooks/useTypingEngine";
import { typingSnippets } from "@/data/typingSnippets";

const TypingModal = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);

  const { playSound } = useSystemSound();
  const snippet = typingSnippets[activeSnippetIndex];

  const { typed, status, wpm, accuracy, reset } = useTypingEngine(
    snippet.code,
    isOpen,
  );

  // Focus locking mechanism
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      playSound("terminalopen");
    } else {
      setTimeout(() => setIsRendered(false), 300);
    }
  }, [isOpen, playSound]);

  // 2. Handles the Focus Listener and Reset logic
  useEffect(() => {
    if (isOpen) {
      const handleFocus = () => window.focus();
      window.addEventListener("click", handleFocus);
      return () => window.removeEventListener("click", handleFocus);
    } else {
      reset();
    }
    // We intentionally leave 'reset' out of the array so it doesn't fire on every keystroke
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    playSound("terminalclose");
    onClose();
  };

  const handleSnippetChange = (index) => {
    playSound("click");
    setActiveSnippetIndex(index);
    reset();
  };

  // 1. The Text Grid Rendering Engine
  const renderedText = React.useMemo(() => {
    return snippet.code.split("").map((char, index) => {
      const isCurrent = index === typed.length;
      const isTyped = index < typed.length;
      const isCorrect = isTyped && typed[index] === char;
      const isIncorrect = isTyped && typed[index] !== char;
      const isSpace = char === " ";

      // Base: Dim grey for untyped
      let colorClass = "text-[#555]";
      let bgClass = "";

      if (isCorrect) {
        // Bright white text with a faint glow for correctly typed letters
        colorClass =
          "text-[#e2e8f0] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]";
      } else if (isIncorrect) {
        // Red text and subtle red background for mistakes
        colorClass = "text-[#ff4a4a]";
        bgClass = isSpace ? "bg-[#ff4a4a]/30" : "bg-[#ff4a4a]/10";
      }

      // The Gliding Caret (Smooth vertical line attached to the current letter)
      const caretClass =
        isCurrent && status !== "completed"
          ? "relative after:content-[''] after:absolute after:left-0 after:top-[10%] after:bottom-[10%] after:w-[2px] after:bg-blue-500 after:animate-pulse after:shadow-[0_0_8px_rgba(59,130,246,0.8)]"
          : "";

      return (
        <span
          key={index}
          className={`${colorClass} ${bgClass} ${caretClass} transition-colors duration-100 relative`}
        >
          {/* We render a non-breaking space for actual spaces to maintain grid integrity */}
          {isSpace ? "\u00A0" : char}
        </span>
      );
    });
  }, [typed, snippet.code, status]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 bg-black/80 backdrop-blur-xl ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-5xl h-[70vh] flex flex-col items-center justify-center pointer-events-none">
        {/* 2. THE HUD (Fades out when typing starts!) */}
        <div
          className={`absolute top-0 w-full flex flex-col md:flex-row items-center justify-between px-8 transition-opacity duration-700 pointer-events-auto ${
            status === "typing" ? "opacity-10" : "opacity-100"
          }`}
        >
          {/* Snippet Selector */}
          <div className="flex gap-4 mb-4 md:mb-0 text-xs font-mono tracking-widest text-[#666]">
            {typingSnippets.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSnippetChange(idx)}
                className={`transition-colors uppercase ${
                  activeSnippetIndex === idx
                    ? "text-blue-400"
                    : "hover:text-[#aaa]"
                }`}
              >
                [{s.language}]
              </button>
            ))}
          </div>

          {/* Title & Close */}
          <div className="flex items-center gap-6">
            <span className="text-[12px] font-mono text-white uppercase tracking-[0.3em]">
              SYS_DIAGNOSTIC // {snippet.title}
            </span>
            <button
              onClick={handleClose}
              className="text-[#555] hover:text-white transition-colors p-2"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* 3. THE TEXT GRID (Center Stage) */}
        <div className="w-full max-w-4xl px-8 mt-12 mb-12 relative z-20">
          <div
            className="font-mono text-2xl md:text-3xl leading-relaxed md:leading-loose tracking-wide flex flex-wrap break-all select-none"
            style={{ wordBreak: "break-word" }}
          >
            {renderedText}
          </div>
        </div>

        {/* 4. THE LIVE STATS (Bottom HUD) */}
        <div
          className={`absolute bottom-0 w-full flex items-center justify-center gap-12 font-mono text-xl transition-opacity duration-700 pointer-events-auto ${
            status === "typing" ? "opacity-20" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#555] tracking-widest uppercase mb-1">
              WPM
            </span>
            <span
              className={`transition-colors ${status === "completed" ? "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "text-[#eee]"}`}
            >
              {wpm}
            </span>
          </div>

          <button
            onClick={() => {
              playSound("click");
              reset();
            }}
            className="text-[#444] hover:text-white transition-colors mt-4 p-3 rounded-full hover:bg-white/5 active:scale-90"
            title="Reset (Tab)"
          >
            <FiRefreshCcw size={20} />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#555] tracking-widest uppercase mb-1">
              ACC
            </span>
            <span
              className={`transition-colors ${status === "completed" ? "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "text-[#eee]"}`}
            >
              {accuracy}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingModal;
