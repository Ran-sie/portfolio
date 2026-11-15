"use client";

import { useEffect, useState } from "react";

// Types each word, pauses, deletes it, then moves to the next one.
export function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Respect users who turned off animations in their OS settings.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const word = words[index];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === word) delay = 1800; // pause on full word

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <>
      {/* Screen readers get the full list instead of the flickering text */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="text-accent">
        {text}
        <span className="caret ml-0.5 inline-block w-[2px] bg-accent align-middle" style={{ height: "0.9em" }} />
      </span>
    </>
  );
}
