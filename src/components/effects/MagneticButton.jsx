"use client";

import { useRef } from "react";
import { gsap } from "gsap";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  onMouseEnter,
  ...props
}) {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    // Safety check in case the ref hasn't attached yet
    if (!buttonRef.current) return;

    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();

    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    gsap.to(buttonRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1,0.3)",
    });
  };

  // 👇 THE MAGIC: If an href is passed, it becomes a link. If not, it's a standard button.
  const Component = href ? "a" : "button";

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        font-switzer
        font-medium
        text-[16px]
        px-5
        py-2.5
        rounded-full
        transition-colors
        duration-300
        cursor-pointer
        inline-flex
        items-center
        justify-center
        /* Light Mode: Dark button, white text */
        bg-[#111111] 
        text-[#EEEEEE] 
        hover:bg-black 
        /* Dark Mode: Light button, dark text */
        dark:bg-[#EEEEEE] 
        dark:text-[#111111] 
        dark:hover:bg-white
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
