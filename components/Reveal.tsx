"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll fade-up wrapper (Purdue-style entrance): the child starts
 * lowered + transparent and rises in when it scrolls into view.
 * Reduced-motion users see it static (see globals.css).
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    // Already in view on load (e.g. above the fold, or a very tall
    // viewport) — show immediately instead of waiting for a scroll
    // event that will never come.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`zass-reveal ${className}`}>
      {children}
    </div>
  );
}
