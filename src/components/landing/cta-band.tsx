"use client";

import { MicroButton } from "@/components/amicro";
import { SITE } from "@/lib/content";
import { Reveal } from "@/components/reveal";

/**
 * Dark conversion band on the light page (Tidyo-style contrast block).
 */
export function CtaBand() {
  return (
    <section id="access" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] bg-neutral-950 text-white shadow-[0_28px_80px_rgba(15,17,21,0.22)]">
        <div className="relative px-6 py-16 md:px-16 md:py-20">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                Early access
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
                Put the manual in your pocket. Keep the line moving.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-[42ch] text-base leading-relaxed text-neutral-400 md:text-lg">
                Field first. Book is law. Stay on site. Clear and move. Request
                access if that is how your crew should work.
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
                  className="!bg-white !text-neutral-950 hover:!bg-neutral-100"
                />
                <MicroButton
                  href="#how"
                  label={SITE.ctaSecondary}
                  icon="wrench"
                  interaction="pulse"
                  variant="outline"
                  size="lg"
                  className="!border-white/25 !bg-transparent !text-white hover:!border-white/50 hover:!bg-white/5"
                  accentClass="text-white"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
