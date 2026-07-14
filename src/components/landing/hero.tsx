"use client";

import BlurText from "@/components/react-bits/BlurText";
import DotGrid from "@/components/react-bits/DotGrid";
import { MicroButton } from "@/components/amicro";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden pt-6 md:pt-24">
      {/* Interactive DotGrid only - no static CSS lattice masking motion */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#0a0a0a]">
        <DotGrid
          className="opacity-100"
          dotSize={2.4}
          gap={26}
          baseColor="#5c5c56"
          activeColor="#ffffff"
          proximity={200}
          glowStrength={1.6}
          baseOpacity={0.55}
          activeOpacity={1}
          returnDuration={0.35}
          waveSpeed={0.65}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(255,255,255,0.06),transparent_40%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent"
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
            className="max-w-xl text-balance text-[clamp(2.5rem,4.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]"
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

          <Reveal delay={0.48}>
            <dl className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {[
                { k: "Scan", v: "Plate" },
                { k: "Lock", v: "Manual" },
                { k: "Clear", v: "Fault" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                    {item.k}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-white">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
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
