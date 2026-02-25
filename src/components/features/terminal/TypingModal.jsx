"use client";

import React, { useEffect, useState } from "react";
import { FiX, FiWifi } from "react-icons/fi";
import useSystemSound from "@/hooks/useSystemSound";
import HolographicKeyboard from "../HolographicKeyboard";
import useTypingEngine from "@/hooks/useTypingEngine";
import { typingSnippets } from "@/data/typingSnippets";

const TypingModal = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);

  const { playSound } = useSystemSound();
  const snippet = typingSnippets[activeSnippetIndex];

  const { typed, activeKey, status, wpm, accuracy, reset } = useTypingEngine(
    snippet.code,
    isOpen,
  );

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      playSound("terminalopen");
      const handleFocus = () => window.focus();
      window.addEventListener("click", handleFocus);
      return () => window.removeEventListener("click", handleFocus);
    } else {
      setTimeout(() => setIsRendered(false), 300);
      reset();
    }
  }, [isOpen]);

  const handleClose = () => {
    playSound("terminalclose");
    onClose();
  };

  const renderedText = React.useMemo(() => {
    return snippet.code.split("").map((char, index) => {
      let color = "text-[#444]";
      let bg = "";
      const isSpace = char === " ";
      const displayChar = isSpace ? "␣" : char;

      if (index < typed.length) {
        color =
          typed[index] === char
            ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            : "text-red-500";
        bg = typed[index] !== char ? "bg-red-500/20" : "";
      } else if (isSpace) {
        color = "text-[#222]";
      }

      return (
        <span
          key={index}
          className={`${color} ${bg} transition-colors duration-75`}
        >
          {displayChar}
        </span>
      );
    });
  }, [typed, snippet.code]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen
          ? "opacity-100 backdrop-blur-sm"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div
        className={`relative w-full max-w-5xl flex flex-col transform transition-all duration-500 ease-out border border-white/10 rounded-lg overflow-hidden shadow-[0_0_50px_-10px_rgba(59,130,246,0.15)] ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-10 opacity-0"
        }`}
        style={{
          height: "min(700px, 85vh)",
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* HEADER */}
        <div className="h-9 shrink-0 bg-white/3 border-b border-white/5 flex items-center justify-between px-4 select-none">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-blue-500/80 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              TYPE_ENGINE_v2.0
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FiWifi size={12} className="text-gray-600" />
            <div className="w-px h-3 bg-white/10"></div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FiX size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative p-4 md:p-6 flex flex-col gap-4">
          <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-10"></div>

          <div className="relative z-20 p-4 md:p-5 bg-[#050505]/60 backdrop-blur-md rounded-xl border border-white/10 font-mono text-sm md:text-base leading-relaxed shadow-2xl flex-1 flex flex-col justify-center">
            <div className="mb-3 text-xs text-[#666] uppercase tracking-widest flex justify-between">
              <span>
                {snippet.language} // {snippet.title}
              </span>
              <button
                onClick={reset}
                className="hover:text-blue-400 transition-colors"
              >
                [ RESET_ENGINE ]
              </button>
            </div>

            <div className="flex flex-wrap break-all">
              {renderedText}
              {status !== "completed" && (
                <span className="w-2 h-4 md:h-5 bg-blue-500 animate-pulse ml-0.5 mt-0.5 rounded-sm" />
              )}
            </div>
          </div>

          <div className="relative z-20 shrink-0 mt-auto">
            <HolographicKeyboard
              activeKey={activeKey}
              wpm={wpm}
              accuracy={accuracy}
              status={status}
              snippets={typingSnippets}
              activeIndex={activeSnippetIndex}
              onSelectSnippet={(index) => {
                playSound("click");
                setActiveSnippetIndex(index);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingModal;
