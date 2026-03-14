"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const TOOLS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "GSAP",
  "Lenis",
  "Framer Motion",
  "WebGL",
];

const PhysicsTooling = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const toolsRef = useRef([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    // 1. Setup Engine
    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    const engine = Engine.create();
    engineRef.current = engine;

    const containerWidth = sceneRef.current.clientWidth;
    const containerHeight = sceneRef.current.clientHeight;

    // 2. Build Invisible Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    World.add(engine.world, [
      Bodies.rectangle(
        containerWidth / 2,
        containerHeight + 50,
        containerWidth * 2,
        100,
        wallOptions,
      ),
      Bodies.rectangle(
        -50,
        containerHeight / 2,
        100,
        containerHeight * 2,
        wallOptions,
      ),
      Bodies.rectangle(
        containerWidth + 50,
        containerHeight / 2,
        100,
        containerHeight * 2,
        wallOptions,
      ),
    ]);

    // 3. Create Hitboxes (Hyper-Realistic Physics)
    const toolBodies = toolsRef.current.map((el) => {
      // Fallback widths just in case the ref hasn't fully painted
      const width = el ? el.offsetWidth : 120;
      const height = el ? el.offsetHeight : 40;

      return Bodies.rectangle(
        Math.random() * (containerWidth - 200) + 100,
        -(Math.random() * 500) - 200, // Spawn high in the sky
        width,
        height,
        {
          restitution: 0.3 + Math.random() * 0.5, // Random bounce
          friction: 0.1,
          frictionAir: 0.005 + Math.random() * 0.015, // Random flutter
          density: 0.001 + Math.random() * 0.002, // Random weight
          chamfer: { radius: height / 2 },
          render: { visible: false },
        },
      );
    });

    // Sync initial positions BEFORE they drop so they don't flash on screen
    toolBodies.forEach((body, index) => {
      const el = toolsRef.current[index];
      if (el) {
        el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px)`;
      }
    });

    // 4. Mouse Interaction (Heavy drag)
    const mouse = Mouse.create(sceneRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.1, damping: 0.1, render: { visible: false } },
    });
    World.add(engine.world, mouseConstraint);

    // 5. Start the Engine Loop
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 6. THE MISSING LINK: Update the HTML every frame to match the physics
    Matter.Events.on(engine, "afterUpdate", () => {
      toolBodies.forEach((body, index) => {
        const el = toolsRef.current[index];
        if (el) {
          const { x, y } = body.position;
          el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`;
        }
      });
    });

    // 7. The Laser Tripwire
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Drop the blocks!
          World.add(engine.world, toolBodies);

          // Give them a random spin
          toolBodies.forEach((body) => {
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
          });

          // Disconnect so it only happens once
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(sceneRef.current);

    // Cleanup Memory on unmount
    return () => {
      observer.disconnect();
      Matter.Events.off(engine, "afterUpdate");
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(engine.world, false);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative w-full h-[500px] xl:h-[600px] overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] cursor-grab active:cursor-grabbing"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05] select-none">
        <span className="font-switzer text-[6rem] md:text-[10rem] leading-none font-black uppercase tracking-tighter">
          Tools
        </span>
      </div>

      {TOOLS.map((tool, index) => (
        <div
          key={tool}
          ref={(el) => (toolsRef.current[index] = el)}
          className="absolute top-0 left-0 px-6 py-3 rounded-full border border-black/10 dark:border-white/20 bg-white dark:bg-[#111111] text-[#111111] dark:text-[#EEEEEE] font-switzer font-medium text-sm md:text-base select-none pointer-events-none shadow-sm"
          style={{ willChange: "transform" }}
        >
          {tool}
        </div>
      ))}
    </div>
  );
};

export default PhysicsTooling;
