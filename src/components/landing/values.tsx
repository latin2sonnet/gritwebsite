"use client";

import { VALUES } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

function ValueMark({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    className: "h-10 w-10 text-neutral-950",
    "aria-hidden": true as const,
  };

  if (index === 0) {
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

function VerifiedBadge() {
  return (
    <span
      className={cn(
        "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
        "bg-neutral-950 text-white",
        "ring-1 ring-black/5 ring-offset-2 ring-offset-white",
        "shadow-[0_8px_20px_rgba(15,17,21,0.12)]",
        "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "group-hover:scale-110"
      )}
      aria-label="Confirmed principle"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[18px] w-[18px] text-white"
        aria-hidden
      >
        <path
          d="M5 12.5 9.5 17 19 7"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Values() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-5xl">
              What we refuse to compromise.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-neutral-500">
              GRIT is not generic AI with a factory photo. These are the rules
              the product is built around for the people who keep plants running.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <article
                className={cn(
                  "group relative h-full min-h-[220px] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white p-8 md:p-10",
                  "shadow-[0_1px_2px_rgba(15,17,21,0.04),0_12px_32px_rgba(15,17,21,0.05)]",
                  "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(15,17,21,0.1)]"
                )}
              >
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/[0.06] bg-[#f4f5f7]">
                    <ValueMark index={i} />
                  </div>
                  <VerifiedBadge />
                </div>

                <h3 className="relative mt-7 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
                  {v.title}
                </h3>
                <p className="relative mt-4 max-w-[36ch] text-[15px] leading-relaxed text-neutral-500">
                  {v.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
