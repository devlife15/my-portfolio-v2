"use client";

import { useEffect, useState, forwardRef } from "react";
import Link from "next/link";
import ThemeToggle from "../effects/ThemeToggle";

const Navbar = forwardRef(function Navbar(_, ref) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "/about" },
  ];

  return (
    // THE WRAPPER: Invisible, full width, flex-centered
    <div className="fixed top-6 left-0 w-full flex justify-center z-50 pointer-events-none">
      {/* THE DOCK: Animated by GSAP, pure Y-axis styling */}
      <nav
        ref={ref}
        style={{ opacity: 0, transform: "translateY(-20px)" }}
        className="pointer-events-auto flex items-center justify-between px-6 h-12 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-[#121212]/40 backdrop-blur-xl shadow-sm transition-colors duration-300"
      >
        {/* LEFT: Navigation Links */}
        <div className="flex items-center gap-6 mr-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-switzer text-[13px] uppercase tracking-wider font-medium text-[#757575] dark:text-[#ABABAB] hover:text-[#121212] dark:hover:text-[#EEEEEE] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* DIVIDER: A subtle vertical line */}
        <div className="w-px h-4 bg-black/10 dark:bg-white/10 mr-6"></div>

        {/* RIGHT: Clock & Theme Toggle */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center min-w-[45px] font-switzer font-medium text-[13px] text-[#121212] dark:text-[#EEEEEE]"
            title={mounted ? time.toDateString() : ""}
          >
            {mounted ? (
              <>
                <span>{time.getHours().toString().padStart(2, "0")}</span>
                <span
                  className={`mx-0.5 transition-opacity duration-200 ${
                    time.getSeconds() % 2 === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  :
                </span>
                <span>{time.getMinutes().toString().padStart(2, "0")}</span>
              </>
            ) : (
              <span className="opacity-0">00:00</span>
            )}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
});

export default Navbar;
