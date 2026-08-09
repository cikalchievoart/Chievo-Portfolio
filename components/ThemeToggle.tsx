"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  variant?: "segmented" | "dropdown" | "expanded";
  className?: string;
}

export default function ThemeToggle({
  variant = "segmented",
  className = "",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`inline-flex items-center gap-1 p-1 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 ${className}`}
        aria-hidden="true"
      >
        <div className="w-6 h-6 rounded-full opacity-0" />
        <div className="w-6 h-6 rounded-full opacity-0" />
        <div className="w-6 h-6 rounded-full opacity-0" />
      </div>
    );
  }

  const themes = [
    { id: "light", label: "Light", icon: "fa-sun" },
    { id: "system", label: "System", icon: "fa-laptop" },
    { id: "dark", label: "Dark", icon: "fa-moon" },
  ] as const;

  if (variant === "expanded") {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Theme Mode
        </span>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          {themes.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                type="button"
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/40 shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
                title={`Switch to ${t.label} theme`}
              >
                <i className={`fas ${t.icon} text-xs`}></i>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className={`inline-flex items-center gap-0.5 p-1 rounded-full bg-slate-200/70 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 backdrop-blur-md shadow-inner transition-colors ${className}`}
    >
      {themes.map((t) => {
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            type="button"
            role="radio"
            aria-checked={isActive}
            title={`${t.label} theme`}
            className={`relative flex items-center justify-center w-7 h-7 rounded-full text-xs transition-all duration-300 ${
              isActive
                ? "bg-white dark:bg-cyan-400/20 text-cyan-600 dark:text-cyan-300 shadow-sm border border-slate-200 dark:border-cyan-400/40 scale-105"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-white/5"
            }`}
          >
            <i className={`fas ${t.icon} text-[11px]`}></i>
          </button>
        );
      })}
    </div>
  );
}
