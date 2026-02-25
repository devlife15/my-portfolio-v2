"use client";

import React from "react";

const KEYBOARD_ROWS = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BACK"],
  ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"],
  ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT"],
  ["CTRL", "WIN", "ALT", "SPACE", "ALT", "FN", "CTRL"],
];

function HolographicKeyboard({
  activeKey,
  wpm = 0,
  accuracy = 100,
  status = "IDLE",
  snippets = [], // 👇 NEW PROPS
  activeIndex = 0,
  onSelectSnippet = () => {},
}) {
  const getKeyWidth = (key) => {
    switch (key) {
      case "SPACE":
        return "w-[32%]";
      case "ENTER":
        return "w-[12%]";
      case "SHIFT":
        return "w-[14%]";
      case "BACK":
        return "w-[11%]";
      case "TAB":
        return "w-[9%]";
      case "CAPS":
        return "w-[10%]";
      default:
        return "flex-1";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-2 rounded-2xl bg-linear-to-b from-[#111] to-[#050505] border border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_rgba(255,255,255,0.05)] font-mono">
      {/* HUD CONTROL PANEL */}
      <div className="flex justify-between items-end px-4 py-3 mb-4 border-b border-[#222] bg-[url('/noise.png')]">
        {/* 👇 CHANGED: The Snippet Selector is now built directly into the chassis! */}
        <div className="flex flex-col gap-2">
          <div className="text-[#333] text-[9px] tracking-[0.2em] uppercase">
            TARGET_MODULE // OVERRIDE
          </div>
          <div className="flex gap-2">
            {snippets.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => onSelectSnippet(index)}
                  className={`px-3 py-1 rounded text-[9px] font-mono uppercase tracking-widest transition-all duration-300 border ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                      : "bg-black/50 text-[#666] border-[#333] hover:text-[#aaa] hover:bg-[#111]"
                  }`}
                >
                  {item.language}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="flex gap-6 text-[10px] tracking-widest pb-1">
          <div className="flex flex-col items-end">
            <span className="text-[#444]">WPM</span>
            <span className="text-[#888] text-sm">{wpm}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[#444]">ACCURACY</span>
            <span className="text-[#888] text-sm">{accuracy}%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[#444]">STATUS</span>
            <span
              className={`text-sm ${status === "running" ? "text-green-500 animate-pulse" : "text-[#888]"}`}
            >
              {status === "running" ? "EXECUTING" : status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* THE 3D MECHANICAL MATRIX */}
      <div className="flex flex-col gap-2.5 p-3 rounded-xl bg-[#030303] shadow-[inset_0_0_30px_rgba(0,0,0,1)] border border-[#111]">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex gap-2 w-full justify-center"
          >
            {row.map((key, keyIndex) => {
              const isActive = activeKey === key;

              return (
                <div
                  key={`${rowIndex}-${keyIndex}-${key}`}
                  className={`
                    relative group flex flex-col justify-start rounded-md transition-all duration-75 select-none
                    ${getKeyWidth(key)}
                    ${isActive ? "mt-1" : "mb-1"} 
                  `}
                >
                  <div
                    className={`
                      w-full h-12 flex items-center justify-center rounded-md border text-[10px] sm:text-xs font-bold uppercase backdrop-blur-md transition-all duration-75
                      ${
                        isActive
                          ? "bg-green-500/20 text-green-300 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.4),inset_0_0_15px_rgba(34,197,94,0.3)]"
                          : "bg-white/2 text-[#555] border-[#333] shadow-[0_4px_0_rgba(20,20,20,1),inset_0_1px_rgba(255,255,255,0.05)] hover:bg-white/4"
                      }
                    `}
                  >
                    {key.length === 1 && !isActive && (
                      <span className="absolute top-1 left-1.5 text-[7px] text-[#333] tracking-tighter opacity-50">
                        {key.charCodeAt(0).toString(16)}
                      </span>
                    )}
                    {key}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(HolographicKeyboard);
