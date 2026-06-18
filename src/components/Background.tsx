import React from "react";
import { interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";

export const Background: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Slow rotating radial glow
  const glowShift = interpolate(
    frame % 240,
    [0, 120, 240],
    [-200, 200, -200]
  );

  // Floating particles
  const particles = new Array(28).fill(0).map((_, i) => {
    const seedX = random(`x-${i}`);
    const seedY = random(`y-${i}`);
    const seedS = random(`s-${i}`);
    const speed = 0.4 + random(`sp-${i}`) * 1.2;
    const baseY = seedY * height;
    const y = (baseY - frame * speed * 2) % (height + 100);
    const size = 3 + seedS * 8;
    const opacity = 0.15 + random(`o-${i}`) * 0.35;
    return {
      x: seedX * width,
      y: y < 0 ? y + height + 100 : y,
      size,
      opacity,
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(160deg, #0a0a0f 0%, #12121c 50%, #07070b 100%)",
        overflow: "hidden",
      }}
    >
      {/* moving accent glow */}
      <div
        style={{
          position: "absolute",
          left: `${20 + glowShift / 8}%`,
          top: "30%",
          width: width * 0.9,
          height: width * 0.9,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}33 0%, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: `${10 - glowShift / 10}%`,
          bottom: "10%",
          width: width * 0.7,
          height: width * 0.7,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}22 0%, transparent 60%)`,
          filter: "blur(50px)",
        }}
      />

      {/* particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: accent,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${accent}`,
          }}
        />
      ))}

      {/* subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
};
