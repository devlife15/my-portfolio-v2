"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const PhysicsGraveyard = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // 1. Setup the Physics Engine
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    const engine = Engine.create();
    engineRef.current = engine;

    // 2. Setup the Canvas Renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 300,
        height: 400,
        wireframes: false, // Turn off developer mode
        background: "transparent", // Let your dark mode shine through
      },
    });

    // 3. Build the Invisible Walls (Floor, Left, Right)
    const wallOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };

    World.add(engine.world, [
      Bodies.rectangle(150, 410, 300, 20, wallOptions), // Floor
      Bodies.rectangle(-10, 200, 20, 400, wallOptions), // Left Wall
      Bodies.rectangle(310, 200, 20, 400, wallOptions), // Right Wall
    ]);

    // 4. Add Mouse Interaction (Let the user drag the dead servers)
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // 5. Start the Engine loop
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 6. Cleanup to prevent memory leaks and frame drops
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
      render.canvas.remove();
    };
  }, []);

  // 7. The Trigger Function to drop a new block
  const triggerCrash = () => {
    if (!engineRef.current) return;

    // Creates a geometric block mimicking a "server rack" or "database"
    const isDarkMode = document.documentElement.classList.contains("dark");
    const blockColor = isDarkMode ? "#333333" : "#CCCCCC";

    const deadServer = Matter.Bodies.rectangle(
      Math.random() * 200 + 50, // Drop from a random X position
      -50, // Start slightly above the canvas
      Math.random() * 40 + 40, // Random width
      Math.random() * 40 + 40, // Random height
      {
        restitution: 0.5, // Bounciness
        friction: 0.1,
        render: {
          fillStyle: blockColor,
          strokeStyle: isDarkMode ? "#555555" : "#999999",
          lineWidth: 1,
        },
      },
    );

    Matter.World.add(engineRef.current.world, deadServer);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative group">
      {/* The Canvas Container */}
      <div
        ref={sceneRef}
        className="w-[300px] h-[400px] border border-black/10 dark:border-white/10 relative overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] cursor-grab active:cursor-grabbing"
      >
        {/* The Ignition Button sits absolutely positioned inside the box */}
        <button
          onClick={triggerCrash}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-black/20 dark:border-white/20 text-[#111111] dark:text-[#EEEEEE] hover:bg-[#111111] hover:text-[#EEEEEE] dark:hover:bg-[#EEEEEE] dark:hover:text-[#111111] transition-colors duration-300"
        >
          [ Deploy to Localhost ]
        </button>
      </div>
      <span className="mt-4 font-mono text-[10px] tracking-widest text-[#666] uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        * You can drag the debris.
      </span>
    </div>
  );
};

export default PhysicsGraveyard;
