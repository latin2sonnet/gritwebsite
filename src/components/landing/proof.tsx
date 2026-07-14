"use client";

import { SCENARIOS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Proof() {
  return (
    <section id="proof" className="bg-white py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-5xl">
              Moments that cost you hours without it.
            </h2>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-neutral-500">
              Same scenes every plant knows. Different equipment. Same wasted
              walk for the wrong PDF.
            </p>
            <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-black/[0.10] shadow-[0_1px_2px_rgba(15,17,21,0.05),0_16px_40px_rgba(15,17,21,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/story-floor.webp"
                alt=""
                className="img-bw aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <div className="rounded-[1.25rem] border border-black/[0.10] bg-[#f7f8fa] px-6 shadow-[0_1px_2px_rgba(15,17,21,0.04)] md:px-8">
              {SCENARIOS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <article className="border-t border-black/[0.10] py-7 first:border-t-0 md:py-8">
                    <h3 className="text-xl font-semibold tracking-tight text-neutral-950 md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-neutral-500">
                      {s.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
