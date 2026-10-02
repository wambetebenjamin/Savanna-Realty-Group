"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Home, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";
import { SmartImage } from "./smart-image";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="t-card__stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          aria-hidden="true"
          fill={i < rating ? "currentColor" : "none"}
          strokeWidth={1.6}
        />
      ))}
    </div>
  );
}

/**
 * Horizontal scroll-snap testimonial carousel with arrow controls.
 */
export function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".t-card");
    const amount = card ? card.offsetWidth + 22 : 440;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <div>
      <div className="carousel" ref={trackRef} tabIndex={0} aria-label="Client testimonials">
        {TESTIMONIALS.map((t) => (
          <article className="t-card" key={t.name}>
            <Stars rating={t.rating} />
            <blockquote className="t-card__quote">{t.quote}</blockquote>
            <div className="t-card__person">
              <div className="t-card__avatar">
                <SmartImage
                  name={t.image}
                  alt={`Portrait of ${t.name}`}
                  width={104}
                  height={104}
                />
              </div>
              <div>
                <div className="t-card__name">{t.name}</div>
                <div className="t-card__purchase">
                  <Home size={13} aria-hidden="true" />
                  {t.purchase}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-btn"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="carousel-btn"
          onClick={() => scrollByCard(1)}
          aria-label="Next testimonials"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
