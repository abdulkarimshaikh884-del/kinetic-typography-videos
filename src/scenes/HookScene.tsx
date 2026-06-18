import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { MeshBackground } from "../components/MeshBackground";
import { hexToRgba } from "../theme";

export const HookScene: React.FC<{
  kicker?: string;
  lines: string[];
  highlight: string[];
  accent: string;
  seedKey: string;
}> = ({ kicker, lines, highlight, accent, seedKey }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // slow push-in camera move
  const camZoom = interpolate(frame, [0, durationInFrames], [1.06, 1.14]);

  const kEnter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const ky = interpolate(kEnter, [0, 1], [-40, 0]);
  const kOp = interpolate(kEnter, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <MeshBackground accent={accent} seedKey={seedKey} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 90,
          transform: `scale(${camZoom})`,
        }}
      >
        {kicker && (
          <div
            style={{
              transform: `translateY(${ky}px)`,
              opacity: kOp,
              marginBottom: 44,
              padding: "14px 34px",
              borderRadius: 99,
              border: `2px solid ${hexToRgba(accent, 0.8)}`,
              background: hexToRgba(accent, 0.12),
              color: accent,
              fontWeight: 800,
              fontSize: 38,
              letterSpacing: 8,
              textShadow: `0 0 18px ${accent}`,
            }}
          >
            {kicker}
          </div>
        )}
        <AnimatedText
          lines={lines}
          highlight={highlight}
          accent={accent}
          fontSize={104}
          staggerPerChar={1.1}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
