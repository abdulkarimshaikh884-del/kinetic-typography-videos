// ============================================================
//  TECH VAULT - "5 Secret FREE AI Tools"
//  EDIT EVERYTHING HERE: text, colors, icons, timing. fps = 30
// ============================================================
import { COLORS, FPS, WIDTH, HEIGHT, TRANSITION_FRAMES } from "./theme";

export { FPS, WIDTH, HEIGHT, TRANSITION_FRAMES };

export type Scene =
  | {
      kind: "hook";
      kicker?: string; // small label above
      lines: string[];
      highlight: string[];
      accent: string;
      durationInFrames: number;
    }
  | {
      kind: "tool";
      number: number;
      name: string;
      icon: string; // key from Icon.tsx
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

export const SCENES: Scene[] = [
  {
    kind: "hook",
    kicker: "RUKO ZARA",
    lines: [
      "Agar aap abhi bhi EXPENSIVE",
      "AI tools par paise",
      "BARBAAD kar rahe ho...",
    ],
    highlight: ["expensive", "barbaad"],
    accent: COLORS.pink,
    durationInFrames: 150,
  },
  {
    kind: "hook",
    kicker: "YE DEKHO",
    lines: ["Ye 5 SECRET", "FREE tools aapki", "LIFE badal denge."],
    highlight: ["5", "secret", "free", "life"],
    accent: COLORS.green,
    durationInFrames: 120,
  },
  {
    kind: "tool",
    number: 1,
    name: "ytZolo.com",
    icon: "rocket",
    tagline: ["High-CTR thumbnails,", "viral titles aur", "scripts SECONDS mein!"],
    highlight: ["high-ctr", "viral", "seconds"],
    accent: COLORS.cyan,
    durationInFrames: 165,
  },
  {
    kind: "tool",
    number: 2,
    name: "Ideogram AI",
    icon: "image",
    tagline: ["Thumbnails mein", "FLAWLESS text aur", "modern graphics, FREE."],
    highlight: ["flawless", "free."],
    accent: COLORS.purple,
    durationInFrames: 165,
  },
  {
    kind: "tool",
    number: 3,
    name: "Luma Dream Machine",
    icon: "video",
    tagline: ["Ultra-realistic", "AI B-rolls banao,", "bina COPYRIGHT dar ke."],
    highlight: ["ultra-realistic", "copyright"],
    accent: COLORS.orange,
    durationInFrames: 165,
  },
  {
    kind: "tool",
    number: 4,
    name: "Adobe Podcast AI",
    icon: "audio",
    tagline: ["Noisy audio ko ek", "CLICK mein $1000", "studio mic jaisa CRISP."],
    highlight: ["click", "$1000", "crisp."],
    accent: COLORS.yellow,
    durationInFrames: 165,
  },
  {
    kind: "tool",
    number: 5,
    name: "CapCut Desktop AI",
    icon: "scissors",
    tagline: ["Auto KINETIC captions", "aur object tracking,", "video PRO bana do."],
    highlight: ["kinetic", "pro"],
    accent: COLORS.blue,
    durationInFrames: 165,
  },
  {
    kind: "outro",
    lines: ["Daily hidden tech", "ke liye TECH VAULT", "ko SUBSCRIBE karo!"],
    highlight: ["tech", "vault", "subscribe"],
    accent: COLORS.pink,
    durationInFrames: 165,
  },
];

// Total accounts for the overlap created by transitions between scenes.
export const TOTAL_DURATION =
  SCENES.reduce((sum, s) => sum + s.durationInFrames, 0) -
  (SCENES.length - 1) * TRANSITION_FRAMES;
