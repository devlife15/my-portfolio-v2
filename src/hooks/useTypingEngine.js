"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useSystemSound from "./useSystemSound";

export default function useTypingEngine(targetText, isActive) {
  const [typed, setTyped] = useState("");
  const [activeKey, setActiveKey] = useState(null);
  const [status, setStatus] = useState("idle");
  const [startTime, setStartTime] = useState(null);
  const [errors, setErrors] = useState(0);

  const { playSound } = useSystemSound();

  // 1. PERFORMANCE FIX: We use refs for synchronous tracking to stop the event listener from resetting
  const typedRef = useRef("");
  const timeoutRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (
        ["Shift", "Control", "Alt", "Meta", "Tab", "CapsLock"].includes(e.key)
      )
        return;
      if (status === "completed") return;

      e.preventDefault();

      // 2. RACE CONDITION FIX: Clear the previous timeout if they type incredibly fast
      const keyMap = { " ": "SPACE", Backspace: "BACK", Enter: "ENTER" };
      setActiveKey(keyMap[e.key] || e.key.toUpperCase());

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setActiveKey(null), 100);

      if (status === "idle") {
        setStatus("running");
        setStartTime(Date.now());
      }

      const currentTyped = typedRef.current;

      if (e.key === "Backspace") {
        typedRef.current = currentTyped.slice(0, -1);
        setTyped(typedRef.current);
        playSound("");
        return;
      }

      // Check against the ref, not the state!
      const expectedChar = targetText[currentTyped.length];

      if (e.key !== expectedChar) {
        setErrors((prev) => prev + 1);
        playSound("error");
      } else {
        playSound("");
      }

      typedRef.current = currentTyped + e.key;
      setTyped(typedRef.current);

      if (typedRef.current.length === targetText.length) {
        setStatus("completed");
      }
    },
    // Notice how `typed` is no longer in this dependency array!
    // The listener never detaches now.
    [status, targetText, playSound],
  );

  useEffect(() => {
    if (!isActive) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, isActive]);

  const calculateWPM = () => {
    if (!startTime || typed.length === 0) return 0;
    const timeElapsed = (Date.now() - startTime) / 60000;
    const wordsTyped = typed.length / 5;
    return Math.round(wordsTyped / timeElapsed);
  };

  const calculateAccuracy = () => {
    if (typed.length === 0) return 100;
    const correctChars = typed.length - errors;
    return Math.max(0, Math.round((correctChars / typed.length) * 100));
  };

  // NEW: Auto-reset the engine whenever the user selects a new code snippet
  useEffect(() => {
    setTyped("");
    typedRef.current = "";
    setStatus("idle");
    setStartTime(null);
    setErrors(0);
  }, [targetText]);

  return {
    typed,
    activeKey,
    status,
    wpm: calculateWPM(),
    accuracy: calculateAccuracy(),
    reset: () => {
      setTyped("");
      typedRef.current = ""; // Reset the ref too!
      setStatus("idle");
      setStartTime(null);
      setErrors(0);
    },
  };
}
