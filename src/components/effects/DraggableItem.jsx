"use client";

import { motion } from "framer-motion";

export default function DraggableItem({
  children,
  initialX,
  initialY,
  className = "",
}) {
  return (
    <motion.div
      drag
      dragMomentum={true}
      // Keeps the items from being thrown entirely off the screen
      dragConstraints={{ left: -800, right: 800, top: -800, bottom: 800 }}
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05, cursor: "grab" }}
      whileDrag={{
        scale: 1.15,
        cursor: "grabbing",
        rotate: 5, // Slight tilt when picked up
        boxShadow: "0px 25px 50px -12px rgba(34, 197, 94, 0.15)", // Faint green shadow
      }}
      className={`absolute z-40 ${className}`}
    >
      {children}
    </motion.div>
  );
}
