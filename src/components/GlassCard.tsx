import React from "react";
import { hexToRgba } from "../theme";

// Glassmorphism container used to frame tool content.
export const GlassCard: React.FC<{
  accent: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ accent, children, style }) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 44,
        padding: "70px 64px",
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        border: `1.5px solid ${hexToRgba(accent, 0.5)}`,
        boxShadow: `0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 60px ${hexToRgba(
          accent,
          0.22
        )}`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* top highlight line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "12%",
          width: "76%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.8,
        }}
      />
      {children}
    </div>
  );
};
