"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { SmartImage } from "./smart-image";

interface GalleryProps {
  images: string[];
  alt: string;
}

/**
 * Property gallery: main image, thumbnail strip, and a full-screen lightbox
 * with keyboard navigation.
 */
export function Gallery({ images, alt }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev]);

  return (
    <div className="gallery">
      <button
        type="button"
        className="gallery__main"
        onClick={() => setLightbox(true)}
        aria-label={`Open ${alt} photo ${index + 1} in full screen`}
      >
        <SmartImage
          name={images[index]}
          alt={`${alt}, photo ${index + 1} of ${images.length}`}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
        />
        <span
          style={{
            position: "absolute",
            right: 14,
            bottom: 14,
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "rgba(26,26,26,0.65)",
            color: "var(--on-accent)",
            display: "grid",
            placeItems: "center",
          }}
          aria-hidden="true"
        >
          <Maximize2 size={17} />
        </span>
      </button>

      <div className="gallery__thumbs">
        {images.map((img, i) => (
          <button
            key={img + i}
            type="button"
            className={`gallery__thumb ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
          >
            <SmartImage
              name={img}
              alt={`${alt} thumbnail ${i + 1}`}
              width={220}
              height={165}
              sizes="120px"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button
            type="button"
            className="lightbox__close"
            onClick={() => setLightbox(false)}
            aria-label="Close photo viewer"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={prev}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lightbox__img"
            src={`/images/${images[index]}.jpg`}
            alt={`${alt}, photo ${index + 1} of ${images.length}`}
          />
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={next}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
          <div className="lightbox__caption">
            {alt} | {index + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
