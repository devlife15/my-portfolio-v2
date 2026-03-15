"use client";

import { useEffect, useState, useRef } from "react";
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
      text: "SYSTEM_BOOT // AYAN_OS v2.0.0 INITIALIZED.",
      type: "system-title",
    },
    {
      text: "(c) 2026 AYAN KUMAR. ALL PROTOCOLS ACTIVE.",
      type: "system-copyright",
    },
    { text: "TYPE 'help' TO ACCESS DIRECTORY.", type: "system" },
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

    // Add User Command Line to History (Matching the new brutalist prompt)
    setCommandHistory((prev) => [
      ...prev,
      {
        type: "command-echo",
        text: `[GUEST@LOCALHOST] ~ % ${cmd}`,
        dir: currentDir,
      },
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
      className="flex flex-col h-full w-full bg-transparent font-jetmono text-[11px] md:text-xs leading-relaxed text-[#121212] dark:text-[#EEEEEE] selection:bg-black/20 dark:selection:bg-white/20 selection:text-current"
      onClick={handleTerminalClick}
      data-lenis-prevent
    >
      {/* OUTPUT AREA */}
      <div
        ref={terminalRef}
        className="flex-1 p-6 md:px-12 md:pt-12 overflow-y-auto scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 scrollbar-track-transparent"
        onWheel={handleWheel}
      >
        <TerminalOutput commandHistory={commandHistory} />

        {/* Loading Indicator */}
        {isProcessing && (
          <div className="animate-pulse mt-4 text-[#666] dark:text-[#888]">
            [ PROCESSING COMMAND... ]
          </div>
        )}
      </div>

      {/* INPUT AREA - Seamless & Mechanical */}
      <div className="px-6 md:px-12 pb-12 pt-4 bg-transparent shrink-0">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full"
        >
          {/* The Brutalist Prompt */}
          <span className="mr-3 opacity-50 whitespace-nowrap">
            [GUEST@LOCALHOST] ~ %
          </span>

          {/* The Invisible Real Input (Handles actual typing and mobile keyboards) */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 pointer-events-auto text-[16px] md:text-xs w-full h-full"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />

          {/* The Fake Visual Input (Renders the block cursor) */}
          <span className="relative pointer-events-none whitespace-pre font-bold flex items-center">
            {input}
            <span
              className={`inline-block w-2.5 h-3.5 bg-[#121212] dark:bg-[#EEEEEE] ml-1 ${isProcessing ? "hidden" : "animate-[pulse_1s_step-end_infinite]"}`}
            ></span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
