"use client";

import { COMPARE } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Compare() {
  return (
    <section className="relative bg-white py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-5xl">
            Same fault. Two paths. Only one keeps the line moving.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.25rem] border border-black/[0.10] bg-[#f7f8fa] p-8 shadow-[0_1px_2px_rgba(15,17,21,0.04)] md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                Without GRIT
              </p>
              <ul className="mt-8 space-y-5">
                {COMPARE.without.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 border-b border-black/[0.08] pb-5 text-[15px] leading-relaxed text-neutral-500 last:border-0 last:pb-0"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-[1.25rem] border border-neutral-950 bg-neutral-950 p-8 text-white shadow-[0_20px_50px_rgba(15,17,21,0.22)] ring-1 ring-inset ring-white/10 md:p-10">
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                  With GRIT
                </p>
                <ul className="mt-8 space-y-5">
                  {COMPARE.withGrit.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 border-b border-white/10 pb-5 text-[15px] font-medium leading-relaxed text-white last:border-0 last:pb-0"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
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
