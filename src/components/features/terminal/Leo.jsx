"use client";

import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import robotAnimation from "../../../../public/animations/robot.json";

const Leo = ({ isOpen }) => {
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState("");
  const timeouts = useRef([]);

  useEffect(() => {
    const schedule = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeouts.current.push(id);
    };

    if (isOpen) {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];

      // 2. THE INTRODUCTION SEQUENCE
      schedule(() => {
        setMessage("Hi there! I'm Leo! 🤖");
        setShowBubble(true);
      }, 800);

      schedule(() => {
        setMessage("Where are you joining us from? 🌍");
      }, 3500);

      schedule(() => {
        setMessage(
          "Feel free to use the terminal to play games or learn about Ayan! 🚀",
        );
      }, 6500);

      // 3. Hide bubble eventually if no interaction
      schedule(() => {
        setShowBubble(false);
      }, 12000);
    } else {
      // Silence Leo when closed
      timeouts.current.forEach(clearTimeout);
      setShowBubble(false);
    }

    return () => timeouts.current.forEach(clearTimeout);
  }, [isOpen]);

  const handleMouseEnter = () => {
    setShowBubble(true);
    const greetings = [
      "Beep boop! ⚡",
      "I run on coffee and React! ☕",
      "Type 'help' for a list of commands!",
      "Don't be shy, say hello! 👋",
      "Ayan is a great dev, isn't he? 😉",
      "Try typing 'matrix'...",
    ];
    setMessage(greetings[Math.floor(Math.random() * greetings.length)]);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setShowBubble(false), 2000);
    timeouts.current.push(id);
  };

  return (
    <div
      className="absolute bottom-10 right-10 z-60 flex flex-col items-end pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative mr-4 mb-2 bg-white text-black px-4 py-3 rounded-2xl rounded-br-none shadow-lg text-xs font-bold font-mono transform transition-all duration-300 origin-bottom-right max-w-50 leading-relaxed ${
          showBubble
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-50 translate-y-4"
        }`}
      >
        {message}
        {/* CSS Triangle for the speech tail */}
        <div className="absolute -bottom-1.5 right-0 w-0 h-0 border-l-10 border-l-transparent border-t-10 border-t-white"></div>
      </div>

      <div className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl">
        <Lottie animationData={robotAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Leo;
