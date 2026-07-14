"use client";

import { MicroButton } from "@/components/amicro";
import { SITE } from "@/lib/content";
import { Reveal } from "@/components/reveal";

/**
 * Intentional high-contrast conversion block: white field on black site.
 * One theme flip for close, not decorative section alternation.
 */
export function CtaBand() {
  return (
    <section id="access" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#f3f3f0] text-neutral-950 shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
        <div className="relative px-6 py-16 md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                Early access
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-6xl">
                Put the manual in your pocket. Keep the line moving.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-[42ch] text-base leading-relaxed text-neutral-600 md:text-lg">
                Built for techs who live next to the equipment. Request access
                and be first when GRIT opens the door.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <MicroButton
                  href="mailto:hello@usegrit.app?subject=GRIT%20early%20access"
                  label={SITE.ctaPrimary}
                  icon="camera"
                  iconHover="arrow-right"
                  interaction="slide-arrow"
                  size="lg"
                  className="!bg-neutral-950 !text-white hover:!bg-neutral-800"
                />
                <MicroButton
                  href="#how"
                  label={SITE.ctaSecondary}
                  icon="wrench"
                  interaction="pulse"
                  variant="outline"
                  size="lg"
                  className="!border-neutral-400 !text-neutral-900 hover:!border-neutral-700 hover:!bg-neutral-950/5"
                  accentClass="text-neutral-950"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
