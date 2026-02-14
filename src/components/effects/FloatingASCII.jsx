"use client";

import React, { useEffect, useRef } from "react";

const FloatingASCII = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // CONFIGURATION
    const CHARS = "0123456789ABCDEFxy+*=";
    const PARTICLE_COUNT = 150; // Total floating characters (adjust for density)
    const FONT_SIZE = 12;
    const CONNECTION_DIST = 0; // Set to 100 if you want lines connecting them (Network style)
    const MOUSE_DIST = 150; // How close mouse needs to be to interact

    let width, height;
    let particles = [];

    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        // Random drift velocity (Very slow)
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        this.size = Math.random() * 0.5 + 0.5; // Random opacity/size multiplier
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen edges (Teleport to other side)
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        // Calculate distance to mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // INTERACTION:
        // If mouse is close, be bright and scramble character
        // If far, be dim and static
        if (dist < MOUSE_DIST) {
          ctx.fillStyle = "#ffffff"; // Bright White
          ctx.font = `bold ${FONT_SIZE + 2}px 'Geist Mono', monospace`;

          // Scramble effect: Randomly change character when hovered
          if (Math.random() > 0.8) {
            this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        } else {
          // Dim color based on particle's random size attribute
          ctx.fillStyle = `rgba(34, 197, 94, ${this.size * 0.4})`; // Low opacity green
          ctx.font = `${FONT_SIZE}px 'Geist Mono', monospace`;
        }

        ctx.fillText(this.char, this.x, this.y);
      }
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      // High DPI scaling
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Create particles
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Clear canvas (No trails for this version, looks cleaner)
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      init();
    };

    // Run
    init();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#050505" }}
    />
  );
};

export default FloatingASCII;
