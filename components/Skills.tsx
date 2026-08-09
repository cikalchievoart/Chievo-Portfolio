"use client";

import React, { useState, useEffect } from "react";
import { skillsData } from "../data/portfolioData";
import { Skill } from "../types/portfolio";

interface SkillCategory {
  id: string;
  label: string;
  count: number;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const gameDevKeywords = ["Unity", "C#", "Embedded Systems Integration", "Internet of Things", "UI/UX Design", "Figma"];
  const itInfrastructureKeywords = ["IT Support", "Software", "Hardware", "Networking", "System Administrator", "Microsoft Office"];
  const multimediaKeywords = ["Adobe Illustrator", "Canva", "Video Editing", "Videography", "Photography"];
  const professionalKeywords = ["Leadership & Teamwork", "Time Management", "Creative Problem Solving", "Communication & Collaboration", "Attention to Detail"];

  const categorizeSkill = (name: string): string => {
    if (gameDevKeywords.includes(name)) return "GAME";
    if (itInfrastructureKeywords.includes(name)) return "IT";
    if (multimediaKeywords.includes(name)) return "MEDIA";
    if (professionalKeywords.includes(name)) return "PRO";
    return "OTHER";
  };

  const categories: SkillCategory[] = [
    { id: "ALL", label: "All Skills", count: skillsData.length },
    {
      id: "GAME",
      label: "Game Dev & XR",
      count: skillsData.filter((s) => categorizeSkill(s.name) === "GAME").length,
    },
    {
      id: "IT",
      label: "IT & Systems",
      count: skillsData.filter((s) => categorizeSkill(s.name) === "IT").length,
    },
    {
      id: "MEDIA",
      label: "Multimedia & Design",
      count: skillsData.filter((s) => categorizeSkill(s.name) === "MEDIA").length,
    },
    {
      id: "PRO",
      label: "Professional & Team",
      count: skillsData.filter((s) => categorizeSkill(s.name) === "PRO").length,
    },
  ];

  const filteredSkills = skillsData.filter((skill) => {
    if (activeCategory === "ALL") return true;
    return categorizeSkill(skill.name) === activeCategory;
  });

  const limit = isMobile ? 5 : 9;
  const hasMore = filteredSkills.length > limit;
  const displayedSkills = showAll || !hasMore ? filteredSkills : filteredSkills.slice(0, limit);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setShowAll(false);
  };

  const toggleShowAll = () => {
    if (showAll) {
      const skillsSection = document.getElementById("skills");
      if (skillsSection) {
        skillsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setShowAll((prev) => !prev);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
              <span>03</span>
              <span>/</span>
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Skills & Competencies
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 px-3.5 py-1.5 rounded-full">
            Total Abilities: [{skillsData.length}]
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#07090e] shadow-md font-semibold"
                    : "bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/5"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white dark:bg-black/15 dark:text-[#07090e]" : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Skill Cards Grid with Staggered Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedSkills.map((skill, idx) => {
            const isRevealed = idx >= limit;
            const animDelay = isRevealed ? (idx - limit) * 45 : Math.min(idx * 30, 250);

            return (
              <div
                key={`${activeCategory}-${skill.name}`}
                onMouseMove={handleCardMouseMove}
                style={{ animationDelay: `${animDelay}ms` }}
                className="animate-skill-reveal group relative rounded-2xl p-[1px] bg-gradient-to-b from-slate-200 via-slate-100 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent hover:from-cyan-500/40 hover:to-indigo-500/20 transition-all duration-500 shadow-sm dark:shadow-md spotlight-card border border-slate-200/80 dark:border-transparent"
              >
                <div className="rounded-[calc(1rem-1px)] bg-white dark:bg-[#0c1017] p-5 h-full flex flex-col justify-between">
                  
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 group-hover:border-cyan-500/40 dark:group-hover:border-cyan-400/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                        <i className={`${skill.icon} text-lg`}></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {skill.desc}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      Verified
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    <span>DOMAIN: {categorizeSkill(skill.name)}</span>
                    <span className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">● ACTIVE</span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Show All / Show Less Motion Toggle Button */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={toggleShowAll}
              className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-mono tracking-wider uppercase text-slate-800 dark:text-white bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-300 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 shadow-sm hover:shadow-cyan-500/10 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span>{showAll ? "Show Less" : `Show All (${filteredSkills.length})`}</span>
              <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:bg-cyan-500/20">
                <i
                  className={`fa-solid fa-chevron-down text-[10px] text-cyan-600 dark:text-cyan-400 transition-transform duration-300 ${
                    showAll ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
