"use client";

import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);
  const classes = ["GAME PROGRAMMER", "IT PROGRAMMER", "IT ENTHUSIAST"];
  const [currentClass, setCurrentClass] = useState(classes[0]);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        index = (index + 1) % classes.length;
        setCurrentClass(classes[index]);
        setIsGlitching(false);
      }, 150);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(17, 243, 211, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 11000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 pb-12 relative swiss-grid-pattern crt-scanlines">
      <canvas ref={canvasRef} id="particle-canvas"></canvas>

      <div className="container mx-auto px-6 flex md-flex-row items-center justify-between gap-10 z-10">
        {/* Left Column: Player Card & Hero Info */}
        <div className="md-w-half z-10">
          {/* Player HUD Card Header */}
          <div className="bg-[#131c2e] border border-[#11f3d3]/30 p-4 rounded-lg mb-6 hud-corner shadow-xl">
            <div className="flex justify-between items-center font-mono text-xs mb-2">
              <span className="text-[#11f3d3] font-bold">[PLAYER 1: CIKAL CHIEVO]</span>
              <span className="text-gray-400">LVL 24 // VR & IT SPECIALIST</span>
            </div>

            {/* Health & Mana Player Bars */}
            <div className="grid grid-cols-2 gap-3 mb-2 font-mono text-[10px]">
              <div>
                <div className="flex justify-between text-gray-300 mb-0.5">
                  <span>HP // VITALITY</span>
                  <span className="text-[#11f3d3]">100/100</span>
                </div>
                <div className="w-full h-1.5 xp-bar-bg">
                  <div className="xp-bar-fill" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-gray-300 mb-0.5">
                  <span>MP // LOGIC</span>
                  <span className="text-[#ff3366]">985/1000</span>
                </div>
                <div className="w-full h-1.5 xp-bar-bg">
                  <div className="xp-bar-fill-red" style={{ width: "98.5%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-none mb-4">
            Cikal Chievo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#11f3d3] via-emerald-300 to-[#ff3366]">
              Arment
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed border-l-2 border-[#11f3d3] pl-4">
            Multimedia Engineering Technology graduate specializing in VR game programming, hardware-integrated simulators, and IT Infrastructure Troubleshooting. Fusing physical sensors with interactive software logic.
          </p>

          {/* Keybinding Legend & Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-6 py-3 border-y border-white/10 font-mono text-xs">
            <div>
              <div className="text-lg font-bold text-[#11f3d3]">10+</div>
              <div className="text-gray-400 uppercase text-[10px]">QUESTS DONE</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#ff3366]">UNITY 3D</div>
              <div className="text-gray-400 uppercase text-[10px]">MAIN CLASS</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#11f3d3]">IOT</div>
              <div className="text-gray-400 uppercase text-[10px]">SUB-SKILL</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="px-8 py-3.5 bg-[#11f3d3] text-[#090d16] font-bold uppercase tracking-wider text-xs rounded hover:bg-[#11f3d3]/90 transition shadow-lg shadow-[#11f3d3]/20 font-mono"
            >
              [ START QUESTS ]
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="px-8 py-3.5 border border-[#ff3366] text-[#ff3366] font-bold uppercase tracking-wider text-xs rounded hover:bg-[#ff3366]/10 transition font-mono"
            >
              [ DISPATCH BRIEF ]
            </a>
          </div>
        </div>

        {/* Right Column: Clipped Polygon Photo HUD */}
        <div className="md-w-half flex justify-center z-10">
          <div className="hud-corner p-3 bg-[#131c2e] border border-[#11f3d3]/30 rounded-xl shadow-2xl relative group clip-cyber-card">
            {/* Rotating Radar Overlay */}
            <div className="absolute -inset-4 border border-[#11f3d3]/20 rounded-full animate-[radarRotate_12s_linear_infinite] pointer-events-none hidden md:block"></div>

            <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-lg">
              <img
                src="images/profil.png"
                alt="Cikal Chievo Arment Profile"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition duration-500 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Player Status Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#090d16]/90 border border-[#11f3d3]/40 backdrop-blur-md p-2.5 rounded text-xs font-mono flex justify-between items-center">
              <span className={`text-gray-300 ${isGlitching ? "glitch-active" : ""}`}>
                CLASS: {isGlitching ? "☠ ERROR_GLITCH" : currentClass}
              </span>
              <span className="text-[#11f3d3] flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#11f3d3] animate-ping"></span>
                <span>READY</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
