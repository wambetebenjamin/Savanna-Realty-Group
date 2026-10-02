"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

/**
 * Counts up from zero when scrolled into view. Reduced motion users see the
 * final value immediately.
 */
export function Counter({ to, suffix = "", prefix = "", duration = 1600 }: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (v: number) =>
      setValue(
        to >= 100 ? Math.round(v) : Math.round(v * 10) / 10,
      );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          render(to * eased);
          if (t < 1) requestAnimationFrame(step);
          else render(to);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="stat__value">
      {prefix}
      {value.toLocaleString("en-KE")}
      {suffix}
    </span>
  );
}
