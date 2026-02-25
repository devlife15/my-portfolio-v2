"use client";

import { useEffect } from "react";
import HolographicKeyboard from "./HolographicKeyboard";
import useTypingEngine from "@/hooks/useTypingEngine";
import { typingSnippets } from "@/data/typingSnippets";

export default function TypingTest() {
  const snippet = typingSnippets[0];

  const { typed, activeKey, status, wpm, accuracy, reset } = useTypingEngine(
    snippet.code,
  );

  // Automatically focus the window for typing so they don't have to click
  useEffect(() => {
    const handleFocus = () => window.focus();
    window.addEventListener("click", handleFocus);
    return () => window.removeEventListener("click", handleFocus);
  }, []);

  return (
    <div className="flex flex-col h-full gap-8 max-w-5xl mx-auto relative z-20">
      {/* 1. THE CODE DISPLAY */}
      <div className="p-6 bg-black/40 border border-white/5 rounded-xl font-mono text-sm md:text-lg leading-relaxed shadow-inner">
        <div className="mb-4 text-xs text-[#666] uppercase tracking-widest flex justify-between border-b border-white/5 pb-2">
          <span>
            {snippet.language} // {snippet.title}
          </span>
          <button
            onClick={reset}
            className="hover:text-green-400 transition-colors"
          >
            [ RESET_ENGINE ]
          </button>
        </div>

        <div className="flex flex-wrap break-all">
          {snippet.code.split("").map((char, index) => {
            let color = "text-[#444]";
            let bg = "";
            if (index < typed.length) {
              color =
                typed[index] === char
                  ? "text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                  : "text-red-500";
              bg = typed[index] !== char ? "bg-red-500/20" : "";
            }
            return (
              <span
                key={index}
                className={`${color} ${bg} transition-colors duration-75`}
              >
                {char}
              </span>
            );
          })}

          {/* Blinking Cursor */}
          {status !== "completed" && (
            <span className="w-2.5 h-5 bg-green-500 animate-pulse ml-0.5 mt-1 rounded-sm" />
          )}
        </div>
      </div>

      {/* 2. THE KEYBOARD */}
      <div className="mt-auto">
        <HolographicKeyboard
          activeKey={activeKey}
          wpm={wpm}
          accuracy={accuracy}
          status={status}
        />
      </div>
    </div>
  );
}
