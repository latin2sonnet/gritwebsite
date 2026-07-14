"use client";

import { VALUES } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/** Playful monoline industrial marks per value - not generic emoji */
function ValueMark({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    className: "h-10 w-10 text-white",
    "aria-hidden": true as const,
  };

  if (index === 0) {
    // Field first - hard hat / site mark
    return (
      <svg {...common}>
        <path
          d="M8 28h32v6a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-6Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M10 28c0-9 6.5-16 14-16s14 7 14 16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M24 12v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === 1) {
    // Book is law - open manual
    return (
      <svg {...common}>
        <path
          d="M8 12h13a5 5 0 0 1 5 5v19H13a5 5 0 0 0-5 5V12Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M40 12H27a5 5 0 0 0-5 5v19h13a5 5 0 0 1 5 5V12Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M24 17v19" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (index === 2) {
    // Stay on site - pin / footprint
    return (
      <svg {...common}>
        <circle cx="24" cy="20" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M24 27c6 0 12 5 12 11H12c0-6 6-11 12-11Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="20" r="2" fill="currentColor" />
      </svg>
    );
  }
  // Clear and move - bolt / check hybrid
  return (
    <svg {...common}>
      <path
        d="M22 8 12 26h9l-1 14 14-22h-9l1-10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 text-white"
      aria-hidden
    >
      <path
        d="M5 12.5 9.5 17 19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Values() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
              What we refuse to compromise.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-neutral-400">
              GRIT is not generic AI with a factory photo. These are the rules
              the product is built around for the people who keep plants running.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-3 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <article
                className={cn(
                  "group relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/12 bg-[#0e0e0e] p-8 md:p-10",
                  "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "hover:-translate-y-1 hover:border-white/25 hover:bg-[#141414]",
                  "hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                )}
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/[0.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] transition-colors duration-500 group-hover:border-white/25 group-hover:bg-white/[0.08]">
                    <ValueMark index={i} />
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white text-neutral-950 shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]">
                    <CheckGlyph />
                  </span>
                </div>

                <h3 className="relative mt-7 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {v.title}
                </h3>
                <p className="relative mt-4 max-w-[36ch] text-[15px] leading-relaxed text-neutral-400 transition-colors duration-500 group-hover:text-neutral-300">
                  {v.body}
                </p>

                <div
                  className="absolute bottom-0 left-0 h-px w-0 bg-white/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                  aria-hidden
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
