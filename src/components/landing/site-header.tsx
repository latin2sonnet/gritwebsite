"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { MicroButton } from "@/components/amicro";
import { StaggeredMenu } from "@/components/react-bits/StaggeredMenu";
import { MARKETING_NAV } from "@/lib/nav";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = lastY.current;
    lastY.current = y;
    setScrolled(y > 12);

    if (reduce) {
      setHidden(false);
      return;
    }

    if (y < 48) {
      setHidden(false);
      return;
    }

    if (y > prev + 6) setHidden(true);
    else if (y < prev - 6) setHidden(false);
  });

  const menuItems = MARKETING_NAV.map((l) => ({
    label: l.label,
    ariaLabel: l.ariaLabel,
    link: l.href,
  }));

  const socialItems = [{ label: SITE.ctaPrimary, link: "#access" }];

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] hidden md:block"
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-auto mx-auto mt-4 flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full border border-white/12 bg-[#0a0a0a]/72 px-3 pl-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white text-[11px] font-bold tracking-[0.12em] text-neutral-950">
              G
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              {SITE.name}
            </span>
          </Link>

          <nav className="flex items-center gap-0.5">
            {MARKETING_NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm text-neutral-300 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/8 hover:text-white",
                  scrolled && "text-neutral-200"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <MicroButton
            href="#access"
            label={SITE.ctaPrimary}
            icon="camera"
            iconHover="arrow-right"
            interaction="slide-arrow"
            size="sm"
          />
        </div>
      </motion.header>

      <div className="md:hidden">
        <StaggeredMenu
          items={menuItems}
          socialItems={socialItems}
          displayItemNumbering={false}
          colors={["#1a1a1a", "#3f3f3f"]}
          accentColor="#f7f7f5"
        />
      </div>
    </>
  );
}
