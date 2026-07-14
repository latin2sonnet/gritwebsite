"use client";

import { COMPARE } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Compare() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
            Same fault. Two paths. Only one keeps the line moving.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-[#101010] p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                Without GRIT
              </p>
              <ul className="mt-8 space-y-5">
                {COMPARE.without.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 border-b border-white/[0.06] pb-5 text-[15px] leading-relaxed text-neutral-400 last:border-0 last:pb-0"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/20 bg-white p-8 text-neutral-950 md:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1.15px)",
                  backgroundSize: "20px 20px",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                  With GRIT
                </p>
                <ul className="mt-8 space-y-5">
                  {COMPARE.withGrit.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 border-b border-neutral-200 pb-5 text-[15px] font-medium leading-relaxed text-neutral-900 last:border-0 last:pb-0"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-950"
                        aria-hidden
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
