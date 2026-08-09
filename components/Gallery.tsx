"use client";

import React, { useState } from "react";
import { galleryData } from "../data/portfolioData";
import { GalleryItem } from "../types/portfolio";
import ImageModal from "./ImageModal";

interface ImageModalState {
  isOpen: boolean;
  images: string[];
  index: number;
  galleryId: string | null;
}

export default function Gallery() {
  const [sliderIndices, setSliderIndices] = useState<Record<string, number>>({});
  const [imageModalState, setImageModalState] = useState<ImageModalState>({
    isOpen: false,
    images: [],
    index: 0,
    galleryId: null,
  });

  const getSliderIndex = (id: string): number => sliderIndices[id] || 0;

  const handlePrevSlide = (id: string) => {
    const current = getSliderIndex(id);
    if (current > 0) {
      setSliderIndices((prev) => ({ ...prev, [id]: current - 1 }));
    }
  };

  const handleNextSlide = (id: string, totalImages: number) => {
    const current = getSliderIndex(id);
    if (current < totalImages - 1) {
      setSliderIndices((prev) => ({ ...prev, [id]: current + 1 }));
    }
  };

  const setExactSlide = (id: string, idx: number) => {
    setSliderIndices((prev) => ({ ...prev, [id]: idx }));
  };

  const openImageModal = (item: GalleryItem, index: number) => {
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
        setSliderIndices((prev) => ({ ...prev, [imageModalState.galleryId!]: newIndex }));
      }
    }
  };

  const nextImageModal = () => {
    if (imageModalState.index < imageModalState.images.length - 1) {
      const newIndex = imageModalState.index + 1;
      setImageModalState((prev) => ({ ...prev, index: newIndex }));
      if (imageModalState.galleryId) {
        setSliderIndices((prev) => ({ ...prev, [imageModalState.galleryId!]: newIndex }));
      }
    }
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
              <span>05</span>
              <span>/</span>
              <span>EXHIBITIONS & DEMOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Public Exhibitions & Showcase
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 px-3.5 py-1.5 rounded-full">
            Live Showcase Archive
          </div>
        </div>

        {/* Gallery Cards */}
        <div className="space-y-12">
          {galleryData.map((item) => {
            const currentIndex = getSliderIndex(item.id);
            return (
              <div key={item.id} className="bezel-container border border-slate-200/80 dark:border-transparent">
                <div className="bezel-inner p-6 sm:p-8">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-cyan-700 dark:text-cyan-400 font-semibold">
                      Jakarta International Expo (JIEXPO)
                    </span>
                    <span>
                      Photo {currentIndex + 1} of {item.images.length}
                    </span>
                  </div>

                  {/* Main Slider Viewport */}
                  <div className="relative aspect-video sm:aspect-[21/9] rounded-xl overflow-hidden bg-black mb-6 group border border-slate-200 dark:border-white/5">
                    <div
                      className="flex h-full transition-transform duration-500 ease-out"
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                      {item.images.map((imgSrc, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={imgSrc}
                          alt={`${item.title} photo ${imgIdx + 1}`}
                          className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                          onClick={() => openImageModal(item, imgIdx)}
                          loading="lazy"
                        />
                      ))}
                    </div>

                    {/* Nav Controls */}
                    <button
                      onClick={() => handlePrevSlide(item.id)}
                      disabled={currentIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white flex items-center justify-center text-xs disabled:opacity-20 transition-all shadow-md"
                      aria-label="Previous image"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      onClick={() => handleNextSlide(item.id, item.images.length)}
                      disabled={currentIndex === item.images.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white flex items-center justify-center text-xs disabled:opacity-20 transition-all shadow-md"
                      aria-label="Next image"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>

                  {/* Thumbnail Filmstrip */}
                  <div className="flex gap-2.5 overflow-x-auto pb-2 mb-6">
                    {item.images.map((thumbSrc, tIdx) => (
                      <button
                        key={tIdx}
                        onClick={() => setExactSlide(item.id, tIdx)}
                        className={`relative w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all border ${
                          currentIndex === tIdx
                            ? "border-cyan-500 dark:border-cyan-400 ring-2 ring-cyan-500/20 dark:ring-cyan-400/20 scale-105"
                            : "border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={thumbSrc}
                          alt={`Thumbnail ${tIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Description Info */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                      {item.description}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
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
