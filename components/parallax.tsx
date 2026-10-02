"use client";

import { useEffect, useRef } from "react";
import { SmartImage } from "./smart-image";

interface ParallaxBgProps {
  /** image name inside /public/images */
  image: string;
  alt: string;
  /** movement speed, 0.3 per the animation direction */
  speed?: number;
}

/**
 * Background layer for full-width editorial bands. Drifts at 0.3x scroll
 * speed. Disabled for prefers-reduced-motion.
 */
export function ParallaxBg({ image, alt, speed = 0.3 }: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const viewportCenter = window.innerHeight / 2;
      const bandCenter = rect.top + rect.height / 2;
      const delta = bandCenter - viewportCenter;
      el.style.transform = `translate3d(0, ${(delta * speed).toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div className="band__bg" ref={ref}>
      <SmartImage name={image} alt={alt} fill sizes="100vw" />
    </div>
  );
}
