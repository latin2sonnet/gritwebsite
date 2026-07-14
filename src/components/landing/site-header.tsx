"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { BrandMark } from "@/components/brand-mark";
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
        <div
          className={cn(
            "pointer-events-auto mx-auto mt-4 flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full border border-black/[0.10] bg-white/80 px-3 pl-4 shadow-[0_1px_2px_rgba(15,17,21,0.04),0_12px_36px_rgba(15,17,21,0.08)] backdrop-blur-xl",
            scrolled &&
              "bg-white/92 shadow-[0_1px_2px_rgba(15,17,21,0.05),0_16px_40px_rgba(15,17,21,0.10)]"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <BrandMark size={32} priority className="h-8 w-8" />
            <span className="text-[15px] font-semibold tracking-tight text-neutral-950">
              {SITE.name}
            </span>
          </Link>

          <nav className="flex items-center gap-0.5">
            {MARKETING_NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-neutral-500 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-neutral-950/[0.04] hover:text-neutral-950"
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
          colors={["#e5e7eb", "#d1d5db"]}
          accentColor="#0f1115"
          menuButtonColor="#0f1115"
          openMenuButtonColor="#0f1115"
        />
      </div>
    </>
  );
}
