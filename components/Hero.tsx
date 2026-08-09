"use client";

import React, { useState, useEffect, useRef } from "react";

import InteractiveTitle from "./InteractiveTitle";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const roles: string[] = [
    "GAME PROGRAMMER",
    "IT PROGRAMMER",
    "IT OFFICER",
    "IT TECHNICIAN",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsFading(false);
      }, 250);
    }, 2400);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Interactive Particle Canvas with Cursor Dynamics & Theme Detection
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 1.5 + 0.8;
        this.baseOpacity = Math.random() * 0.35 + 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x -= (dx / dist) * 0.7;
          this.y -= (dy / dist) * 0.7;
        }
      }

      draw(isDark: boolean) {
        if (!ctx) return;
        const color = isDark
          ? `rgba(0, 240, 255, ${this.baseOpacity})`
          : `rgba(8, 145, 178, ${this.baseOpacity * 0.9})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const count = Math.min(Math.floor((width * height) / 18000), 55);
    const particles = Array.from({ length: count }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = 1 - dist / 100;
            ctx.strokeStyle = isDark
              ? `rgba(0, 240, 255, ${0.12 * alpha})`
              : `rgba(8, 145, 178, ${0.1 * alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw(isDark);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="home"
      className="min-h-[100dvh] flex items-center pt-28 pb-16 relative overflow-hidden ambient-mesh-grid"
    >
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-40"
      />

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Real Biography & Interactive Pitch */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Dynamic Eyebrow Role Switcher Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/60 dark:border-white/10 ring-1 ring-slate-900/5 dark:ring-white/5 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300">
                ROLE:{" "}
                <span
                  className={`text-cyan-600 dark:text-cyan-400 font-bold transition-all duration-300 ${
                    isFading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
                  }`}
                >
                  {roles[currentRoleIndex]}
                </span>
              </span>
            </div>

            {/* Interactive Cyber Decrypt Headline */}
            <InteractiveTitle className="mb-6" />

            {/* Original Biography */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl mb-8 border-l-2 border-cyan-500 dark:border-cyan-400/80 pl-4">
              Multimedia Engineering Technology graduate specializing in VR game programming, hardware-integrated simulators, and IT Infrastructure Troubleshooting. Fusing physical sensors with interactive software logic.
            </p>

            {/* Real Stats Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 px-5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 w-full max-w-lg mb-8 shadow-sm">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">10+</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 uppercase">
                  Projects Done
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">UNITY 3D</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 uppercase">
                  Main Stack
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">IOT & IT</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 uppercase">
                  Systems Eng.
                </div>
              </div>
            </div>

            {/* Action CTAs (Button-in-Button Pattern) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-400 dark:to-teal-400 text-white dark:text-[#07090e] font-semibold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <span className="w-8 h-8 rounded-full bg-black/20 dark:bg-[#07090e]/15 flex items-center justify-center text-white dark:text-[#07090e] font-mono group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-[0.98] shadow-sm"
              >
                Dispatch Brief
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Profile Photo inside Double-Bezel Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              onMouseMove={handleCardMouseMove}
              className="w-full max-w-sm rounded-3xl p-[1px] bg-gradient-to-b from-slate-300/80 via-slate-200/50 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent hover:from-cyan-500/40 hover:to-indigo-500/30 transition-all duration-500 shadow-xl dark:shadow-2xl spotlight-card group"
            >
              <div className="rounded-[calc(1.5rem-1px)] bg-white dark:bg-[#0c1017] p-4 sm:p-5 flex flex-col items-center border border-slate-200/80 dark:border-transparent">
                
                {/* Photo Viewport */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-4 border border-slate-200 dark:border-white/10 group-hover:border-cyan-500/40 dark:group-hover:border-cyan-400/30 transition-colors">
                  <img
                    src="images/profil.png"
                    alt="Cikal Chievo Arment"
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Card Status Sub-bar */}
                <div className="w-full p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span className="text-slate-800 dark:text-slate-300 font-semibold">CIKAL CHIEVO</span>
                  </div>
                  <span className="text-cyan-600 dark:text-cyan-400 text-[11px]">Batam, Indonesia</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
