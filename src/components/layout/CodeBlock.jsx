"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import useSystemSound from "@/hooks/useSystemSound";

export default function CodeBlock({ code, language, filename }) {
  const [copied, setCopied] = useState(false);
  const { playSound } = useSystemSound();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    playSound("click2");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-[#080808] shadow-[0_8px_30px_rgba(0,0,0,0.5)] group">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/3 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/40 border border-[#ff5f56]/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/40 border border-[#ffbd2e]/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/40 border border-[#27c93f]/20" />
          </div>

          <span className="font-mono text-xs text-[#666666] lowercase">
            {filename || language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#555] hover:text-[#EEEEEE] transition-colors"
        >
          {copied ? (
            <FiCheck className="text-green-400" size={14} />
          ) : (
            <FiCopy size={14} />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Here I used specific !important overrides so tailwind typography doesn't mess up my spacing */}
      <div className="p-4 md:p-6 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <pre className="bg-transparent! m-0! p-0!">
          <code className="font-mono text-[13px] md:text-sm leading-relaxed text-green-400/90">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
