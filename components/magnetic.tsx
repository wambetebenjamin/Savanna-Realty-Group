"use client";

import { useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** max pixel pull toward the pointer */
  strength?: number;
}

/**
 * Magnetic pointer response wrapper. Pulls its child gently toward the
 * cursor. Only activates for fine pointers (mouse) and when the user has
 * not requested reduced motion.
 */
export function Magnetic({ children, className = "", strength = 6 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  function handleMove(e: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `translate(${relX * strength * 2}px, ${relY * strength}px)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ display: "inline-block", transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </span>
  );
}
