import React from "react";
import {
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, hexToRgba, shade } from "../theme";

// Animated gradient-mesh background with grid, light blobs, floating
// particles, scanlines and film grain for a cinematic tech look.
export const MeshBackground: React.FC<{ accent: string; seedKey?: string }> = ({
  accent,
  seedKey = "bg",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const t = frame / 30;
  const blob = (i: number, speed: number, rad: number) => {
    const px = 50 + Math.sin(t * speed + i) * 28;
    const py = 45 + Math.cos(t * speed * 0.8 + i * 2) * 26;
    return { px, py, rad };
  };

  const b1 = blob(0, 0.5, width * 0.95);
  const b2 = blob(3, 0.37, width * 0.8);
  const b3 = blob(6, 0.62, width * 0.6);

  // floating particles with depth (parallax sizes)
  const particles = new Array(34).fill(0).map((_, i) => {
    const sx = random(`${seedKey}-x-${i}`);
    const depth = random(`${seedKey}-d-${i}`); // 0..1
    const speed = 0.3 + depth * 1.6;
    const baseY = random(`${seedKey}-y-${i}`) * height;
    let y = (baseY - frame * speed * 2.4) % (height + 120);
    if (y < 0) y += height + 120;
    const size = 2 + depth * 9;
    return {
      x: sx * width,
      y,
      size,
      opacity: 0.1 + depth * 0.35,
      drift: Math.sin(t * (0.5 + depth) + i) * 14,
    };
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(120% 90% at 50% 0%, ${COLORS.bg2} 0%, ${COLORS.bg1} 45%, ${COLORS.bg0} 100%)`,
        }}
      />

      {/* mesh blobs */}
      {[
        { b: b1, c: accent, a: 0.34, blur: 80 },
        { b: b2, c: shade(accent, 50), a: 0.26, blur: 110 },
        { b: b3, c: COLORS.blue, a: 0.14, blur: 90 },
      ].map((g, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${g.b.px}%`,
            top: `${g.b.py}%`,
            width: g.b.rad,
            height: g.b.rad,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${hexToRgba(
              g.c,
              g.a
            )} 0%, transparent 62%)`,
            filter: `blur(${g.blur}px)`,
          }}
        />
      ))}

      {/* perspective grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${hexToRgba(
            accent,
            0.07
          )} 1px, transparent 1px), linear-gradient(90deg, ${hexToRgba(
            accent,
            0.07
          )} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at 50% 42%, black 10%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 42%, black 10%, transparent 72%)",
        }}
      />

      {/* particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x + p.drift,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: accent,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2.4}px ${accent}`,
          }}
        />
      ))}

      {/* scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 4px)",
          opacity: 0.5,
        }}
      />

      {/* film grain (SVG turbulence) */}
      <svg
        style={{ position: "absolute", inset: 0, opacity: 0.06 }}
        width="100%"
        height="100%"
      >
        <filter id={`grain-${seedKey}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed={Math.floor(frame / 2) % 50}
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seedKey})`} />
      </svg>

      {/* vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 45%, transparent 38%, rgba(0,0,0,0.62) 100%)",
        }}
      />
    </div>
  );
};
