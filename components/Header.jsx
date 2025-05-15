"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu with Escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Navigation items
  const navItems = [
    { name: "Interview Creator", href: "/create-interview" },
    { name: "Resume Analyzer", href: "/analyser-resume" },
    { name: "Question Generator", href: "/sample-qsn" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-1000/95 backdrop-blur-xl shadow-lg"
          : "bg-dark-1000/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 relative group">
            <Link href="/" className="inline-flex items-center">
              <div className="text-2xl font-bold tracking-tight relative overflow-hidden">
                <span className="text-white mr-0.5">Hire</span>
                <span className="text-primary-500 relative">
                  Loom
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500 rounded-full transform transition-transform duration-300 group-hover:translate-y-0"></span>
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500/50 rounded-full transform transition-all duration-500 group-hover:w-full"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                active={pathname === item.href}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-secondary-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-5">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-apple ${
                    mobileMenuOpen ? "rotate-45 top-2.5" : "top-0"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current top-2 transition-opacity duration-300 ease-apple ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-apple ${
                    mobileMenuOpen ? "-rotate-45 top-2.5" : "top-5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden bg-dark-950/95 backdrop-blur-xl border-b border-dark-900 overflow-hidden transition-all duration-300 ease-apple ${
          mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <MobileNavLink
              key={item.name}
              href={item.href}
              active={pathname === item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </MobileNavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

// Desktop NavLink component
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg group overflow-hidden ${
        active
          ? "text-white"
          : "text-secondary-400 hover:text-white"
      }`}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform transition-all duration-300 ${
          active
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
      ></span>
      <span
        className={`absolute inset-0 bg-primary-900/0 rounded-lg transition-all duration-300 -z-0 ${
          active
            ? "bg-primary-900/20"
            : "group-hover:bg-primary-900/10"
        }`}
      ></span>
    </Link>
  );
}

// Mobile NavLink component
function MobileNavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
        active
          ? "bg-primary-900/20 text-white border-l-2 border-primary-500 pl-3"
          : "text-secondary-400 hover:text-white hover:bg-primary-900/10 hover:border-l-2 hover:border-primary-500 hover:pl-3"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

