"use client";

import BlurText from "@/components/react-bits/BlurText";
import { MicroButton } from "@/components/amicro";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-6 md:pt-24">
      {/* Global SiteBackground provides the electrified field */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-5rem)] max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-12 md:gap-8 md:py-14">
        <div className="self-center md:col-span-5">
          <BlurText
            as="h1"
            text={SITE.tagline}
            animateBy="words"
            direction="bottom"
            delay={90}
            stepDuration={0.3}
            className="max-w-xl text-balance text-[clamp(2.5rem,4.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.65)]"
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
            <div className="relative mx-auto w-full max-w-[34rem] md:max-w-none">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl"
                aria-hidden
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-phone.webp"
                alt="GRIT equipment ID on phone — conveyor unit identified with confidence and fault advice"
                width={1152}
                height={864}
                className="relative z-[1] mx-auto h-auto w-full max-w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <p className="text-sm text-neutral-400">
                Equipment ID locked in
              </p>
              <p className="font-mono text-xs text-neutral-500">
                Unit · confidence · fault path
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
