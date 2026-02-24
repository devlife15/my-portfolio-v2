"use client";

import { useEffect, useRef } from "react";

export default function MagneticGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let mouse = { x: -1000, y: -1000 };

    // Track mouse movement
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Hide the effect when mouse leaves the window
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Handle screen resizing
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    resize();

    // --- CONFIGURATION ---
    const spacing = 35; // Distance between dots
    const baseRadius = 1; // Size of resting dots
    const hoverRadius = 2.5; // Size of dots when hovered
    const influence = 120; // How far the mouse "magnet" reaches

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = x;
          let drawY = y;
          let drawRadius = baseRadius;
          // Resting color (very faint white/gray)
          let r = 255,
            g = 255,
            b = 255,
            alpha = 0.05;

          // If dot is within the "magnetic" field
          if (dist < influence) {
            const force = (influence - dist) / influence; // ranges from 0 to 1

            // 1. The Pull Effect (Moves dot slightly toward mouse)
            drawX += dx * force * 0.15;
            drawY += dy * force * 0.15;

            // 2. The Size Effect
            drawRadius = baseRadius + (hoverRadius - baseRadius) * force;

            // 3. The Color Effect (Transitions to your terminal green #22c55e)
            r = 34 + (255 - 34) * (1 - force);
            g = 197 + (255 - 197) * (1 - force);
            b = 94 + (255 - 94) * (1 - force);
            alpha = 0.05 + 0.5 * force; // Gets brighter
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, drawRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Fixed to the back, pointer-events-none so it doesn't block clicks
      className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050505] pointer-events-none"
    />
  );
}
