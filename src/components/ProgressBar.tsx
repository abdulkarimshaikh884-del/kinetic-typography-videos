import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { hexToRgba } from "../theme";

// Thin progress bar pinned to the top, fills across the whole video.
export const ProgressBar: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = Math.min(1, frame / durationInFrames) * 100;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 8,
        background: "rgba(255,255,255,0.08)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: accent,
          boxShadow: `0 0 16px ${accent}, 0 0 30px ${hexToRgba(accent, 0.7)}`,
        }}
      />
    </div>
  );
};
