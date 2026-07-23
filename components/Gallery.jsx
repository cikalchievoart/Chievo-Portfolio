"use client";

import { useState } from "react";
import { galleryData } from "../data/portfolioData";
import ImageModal from "./ImageModal";

export default function Gallery() {
  const [sliderIndices, setSliderIndices] = useState({});
  const [imageModalState, setImageModalState] = useState({
    isOpen: false,
    images: [],
    index: 0,
    galleryId: null,
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

  const openImageModal = (item, index) => {
    setImageModalState({
      isOpen: true,
      images: item.images,
      index: index,
      galleryId: item.id,
    });
  };

  const closeImageModal = () => {
    setImageModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const prevImageModal = () => {
    if (imageModalState.index > 0) {
      const newIndex = imageModalState.index - 1;
      setImageModalState((prev) => ({ ...prev, index: newIndex }));
      if (imageModalState.galleryId) {
        setSliderIndices((prev) => ({ ...prev, [imageModalState.galleryId]: newIndex }));
      }
    }
  };

  const nextImageModal = () => {
    if (imageModalState.index < imageModalState.images.length - 1) {
      const newIndex = imageModalState.index + 1;
      setImageModalState((prev) => ({ ...prev, index: newIndex }));
      if (imageModalState.galleryId) {
        setSliderIndices((prev) => ({ ...prev, [imageModalState.galleryId]: newIndex }));
      }
    }
  };

  return (
    <section id="gallery" className="py-16 bg-[#090d16] swiss-grid-pattern crt-scanlines border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-white/10 pb-4">
          <div>
            <div className="font-mono text-xs text-[#ff3366] tracking-widest uppercase mb-1">
              // SECTION 05 — EVENT EXHIBITION
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              EXHIBITION <span className="text-[#11f3d3]">REPLAY</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-400 mt-2 md:mt-0">
            RECORDING: [INTI EXPO 2024]
          </div>
        </div>

        {/* Gallery Content */}
        <div className="grid grid-cols-1 gap-8 justify-items-center">
          {galleryData.map((item) => {
            const currentIndex = getSliderIndex(item.id);
            return (
              <div
                key={item.id}
                className="gallery-card bg-[#131c2e] hud-border rounded-lg overflow-hidden shadow-2xl clip-cyber-card"
              >
                {/* Header Telemetry */}
                <div className="px-6 py-2.5 bg-[#1a263d] border-b border-white/10 flex justify-between items-center font-mono text-xs">
                  <span className="text-gray-300">LOCATION: JAKARTA INTERNATIONAL EXPO</span>
                  <span className="text-[#ff3366] font-bold">
                    FRAME [{currentIndex + 1} / {item.images.length}]
                  </span>
                </div>

                <div className="gallery-slider">
                  <div
                    className="gallery-images"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {item.images.map((imgSrc, imgIdx) => (
                      <img
                        key={imgIdx}
                        loading="lazy"
                        src={imgSrc}
                        alt={`${item.title} Photo ${imgIdx + 1}`}
                        onClick={() => openImageModal(item, imgIdx)}
                      />
                    ))}
                  </div>
                  <div className="slider-nav">
                    <button
                      className="prev-btn"
                      disabled={currentIndex === 0}
                      onClick={() => handlePrevSlide(item.id)}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      className="next-btn"
                      disabled={currentIndex === item.images.length - 1}
                      onClick={() => handleNextSlide(item.id, item.images.length)}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-xs md:text-sm border-l-2 border-[#ff3366] pl-4">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Modal for Gallery */}
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
