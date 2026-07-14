"use client";

import { SCENARIOS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Proof() {
  return (
    <section id="proof" className="py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
              Moments that cost you hours without it.
            </h2>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-neutral-400">
              Same scenes every plant knows. Different equipment. Same wasted
              walk for the wrong PDF.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/story-floor.webp"
                alt=""
                className="img-bw aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="flex flex-col justify-center gap-0 md:col-span-7">
            {SCENARIOS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <article className="border-t border-white/10 py-7 first:border-t-0 first:pt-0 md:py-8">
                  <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-neutral-400">
                    {s.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
