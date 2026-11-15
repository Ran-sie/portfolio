"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaRotateRight, FaXmark } from "react-icons/fa6";
import { readTheme, runGame, type Game, type GameEvents, type Theme } from "./engine";
import { createCatchStack } from "./catch-stack";

// Built-in mini-games (only the secret one for now). Add more here later.
export type GameId = "stack";

export const GAMES: Record<
  GameId,
  { title: string; emoji: string; blurb: string; how: string; create: (t: Theme, e: GameEvents) => Game }
> = {
  stack: {
    title: "Catch the Stack",
    emoji: "📦",
    blurb: "Catch the tech stack. Avoid the bombs.",
    how: "Catch the falling tech, avoid the 💣. Miss 3 tech and it's over.",
    create: createCatchStack,
  },
};

function loadBest(id: GameId) {
  try {
    return Number(localStorage.getItem(`best-${id}`)) || 0;
  } catch {
    return 0;
  }
}

export function GameModal({ id, onClose }: { id: GameId; onClose: () => void }) {
  const info = GAMES[id];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest(id));
  const [newBest, setNewBest] = useState(false);
  const [run, setRun] = useState(0); // bump to restart

  // Run the game while playing
  useEffect(() => {
    if (phase !== "playing" || !canvasRef.current) return;
    const game = GAMES[id].create(readTheme(), {
      onScore: setScore,
      onOver: (final) => {
        setPhase("over");
        if (final > best) {
          setBest(final);
          setNewBest(true);
          try {
            localStorage.setItem(`best-${id}`, String(final));
          } catch {}
        }
      },
    });
    return runGame(canvasRef.current, game);
  }, [phase, run, id, best]);

  // Esc closes; lock page scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [onClose]);

  const start = () => {
    setScore(0);
    setNewBest(false);
    setPhase("playing");
    setRun((r) => r + 1);
  };

  return (
    <div
      data-game-modal
      role="dialog"
      aria-modal="true"
      aria-label={info.title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="toast-in w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="font-semibold">
            <span aria-hidden="true">{info.emoji}</span> {info.title}
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-xs text-muted">
              SCORE <span className="text-base font-bold text-accent">{score}</span>
              <span className="mx-2">·</span>
              BEST <span className="text-foreground">{best}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close game"
              className="rounded-md p-1.5 text-muted hover:bg-background hover:text-foreground"
            >
              <FaXmark aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Game area */}
        <div className="relative aspect-[4/3] w-full bg-background">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />

          {phase !== "playing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/85 p-6 text-center backdrop-blur-[2px]">
              {phase === "ready" ? (
                <>
                  <p className="text-5xl" aria-hidden="true">
                    {info.emoji}
                  </p>
                  <p className="text-2xl font-bold">{info.title}</p>
                  <p className="max-w-xs text-sm text-muted">{info.how}</p>
                </>
              ) : (
                <>
                  <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">Game over</p>
                  <p className="text-5xl font-bold text-accent">{score}</p>
                  <p className="text-sm text-muted">
                    {newBest ? "🎉 New best score!" : `Best: ${best}`}
                  </p>
                </>
              )}
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  autoFocus
                  onClick={start}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:brightness-110"
                >
                  {phase === "ready" ? (
                    <>
                      <FaPlay aria-hidden="true" /> Start
                    </>
                  ) : (
                    <>
                      <FaRotateRight aria-hidden="true" /> Play again
                    </>
                  )}
                </button>
                {phase === "over" && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold hover:border-accent/60"
                  >
                    Back to arcade
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
