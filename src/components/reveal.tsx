"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades its children in when they scroll into view.
// Content is visible by default; it is only hidden (to animate in) once JavaScript
// has loaded and the element is still below the screen. So nothing ever gets stuck invisible.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number; // milliseconds
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={state === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${state === "idle" ? "" : "reveal"} ${state === "shown" ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
