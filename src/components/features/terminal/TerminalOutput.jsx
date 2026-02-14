"use client";

import React from "react";

const TerminalOutput = ({ commandHistory }) => {
  return commandHistory.map((item, index) => {
    if (item.type === "command-echo") {
      return (
        <div key={index} className="mb-1 flex items-center gap-3 opacity-60">
          <span className="text-green-500 font-bold">➜</span>
          <span className="text-blue-400 font-bold">~</span>
          <span className="text-white">{item.text}</span>
        </div>
      );
    }

    // 2. IMAGE RENDERING (Memes)
    if (item.type === "meme-image") {
      return (
        <div
          key={index}
          className="my-4 flex justify-start animate-in fade-in zoom-in duration-300"
        >
          <img
            src={item.imageUrl}
            alt="Meme"
            className="max-w-75 rounded-sm border border-white/20 opacity-90 hover:opacity-100 transition-opacity"
            onClick={() => window.open(item.imageUrl, "_blank")}
          />
        </div>
      );
    }

    // 3. TEXT RENDERING
    return (
      <div
        key={index}
        className={`mb-1 wrap-break-word ${
          item.type === "command"
            ? "text-white font-bold" // Legacy fallback
            : item.type === "error"
              ? "text-red-400"
              : item.type === "system-header"
                ? "text-white font-bold mt-4 mb-2 uppercase tracking-widest border-b border-white/10 pb-1 w-max"
                : item.type === "system-title"
                  ? "text-green-400 font-editorial font-bold italic text-lg mb-2"
                  : item.type === "system-copyright"
                    ? "text-gray-500 text-[10px] mb-4 font-geistmono"
                    : item.type === "comment"
                      ? "text-gray-500 italic"
                      : item.type === "success"
                        ? "text-green-400"
                        : item.type === "link"
                          ? "text-blue-400 underline cursor-pointer hover:text-blue-300"
                          : "text-gray-300" // Default text
        }`}
      >
        {item.text}
      </div>
    );
  });
};

export default TerminalOutput;
