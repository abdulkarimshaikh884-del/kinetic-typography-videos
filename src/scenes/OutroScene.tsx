import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedWords } from "../components/AnimatedWords";
import { Background } from "../components/Background";

export const OutroScene: React.FC<{
  lines: string[];
  highlight: string[];
  accent: string;
}> = ({ lines, highlight, accent }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Pulsing subscribe button near the end
  const btnEnter = spring({
    frame: frame - 70,
    fps,
    config: { damping: 10, stiffness: 130 },
  });
  const pulse = 1 + 0.05 * Math.sin((frame / fps) * 6);
  const btnScale = interpolate(btnEnter, [0, 1], [0, 1]) * pulse;
  const btnOpacity = interpolate(btnEnter, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <Background accent={accent} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 90,
          gap: 60,
        }}
      >
        <AnimatedWords
          lines={lines}
          highlight={highlight}
          accent={accent}
          fontSize={100}
          staggerPerWord={4}
        />

        <div
          style={{
            transform: `scale(${btnScale})`,
            opacity: btnOpacity,
            background: accent,
            color: "#0a0a0f",
            fontSize: 64,
            fontWeight: 900,
            padding: "30px 70px",
            borderRadius: 99,
            boxShadow: `0 0 50px ${accent}`,
            letterSpacing: 1,
          }}
        >
          ► SUBSCRIBE
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
