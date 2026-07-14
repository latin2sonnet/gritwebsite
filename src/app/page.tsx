import { SiteBackground } from "@/components/landing/site-background";
import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { DomainLoop } from "@/components/landing/domain-loop";
import { Values } from "@/components/landing/values";
import { Outcomes } from "@/components/landing/outcomes";
import { Bento } from "@/components/landing/bento";
import { Compare } from "@/components/landing/compare";
import { EquipmentAccordion } from "@/components/landing/equipment-accordion";
import { PinStory } from "@/components/landing/pin-story";
import { ScrubManifesto } from "@/components/landing/scrub-manifesto";
import { Proof } from "@/components/landing/proof";
import { CtaBand } from "@/components/landing/cta-band";
import { SiteFooter } from "@/components/landing/site-footer";

/**
 * One electrified DotGrid field under the entire page.
 * Sections use transparent bands + solid cards so the grid stays continuous.
 */

export default function LandingPage() {
  return (
    <main className="relative w-full max-w-full overflow-x-hidden bg-[#0b0b0b] text-neutral-100 grain">
      <SiteBackground />
      <div className="relative z-10">
        <SiteHeader />
        <Hero />
        <DomainLoop />
        <Values />
        <Outcomes />
        <Bento />
        <Compare />
        <EquipmentAccordion />
        <PinStory />
        <ScrubManifesto />
        <Proof />
        <CtaBand />
        <SiteFooter />
      </div>
    </main>
  );
}
