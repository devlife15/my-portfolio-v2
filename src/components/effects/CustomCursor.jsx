"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../../utils/CursorContext";

const CustomCursor = () => {
  const { cursorVariant } = useCursor();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 600, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Mobile Detection: Kills the custom cursor entirely on mobile
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setIsMobile(true);
      return;
    }

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  // Don't render anything if on a phone
  if (isMobile) return null;

  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "#ffffff",
      borderRadius: "50%",
      mixBlendMode: "difference",
      opacity: 1,
    },

    button: {
      height: 80,
      width: 80,
      backgroundColor: "#ffffff",
      borderRadius: "50%",
      mixBlendMode: "difference",
      opacity: 1,
    },

    text: {
      height: 32,
      width: 2,
      backgroundColor: "#ffffff",
      borderRadius: "0px",
      mixBlendMode: "difference",
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant || "default"}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="fixed top-0 left-0 pointer-events-none z-99999 hidden sm:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
};

export default CustomCursor;
