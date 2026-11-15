"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { IconType } from "react-icons";
import {
  FaCircleHalfStroke,
  FaCompass,
  FaGamepad,
  FaHandshake,
  FaUserSecret,
  FaLock,
  FaPalette,
  FaTrophy,
  FaXmark,
} from "react-icons/fa6";

// ---------- The list of achievements. Add new ones here. ----------
const ACHIEVEMENTS: { id: string; title: string; text: string; hint: string; icon: IconType }[] = [
  {
    id: "explorer",
    title: "Explorer",
    text: "Visited every section",
    hint: "Scroll through the whole page",
    icon: FaCompass,
  },
  {
    id: "colorful",
    title: "Colorful",
    text: "Tried all 5 accent colors",
    hint: "Try every color dot in the top bar",
    icon: FaPalette,
  },
  {
    id: "daynight",
    title: "Day & Night",
    text: "Switched between dark and light mode",
    hint: "Find the sun / moon button",
    icon: FaCircleHalfStroke,
  },
  {
    id: "networker",
    title: "Networker",
    text: "Opened a contact link",
    hint: "Reach out from the Contact section",
    icon: FaHandshake,
  },
  {
    id: "gamer",
    title: "Gamer",
    text: "Checked out one of my games",
    hint: "Play one of my games in the Arcade",
    icon: FaGamepad,
  },
  {
    id: "secret",
    title: "Secret Found",
    text: "Found the hidden game",
    hint: "Not every game is on display…",
    icon: FaUserSecret,
  },
];

// Other components call this to unlock an achievement, e.g. award("gamer").
export function award(id: string) {
  window.dispatchEvent(new CustomEvent("achievement", { detail: id }));
}

const SECTIONS = ["about", "skills", "projects", "contact"];
const COLORS = ["blue", "emerald", "violet", "amber", "rose"];
const STORAGE_KEY = "achievements";

// ---------- Tiny store: which achievements are unlocked (saved in localStorage) ----------
const EMPTY: string[] = [];
let unlocked: string[] | null = null;
const listeners = new Set<() => void>();

function getUnlocked() {
  if (unlocked === null) {
    try {
      unlocked = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      unlocked = [];
    }
  }
  return unlocked ?? EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Returns true only the first time an achievement is unlocked.
function unlock(id: string) {
  const current = getUnlocked();
  if (current.includes(id)) return false;
  unlocked = [...current, id];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
  } catch {
    // Storage blocked (private mode): still works for this visit.
  }
  listeners.forEach((l) => l());
  return true;
}

// ---------- Popup shown when something unlocks ----------
function Toast({ id }: { id: string }) {
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  if (!a) return null;
  const Icon = a.icon;
  return (
    <div className="toast-in pointer-events-auto flex w-72 items-center gap-3 rounded-xl border border-accent/40 bg-surface p-3 pr-4 shadow-2xl">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-on-accent">
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
          Achievement unlocked
        </p>
        <p className="truncate text-sm font-semibold">{a.title}</p>
        <p className="truncate text-xs text-muted">{a.text}</p>
      </div>
    </div>
  );
}

// ---------- Main component: watches what the visitor does ----------
export function Achievements() {
  const done = useSyncExternalStore(subscribe, getUnlocked, () => EMPTY);
  const [toasts, setToasts] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const grant = (id: string) => {
      if (!unlock(id)) return;
      setToasts((t) => [...t, id]);
      setTimeout(() => setToasts((t) => t.filter((x) => x !== id)), 4500); // hide popup
    };
    const root = document.documentElement;

    // Achievements sent from other components (see award() above)
    const onAward = (e: Event) => grant((e as CustomEvent<string>).detail);
    window.addEventListener("achievement", onAward);

    // Explorer: each section scrolled into view
    const seenSections = new Set<string>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) seenSections.add(e.target.id);
        if (SECTIONS.every((s) => seenSections.has(s))) award("explorer");
      },
      { threshold: 0.3 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // Colorful + Day & Night: watch the theme attributes on <html>
    const seenColors = new Set([root.getAttribute("data-accent") ?? "blue"]);
    const themeObserver = new MutationObserver((changes) => {
      for (const c of changes) {
        if (c.attributeName === "data-mode") award("daynight");
        if (c.attributeName === "data-accent") {
          seenColors.add(root.getAttribute("data-accent") ?? "");
          if (COLORS.every((col) => seenColors.has(col))) award("colorful");
        }
      }
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["data-accent", "data-mode"] });

    // Networker: any email or social link clicked
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (/^mailto:|github\.com|itch\.io|linkedin\.com|facebook\.com/.test(href)) award("networker");
    };
    document.addEventListener("click", onClick);

    // Esc closes the trophy panel
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("achievement", onAward);
      sectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const total = ACHIEVEMENTS.length;

  return (
    <div className="fixed right-4 bottom-4 z-[70] flex flex-col items-end gap-3">
      {/* Popups (screen readers hear them too) */}
      <div aria-live="polite" className="pointer-events-none flex flex-col items-end gap-2">
        {toasts.map((id) => (
          <Toast key={id} id={id} />
        ))}
      </div>

      {/* Trophy panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Achievements"
          className="toast-in w-72 rounded-2xl border border-line bg-surface p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">
              Achievements{" "}
              <span className="text-muted">
                {done.length}/{total}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close achievements"
              className="rounded-md p-1 text-muted hover:text-foreground"
            >
              <FaXmark aria-hidden="true" />
            </button>
          </div>
          {/* Progress bar */}
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${(done.length / total) * 100}%` }}
            />
          </div>
          <ul className="space-y-2">
            {ACHIEVEMENTS.map((a) => {
              const got = done.includes(a.id);
              const Icon = got ? a.icon : FaLock;
              return (
                <li key={a.id} className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                      got ? "bg-accent/15 text-accent" : "bg-background text-muted"
                    }`}
                  >
                    <Icon aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${got ? "" : "text-muted"}`}>{a.title}</p>
                    <p className="text-xs text-muted">{got ? a.text : a.hint}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          {done.length === total && (
            <p className="mt-4 rounded-lg bg-accent/10 p-2 text-center text-xs font-medium text-accent">
              All unlocked! Thanks for exploring.
            </p>
          )}
        </div>
      )}

      {/* Trophy button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Achievements: ${done.length} of ${total} unlocked`}
        className="flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3.5 py-2 text-sm font-medium shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/60"
      >
        <FaTrophy aria-hidden="true" className="text-accent" />
        <span className="font-mono text-xs text-muted">
          {done.length}/{total}
        </span>
      </button>
    </div>
  );
}
