"use client";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import useSystemSound from "../../hooks/useSystemSound";

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const { playSound } = useSystemSound();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    playSound("click2");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-10 rounded-lg overflow-hidden border border-white/10 bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs font-mono text-gray-500">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] font-mono text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300 m-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}
