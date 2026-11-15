"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { FaCircleCheck, FaPaperPlane, FaTriangleExclamation } from "react-icons/fa6";

// EmailJS keys come from .env.local (see .env.example). They are safe to be public:
// EmailJS protects them with your allowed-domains and rate-limit settings.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

// ---------- Spam limits (per browser) ----------
const MAX_PER_DAY = 2; // messages allowed in 24 hours (each one = 2 emails with the auto-reply)
const COOLDOWN_MS = 30_000; // wait between messages
const DAY_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "contact-sent";

function getSentTimes(): number[] {
  try {
    const all: number[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return all.filter((t) => Date.now() - t < DAY_MS); // only the last 24 hours
  } catch {
    return [];
  }
}
function recordSend() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...getSentTimes(), Date.now()]));
  } catch {}
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const inputClass =
  "w-full rounded-lg border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never see this field, bots fill it in.
    if (data.get("website")) {
      setStatus({ kind: "sent" });
      return;
    }

    // Spam limits
    const sent = getSentTimes();
    if (sent.length >= MAX_PER_DAY) {
      setStatus({
        kind: "error",
        message: `You've reached the limit of ${MAX_PER_DAY} messages per day. Please try again tomorrow, or email me directly.`,
      });
      return;
    }
    const last = sent[sent.length - 1];
    if (last && Date.now() - last < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - (Date.now() - last)) / 1000);
      setStatus({ kind: "error", message: `Please wait ${wait} seconds before sending another message.` });
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({ kind: "error", message: "The contact form isn't set up yet. Please email me directly." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: String(data.get("name")).trim(),
          email: String(data.get("email")).trim(),
          message: String(data.get("message")).trim(),
          time: new Date().toLocaleString(),
        },
        {
          publicKey: PUBLIC_KEY,
          limitRate: { id: "contact", throttle: COOLDOWN_MS }, // EmailJS's own throttle
          blockHeadless: true, // block automated browsers
        }
      );
      recordSend();
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: "Something went wrong and your message wasn't sent. Please try again, or email me directly.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div
        role="status"
        className="toast-in flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-background p-8 text-center"
      >
        <FaCircleCheck aria-hidden="true" className="h-10 w-10 text-accent" />
        <p className="text-lg font-semibold">Message sent!</p>
        <p className="max-w-xs text-sm text-muted">
          Thanks for reaching out. I&apos;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-2 text-sm font-semibold text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Name</span>
          <input name="name" required maxLength={80} autoComplete="name" placeholder="Juan Dela Cruz" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-muted">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="Hi Ransie, I'd like to talk about…"
          className={`${inputClass} resize-y`}
        />
      </label>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-700 dark:text-rose-300">
          <FaTriangleExclamation aria-hidden="true" className="mt-0.5 shrink-0" />
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        <FaPaperPlane aria-hidden="true" className={sending ? "animate-pulse" : ""} />
        {sending ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-muted">Limit: {MAX_PER_DAY} messages per day.</p>
    </form>
  );
}
