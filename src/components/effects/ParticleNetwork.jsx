import React, { useEffect, useRef } from "react";

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // We use refs for mutable state that doesn't trigger re-renders
    let animationFrameId;
    let particlesArray = [];

    // Track mouse position directly without React state
    let mouse = {
      x: null,
      y: null,
      radius: 150,
    };

    // --- resizeCanvas Function ---
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // --- Particle Class ---
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    // --- Init Function ---
    const initParticles = () => {
      particlesArray = [];
      // Calculate number of particles based on screen area for consistent density
      // (Screen Area) / Divisor. Higher divisor = fewer particles.
      const numberOfParticles = (canvas.height * canvas.width) / 9000;

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x =
          Math.random() * (canvas.width - size * 2 - size * 2) + size * 2;
        const y =
          Math.random() * (canvas.height - size * 2 - size * 2) + size * 2;

        // Slower speed for a calmer background
        const directionX = Math.random() * 0.2 - 0.1;
        const directionY = Math.random() * 0.2 - 0.1;

        // Particle Color: Cool Gray (Tailwind gray-500 approx)
        const color = "#6b7280";

        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, color),
        );
      }
    };

    // --- Connect Function (The Network Lines) ---
    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          // Pythagorean theorem for distance
          const distance =
            (particlesArray[a].x - particlesArray[b].x) *
              (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) *
              (particlesArray[a].y - particlesArray[b].y);

          // Connection distance threshold
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - distance / 20000;

            // STATIC LINES: Darker grey, lower opacity for subtle background texture
            // Using rgba(107, 114, 128) which is roughly gray-500
            ctx.strokeStyle = "rgba(107, 114, 128," + opacityValue * 0.15 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }

        // --- MOUSE INTERACTIONS ---
        if (mouse.x != null) {
          const mouseDistance =
            (particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x) +
            (particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y);

          // Interaction radius
          if (mouseDistance < 25000) {
            // MOUSE LINES: Light silver for visibility (rgba(220, 220, 220))
            ctx.strokeStyle = "rgba(220, 220, 220, 0.4)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    // --- Event Listeners ---
    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    // Initial Start
    resizeCanvas();
    animate();

    // --- Cleanup ---
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-neutral-950 pointer-events-none"
    />
  );
};

export default ParticleNetwork;
