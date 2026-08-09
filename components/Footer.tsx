"use client";

import React, { useState, useEffect } from "react";

export default function Footer() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "Asia/Jakarta",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-slate-100/70 dark:bg-[#07090e] border-t border-slate-200 dark:border-white/10 text-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Brand & Mission */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/40 ring-1 ring-cyan-500/20 flex-shrink-0 bg-slate-100 dark:bg-slate-800">
              <img
                src="images/profil.png"
                alt="Cikal Chievo Arment"
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div>
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-200">
                Cikal Chievo Arment
              </span>
              <p className="text-[11px] text-slate-500">
                IT and Multimedia Enthusiast
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/cikalchievoart"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white dark:bg-white/[0.03] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github text-sm"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/cikal-chievo-arment/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white dark:bg-white/[0.03] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin text-sm"></i>
            </a>
            <a
              href="https://www.instagram.com/cikalchievo.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white dark:bg-white/[0.03] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 flex items-center justify-center transition-all shadow-sm"
              aria-label="Instagram Profile"
            >
              <i className="fab fa-instagram text-sm"></i>
            </a>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-white dark:bg-white/[0.03] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm"
              title="Back to top"
              aria-label="Scroll to top"
            >
              <i className="fas fa-arrow-up text-xs"></i>
            </button>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} Cikal Chievo Arment. Crafted with Next.js & TypeScript.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>Batam, ID (UTC+7) · {timeString || "12:00:00"}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
