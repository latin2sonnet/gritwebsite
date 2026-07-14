# GRIT Product Context

## What GRIT is

GRIT is a field AI product for industrial technicians and maintenance leads.

1. **Scan** equipment in the field (motor nameplates, VFDs, older/newer drives, related gear)
2. **Identify** make/model and key ratings
3. **Search** the web for the correct equipment manuals
4. **Ground** an LLM with RAG over those manuals
5. **Answer** troubleshooting questions with model-specific, manual-backed advice

Goal: stop hunting 400-page PDFs on the shop floor.

## Product stack (target)

- **Mobile app:** Swift (primary), developed on MacBook
- **Marketing site:** this repo (`GRITSITE` / `gritsite`) on Desktop

## Prior experiments (not this site)

- Expo / React Native prototypes under `Desktop/DT/GRIT`, `GRITv2`, etc.
- Older field UI: black background, orange accents, glove-friendly
- Equipment history, Supabase storage, vision analysis experiments
- Alberta oilfield-adjacent equipment language (PowerFlex, Altivar, CompactLogix, CAT gensets)

## Brand for GRITSITE marketing

- **Black and white luxury industrial**
- Near-black ink `#0a0a0a`, off-white type, hairline chrome borders
- Monochrome only: near-black ink, off-white type, hairline chrome. No colored brand accents on the marketing site.
- Photography: desaturated / greyscale industrial

## Engineering rails on this site

- Next.js App Router + Tailwind v4
- Amicro micro-transition buttons (monochrome)
- React Bits: BlurText, LogoLoop, StaggeredMenu
- GSAP ScrollTrigger for pin story + scrub text

## When you return

You will build deeper product work (Swift app, RAG pipeline, OCR). Keep this file as durable memory of product intent and marketing brand.
