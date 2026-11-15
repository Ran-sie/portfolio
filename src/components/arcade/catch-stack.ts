import { clear, drawLives, H, keyDir, rand, W, type Game, type GameEvents, type Theme } from "./engine";

// Catch the Stack (secret game): catch falling tech, avoid bombs.
// Catch a bomb = game over. Miss 3 tech = game over.
const TECH = ["JS", "PHP", "SQL", "C#", "React", "Next", "CSS", "HTML", "Py", "Git"];

type Item = { x: number; y: number; vy: number; bomb: boolean; label: string };

export function createCatchStack(t: Theme, events: GameEvents): Game {
  const basket = { x: W / 2, y: H - 22, w: 76, h: 12 };
  let items: Item[] = [];
  let elapsed = 0;
  let spawnIn = 0.3;
  let score = 0;
  let lives = 3;

  const end = () => {
    game.done = true;
    events.onOver(score);
  };

  const game: Game = {
    done: false,

    update(dt, input) {
      elapsed += dt;

      // Move basket
      const dir = keyDir(input);
      if (dir !== 0) basket.x += dir * 360 * dt;
      else if (input.usePointer) basket.x += (input.x - basket.x) * Math.min(1, dt * 14);
      basket.x = Math.max(basket.w / 2, Math.min(W - basket.w / 2, basket.x));

      // Spawn items; bombs get more common over time
      spawnIn -= dt;
      if (spawnIn <= 0) {
        const bomb = Math.random() < Math.min(0.35, 0.18 + elapsed * 0.004);
        items.push({
          x: rand(24, W - 24),
          y: -16,
          vy: rand(110, 150) + elapsed * 4,
          bomb,
          label: TECH[Math.floor(Math.random() * TECH.length)],
        });
        spawnIn = Math.max(0.3, 0.9 - elapsed * 0.012);
      }

      for (const it of items) it.y += it.vy * dt;

      const keep: Item[] = [];
      for (const it of items) {
        const caught =
          it.y + 10 >= basket.y - basket.h / 2 &&
          it.y - 10 <= basket.y + basket.h / 2 &&
          Math.abs(it.x - basket.x) < basket.w / 2 + 8;
        if (caught) {
          if (it.bomb) return end();
          score++;
          events.onScore(score);
        } else if (it.y > H + 16) {
          if (!it.bomb && --lives <= 0) {
            lives = 0;
            return end();
          }
        } else {
          keep.push(it);
        }
      }
      items = keep;
    },

    draw(ctx) {
      clear(ctx, t);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const it of items) {
        if (it.bomb) {
          ctx.font = "24px system-ui, sans-serif";
          ctx.fillText("💣", it.x, it.y);
          continue;
        }
        ctx.font = "bold 12px ui-monospace, monospace";
        const w = ctx.measureText(it.label).width + 16;
        ctx.fillStyle = t.surface;
        ctx.strokeStyle = t.accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(it.x - w / 2, it.y - 11, w, 22, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = t.fg;
        ctx.fillText(it.label, it.x, it.y + 1);
      }

      // Basket, with a little "stack" that grows as you score
      const layers = Math.min(Math.floor(score / 5), 5);
      ctx.fillStyle = t.accent;
      for (let i = 0; i < layers; i++) {
        ctx.globalAlpha = 0.25 + i * 0.1;
        ctx.fillRect(basket.x - basket.w / 2 + 6, basket.y - 10 - i * 5, basket.w - 12, 3);
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.roundRect(basket.x - basket.w / 2, basket.y - basket.h / 2, basket.w, basket.h, 5);
      ctx.fill();

      drawLives(ctx, t, lives);
    },
  };
  return game;
}
