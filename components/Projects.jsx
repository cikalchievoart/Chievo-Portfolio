"use client";

import { useState } from "react";
import { projectsData } from "../data/portfolioData";
import ImageModal from "./ImageModal";

function truncateText(text, wordLimit = 18) {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sliderIndices, setSliderIndices] = useState({});
  const [expandedDescs, setExpandedDescs] = useState({});
  const [activeModalId, setActiveModalId] = useState(null);

  const [imageModalState, setImageModalState] = useState({
    isOpen: false,
    images: [],
    index: 0,
    projectId: null,
  });

  const categories = [
    { id: "ALL", label: "ALL QUESTS", count: projectsData.length },
    { id: "GAME", label: "🎮 VR & GAMES", count: projectsData.filter((p) => p.tags.includes("Game") || p.tags.includes("Virtual Reality")).length },
    { id: "SIM", label: "🔧 SIM & IOT", count: projectsData.filter((p) => p.tags.includes("Simulation") || p.tags.includes("Internet of Things")).length },
    { id: "WEB", label: "💻 WEB & APP", count: projectsData.filter((p) => p.tags.includes("Website Application") || p.tags.includes("Mobile Application") || p.tags.includes("Computer & Network")).length },
    { id: "MEDIA", label: "🎬 VIDEO & MEDIA", count: projectsData.filter((p) => p.tags.includes("Video") || p.tags.includes("Short Video")).length },
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "GAME") return project.tags.includes("Game") || project.tags.includes("Virtual Reality");
    if (activeCategory === "SIM") return project.tags.includes("Simulation") || project.tags.includes("Internet of Things");
    if (activeCategory === "WEB") return project.tags.includes("Website Application") || project.tags.includes("Mobile Application") || project.tags.includes("Computer & Network");
    if (activeCategory === "MEDIA") return project.tags.includes("Video") || project.tags.includes("Short Video");
    return true;
  });

  const getSliderIndex = (id) => sliderIndices[id] || 0;

  const handlePrevSlide = (id) => {
    const current = getSliderIndex(id);
    if (current > 0) {
      setSliderIndices((prev) => ({ ...prev, [id]: current - 1 }));
    }
  };

  const handleNextSlide = (id, totalImages) => {
    const current = getSliderIndex(id);
    if (current < totalImages - 1) {
      setSliderIndices((prev) => ({ ...prev, [id]: current + 1 }));
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openImageModal = (project, index) => {
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
        setSliderIndices((prev) => ({ ...prev, [imageModalState.projectId]: newIndex }));
      }
    }
  };

  const nextImageModal = () => {
    if (imageModalState.index < imageModalState.images.length - 1) {
      const newIndex = imageModalState.index + 1;
      setImageModalState((prev) => ({ ...prev, index: newIndex }));
      if (imageModalState.projectId) {
        setSliderIndices((prev) => ({ ...prev, [imageModalState.projectId]: newIndex }));
      }
    }
  };

  const openModal = (id) => {
    setActiveModalId(id);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModalId(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="projects" className="py-16 bg-[#131c2e] border-y border-white/5 crt-scanlines">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-white/10 pb-4">
          <div>
            <div className="font-mono text-xs text-[#11f3d3] tracking-widest uppercase mb-1">
              // SECTION 02 — QUEST GALLERY
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              PROJECT <span className="text-[#ff3366]">QUESTS</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-400 mt-2 md:mt-0">
            SHOWING: [{filteredProjects.length} / {projectsData.length}]
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded transition uppercase border ${
                activeCategory === cat.id
                  ? "bg-[#11f3d3] text-[#090d16] border-[#11f3d3] font-bold shadow-md shadow-[#11f3d3]/20"
                  : "bg-[#090d16] text-gray-300 border-white/10 hover:border-[#11f3d3]/40"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Dynamic Row-First Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredProjects.map((project, idx) => {
            const currentIndex = getSliderIndex(project.id);
            const isExpanded = !!expandedDescs[project.id];
            const shortDesc = truncateText(project.fullDescription, 18);

            return (
              <div
                key={project.id}
                className="w-full project-card bg-[#090d16] hud-border rounded-lg overflow-hidden shadow-xl clip-cyber-card group flex flex-col justify-between"
              >
                <div>
                  {/* Quest Card Bar */}
                  <div className="px-3 py-1.5 bg-[#1a263d] border-b border-white/10 flex justify-between items-center font-mono text-[11px]">
                    <span className="text-[#11f3d3] font-bold">QUEST #{String(idx + 1).padStart(2, "0")}</span>
                    <span className="text-[#ff3366] font-bold">RANK: S-CLASS</span>
                  </div>

                  {/* Image Slider */}
                  <div className="project-slider">
                    <div
                      className="project-gallery"
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                      {project.images.map((imgSrc, imgIdx) => (
                        <img
                          key={imgIdx}
                          loading="lazy"
                          src={imgSrc}
                          alt={`${project.title} Screenshot ${imgIdx + 1}`}
                          onClick={() => openImageModal(project, imgIdx)}
                        />
                      ))}
                    </div>
                    <div className="slider-nav">
                      <button
                        className="prev-btn"
                        disabled={currentIndex === 0}
                        onClick={() => handlePrevSlide(project.id)}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button
                        className="next-btn"
                        disabled={currentIndex === project.images.length - 1}
                        onClick={() => handleNextSlide(project.id, project.images.length)}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[#11f3d3] transition">
                      {project.title}
                    </h3>
                    
                    <div className="project-description text-xs leading-relaxed">
                      {isExpanded ? (
                        <p className="text-gray-300 mb-2">
                          {project.fullDescription}
                        </p>
                      ) : (
                        <p className="text-gray-400 mb-2">
                          {shortDesc}
                        </p>
                      )}
                      <button
                        onClick={() => toggleDescription(project.id)}
                        className="toggle-description text-[#11f3d3] font-mono text-[11px] font-semibold hover:text-[#ff3366] transition focus:outline-none"
                      >
                        {isExpanded ? "[ LESS ▲ ]" : "[ MORE ▼ ]"}
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 my-3">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-1.5 py-0.5 bg-[#131c2e] border border-white/10 rounded font-mono text-[10px] text-[#11f3d3] uppercase"
                        >
                          [{tag}]
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-4 pt-0">
                  {project.linkUrl ? (
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full py-2 bg-[#131c2e] border border-[#11f3d3]/30 text-[#11f3d3] font-mono text-[11px] uppercase tracking-wider rounded hover:bg-[#11f3d3] hover:text-[#090d16] transition font-bold"
                    >
                      [ INSPECT DOCUMENTATION ] →
                    </a>
                  ) : (
                    <button
                      onClick={() => openModal(project.id)}
                      className="block text-center w-full py-2 bg-[#131c2e] border border-[#11f3d3]/30 text-[#11f3d3] font-mono text-[11px] uppercase tracking-wider rounded hover:bg-[#11f3d3] hover:text-[#090d16] transition font-bold"
                    >
                      [ INSPECT DOCUMENTATION ] →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Documentation Modals */}
      {projectsData.map((project) => {
        if (!activeModalId || activeModalId !== project.id) return null;

        return (
          <div
            key={`modal-${project.id}`}
            className="modal flex"
            style={{ display: "flex" }}
            onClick={(e) => {
              if (e.target.classList.contains("modal")) {
                closeModal();
              }
            }}
          >
            <div className="modal-content">
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-white/10 font-mono text-xs">
                <span className="text-[#11f3d3]">DOC // {project.title}</span>
                <span className="modal-close" onClick={closeModal}>
                  <i className="fas fa-times text-[#ff3366]"></i>
                </span>
              </div>

              {project.modalType === "youtube" && (
                <iframe
                  width="560"
                  height="315"
                  src={project.embedUrl}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}
              {project.modalType === "gdrive" && (
                <iframe
                  src={project.embedUrl}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              {project.modalType === "customText" && (
                <p className="text-gray-300 font-mono text-center p-8">
                  {project.customText}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Fullscreen Image Modal */}
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
