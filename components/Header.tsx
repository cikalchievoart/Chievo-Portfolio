"use client";

import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  id: string;
  label: string;
}

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
      if (isMobileOpen) {
        setIsMobileOpen(false);
        document.body.style.overflow = "auto";
      }
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
      document.body.style.overflow = "auto";
    } else {
      setIsMobileOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Floating Dynamic Island Nav Pill */}
        <div
          className={`pointer-events-auto flex items-center justify-between w-full p-1.5 sm:p-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled
              ? "bg-white/85 dark:bg-[#0b0f17]/90 border border-slate-200/90 dark:border-white/10 ring-1 ring-slate-900/5 dark:ring-white/5 shadow-xl shadow-slate-900/5 dark:shadow-2xl dark:shadow-black/70 backdrop-blur-2xl"
              : "bg-white/70 dark:bg-[#0b0f17]/70 border border-slate-200/70 dark:border-white/10 backdrop-blur-xl shadow-md"
            }`}
        >
          {/* Brand Logo & Live Status */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/40 ring-1 ring-cyan-500/20 flex-shrink-0 group-hover:scale-105 transition-transform bg-slate-100 dark:bg-slate-800">
              <img
                src="images/profil.png"
                alt="Cikal Chievo Arment"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-white transition-colors">
                Cikal Chievo Arment
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Batam, ID</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-black/20 p-1 rounded-full border border-slate-200/60 dark:border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${isActive
                      ? "text-slate-900 dark:text-white bg-white dark:bg-white/10 shadow-sm border border-slate-200/80 dark:border-white/10 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5"
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTA, Theme Toggle & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Desktop Theme Toggle */}
            <ThemeToggle className="hidden sm:inline-flex" />

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 dark:from-cyan-500/20 dark:to-indigo-500/20 hover:from-cyan-500/25 hover:to-indigo-500/25 dark:hover:from-cyan-500/30 dark:hover:to-indigo-500/30 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <span className="text-[10px] font-mono">↗</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden w-9 h-9 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <i className={`fas ${isMobileOpen ? "fa-times" : "fa-bars"} text-sm`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="pointer-events-auto fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            onClick={toggleMobileMenu}
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300"
          />

          {/* Slide-in Menu Panel */}
          <div className="absolute top-0 right-0 w-[82%] max-w-xs h-full bg-white dark:bg-[#0c1017] border-l border-slate-200 dark:border-white/10 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Navigation</span>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  aria-label="Close menu"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-2 mt-6">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                          ? "bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">0{index + 1}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Info & Mobile Theme Controls */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-4">
              <ThemeToggle variant="expanded" />

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="w-full text-center py-2.5 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 border border-cyan-500/30 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider hover:bg-cyan-500/25 dark:hover:bg-cyan-500/30 transition-all"
              >
                Hire / Contact Me
              </a>
              <p className="text-[11px] font-mono text-slate-500 text-center">
                © {new Date().getFullYear()} Cikal Chievo Arment
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
