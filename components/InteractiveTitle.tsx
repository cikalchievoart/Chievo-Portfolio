"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface InteractiveTitleProps {
  className?: string;
}

const GLYPHS = "0101XY_▲■§#&%*~+<>/{}";

export default function InteractiveTitle({ className = "" }: InteractiveTitleProps) {
  const line1Original = "Cikal Chievo";
  const line2Original = "Arment";

  const [line1Display, setLine1Display] = useState<string>(line1Original);
  const [line2Display, setLine2Display] = useState<string>(line2Original);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [hoveredLetter, setHoveredLetter] = useState<{ line: number; index: number } | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const scrambleProgressRef = useRef<number>(0);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    scrambleProgressRef.current = 0;

    const maxLen = Math.max(line1Original.length, line2Original.length);
    const totalFrames = 26;
    let frame = 0;

    const step = () => {
      frame++;
      const progress = frame / totalFrames;
      scrambleProgressRef.current = progress;

      // Scramble Line 1
      const l1 = line1Original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          const charThreshold = i / line1Original.length;
          if (progress > charThreshold + 0.25) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      // Scramble Line 2
      const l2 = line2Original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          const charThreshold = i / line2Original.length;
          if (progress > charThreshold + 0.25) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setLine1Display(l1);
      setLine2Display(l2);

      if (frame < totalFrames) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setLine1Display(line1Original);
        setLine2Display(line2Original);
        setIsScrambling(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  }, [isScrambling, line1Original, line2Original]);

  // Initial greeting scramble on load
  useEffect(() => {
    const timer = setTimeout(() => {
      scramble();
    }, 600);
    return () => {
      clearTimeout(timer);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <h1
        aria-label="Cikal Chievo Arment"
        className="text-[2.25rem] min-[380px]:text-[2.65rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white cursor-pointer group"
        onClick={scramble}
        onMouseEnter={scramble}
      >
        {/* Line 1: Cikal Chievo */}
        <div className="flex flex-wrap items-center">
          {line1Display.split("").map((char, i) => {
            if (char === " ") {
              return <span key={i} className="w-2 sm:w-3.5">&nbsp;</span>;
            }
            const isHovered = hoveredLetter?.line === 1 && hoveredLetter?.index === i;
            return (
              <span
                key={i}
                onMouseEnter={() => setHoveredLetter({ line: 1, index: i })}
                onMouseLeave={() => setHoveredLetter(null)}
                className={`inline-block transition-all duration-200 transform ${
                  isHovered
                    ? "-translate-y-2 scale-110 text-cyan-600 dark:text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]"
                    : "hover:text-cyan-600 dark:hover:text-cyan-400"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Line 2: Arment (with animated cyber gradient) */}
        <div className="flex flex-wrap items-center mt-1 sm:mt-1.5">
          <span className="inline-flex bg-gradient-to-r from-cyan-600 via-teal-500 to-indigo-600 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
            {line2Display.split("").map((char, i) => {
              if (char === " ") {
                return <span key={i} className="w-2 sm:w-3.5">&nbsp;</span>;
              }
              const isHovered = hoveredLetter?.line === 2 && hoveredLetter?.index === i;
              return (
                <span
                  key={i}
                  onMouseEnter={() => setHoveredLetter({ line: 2, index: i })}
                  onMouseLeave={() => setHoveredLetter(null)}
                  className={`inline-block transition-all duration-200 transform ${
                    isHovered
                      ? "-translate-y-2 scale-115 text-indigo-500 dark:text-cyan-300 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                      : ""
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>

          {/* Interactive spark / re-scramble status pill */}
          <span
            className={`ml-2.5 sm:ml-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 ${
              isScrambling
                ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40 animate-pulse"
                : "bg-slate-200/60 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-300/60 dark:border-white/10 opacity-0 group-hover:opacity-100"
            }`}
          >
            <i className={`fas fa-sync-alt text-[9px] ${isScrambling ? "fa-spin" : ""}`}></i>
            <span className="hidden sm:inline">{isScrambling ? "DECRYPTING..." : "RE-SCRAMBLE"}</span>
          </span>
        </div>
      </h1>
    </div>
  );
}
