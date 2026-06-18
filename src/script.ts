// ============================================================
//  TECH VAULT - "5 Secret FREE AI Tools" Kinetic Typography
//  Edit text, colors, and timing here. fps = 30
// ============================================================

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920; // vertical (YouTube Shorts / Reels). Use 1920x1080 for landscape.

export type Scene =
  | {
      kind: "hook";
      lines: string[]; // each line animates word-by-word
      highlight: string[]; // words (lowercased) to highlight in accent color
      accent: string;
      durationInFrames: number;
    }
  | {
      kind: "tool";
      number: number;
      name: string;
      tagline: string[];
      highlight: string[];
      accent: string;
      durationInFrames: number;
    }
  | {
      kind: "outro";
      lines: string[];
      highlight: string[];
      accent: string;
      durationInFrames: number;
    };

// Accent palette (neon / tech feel)
const NEON_PINK = "#ff2e63";
const NEON_CYAN = "#08d9d6";
const NEON_GREEN = "#39ff14";
const NEON_PURPLE = "#a855f7";
const NEON_ORANGE = "#ff8c00";
const NEON_YELLOW = "#ffe600";
const NEON_BLUE = "#3b82f6";

export const SCENES: Scene[] = [
  {
    kind: "hook",
    lines: [
      "Agar aap abhi bhi EXPENSIVE",
      "AI tools par apne paise",
      "BARBAAD kar rahe ho...",
      "toh RUK JAO!",
    ],
    highlight: ["expensive", "barbaad", "ruk", "jao!"],
    accent: NEON_PINK,
    durationInFrames: 150, // 5s
  },
  {
    kind: "hook",
    lines: ["Ye 5 SECRET", "FREE tools aapki", "LIFE badal denge."],
    highlight: ["5", "secret", "free", "life"],
    accent: NEON_GREEN,
    durationInFrames: 120, // 4s
  },
  {
    kind: "tool",
    number: 1,
    name: "ytZolo.com",
    tagline: [
      "High-CTR thumbnails,",
      "viral titles aur",
      "optimized scripts —",
      "wo bhi SECONDS mein!",
    ],
    highlight: ["high-ctr", "viral", "optimized", "seconds"],
    accent: NEON_CYAN,
    durationInFrames: 165, // 5.5s
  },
  {
    kind: "tool",
    number: 2,
    name: "Ideogram AI",
    tagline: [
      "Thumbnails mein",
      "FLAWLESS text aur",
      "modern graphics —",
      "best FREE text-to-image.",
    ],
    highlight: ["flawless", "free", "text-to-image."],
    accent: NEON_PURPLE,
    durationInFrames: 165,
  },
  {
    kind: "tool",
    number: 3,
    name: "Luma Dream Machine",
    tagline: [
      "Ultra-realistic",
      "AI B-rolls generate karo —",
      "bina COPYRIGHT",
      "strike ke dar ke.",
    ],
    highlight: ["ultra-realistic", "copyright"],
    accent: NEON_ORANGE,
    durationInFrames: 165,
  },
  {
    kind: "tool",
    number: 4,
    name: "Adobe Podcast AI",
    tagline: [
      "Noisy phone audio ko",
      "ek CLICK mein",
      "$1000 studio mic jaisa",
      "CRISP aur clear banao.",
    ],
    highlight: ["click", "$1000", "crisp"],
    accent: NEON_YELLOW,
    durationInFrames: 165,
  },
  {
    kind: "tool",
    number: 5,
    name: "CapCut Desktop AI",
    tagline: [
      "Object tracking aur",
      "automated KINETIC captions —",
      "normal video ko",
      "PRO level bana do.",
    ],
    highlight: ["kinetic", "pro"],
    accent: NEON_BLUE,
    durationInFrames: 165,
  },
  {
    kind: "outro",
    lines: [
      "Daily hidden tech",
      "updates ke liye",
      "TECH VAULT ko abhi",
      "SUBSCRIBE & FOLLOW karo!",
    ],
    highlight: ["tech", "vault", "subscribe", "follow"],
    accent: NEON_PINK,
    durationInFrames: 150,
  },
];

export const TOTAL_DURATION = SCENES.reduce(
  (sum, s) => sum + s.durationInFrames,
  0
);
