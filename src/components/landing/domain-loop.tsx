"use client";

import { LogoLoop } from "@/components/react-bits/LogoLoop";
import { DOMAINS, PAIN_LINE } from "@/lib/content";

export function DomainLoop() {
  const logos = DOMAINS.map((label) => ({
    node: (
      <span className="inline-flex items-center gap-3">
        <span className="h-px w-8 bg-white/40" aria-hidden />
        <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.28em] text-white">
          {label}
        </span>
      </span>
    ),
    title: label,
    ariaLabel: label,
  }));

  return (
    <section
      className="border-y border-white/[0.1] bg-white/[0.03] py-9 md:py-11"
      aria-label="Equipment domains"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="mx-auto mb-6 max-w-2xl text-center text-sm leading-relaxed text-neutral-400 md:text-[15px]">
          {PAIN_LINE}
        </p>
        <LogoLoop
          logos={logos}
          speed={48}
          gap={48}
          logoHeight={20}
          fadeOut
          fadeOutColor="#0b0b0b"
          ariaLabel="Equipment types GRIT supports"
        />
      </div>
    </section>
  );
}
