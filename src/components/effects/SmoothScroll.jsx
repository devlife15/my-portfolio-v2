"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
    });

    // ✅ Fix 1: GSAP ticker instead of your own RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // ✅ Fix 2: Disable lag catch-up jump
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
