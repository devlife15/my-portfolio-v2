"use client";

import { useEffect, useRef } from "react";

const FloatingASCII = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Safety check

    const ctx = canvas.getContext("2d");

    // CONFIGURATION
    const CHARS = "0123456789ABCDEFxy+*=";
    const PARTICLE_COUNT = 150;
    const FONT_SIZE = 12;
    const MOUSE_DIST = 150;

    // 👇 DETECT MOBILE (Touch devices)
    // If true, we disable all mouse interactions
    const isMobile = window.matchMedia("(hover: none)").matches;

    let width, height;
    let particles = [];

    // Mouse state (Starts off-screen)
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        this.size = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        // Only calculate distance if we are on Desktop
        let isHovered = false;

        if (!isMobile) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          isHovered = dist < MOUSE_DIST;
        }

        // RENDER LOGIC
        if (isHovered) {
          // DESKTOP INTERACTION: Bright White & Scrambling
          ctx.fillStyle = "#ffffff";
          ctx.font = `bold ${FONT_SIZE + 2}px 'Geist Mono', monospace`;

          // Scramble character occasionally
          if (Math.random() > 0.8) {
            this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        } else {
          // MOBILE / IDLE: Dim Green & Static
          ctx.fillStyle = `rgba(34, 197, 94, ${this.size * 0.4})`; // Low opacity green
          ctx.font = `${FONT_SIZE}px 'Geist Mono', monospace`;
        }

        ctx.fillText(this.char, this.x, this.y);
      }
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      // Important: Scale CSS to match window, but canvas pixels to match DPI
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      // Don't waste CPU calculating mouse position on mobile
      if (isMobile) return;

      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      init();
    };

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
