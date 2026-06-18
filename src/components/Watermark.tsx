import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// Subtle animated brand watermark in the top-left corner.
export const Watermark: React.FC<{ accent: string; brand?: string }> = ({
  accent,
  brand = "TECH VAULT",
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.7 + 0.3 * Math.sin(frame / 18);
  const intro = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 42,
        left: 44,
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity: 0.85 * intro,
        transform: `translateX(${interpolate(intro, [0, 1], [-30, 0])}px)`,
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 5,
          background: accent,
          boxShadow: `0 0 ${14 * pulse}px ${accent}`,
          transform: "rotate(45deg)",
        }}
      />
      <span
        style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: 30,
          letterSpacing: 3,
          textShadow: "0 2px 10px rgba(0,0,0,0.6)",
        }}
      >
        {brand}
      </span>
    </div>
  );
};
