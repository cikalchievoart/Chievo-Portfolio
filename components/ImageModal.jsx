"use client";

import { useEffect } from "react";

export default function ImageModal({ isOpen, onClose, images, currentIndex, onPrev, onNext }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div
      className="image-modal flex"
      style={{ display: "flex" }}
      onClick={(e) => {
        if (e.target.classList.contains("image-modal")) {
          onClose();
        }
      }}
    >
      <div className="image-modal-content">
        <span className="image-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </span>
        <img
          id="modal-image"
          src={images[currentIndex]}
          alt={`Project Image ${currentIndex + 1}`}
          onClick={onNext}
        />
        <div className="image-slider-nav">
          <button
            className="prev-btn"
            disabled={currentIndex === 0}
            onClick={onPrev}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="next-btn"
            disabled={currentIndex === images.length - 1}
            onClick={onNext}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
