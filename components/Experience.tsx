"use client";

import React from "react";
import { experienceData } from "../data/portfolioData";
import { ExperienceItem } from "../types/portfolio";

export default function Experience() {
  const getDuration = (exp: ExperienceItem): string => {
    if (!exp.period.toLowerCase().endsWith("present")) {
      return exp.duration;
    }
    const parts = exp.period.split("-");
    const startStr = parts[0].trim();
    const startParts = startStr.split(" ");
    const monthName = startParts[0];
    const year = parseInt(startParts[1], 10);

    const monthMap: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const startMonth = monthMap[monthName] !== undefined ? monthMap[monthName] : 5;

    const start = new Date(year, startMonth);
    const now = new Date();

    const yearsDiff = now.getFullYear() - start.getFullYear();
    const monthsDiff = now.getMonth() - start.getMonth() + 1;
    const totalMonths = yearsDiff * 12 + monthsDiff;

    if (totalMonths <= 0) return "1 mo";

    const yrs = Math.floor(totalMonths / 12);
    const mos = totalMonths % 12;

    let durationStr = "";
    if (yrs > 0) durationStr += `${yrs} yr${yrs > 1 ? "s" : ""} `;
    if (mos > 0) durationStr += `${mos} mo${mos > 1 ? "s" : ""}`;
    return durationStr.trim() || "1 mo";
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
              <span>04</span>
              <span>/</span>
              <span>PROFESSIONAL JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Experience & Milestones
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 px-3.5 py-1.5 rounded-full">
            Continuous Engineering Track
          </div>
        </div>

        {/* Timeline Rail */}
        <div className="relative pl-6 sm:pl-10 border-l border-slate-200 dark:border-white/10 ml-2 sm:ml-4 space-y-12">
          {experienceData.map((exp, idx) => {
            const isPresent = exp.period.toLowerCase().endsWith("present");
            const duration = getDuration(exp);

            return (
              <div key={idx} className="relative group">
                
                {/* Glowing Node on the rail */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 z-10 flex items-center justify-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                      isPresent
                        ? "bg-cyan-500 dark:bg-cyan-400 border-cyan-500 dark:border-cyan-400 shadow-md shadow-cyan-500/30 scale-110"
                        : "bg-white dark:bg-[#07090e] border-slate-300 dark:border-slate-600 group-hover:border-cyan-500 dark:group-hover:border-cyan-400"
                    }`}
                  />
                  {isPresent && (
                    <div className="absolute w-6 h-6 rounded-full border border-cyan-500/40 dark:border-cyan-400/40 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Experience Double-Bezel Card */}
                <div className="bezel-container border border-slate-200/80 dark:border-transparent">
                  <div className="bezel-inner p-5 sm:p-7">
                    
                    {/* Top Row: Role, Company & Time */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-white/10">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                              isPresent
                                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                                : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10"
                            }`}
                          >
                            {isPresent ? "Current Position" : exp.type}
                          </span>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{exp.location}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                          {exp.role}{" "}
                          <span className="text-slate-500 dark:text-slate-400 font-normal">@ {exp.company}</span>
                        </h3>
                      </div>

                      <div className="font-mono text-xs text-slate-500 dark:text-slate-400 sm:text-right bg-slate-50 dark:bg-white/[0.02] sm:bg-transparent p-2 sm:p-0 rounded-lg">
                        <div className="text-slate-800 dark:text-slate-200 font-semibold">{exp.period}</div>
                        <div className="text-slate-400 dark:text-slate-500 text-[11px] mt-0.5">{duration}</div>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 mb-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="text-cyan-600 dark:text-cyan-400 font-mono mt-1 text-xs">▹</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Acquired Skills Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-white/5">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
