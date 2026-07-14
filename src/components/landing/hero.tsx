"use client";

import BlurText from "@/components/react-bits/BlurText";
import { MicroButton } from "@/components/amicro";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/content";

const STATS = [
  { k: "Scan", v: "Plate" },
  { k: "Lock", v: "Manual" },
  { k: "Clear", v: "Fault" },
  { k: "Stay", v: "On site" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 md:pt-24">
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-12 md:gap-8 md:py-16">
        <div className="self-center md:col-span-5">
          <BlurText
            as="h1"
            text={SITE.tagline}
            animateBy="words"
            direction="bottom"
            delay={90}
            stepDuration={0.3}
            className="max-w-xl text-balance text-[clamp(2.5rem,4.8vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950"
          />

          <Reveal delay={0.28}>
            <p className="mt-6 max-w-[36ch] text-pretty text-base leading-relaxed text-neutral-500 md:text-lg">
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
                accentClass="text-neutral-950"
              />
            </div>
          </Reveal>
        </div>

        <div className="relative self-center md:col-span-7">
          <Reveal delay={0.12}>
            <div className="relative mx-auto w-full max-w-[34rem] md:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-phone.webp"
                alt="GRIT equipment ID on phone: unit identified with confidence and fault advice"
                width={1152}
                height={864}
                className="relative z-[1] mx-auto h-auto w-full max-w-full drop-shadow-[0_28px_64px_rgba(15,17,21,0.18)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Dark stats bar - Tidyo-style trust strip under hero */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <Reveal delay={0.2}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-neutral-950 shadow-[0_20px_50px_rgba(15,17,21,0.18)] sm:grid-cols-4">
            {STATS.map((item) => (
              <div
                key={item.k}
                className="flex flex-col items-center justify-center gap-1 px-4 py-7 text-center sm:py-8"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                  {item.k}
                </dt>
                <dd className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
