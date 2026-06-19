// ============================================================
//  "Modern Branding Reel" style — warm, editorial, minimal.
//  Completely different look from the neon-tech kinetic version.
// ============================================================
import { TRANSITION_FRAMES } from "../theme";

export { TRANSITION_FRAMES };

export const BRAND = {
  paper: "#efe7d9", // warm cream
  paper2: "#e7ddcb",
  ink: "#211d18", // near-black ink
  inkSoft: "rgba(33,29,24,0.58)",
  clay: "#bd5b36", // terracotta accent
  sage: "#6f7a5f", // muted green
  gold: "#a9803f",
} as const;

export const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 0xff}, ${n & 0xff}, ${a})`;
};

export type BrandScene =
  | {
      kind: "intro";
      label: string;
      title: string[]; // serif headline lines
      footer: string;
      durationInFrames: number;
    }
  | {
      kind: "item";
      index: number;
      total: number;
      tag: string; // small category label
      name: string; // serif tool name
      desc: string; // one-line description
      accent: string;
      durationInFrames: number;
    }
  | {
      kind: "outro";
      label: string;
      title: string[];
      footer: string;
      durationInFrames: number;
    };

export const BRAND_SCENES: BrandScene[] = [
  {
    kind: "intro",
    label: "TECH VAULT · CURATED",
    title: ["Five Free", "AI Tools", "Worth Stealing"],
    footer: "A quiet little guide for creators",
    durationInFrames: 140,
  },
  {
    kind: "item",
    index: 1,
    total: 5,
    tag: "IDEATION & SCRIPTS",
    name: "ytZolo",
    desc: "High-CTR titles, thumbnails and scripts in seconds.",
    accent: BRAND.clay,
    durationInFrames: 150,
  },
  {
    kind: "item",
    index: 2,
    total: 5,
    tag: "THUMBNAIL DESIGN",
    name: "Ideogram AI",
    desc: "Flawless text and modern graphics, completely free.",
    accent: BRAND.sage,
    durationInFrames: 150,
  },
  {
    kind: "item",
    index: 3,
    total: 5,
    tag: "MOTION & B-ROLL",
    name: "Luma Dream Machine",
    desc: "Cinematic AI b-rolls with zero copyright worries.",
    accent: BRAND.gold,
    durationInFrames: 150,
  },
  {
    kind: "item",
    index: 4,
    total: 5,
    tag: "AUDIO POLISH",
    name: "Adobe Podcast",
    desc: "Turn noisy audio into studio-grade sound in one click.",
    accent: BRAND.clay,
    durationInFrames: 150,
  },
  {
    kind: "item",
    index: 5,
    total: 5,
    tag: "EDIT & CAPTIONS",
    name: "CapCut Desktop",
    desc: "Auto captions and object tracking, beautifully done.",
    accent: BRAND.sage,
    durationInFrames: 150,
  },
  {
    kind: "outro",
    label: "THANK YOU FOR WATCHING",
    title: ["Follow", "Tech Vault"],
    footer: "New hidden gems every week",
    durationInFrames: 150,
  },
];

export const BRAND_TOTAL =
  BRAND_SCENES.reduce((s, x) => s + x.durationInFrames, 0) -
  (BRAND_SCENES.length - 1) * TRANSITION_FRAMES;
