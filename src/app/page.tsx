import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { DomainLoop } from "@/components/landing/domain-loop";
import { Outcomes } from "@/components/landing/outcomes";
import { Bento } from "@/components/landing/bento";
import { EquipmentAccordion } from "@/components/landing/equipment-accordion";
import { PinStory } from "@/components/landing/pin-story";
import { ScrubManifesto } from "@/components/landing/scrub-manifesto";
import { Proof } from "@/components/landing/proof";
import { CtaBand } from "@/components/landing/cta-band";
import { SiteFooter } from "@/components/landing/site-footer";

/**
 * design_plan
 * Vibe: monochrome blueprint industrial (not flat grey SaaS)
 * Hero: editorial split, pain line, conversion CTAs
 * Interest: outcomes strip + gapless bento + equipment accordion
 * Desire: GSAP pin path + scrub manifesto
 * Action: white high-contrast access band
 */

export default function LandingPage() {
  return (
    <main className="grain blueprint w-full max-w-full overflow-x-hidden bg-[#0b0b0b] text-neutral-100">
      <SiteHeader />
      <Hero />
      <DomainLoop />
      <Outcomes />
      <Bento />
      <EquipmentAccordion />
      <PinStory />
      <ScrubManifesto />
      <Proof />
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
