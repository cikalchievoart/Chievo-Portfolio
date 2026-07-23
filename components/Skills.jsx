"use client";

import { useState } from "react";
import { skillsData } from "../data/portfolioData";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("game");

  const getSkillLevel = (name) => {
    switch (name) {
      case "Unity": return 95;
      case "C#": return 90;
      case "Embedded Systems Integration": return 85;
      case "Software Troubleshooting": return 92;
      case "Internet of Things": return 80;
      case "IT Support": return 95;
      case "Hardware Troubleshooting": return 90;
      case "Networking": return 85;
      case "System Administrator": return 85;
      case "UI/UX Design": return 88;
      case "Adobe Premiere Pro":
      case "Video Editing": return 92;
      case "Videography": return 90;
      case "Photography": return 85;
      default: return 85;
    }
  };

  const gameDevSkills = [
    "Unity", "C#", "Embedded Systems Integration", "Software Troubleshooting", "Internet of Things"
  ];
  const itNetSkills = [
    "IT Support", "Hardware Troubleshooting", "Networking", "System Administrator", "Microsoft Office"
  ];

  const categorizeSkill = (skill) => {
    if (gameDevSkills.includes(skill.name)) return "game";
    if (itNetSkills.includes(skill.name)) return "it";
    return "media";
  };

  const gameCategory = skillsData.filter((s) => categorizeSkill(s) === "game");
  const itCategory = skillsData.filter((s) => categorizeSkill(s) === "it");
  const mediaCategory = skillsData.filter((s) => categorizeSkill(s) === "media");

  const pillars = [
    { id: "game", title: "01 // GAME DEV & VR", color: "text-[#11f3d3]", barClass: "xp-bar-fill", items: gameCategory },
    { id: "it", title: "02 // IT INFRASTRUCTURE", color: "text-[#ff3366]", barClass: "xp-bar-fill-red", items: itCategory },
    { id: "media", title: "03 // MULTIMEDIA & DESIGN", color: "text-emerald-400", barClass: "xp-bar-fill", items: mediaCategory },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section id="skills" className="py-16 bg-[#090d16] border-t border-white/5 crt-scanlines swiss-grid-pattern">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-white/10 pb-4">
          <div>
            <div className="font-mono text-xs text-[#11f3d3] tracking-widest uppercase mb-1">
              // SECTION 03 — ABILITY TREE & SKILL CONSOLE
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              ABILITY <span className="text-[#ff3366]">MATRIX</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-400 mt-2 md:mt-0">
            TOTAL ABILITIES: [{skillsData.length}]
          </div>
        </div>

        {/* Pillar Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`px-4 py-2 rounded transition uppercase border font-bold ${
                activeTab === pillar.id
                  ? "bg-[#11f3d3] text-[#090d16] border-[#11f3d3] shadow-md shadow-[#11f3d3]/20"
                  : "bg-[#131c2e] text-gray-300 border-white/10 hover:border-[#11f3d3]/40"
              }`}
            >
              {pillar.title} ({pillar.items.length})
            </button>
          ))}
        </div>

        {/* Space-Efficient Skill Tree Console */}
        <div className="bg-[#131c2e] p-6 rounded-lg border border-[#11f3d3]/30 shadow-2xl hud-corner">
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/10 font-mono text-xs">
            <span className={`font-bold uppercase ${currentPillar.color}`}>
              ACTIVE PILLAR: [{currentPillar.title}]
            </span>
            <span className="text-gray-400">XP CAPACITY: 100%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {currentPillar.items.map((skill, sIdx) => {
              const level = getSkillLevel(skill.name);
              return (
                <div key={sIdx} className="space-y-1 bg-[#090d16] p-3 rounded border border-white/5 hover:border-[#11f3d3]/40 transition">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-white font-bold flex items-center space-x-2">
                      <i className={`${skill.icon} text-[#11f3d3] text-sm w-5 text-center`}></i>
                      <span>{skill.name}</span>
                    </span>
                    <span className={`${currentPillar.color} font-bold`}>{level}% XP</span>
                  </div>

                  {/* XP Progress Bar */}
                  <div className="w-full h-1.5 xp-bar-bg">
                    <div
                      className={currentPillar.barClass}
                      style={{ width: `${level}%` }}
                    ></div>
                  </div>

                  <div className="text-[10px] font-mono text-gray-400 flex justify-between pt-0.5">
                    <span>LEVEL: MASTER</span>
                    <span>[{skill.desc}]</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
