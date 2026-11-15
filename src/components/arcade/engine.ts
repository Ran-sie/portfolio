// A tiny canvas game engine shared by all the arcade games.
// Each game is a plain object with update() and draw(); runGame() drives it.

export const W = 480; // game world size (scaled to fit the screen)
export const H = 360;

export type Input = {
  x: number; // pointer position in game coordinates
  y: number;
  usePointer: boolean; // true when the mouse/finger moved last, false when keys did
  clicks: { x: number; y: number }[]; // clicks/taps since the last frame
  keys: Set<string>; // keys currently held down
};

export type Theme = {
  accent: string;
  onAccent: string;
  fg: string;
  muted: string;
  surface: string;
  bg: string;
  line: string;
};

export type Game = {
  update(dt: number, input: Input): void; // dt = seconds since last frame
  draw(ctx: CanvasRenderingContext2D): void;
  done: boolean; // set to true on game over
};

export type GameEvents = {
  onScore: (score: number) => void;
  onOver: (finalScore: number) => void;
};

// Read the site's current colors so games match the chosen theme.
export function readTheme(): Theme {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return {
    accent: v("--accent"),
    onAccent: v("--on-accent"),
    fg: v("--foreground"),
    muted: v("--muted"),
    surface: v("--surface"),
    bg: v("--background"),
    line: v("--line"),
  };
}

export const rand = (min: number, max: number) => min + Math.random() * (max - min);

const GAME_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "];

// Starts the game loop. Returns a cleanup function that stops it.
export function runGame(canvas: HTMLCanvasElement, game: Game) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2); // sharp on high-res screens
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const input: Input = { x: W / 2, y: H / 2, usePointer: true, clicks: [], keys: new Set() };

  const toGame = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) * W) / r.width, y: ((e.clientY - r.top) * H) / r.height };
  };
  const onMove = (e: PointerEvent) => {
    Object.assign(input, toGame(e), { usePointer: true });
  };
  const onDown = (e: PointerEvent) => {
    const p = toGame(e);
    Object.assign(input, p, { usePointer: true });
    input.clicks.push(p);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (GAME_KEYS.includes(e.key)) e.preventDefault(); // stop the page from scrolling
    input.keys.add(e.key.toLowerCase());
    if (["arrowleft", "arrowright", "a", "d"].includes(e.key.toLowerCase())) input.usePointer = false;
  };
  const onKeyUp = (e: KeyboardEvent) => input.keys.delete(e.key.toLowerCase());

  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  let raf = 0;
  let last = performance.now();
  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05); // cap so a slow frame can't break physics
    last = now;
    game.update(dt, input);
    input.clicks = [];
    game.draw(ctx);
    if (!game.done) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerdown", onDown);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
}

// Small drawing helpers
export function clear(ctx: CanvasRenderingContext2D, t: Theme) {
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = t.line;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1;
  for (let x = 40; x < W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 40; y < H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function drawLives(ctx: CanvasRenderingContext2D, t: Theme, lives: number, max = 3) {
  ctx.font = "16px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  for (let i = 0; i < max; i++) {
    ctx.fillStyle = i < lives ? t.accent : t.line;
    ctx.fillText("♥", 12 + i * 18, 10);
  }
}

// Keyboard direction: -1 left, 1 right, 0 none
export function keyDir(input: Input) {
  const left = input.keys.has("arrowleft") || input.keys.has("a");
  const right = input.keys.has("arrowright") || input.keys.has("d");
  return (right ? 1 : 0) - (left ? 1 : 0);
}
