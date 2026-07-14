"use client";

import { VALUES } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Values() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-28 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(200,200,190,0.35) 1px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
              What we refuse to compromise.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-neutral-400">
              GRIT is not generic AI with a factory photo. These are the rules
              the product is built around for the people who keep plants running.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/[0.08] md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <article
                className={cn(
                  "relative h-full min-h-[200px] bg-[#0e0e0e] p-8 md:p-10",
                  "before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-white/30 before:via-white/5 before:to-transparent"
                )}
              >
                <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {v.title}
                </h3>
                <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-neutral-400">
                  {v.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
