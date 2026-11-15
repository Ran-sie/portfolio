"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FaMoon, FaPalette, FaSun } from "react-icons/fa6";

// Swatch colors for the buttons. The real theme colors live in globals.css.
const accents = [
  { id: "blue", label: "Blue", swatch: "#3b82f6" },
  { id: "emerald", label: "Emerald", swatch: "#10b981" },
  { id: "violet", label: "Violet", swatch: "#8b5cf6" },
  { id: "amber", label: "Amber", swatch: "#f59e0b" },
  { id: "rose", label: "Rose", swatch: "#f43f5e" },
];

type Mode = "dark" | "light";

// The theme lives on <html data-accent="..." data-mode="...">.
// These helpers read it and re-render this component whenever it changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-accent", "data-mode"],
  });
  return () => observer.disconnect();
}
const getAccent = () => document.documentElement.getAttribute("data-accent") ?? "blue";
const getMode = () => (document.documentElement.getAttribute("data-mode") ?? "dark") as Mode;

function apply(name: "accent" | "mode", value: string) {
  document.documentElement.setAttribute(`data-${name}`, value);
  try {
    localStorage.setItem(name, value); // remember for next visit
  } catch {
    // Storage can be blocked (private mode). The theme still changes for this visit.
  }
}

export function ThemePicker() {
  const accent = useSyncExternalStore(subscribe, getAccent, () => "blue");
  const mode = useSyncExternalStore(subscribe, getMode, () => "dark" as Mode);
  const [open, setOpen] = useState(false); // mobile color menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu when clicking outside it.
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const swatches = (
    <div role="group" aria-label="Accent color" className="flex items-center gap-1.5">
      {accents.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={() => {
            apply("accent", a.id);
            setOpen(false);
          }}
          aria-label={a.label}
          aria-pressed={accent === a.id}
          title={a.label}
          className={`h-5 w-5 rounded-full transition-transform hover:scale-110 ${
            accent === a.id ? "ring-2 ring-foreground/70 ring-offset-2 ring-offset-background" : ""
          }`}
          style={{ backgroundColor: a.swatch }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      {/* Desktop: color dots always visible */}
      <div className="hidden md:block">{swatches}</div>

      {/* Mobile: dots open from a palette button */}
      <div ref={menuRef} className="relative md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Choose accent color"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-accent transition-colors hover:bg-surface"
        >
          <FaPalette aria-hidden="true" />
        </button>
        {open && (
          <div className="absolute right-0 top-11 rounded-xl border border-line bg-surface p-3 shadow-xl">
            {swatches}
          </div>
        )}
      </div>

      <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />

      <button
        type="button"
        onClick={() => apply("mode", mode === "dark" ? "light" : "dark")}
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={mode === "dark" ? "Light mode" : "Dark mode"}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
      >
        {mode === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
      </button>
    </div>
  );
}
