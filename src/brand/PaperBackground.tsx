import React from "react";
import { useCurrentFrame } from "remotion";
import { BRAND, rgba } from "./brandTheme";

// Warm editorial paper backdrop: cream gradient, slow drifting soft
// shapes, paper grain, and a thin inset frame for a print-like feel.
export const PaperBackground: React.FC<{ accent?: string; seedKey?: string }> = ({
  accent = BRAND.clay,
  seedKey = "p",
}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(130% 100% at 30% 10%, ${BRAND.paper} 0%, ${BRAND.paper2} 70%, #ddd1bb 100%)`,
        }}
      />

      {/* soft drifting shapes */}
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          left: `${20 + Math.sin(t * 0.25) * 6}%`,
          top: `${8 + Math.cos(t * 0.2) * 5}%`,
          background: `radial-gradient(circle, ${rgba(accent, 0.16)}, transparent 65%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          borderRadius: "50%",
          right: `${10 + Math.cos(t * 0.22) * 6}%`,
          bottom: `${10 + Math.sin(t * 0.18) * 5}%`,
          background: `radial-gradient(circle, ${rgba(BRAND.sage, 0.14)}, transparent 65%)`,
          filter: "blur(50px)",
        }}
      />

      {/* paper grain */}
      <svg
        style={{ position: "absolute", inset: 0, opacity: 0.08, mixBlendMode: "multiply" }}
        width="100%"
        height="100%"
      >
        <filter id={`pg-${seedKey}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={Math.floor(frame / 3) % 40}
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#pg-${seedKey})`} />
      </svg>

      {/* thin inset frame */}
      <div
        style={{
          position: "absolute",
          inset: 56,
          border: `2px solid ${rgba(BRAND.ink, 0.22)}`,
          borderRadius: 6,
        }}
      />
      {/* corner ticks */}
      {[
        { top: 44, left: 44 },
        { top: 44, right: 44 },
        { bottom: 44, left: 44 },
        { bottom: 44, right: 44 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 26,
            height: 26,
            border: `2px solid ${rgba(BRAND.ink, 0.5)}`,
            ...pos,
          }}
        />
      ))}
    </div>
  );
};
