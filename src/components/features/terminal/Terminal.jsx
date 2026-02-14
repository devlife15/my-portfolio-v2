"use client";

import { useEffect, useState, useRef } from "react";
import { commands } from "../../../data/commands";
import { blogArticles } from "../../../data/blogPublished";
import { codingQuotes } from "../../../data/codingQuotes";
import { executeCommand } from "../../../utils/commandExecutor";
import { programmingMemes } from "../../../data/programmingMemes";
import TerminalOutput from "./TerminalOutput";
import "../../../../customStyle.css";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([
    {
      text: "Welcome to Ayan's Portfolio Terminal v1.25",
      type: "system-title",
    },
    { text: "© 2026 Ayan. All rights reserved.", type: "system-copyright" },
    { text: 'Type "help" to see available commands.', type: "system" },
    { text: "", type: "system" },
  ]);

  const [currentDir] = useState("~");
  const [pastCommands, setPastCommands] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll & Focus Logic
  const handleWheel = (e) => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop += e.deltaY;
    }
  };
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };
  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [commandHistory]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Output Rendering
  const renderOutput = async (output) => {
    setIsProcessing(true);
    for (let i = 0; i < output.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10)); // Faster typing for pro feel
      setCommandHistory((prev) => [...prev, output[i]]);
    }
    setIsProcessing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const newIndex =
          historyIndex === -1
            ? pastCommands.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(pastCommands[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= pastCommands.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(pastCommands[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // (Keep your existing Tab completion logic here)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing || !input.trim()) return;

    setPastCommands((prev) => [...prev, input]);
    setHistoryIndex(-1);
    const cmd = input;
    setInput("");

    // Add User Command Line to History
    setCommandHistory((prev) => [
      ...prev,
      { type: "command-echo", text: cmd, dir: currentDir },
    ]);

    const context = {
      setCommandHistory,
      blogArticles,
      codingQuotes,
      programmingMemes,
    };
    await executeCommand(cmd, context, currentDir, renderOutput);
  };

  return (
    <div
      className="flex flex-col h-full w-full bg-transparent font-mono text-[13px] md:text-xs leading-relaxed selection:bg-green-500/30 selection:text-white"
      onClick={handleTerminalClick}
    >
      {/* OUTPUT AREA */}
      <div
        ref={terminalRef}
        className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        onWheel={handleWheel}
        style={{
          scrollbarWidth: "thin",

          scrollbarColor: "#00ff88 #0f0f0f",
        }}
      >
        <TerminalOutput commandHistory={commandHistory} />

        {/* Loading Indicator */}
        {isProcessing && (
          <div className="text-green-500 animate-pulse mt-2">Processing...</div>
        )}
      </div>

      {/* INPUT AREA - Seamless */}
      <div className="px-6 py-4 bg-transparent shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          {/* Minimal Prompt */}
          <div className="flex items-center gap-2 font-bold text-green-500">
            <span>➜</span>
            <span className="text-blue-400">~</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white placeholder-white/20 caret-green-500 font-bold"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
