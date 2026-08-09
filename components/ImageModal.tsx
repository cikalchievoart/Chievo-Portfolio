"use client";

import React, { useEffect } from "react";
import { ImageModalProps } from "../types/portfolio";

export default function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
}: ImageModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onPrev, onNext, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-50 focus:outline-none"
        aria-label="Close image preview"
      >
        <i className="fas fa-times text-base"></i>
      </button>

      {/* Main Image Container */}
      <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Preview ${currentIndex + 1}`}
            className="w-full max-h-[75vh] object-contain select-none"
          />

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center disabled:opacity-20 transition-all focus:outline-none"
                aria-label="Previous image"
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </button>
              <button
                onClick={onNext}
                disabled={currentIndex === images.length - 1}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center disabled:opacity-20 transition-all focus:outline-none"
                aria-label="Next image"
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
            </>
          )}
        </div>

        {/* Counter Bar */}
        {images.length > 1 && (
          <div className="mt-3 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
