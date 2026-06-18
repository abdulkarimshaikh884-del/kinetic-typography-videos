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

export const ToolScene: React.FC<{
  number: number;
  name: string;
  tagline: string[];
  highlight: string[];
  accent: string;
}> = ({ number, name, tagline, highlight, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Big number punches in
  const numEnter = spring({
    frame,
    fps,
    config: { damping: 9, mass: 0.8, stiffness: 140 },
  });
  const numScale = interpolate(numEnter, [0, 1], [0, 1]);
  const numRotate = interpolate(numEnter, [0, 1], [-25, 0]);

  // Tool name slides up after number
  const nameEnter = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const nameY = interpolate(nameEnter, [0, 1], [50, 0]);
  const nameOpacity = interpolate(nameEnter, [0, 1], [0, 1]);

  // Underline grows
  const lineWidth = interpolate(
    spring({ frame: frame - 18, fps, config: { damping: 16 } }),
    [0, 1],
    [0, 100]
  );

  return (
    <AbsoluteFill>
      <Background accent={accent} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          gap: 36,
        }}
      >
        {/* NUMBER badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              opacity: 0.7,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Number
          </span>
          <span
            style={{
              fontSize: 220,
              fontWeight: 900,
              color: accent,
              transform: `scale(${numScale}) rotate(${numRotate}deg)`,
              textShadow: `0 0 40px ${accent}, 0 0 80px ${accent}`,
              lineHeight: 1,
            }}
          >
            {number}
          </span>
        </div>

        {/* TOOL NAME */}
        <div
          style={{
            transform: `translateY(${nameY}px)`,
            opacity: nameOpacity,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1px",
              textShadow: "0 8px 30px rgba(0,0,0,0.6)",
            }}
          >
            {name}
          </div>
          <div
            style={{
              height: 8,
              width: `${lineWidth}%`,
              margin: "18px auto 0",
              background: accent,
              borderRadius: 99,
              boxShadow: `0 0 20px ${accent}`,
            }}
          />
        </div>

        {/* TAGLINE - kinetic words */}
        <div style={{ marginTop: 30 }}>
          <AnimatedWords
            lines={tagline}
            highlight={highlight}
            accent={accent}
            fontSize={64}
            startFrame={26}
            staggerPerWord={3}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
