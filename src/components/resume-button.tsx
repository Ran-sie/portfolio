"use client";

import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare, FaDownload, FaFileLines, FaXmark } from "react-icons/fa6";

// Resume button: [📄 Resume | ⬇]
// Desktop: "Resume" opens the PDF in a modal. Phones: opens it in a new tab
// (phones are bad at showing PDFs inside a page). The arrow always downloads.
export function ResumeButton({ href }: { href: string }) {
  const [open, setOpen] = useState(false);

  // Esc closes; lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const onView = (e: React.MouseEvent) => {
    const isPhone = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    if (isPhone) return; // let the link open the PDF in a new tab
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <span className="inline-flex overflow-hidden rounded-lg border border-line bg-surface/60 text-sm font-semibold transition hover:-translate-y-0.5">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onView}
          className="inline-flex items-center gap-2 px-5 py-3 transition-colors hover:text-accent"
        >
          <FaFileLines aria-hidden="true" className="h-3.5 w-3.5" /> Resume
        </a>
        <a
          href={href}
          download
          aria-label="Download resume (PDF)"
          title="Download PDF"
          className="inline-flex items-center border-l border-line px-3.5 transition-colors hover:bg-background hover:text-accent"
        >
          <FaDownload aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </span>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="toast-in flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
              <p className="flex items-center gap-2 font-semibold">
                <FaFileLines aria-hidden="true" className="text-accent" /> Resume
              </p>
              <div className="flex items-center gap-1">
                <a
                  href={href}
                  download
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
                >
                  <FaDownload aria-hidden="true" className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
                >
                  <FaArrowUpRightFromSquare aria-hidden="true" className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Open in new tab</span>
                </a>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpen(false)}
                  aria-label="Close resume"
                  className="ml-1 rounded-lg p-2 text-muted transition-colors hover:bg-background hover:text-foreground"
                >
                  <FaXmark aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* The PDF itself */}
            <iframe src={`${href}#view=FitH`} title="Resume PDF" className="w-full flex-1 bg-white" />
          </div>
        </div>
      )}
    </>
  );
}
