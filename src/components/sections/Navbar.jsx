"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "../effects/ThemeToggle";

const Navbar = () => {
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
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 h-11 border-b border-black/3 dark:border-white/3 bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md transition-colors duration-300">
      {/* 1. LEFT PILLAR: Logo (Desktop) & Hamburger (Mobile) */}
      <div className="flex-1 flex justify-start items-center">
        {/* Mobile Hamburger (Visible only on small screens) */}
        <button
          className="md:hidden text-[#121212] dark:text-[#EEEEEE] hover:opacity-70 transition-opacity"
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

        {/* Desktop Logo (Hidden on mobile to allow center positioning) */}
        <Link
          href="/"
          className="hidden md:block font-switzer uppercase text-[16px] font-medium tracking-wide text-[#121212] dark:text-[#EEEEEE] transition-colors duration-500"
        >
          Ayan
        </Link>
      </div>

      {/* 2. ABSOLUTE CENTER: Nav Links (Desktop) & Logo (Mobile) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-switzer text-[14px] font-medium text-[#757575] dark:text-[#ABABAB] hover:text-[#121212] dark:hover:text-[#EEEEEE] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Logo (Takes over the center spot on small screens) */}
        <Link
          href="/"
          className="md:hidden font-switzer uppercase text-[16px] font-medium tracking-wide text-[#121212] dark:text-[#EEEEEE] transition-colors duration-500"
        >
          Ayan
        </Link>
      </div>

      {/* 3. RIGHT PILLAR: Location, Time & Theme Toggle */}
      <div className="flex-1 flex justify-end items-center gap-4 md:gap-6 font-switzer font-medium text-[14px] text-[#757575] dark:text-[#ABABAB] transition-colors duration-500">
        {/* Hide location text on smaller tablets to prevent crowding */}
        <span className="hidden lg:inline-block">Based in Kolkata, India</span>

        {/* Subtle dot separator */}
        <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20 transition-colors duration-500"></span>

        {/* The Live Clock */}
        <div
          className="hidden md:flex items-center justify-center min-w-[45px] font-switzer font-medium text-[14px]"
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

        {/* Theme Toggle remains on the far right for both Desktop and Mobile */}
        <ThemeToggle />
      </div>

      {/* 4. MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 flex flex-col px-6 py-6 gap-6 md:hidden shadow-lg transition-colors duration-300">
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
            <span>Kolkata, India</span>
            {mounted && (
              <span>
                {time.getHours().toString().padStart(2, "0")}:
                {time.getMinutes().toString().padStart(2, "0")}
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
