export const SITE = {
  name: "GRIT",
  tagline: "Clear the fault. Stay at the machine.",
  sub:
    "Scan the plate. Pull the real manual. Ask like a tech. Get model-specific steps before the line goes longer cold.",
  ctaPrimary: "Get early access",
  ctaSecondary: "Watch the path",
} as const;

export const PAIN_LINE =
  "A dead drive does not wait while you hunt a 400-page PDF in the trailer.";

export const DOMAINS = [
  "Motors",
  "VFDs",
  "PLCs",
  "Gensets",
  "Nameplates",
  "Drives",
  "Soft starters",
  "Switchgear",
] as const;

export const OUTCOMES = [
  {
    title: "No trailer walk",
    body: "The book comes to you at the cabinet, not the other way around.",
  },
  {
    title: "The right manual",
    body: "Search locked to that make and model, not a random forum thread.",
  },
  {
    title: "Answers that cite the book",
    body: "Ask the fault. Get steps grounded in the manual for that unit.",
  },
] as const;

export const BENTO = [
  {
    id: "scan",
    title: "Scan the plate once",
    body: "Greasy nameplates, drive faces, faded stamps. GRIT reads make, model, and ratings where you stand.",
    image: "/images/bento-scan.webp",
    span: "md:col-span-7 md:row-span-2",
    tall: true,
  },
  {
    id: "manual",
    title: "Pull the real book",
    body: "Web search aimed at the unit you scanned. Not a generic chatbot shrug.",
    image: "/images/bento-manual.webp",
    span: "md:col-span-5",
  },
  {
    id: "rag",
    title: "Ask in plain language",
    body: "Fault codes, resets, wiring checks. Grounded in that manual, not internet folklore.",
    image: "/images/bento-chat.webp",
    span: "md:col-span-5",
  },
  {
    id: "fault",
    title: "Code to next step",
    body: "Panel says fault 7. GRIT maps it to the procedure so you stop guessing boards.",
    span: "md:col-span-4",
    mono: "F07",
  },
  {
    id: "history",
    title: "Field memory",
    body: "Plates you scanned. Questions you asked. A trail when the same drive fails next month.",
    span: "md:col-span-3",
  },
] as const;

export const EQUIPMENT = [
  {
    id: "motors",
    title: "Motors",
    body: "HP, voltage, frame, RPM off a greasy plate. No binder. No office run.",
    image: "/images/inline-motor.webp",
  },
  {
    id: "vfds",
    title: "VFDs",
    body: "Faceplate codes and model-specific paths when the line is already late.",
    image: "/images/inline-vfd.webp",
  },
  {
    id: "plcs",
    title: "PLCs",
    body: "Controller families and docs when the cabinet is a maze of labels.",
    image: "/images/bento-scan.webp",
  },
  {
    id: "gensets",
    title: "Gensets",
    body: "Industrial generators with the right book when the site is loud and time is short.",
    image: "/images/story-floor.webp",
  },
] as const;

export const STORY_STEPS = [
  {
    title: "Shoot the plate",
    body: "One clear frame of the nameplate or drive face. Gloves on. Lights bad. Still works.",
    image: "/images/bento-scan.webp",
  },
  {
    title: "Know the unit",
    body: "Make, model, and the ratings that matter get pulled from what the camera sees.",
    image: "/images/hero-field.webp",
  },
  {
    title: "Lock the manual",
    body: "The matching book is found and loaded so every answer has a source.",
    image: "/images/bento-manual.webp",
  },
  {
    title: "Clear the fault",
    body: "Ask like you talk on the floor. Get steps for that equipment, then move on.",
    image: "/images/bento-chat.webp",
  },
] as const;

export const MANIFESTO_WORDS =
  "You are paid to fix equipment, not to spelunk PDFs. GRIT keeps the manual in your pocket so the fault dies where you stand.";

export const SCENARIOS = [
  {
    title: "VFD dead on the line",
    body: "Code on the face. Crew waiting. Scan, confirm the model, ask the book before you pull the wrong board.",
    image: "/images/inline-vfd.webp",
  },
  {
    title: "Motor swap under pressure",
    body: "Plate is filthy but readable. Confirm HP, voltage, and frame without a walk back to the printer.",
    image: "/images/inline-motor.webp",
  },
  {
    title: "Old gear, half a stamp",
    body: "Faded plate, partial string. Work from what is still visible and find documentation that still fits.",
    image: "/images/story-floor.webp",
  },
] as const;

/** Core customer values GRIT stands for */
export const VALUES = [
  {
    title: "Field first",
    body: "Designed for the cabinet, the noise, and the gloves. Not a desk product wearing a hard hat.",
  },
  {
    title: "The book is law",
    body: "Answers stay grounded in the manual for that unit. No forum folklore. No generic AI shrug.",
  },
  {
    title: "Stay on site",
    body: "Every minute walking to the trailer is a minute the line stays cold. GRIT keeps you at the iron.",
  },
  {
    title: "Clear and move",
    body: "Fault code to next step. Identify, ask, act. You are paid to fix gear, not spelunk PDFs.",
  },
] as const;

export const COMPARE = {
  without: [
    "Hunt binders and shared drives for the right PDF",
    "Guess which forum thread matches your model",
    "Walk back to the trailer while the crew waits",
    "Pull boards on gut feel when the code is unfamiliar",
  ],
  withGrit: [
    "Scan the plate where you stand",
    "Lock the manual for that make and model",
    "Ask the fault in plain language",
    "Follow model-specific steps and clear it",
  ],
} as const;
