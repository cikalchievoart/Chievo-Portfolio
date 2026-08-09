"use client";

import React, { useState } from "react";
import { projectsData } from "../data/portfolioData";
import { Project } from "../types/portfolio";
import ImageModal from "./ImageModal";

interface Category {
  id: string;
  label: string;
  count: number;
}

interface ImageModalState {
  isOpen: boolean;
  images: string[];
  index: number;
  projectId: string | null;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [sliderIndices, setSliderIndices] = useState<Record<string, number>>({});
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const [imageModalState, setImageModalState] = useState<ImageModalState>({
    isOpen: false,
    images: [],
    index: 0,
    projectId: null,
  });

  const categories: Category[] = [
    { id: "ALL", label: "All Projects", count: projectsData.length },
    {
      id: "GAME",
      label: "VR & Games",
      count: projectsData.filter(
        (p) => p.tags.includes("Game") || p.tags.includes("Virtual Reality")
      ).length,
    },
    {
      id: "SIM",
      label: "Simulations & IoT",
      count: projectsData.filter(
        (p) => p.tags.includes("Simulation") || p.tags.includes("Internet of Things")
      ).length,
    },
    {
      id: "WEB",
      label: "Web & Apps",
      count: projectsData.filter(
        (p) =>
          p.tags.includes("Website Application") ||
          p.tags.includes("Mobile Application") ||
          p.tags.includes("Computer & Network")
      ).length,
    },
    {
      id: "MEDIA",
      label: "Media & 3D",
      count: projectsData.filter(
        (p) => p.tags.includes("Video") || p.tags.includes("Short Video")
      ).length,
    },
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "GAME")
      return project.tags.includes("Game") || project.tags.includes("Virtual Reality");
    if (activeCategory === "SIM")
      return project.tags.includes("Simulation") || project.tags.includes("Internet of Things");
    if (activeCategory === "WEB")
      return (
        project.tags.includes("Website Application") ||
        project.tags.includes("Mobile Application") ||
        project.tags.includes("Computer & Network")
      );
    if (activeCategory === "MEDIA")
      return project.tags.includes("Video") || project.tags.includes("Short Video");
    return true;
  });

  const limit = 4;
  const hasMore = filteredProjects.length > limit;
  const displayedProjects = showAll || !hasMore ? filteredProjects : filteredProjects.slice(0, limit);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setShowAll(false);
  };

  const toggleShowAll = () => {
    if (showAll) {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        const yOffset = -80;
        const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setShowAll((prev) => !prev);
  };

  const getSliderIndex = (id: string): number => sliderIndices[id] || 0;

  const handlePrevSlide = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const current = getSliderIndex(id);
    if (current > 0) {
      setSliderIndices((prev) => ({ ...prev, [id]: current - 1 }));
    }
  };

  const handleNextSlide = (e: React.MouseEvent, id: string, totalImages: number) => {
    e.stopPropagation();
    const current = getSliderIndex(id);
    if (current < totalImages - 1) {
      setSliderIndices((prev) => ({ ...prev, [id]: current + 1 }));
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const openImageModal = (project: Project, index: number) => {
    setImageModalState({
      isOpen: true,
      images: project.images,
      index: index,
      projectId: project.id,
    });
  };

  const closeImageModal = () => {
    setImageModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const prevImageModal = () => {
    if (imageModalState.index > 0) {
      const newIndex = imageModalState.index - 1;
      setImageModalState((prev) => ({ ...prev, index: newIndex }));
      if (imageModalState.projectId) {
        setSliderIndices((prev) => ({ ...prev, [imageModalState.projectId!]: newIndex }));
      }
    }
  };

  const nextImageModal = () => {
    if (imageModalState.index < imageModalState.images.length - 1) {
      const newIndex = imageModalState.index + 1;
      setImageModalState((prev) => ({ ...prev, index: newIndex }));
      if (imageModalState.projectId) {
        setSliderIndices((prev) => ({ ...prev, [imageModalState.projectId!]: newIndex }));
      }
    }
  };

  const openModal = (id: string) => {
    setActiveModalId(id);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModalId(null);
    document.body.style.overflow = "auto";
  };

  const activeProjectModal = projectsData.find((p) => p.id === activeModalId);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
              <span>02</span>
              <span>/</span>
              <span>FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Selected Projects & Systems
            </h2>
          </div>

          {/* Counter pill */}
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 px-3.5 py-1.5 rounded-full">
            Showing {filteredProjects.length} of {projectsData.length} items
          </div>
        </div>

        {/* Filter Pills */}
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
                    isActive
                      ? "bg-white/20 text-white dark:bg-black/15 dark:text-[#07090e]"
                      : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Layout with Motion Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {displayedProjects.map((project, idx) => {
            const currentIndex = getSliderIndex(project.id);
            // Asymmetric bento span calculation
            const isFeatured = idx % 4 === 0 || idx % 4 === 3;
            const colSpan = isFeatured
              ? "lg:col-span-8 md:col-span-2"
              : "lg:col-span-4 md:col-span-1";

            const isRevealed = idx >= limit;
            const animDelay = isRevealed ? (idx - limit) * 60 : Math.min(idx * 40, 200);

            return (
              <div
                key={`${activeCategory}-${project.id}`}
                onMouseMove={handleCardMouseMove}
                style={{ animationDelay: `${animDelay}ms` }}
                className={`${colSpan} animate-project-reveal group relative rounded-2xl p-[1px] bg-gradient-to-b from-slate-200 via-slate-100 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent hover:from-cyan-500/40 hover:to-indigo-500/20 transition-all duration-500 shadow-md dark:shadow-xl spotlight-card border border-slate-200/80 dark:border-transparent`}
              >
                <div className="rounded-[calc(1rem-1px)] bg-white dark:bg-[#0c1017] p-5 h-full flex flex-col justify-between overflow-hidden">
                  
                  <div>
                    {/* Card Top Metadata */}
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3.5">
                      <span className="text-cyan-700 dark:text-cyan-400 font-semibold">#{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-slate-500 truncate max-w-[150px]">
                        {project.tags[0] || "Engineering"}
                      </span>
                    </div>

                    {/* Image Preview / Slider */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-4 border border-slate-200 dark:border-white/5 group-hover:border-slate-300 dark:group-hover:border-white/15 transition-colors">
                      <div
                        className="flex h-full transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                      >
                        {project.images.map((imgSrc, imgIdx) => (
                          <img
                            key={imgIdx}
                            src={imgSrc}
                            alt={`${project.title} screenshot ${imgIdx + 1}`}
                            className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                            onClick={() => openImageModal(project, imgIdx)}
                            loading="lazy"
                          />
                        ))}
                      </div>

                      {/* Slider Navigation Arrows if multiple images */}
                      {project.images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <button
                            onClick={(e) => handlePrevSlide(e, project.id)}
                            disabled={currentIndex === 0}
                            className="pointer-events-auto w-7 h-7 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white flex items-center justify-center text-xs disabled:opacity-30 transition-all shadow-md"
                            aria-label="Previous image"
                          >
                            <i className="fas fa-chevron-left text-[10px]"></i>
                          </button>
                          <button
                            onClick={(e) =>
                              handleNextSlide(e, project.id, project.images.length)
                            }
                            disabled={currentIndex === project.images.length - 1}
                            className="pointer-events-auto w-7 h-7 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white flex items-center justify-center text-xs disabled:opacity-30 transition-all shadow-md"
                            aria-label="Next image"
                          >
                            <i className="fas fa-chevron-right text-[10px]"></i>
                          </button>
                        </div>
                      )}

                      {/* Image count pill */}
                      {project.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-slate-200 pointer-events-none">
                          {currentIndex + 1} / {project.images.length}
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {project.fullDescription}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400 dark:text-slate-500">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-2">
                    {project.linkUrl ? (
                      <a
                        href={project.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-cyan-50 dark:bg-white/[0.04] dark:hover:bg-cyan-500/20 text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-white/10 text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>View Project</span>
                        <span className="text-[10px] font-mono">↗</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => openModal(project.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-cyan-50 dark:bg-white/[0.04] dark:hover:bg-cyan-500/20 text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-white/10 text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Documentation</span>
                        <i className="fas fa-play text-[10px] text-cyan-600 dark:text-cyan-400"></i>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Show All / Show Less Motion Toggle Button */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={toggleShowAll}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs font-mono tracking-wider uppercase text-slate-800 dark:text-white bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-300 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 shadow-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span>
                {showAll ? "Show Less Projects" : `Show All Projects (${filteredProjects.length})`}
              </span>
              <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:scale-110">
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

      {/* Video / Documentation Detail Modal */}
      {activeProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 dark:bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-4">
              <div>
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                  Project Detail
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeProjectModal.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {/* Modal Media */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 border border-slate-200 dark:border-white/5">
              {activeProjectModal.modalType === "youtube" && (
                <iframe
                  className="w-full h-full"
                  src={activeProjectModal.embedUrl}
                  title={activeProjectModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
              {activeProjectModal.modalType === "gdrive" && (
                <iframe
                  className="w-full h-full"
                  src={activeProjectModal.embedUrl}
                  title={activeProjectModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {activeProjectModal.modalType === "customText" && (
                <div className="flex items-center justify-center h-full p-6 text-slate-700 dark:text-slate-300 font-mono text-center text-sm">
                  {activeProjectModal.customText}
                </div>
              )}
            </div>

            {/* Description & Tags */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {activeProjectModal.fullDescription}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {activeProjectModal.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan-700 dark:text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      <ImageModal
        isOpen={imageModalState.isOpen}
        onClose={closeImageModal}
        images={imageModalState.images}
        currentIndex={imageModalState.index}
        onPrev={prevImageModal}
        onNext={nextImageModal}
      />
    </section>
  );
}
