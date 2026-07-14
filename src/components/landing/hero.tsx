"use client";

import BlurText from "@/components/react-bits/BlurText";
import DotGrid from "@/components/react-bits/DotGrid";
import { MicroButton } from "@/components/amicro";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-6 md:pt-24">
      {/* Interactive React Bits-style field (pointer-events free; tracks window) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* CSS fallback lattice if canvas is late / reduced-motion first paint */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(210,210,200,0.72) 1.35px, transparent 1.45px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "center center",
          }}
          aria-hidden
        />
        <div className="absolute inset-0">
          <DotGrid
            dotSize={3.2}
            gap={22}
            baseColor="#c4c4ba"
            activeColor="#ffffff"
            proximity={180}
            baseOpacity={0.85}
            activeOpacity={1}
            returnDuration={0.4}
            speedTrigger={80}
          />
        </div>
        {/* Soft lift so it never reads pure noir ink */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.12),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(255,255,255,0.07),transparent_45%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0b0b] to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-5rem)] max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-12 md:gap-8 md:py-14">
        <div className="self-center md:col-span-5">
          <BlurText
            as="h1"
            text={SITE.tagline}
            animateBy="words"
            direction="bottom"
            delay={90}
            stepDuration={0.3}
            className="max-w-xl text-balance text-[clamp(2.5rem,4.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
          />

          <Reveal delay={0.28}>
            <p className="mt-6 max-w-[34ch] text-pretty text-base leading-relaxed text-neutral-300 md:text-lg">
              {SITE.sub}
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MicroButton
                href="#access"
                label={SITE.ctaPrimary}
                icon="camera"
                iconHover="arrow-right"
                interaction="slide-arrow"
                size="lg"
              />
              <MicroButton
                href="#how"
                label={SITE.ctaSecondary}
                icon="wrench"
                interaction="pulse"
                variant="outline"
                size="lg"
                accentClass="text-white"
              />
            </div>
          </Reveal>
        </div>

        <div className="relative self-center md:col-span-7">
          <Reveal delay={0.12}>
            <div className="plate-frame rounded-[1.5rem] border border-white/15 bg-gradient-to-b from-white/[0.1] to-white/[0.03] p-1.5 shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[calc(1.5rem-0.375rem)] border border-white/10 bg-neutral-800 md:aspect-[16/11]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-field.webp"
                  alt="Technician photographing industrial equipment nameplate in the field"
                  className="img-bw absolute inset-0 h-full w-full scale-[1.04] object-cover object-[center_35%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#0b0b0b]/85 via-[#0b0b0b]/3 to-transparent md:w-[12%]"
                  aria-hidden
                />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <p className="text-sm text-neutral-400">
                Nameplate capture in the field
              </p>
              <p className="font-mono text-xs text-neutral-500">
                Manual locked to the unit
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
