import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  lines: string[];
  highlight: string[];
  accent: string;
  fontSize: number;
  startFrame?: number;
  staggerPerWord?: number;
};

// Renders text line-by-line, animating each word in with a bouncy spring,
// scale punch, blur clear-up and an upward slide — classic kinetic typography.
export const AnimatedWords: React.FC<Props> = ({
  lines,
  highlight,
  accent,
  fontSize,
  startFrame = 0,
  staggerPerWord = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const highlightSet = new Set(highlight.map((h) => h.toLowerCase()));
  let wordIndex = 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: fontSize * 0.18,
      }}
    >
      {lines.map((line, lineIdx) => (
        <div
          key={lineIdx}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: fontSize * 0.28,
          }}
        >
          {line.split(" ").map((word, i) => {
            const delay = startFrame + wordIndex * staggerPerWord;
            wordIndex += 1;

            const enter = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12, mass: 0.6, stiffness: 120 },
            });

            const scale = interpolate(enter, [0, 1], [0.4, 1]);
            const translateY = interpolate(enter, [0, 1], [60, 0]);
            const opacity = interpolate(enter, [0, 1], [0, 1]);
            const blur = interpolate(enter, [0, 1], [12, 0]);

            const clean = word.replace(/[.,!?]/g, "").toLowerCase();
            const isHot = highlightSet.has(clean) || highlightSet.has(word.toLowerCase());

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  color: isHot ? accent : "#ffffff",
                  textShadow: isHot
                    ? `0 0 24px ${accent}, 0 0 48px ${accent}`
                    : "0 6px 18px rgba(0,0,0,0.55)",
                  fontWeight: isHot ? 900 : 800,
                  fontSize: isHot ? fontSize * 1.08 : fontSize,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.05,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
