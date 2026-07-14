"use client";

import { LogoLoop } from "@/components/react-bits/LogoLoop";
import { DOMAINS, PAIN_LINE } from "@/lib/content";

/**
 * Full-bleed equipment ticker under hero.
 * Pain line stays in the content column; marquee spans the full section width
 * so edges do not look boxed or clipped by max-w-6xl.
 */
export function DomainLoop() {
  const logos = DOMAINS.map((label) => ({
    node: (
      <span className="inline-flex items-center gap-4">
        <span
          className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent to-white/35"
          aria-hidden
        />
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.32em] text-neutral-200 md:text-[13px]">
          {label}
        </span>
      </span>
    ),
    title: label,
    ariaLabel: label,
  }));

  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.08] bg-[#0e0e0e]"
      aria-label="Equipment domains"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0.7px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-10 md:pb-7 md:pt-12">
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-neutral-400 md:text-[15px]">
          {PAIN_LINE}
        </p>
      </div>

      {/* Full viewport width ticker - not constrained by max-w-6xl */}
      <div className="relative w-full pb-10 pt-2 md:pb-12">
        <LogoLoop
          logos={logos}
          speed={42}
          gap={56}
          logoHeight={18}
          fadeOut
          className="w-full py-1"
          ariaLabel="Equipment types GRIT supports"
        />
      </div>
    </section>
  );
}
