// ============================================================
//  Design tokens for the Tech Vault video
// ============================================================

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920; // vertical (Shorts / Reels)

export const TRANSITION_FRAMES = 16;

// Neon accent palette (tech feel)
export const COLORS = {
  bg0: "#05060a",
  bg1: "#0a0c14",
  bg2: "#10131f",
  white: "#ffffff",
  dim: "rgba(255,255,255,0.62)",
  pink: "#ff2e63",
  cyan: "#08d9d6",
  green: "#39ff14",
  purple: "#a855f7",
  orange: "#ff9f1c",
  yellow: "#ffe600",
  blue: "#4d7cff",
} as const;

// Returns a darker companion shade for gradients
export const shade = (hex: string, amt = -40) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amt);
  const g = clamp(((n >> 8) & 0xff) + amt);
  const b = clamp((n & 0xff) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

export const hexToRgba = (hex: string, a: number) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 0xff}, ${n & 0xff}, ${a})`;
};
