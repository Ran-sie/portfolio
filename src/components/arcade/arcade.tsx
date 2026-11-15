"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { FaArrowUpRightFromSquare, FaGamepad, FaItchIo, FaLightbulb, FaLock, FaPlay } from "react-icons/fa6";
import { games } from "../../data/profile";
import { GameModal } from "./game-modal";
import { award } from "../achievements";

// ---------- Is the secret game unlocked? (saved in localStorage) ----------
const SECRET_KEY = "secret-game";
const listeners = new Set<() => void>();
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const isUnlocked = () => {
  try {
    return localStorage.getItem(SECRET_KEY) === "1";
  } catch {
    return false;
  }
};
function saveUnlocked() {
  try {
    localStorage.setItem(SECRET_KEY, "1");
  } catch {}
  listeners.forEach((l) => l());
}

// Hints get clearer each time the visitor asks.
const HINTS = [
  "Every developer signs their work. Mine is at the very top.",
  "Knock, knock, knock, knock, knock.",
  "Click my initials in the top-left corner 5 times, fast.",
];

const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

let consoleHintShown = false;

export function Arcade() {
  const unlocked = useSyncExternalStore(subscribe, isUnlocked, () => false);
  const [playing, setPlaying] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);

  const close = useCallback(() => setPlaying(false), []);

  // Watch for the secret: 5 quick clicks on the logo, or the Konami code
  useEffect(() => {
    const reveal = () => {
      saveUnlocked();
      award("secret");
      setPlaying(true);
    };

    let clicks: number[] = [];
    const onClick = (e: MouseEvent) => {
      const logo = (e.target as HTMLElement).closest("[data-secret-logo]");
      if (!logo) return;
      const now = Date.now();
      clicks = [...clicks.filter((t) => now - t < 2000), now];
      if (clicks.length >= 5) {
        e.preventDefault();
        clicks = [];
        reveal();
      }
    };

    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector("[data-game-modal]")) return; // ignore while playing
      const key = e.key.toLowerCase();
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        reveal();
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);

    // A little message for developers who open the browser console
    if (!consoleHintShown) {
      consoleHintShown = true;
      console.log(
        "%c👾 psst… there's a secret game on this site.\n   Gamers know the code: ↑ ↑ ↓ ↓ ← → ← → B A",
        "font: 600 13px monospace; color: #3b82f6;"
      );
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      {/* ---------- My itch.io games ---------- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((g) => (
          <article
            key={g.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/50"
          >
            {/* Cover image (or a placeholder until you add one) */}
            <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-gradient-to-br from-accent/10 via-background to-accent/5">
              {g.image ? (
                <Image
                  src={g.image}
                  alt={`${g.title} cover`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <FaGamepad aria-hidden="true" className="h-12 w-12 text-accent/60" />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold">{g.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{g.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-line bg-background px-2 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-line pt-5 text-sm font-semibold">
                {g.link ? (
                  <a
                    href={g.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => award("gamer")}
                    className="inline-flex items-center gap-2 text-accent hover:underline"
                  >
                    <FaItchIo aria-hidden="true" /> Play on itch.io
                    <FaArrowUpRightFromSquare aria-hidden="true" className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-muted">Coming soon</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ---------- Secret game teaser ---------- */}
      <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface/50 p-5 sm:p-6">
        {unlocked ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm">
              <span aria-hidden="true">📦</span> <span className="font-semibold">Secret unlocked:</span>{" "}
              <span className="text-muted">Catch the Stack, a mini-game built right into this site.</span>
            </p>
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:brightness-110"
            >
              <FaPlay aria-hidden="true" className="h-3 w-3" /> Play
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-3 text-sm">
                <FaLock aria-hidden="true" className="shrink-0 text-muted" />
                <span>
                  <span className="font-semibold">There&apos;s another game you can play.</span>{" "}
                  <span className="text-muted">It&apos;s hidden somewhere on this site. Find it!</span>
                </span>
              </p>
              {hintsShown < HINTS.length && (
                <button
                  type="button"
                  onClick={() => setHintsShown((n) => n + 1)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
                >
                  <FaLightbulb aria-hidden="true" />
                  {hintsShown === 0 ? "Need a hint?" : "Another hint"}
                </button>
              )}
            </div>
            {hintsShown > 0 && (
              <ul aria-live="polite" className="mt-4 space-y-2">
                {HINTS.slice(0, hintsShown).map((h, i) => (
                  <li key={h} className="rounded-lg bg-background px-3 py-2 text-xs">
                    <span className="font-semibold text-accent">Hint {i + 1}:</span> {h}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {playing && <GameModal id="stack" onClose={close} />}
    </>
  );
}
