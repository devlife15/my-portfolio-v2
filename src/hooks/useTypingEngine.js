"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useSystemSound from "./useSystemSound";

export default function useTypingEngine(targetText, isActive) {
  const [typed, setTyped] = useState("");
  const [activeKey, setActiveKey] = useState(null);
  const [status, setStatus] = useState("idle");
  const [startTime, setStartTime] = useState(null);
  // 👇 NEW: We need to lock the time when they finish!
  const [endTime, setEndTime] = useState(null);
  const [errors, setErrors] = useState(0);

  const { playSound } = useSystemSound();

  const typedRef = useRef("");
  const timeoutRef = useRef(null);
  // 👇 NEW: Tracks every single key press to make Accuracy 100% mathematically correct
  const totalKeystrokesRef = useRef(0);

  const handleKeyDown = useCallback(
    (e) => {
      if (
        ["Shift", "Control", "Alt", "Meta", "Tab", "CapsLock"].includes(e.key)
      )
        return;
      if (status === "completed") return;

      e.preventDefault();

      const keyMap = { " ": "SPACE", Backspace: "BACK", Enter: "ENTER" };
      setActiveKey(keyMap[e.key] || e.key.toUpperCase());

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setActiveKey(null), 100);

      if (status === "idle") {
        setStatus("running");
        setStartTime(Date.now());
        setEndTime(null);
      }

      const currentTyped = typedRef.current;

      if (e.key === "Backspace") {
        typedRef.current = currentTyped.slice(0, -1);
        setTyped(typedRef.current);
        playSound("click"); // Using a standard click for backspace
        return;
      }

      // Track that a physical character key was pressed
      totalKeystrokesRef.current += 1;

      const expectedChar = targetText[currentTyped.length];

      if (e.key !== expectedChar) {
        setErrors((prev) => prev + 1);
        playSound("error"); // Play the error sound for typos
      } else {
        playSound("type"); // Play standard type sound
      }

      typedRef.current = currentTyped + e.key;
      setTyped(typedRef.current);

      // 👇 THE TIME LOCK: Freeze the clock the exact millisecond they finish
      if (typedRef.current.length === targetText.length) {
        setStatus("completed");
        setEndTime(Date.now());
      }
    },
    [status, targetText, playSound],
  );

  useEffect(() => {
    if (!isActive) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, isActive]);

  // 👇 THE MATH FIX: True Net WPM Calculation
  const calculateWPM = () => {
    if (!startTime || typed.length === 0) return 0;

    // Freeze the time elapsed if completed, otherwise use current time
    const finalTime = endTime || Date.now();
    const timeElapsedInMinutes = (finalTime - startTime) / 60000;

    // Only count correctly typed characters for Net WPM
    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === targetText[i]) correctChars++;
    }

    const wordsTyped = correctChars / 5;
    return Math.max(0, Math.round(wordsTyped / timeElapsedInMinutes));
  };

  // 👇 THE MATH FIX: True Accuracy Calculation
  const calculateAccuracy = () => {
    if (totalKeystrokesRef.current === 0) return 100;

    // Total physical keystrokes minus mistakes, divided by total keystrokes
    const correctKeystrokes = totalKeystrokesRef.current - errors;
    return Math.max(
      0,
      Math.round((correctKeystrokes / totalKeystrokesRef.current) * 100),
    );
  };

  useEffect(() => {
    setTyped("");
    typedRef.current = "";
    totalKeystrokesRef.current = 0;
    setStatus("idle");
    setStartTime(null);
    setEndTime(null);
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
      typedRef.current = "";
      totalKeystrokesRef.current = 0;
      setStatus("idle");
      setStartTime(null);
      setEndTime(null);
      setErrors(0);
    },
  };
}
