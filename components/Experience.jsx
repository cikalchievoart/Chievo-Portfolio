"use client";

import { experienceData } from "../data/portfolioData";

export default function Experience() {
  const getDuration = (exp) => {
    if (!exp.period.toLowerCase().endsWith("present")) {
      return exp.duration;
    }
    const parts = exp.period.split("-");
    const startStr = parts[0].trim(); // e.g. "Jun 2026"
    const startParts = startStr.split(" ");
    const monthName = startParts[0];
    const year = parseInt(startParts[1], 10);

    const monthMap = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const startMonth = monthMap[monthName] !== undefined ? monthMap[monthName] : 5;

    const start = new Date(year, startMonth);
    const now = new Date();

    const yearsDiff = now.getFullYear() - start.getFullYear();
    const monthsDiff = now.getMonth() - start.getMonth() + 1; // inclusive
    const totalMonths = (yearsDiff * 12) + monthsDiff;

    if (totalMonths <= 0) return "1 mo";

    const yrs = Math.floor(totalMonths / 12);
    const mos = totalMonths % 12;

    let durationStr = "";
    if (yrs > 0) {
      durationStr += `${yrs} yr${yrs > 1 ? "s" : ""} `;
    }
    if (mos > 0) {
      durationStr += `${mos} mo${mos > 1 ? "s" : ""}`;
    }
    return durationStr.trim() || "1 mo";
  };

  return (
    <section id="experience" className="py-16 bg-[#131c2e] border-t border-white/5 crt-scanlines">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-4">
          <div>
            <div className="font-mono text-xs text-[#11f3d3] tracking-widest uppercase mb-1">
              // SECTION 04 — QUEST TREE & MISSION TIMELINE
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              MISSION <span className="text-[#ff3366]">TIMELINE</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-400 mt-2 md:mt-0">
            QUEST COMPLETED: [{experienceData.length}]
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l border-[#11f3d3]/30 ml-4 md:ml-8 space-y-12">
          {experienceData.map((exp, idx) => {
            const isPresent = exp.period.toLowerCase().endsWith("present");
            const duration = getDuration(exp);

            return (
              <div key={idx} className="relative group">
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 z-10 flex items-center justify-center">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 ${
                    isPresent
                      ? "bg-[#11f3d3] border-[#11f3d3] animate-pulse"
                      : "bg-[#090d16] border-[#ff3366]"
                  } flex items-center justify-center`}>
                    {isPresent && <span className="w-1.5 h-1.5 bg-[#090d16] rounded-full"></span>}
                  </div>
                  {/* Outer pulse aura for present job */}
                  {isPresent && (
                    <div className="absolute w-6 h-6 border border-[#11f3d3]/30 rounded-full animate-ping pointer-events-none"></div>
                  )}
                </div>

                {/* Experience Card */}
                <div className="bg-[#090d16] p-5 rounded-lg border border-[#11f3d3]/20 hover:border-[#11f3d3]/50 transition duration-300 shadow-xl clip-cyber-card relative">
                  {/* Glowing Laser line for active node */}
                  {isPresent && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#11f3d3] to-[#ff3366]"></div>
                  )}

                  {/* Header Telemetry */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start pb-3 border-b border-white/10 mb-4 font-mono text-xs">
                    <div>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded mr-2 ${
                        isPresent
                          ? "bg-[#11f3d3]/10 text-[#11f3d3] border border-[#11f3d3]/30"
                          : "bg-white/5 text-gray-400 border border-white/10"
                      }`}>
                        {isPresent ? "ACTIVE MISSION" : "STAGE CLEARED"}
                      </span>
                      <h3 className="text-base font-bold text-white uppercase tracking-wide mt-2">
                        {exp.role} <span className="text-[#11f3d3]">@ {exp.company}</span>
                      </h3>
                      <div className="text-gray-400 mt-1">
                        TYPE: {exp.type}
                      </div>
                    </div>
                    <div className="text-left sm:text-right text-gray-500 mt-2 sm:mt-0 font-mono">
                      <div className="text-white font-bold">[{exp.period} · {duration}]</div>
                      <div className="text-[10px] text-[#ff3366] uppercase font-bold">{exp.location}</div>
                    </div>
                  </div>

                  {/* Details objectives list */}
                  <div className="space-y-2 mb-4 pl-4 border-l border-white/10">
                    {exp.details.map((detail, dIdx) => (
                      <p key={dIdx} className="text-xs text-gray-300 leading-relaxed font-sans">
                        • {detail}
                      </p>
                    ))}
                  </div>

                  {/* Acquired Skills badges */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-gray-400">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-[#131c2e] border border-white/10 rounded text-[#11f3d3] uppercase hover:border-[#11f3d3]/40 transition"
                      >
                        [{skill}]
                      </span>
                    ))}
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
