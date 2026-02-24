"use client";

import { useEffect, useRef } from "react";

export default function KineticGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let points = [];

    // --- CONFIGURATION ---
    const spacing = 45; // Size of the grid squares
    const influenceRadius = 100; // How big the "trampoline" dent is
    const pullStrength = 0.15; // How hard the mouse pulls the lines (0.1 to 0.5)
    const springState = 0.1; // How fast lines snap back (0.05 to 0.2)
    const gridColor = "rgba(255, 255, 255, 0.06)"; // Faint white/gray
    const glowColor = "rgba(34, 197, 94, 0.4)"; // Faint terminal green near mouse

    let mouse = { x: -1000, y: -1000 };
    let cols = 0;
    let rows = 0;

    const initGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / spacing) + 2;
      rows = Math.floor(canvas.height / spacing) + 2;
      points = [];

      for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
          const x = j * spacing;
          const y = i * spacing;
          row.push({
            x: x,
            y: y,
            baseX: x,
            baseY: y,
          });
        }
        points.push(row);
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", initGrid);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    initGrid();

    const draw = () => {
      // Clear screen with a solid dark background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Update point positions (The Physics)
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let p = points[i][j];

          const dx = mouse.x - p.baseX;
          const dy = mouse.y - p.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetX = p.baseX;
          let targetY = p.baseY;

          // If mouse is near, calculate the pull
          if (dist < influenceRadius) {
            const force = (influenceRadius - dist) / influenceRadius;
            targetX = p.baseX + dx * force * pullStrength;
            targetY = p.baseY + dy * force * pullStrength;
          }

          // Apply spring physics (lerp) to move towards target
          p.x += (targetX - p.x) * springState;
          p.y += (targetY - p.y) * springState;
        }
      }

      // 2. Draw the grid lines
      ctx.lineWidth = 1;

      // Draw horizontal lines
      for (let i = 0; i < rows; i++) {
        ctx.beginPath();
        for (let j = 0; j < cols; j++) {
          const p = points[i][j];
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = gridColor;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let j = 0; j < cols; j++) {
        ctx.beginPath();
        for (let i = 0; i < rows; i++) {
          const p = points[i][j];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = gridColor;
        ctx.stroke();
      }

      // Optional: Add a very soft green glow exactly at the cursor
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        influenceRadius,
      );
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, influenceRadius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", initGrid);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
