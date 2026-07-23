"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [sfxActive, setSfxActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "experience", "gallery", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    if (isMobileOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileOpen(false);
        setIsClosing(false);
      }, 300);
      document.body.style.overflow = "auto";
    } else {
      setIsMobileOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      if (isMobileOpen) {
        toggleMobileMenu();
      }
    }
  };

  const navItems = [
    { label: "01 // HOME", href: "home" },
    { label: "02 // QUESTS", href: "projects" },
    { label: "03 // ABILITIES", href: "skills" },
    { label: "04 // MISSIONS", href: "experience" },
    { label: "05 // GALLERY", href: "gallery" },
    { label: "06 // CONTACT", href: "contact" },
  ];

  return (
    <header className="sticky-header-fixed bg-transparent overflow-visible">
      {/* Blurred background wrapper only for navbar */}
      <div className="w-full bg-[#090d16]/90 backdrop-blur-md border-b border-[#11f3d3]/20 crt-scanlines">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white uppercase font-sans whitespace-nowrap">
              Cikal Chievo <span className="text-[#11f3d3]">Arment</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav space-x-6 items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`nav-link text-gray-300 hover:text-[#11f3d3] transition ${
                  activeSection === item.href ? "active" : ""
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Audio SFX Toggle */}
            <button
              onClick={() => setSfxActive(!sfxActive)}
              className={`px-2 py-0.5 border rounded text-[11px] font-mono uppercase transition ${
                sfxActive
                  ? "border-[#11f3d3]/40 text-[#11f3d3] bg-[#11f3d3]/10"
                  : "border-gray-700 text-gray-500 bg-[#131c2e]"
              }`}
              title="Toggle Audio SFX"
            >
              [SFX: {sfxActive ? "ON" : "OFF"}]
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-toggle"
            onClick={toggleMobileMenu}
            className="mobile-toggle text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMobileOpen ? "fa-times" : "fa-bars"} text-xl text-[#11f3d3]`}></i>
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className={`mobile-menu active ${isClosing ? "closing" : ""} crt-scanlines`}
        >
          <div className="flex justify-between items-center pb-4 border-b border-[#11f3d3]/20">
            <div className="font-mono text-xs text-[#11f3d3] flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#ff3366]"></span>
              <span>ARCADE CONSOLE // MENU</span>
            </div>
            <button
              id="mobile-close"
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-[#ff3366]"
              aria-label="Close menu"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          <div className="flex flex-col space-y-3 my-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`font-mono text-xs uppercase transition py-2 px-3 rounded border ${
                  activeSection === item.href
                    ? "text-[#11f3d3] bg-[#11f3d3]/10 border-[#11f3d3]/40 font-bold"
                    : "text-gray-300 border-transparent hover:border-white/10 hover:text-[#ff3366]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
