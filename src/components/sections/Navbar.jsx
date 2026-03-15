"use client";

import { useEffect, useState, forwardRef } from "react";
import Link from "next/link";
import ThemeToggle from "../effects/ThemeToggle";

const Navbar = forwardRef(function Navbar(_, ref) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    // THE MASTER WRAPPER: Handles the GSAP animation for both mobile and desktop
    // pointer-events-none prevents the invisible box from blocking clicks on the page
    <header
      ref={ref}
      style={{ opacity: 0, transform: "translateY(-20px)" }}
      className="fixed top-0 left-0 w-full z-50 pointer-events-none"
    >
      {/* =========================================
          MOBILE: FULL-WIDTH HEADER (Visible only on small screens)
      ========================================= */}
      <div className="md:hidden pointer-events-auto relative w-full h-14 flex items-center justify-between px-6 border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md transition-colors duration-300">
        {/* LEFT: Hamburger */}
        <div className="flex-1 flex justify-start">
          <button
            className="text-[#121212] dark:text-[#EEEEEE] hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* CENTER: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            href="/"
            className="font-switzer uppercase text-[16px] font-medium tracking-wide text-[#121212] dark:text-[#EEEEEE] transition-colors duration-500"
          >
            Ayan
          </Link>
        </div>

        {/* RIGHT: Theme Toggle */}
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>

        {/* MOBILE DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 flex flex-col px-6 py-6 gap-6 shadow-lg transition-colors duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-switzer text-[16px] font-medium text-[#757575] dark:text-[#ABABAB] hover:text-[#121212] dark:hover:text-[#EEEEEE] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-black/5 dark:bg-white/5"></div>
            <div className="flex justify-between items-center text-[14px] text-[#757575] dark:text-[#ABABAB]">
              <span>Purulia, India</span>
              {mounted && (
                <span>
                  {time.getHours().toString().padStart(2, "0")}:
                  {time.getMinutes().toString().padStart(2, "0")}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* =========================================
          DESKTOP: FLOATING GLASS DOCK (Visible only on md+ screens)
      ========================================= */}
      <div className="hidden md:flex pointer-events-auto mt-6 justify-center w-full">
        <nav className="flex items-center justify-between px-6 h-12 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-[#121212]/40 backdrop-blur-xl shadow-sm transition-colors duration-300">
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
    </header>
  );
});

export default Navbar;
