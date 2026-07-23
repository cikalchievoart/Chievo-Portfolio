"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-6 bg-[#090d16] border-t border-white/10 font-mono text-xs crt-scanlines">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Credit & Status */}
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 bg-[#ff3366]/20 border border-[#ff3366]/40 text-[#ff3366] font-bold rounded text-[11px]">
              CREDITS: ∞
            </span>
            <span className="text-gray-300 text-xs">
              CIKAL CHIEVO PORTFOLIO // SWISS ARCADE OS
            </span>
          </div>

          {/* Social Links & Keybindings */}
          <div className="flex items-center space-x-6">
            <div className="text-gray-500 text-[11px] hidden sm:block">
              [NAV: WASD / SCROLL]
            </div>
            <a
              href="https://www.linkedin.com/in/cikal-chievo-arment-86956b1a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#11f3d3] transition"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>
            <a
              href="https://github.com/cikalchievoart"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#11f3d3] transition"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/cikalchievo.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#ff3366] transition"
              aria-label="Instagram Profile"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
          </div>
        </div>

        {/* Telemetry Footer */}
        <div className="mt-3 pt-3 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-[10px] gap-2">
          <div>© 2026 CIKAL CHIEVO ARMENT. ALL RIGHTS RESERVED.</div>
          <div className="text-[#11f3d3] font-bold">
            SYS TIME: [{timeString || "21:10:29"}]
          </div>
        </div>
      </div>
    </footer>
  );
}
