"use client";

import { LogoLoop } from "@/components/react-bits/LogoLoop";
import { DOMAINS, PAIN_LINE } from "@/lib/content";

export function DomainLoop() {
  const logos = DOMAINS.map((label) => ({
    node: (
      <span className="inline-flex items-center gap-4">
        <span
          className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent to-neutral-400"
          aria-hidden
        />
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.32em] text-neutral-700 md:text-[13px]">
          {label}
        </span>
      </span>
    ),
    title: label,
    ariaLabel: label,
  }));

  return (
    <section
      className="relative overflow-hidden border-y border-black/[0.10] bg-white"
      aria-label="Equipment domains"
    >
      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-10 md:pb-7 md:pt-12">
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-neutral-500 md:text-[15px]">
          {PAIN_LINE}
        </p>
      </div>

      <div className="relative w-full pb-10 pt-2 md:pb-12">
        <LogoLoop
          logos={logos}
          speed={42}
          gap={56}
          logoHeight={18}
          fadeOut
          pauseOnHover={false}
          className="w-full py-1"
          ariaLabel="Equipment types GRIT supports"
        />
      </div>
    </section>
  );
}
