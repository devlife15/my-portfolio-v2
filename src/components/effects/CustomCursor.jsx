import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../../utils/CursorContext"; // Ensure path is correct

const CustomCursor = () => {
  const { cursorVariant } = useCursor();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Mobile Detection: Don't render on touch devices
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setIsMobile(true);
    }

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "#22c55e", // Use your Green Brand Color
      borderRadius: "50%",
      mixBlendMode: "normal",
    },
    text: {
      height: 32,
      width: 4,
      backgroundColor: "#22c55e",
      borderRadius: 0,
    },
    button: {
      height: 60,
      width: 60,
      backgroundColor: "#ffffff",
      borderRadius: "50%",
      mixBlendMode: "difference", // This creates the cool "Invert" effect
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      // Fixed: z-[9999] ensures it's on top of everything
      className="fixed top-0 left-0 pointer-events-none z-9999"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: "-50%",
        y: "-50%",
      }}
    />
  );
};

export default CustomCursor;
