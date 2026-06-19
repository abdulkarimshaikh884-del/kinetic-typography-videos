import React from "react";
import {
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

type Props = {
  lines: string[];
  fontFamily: string;
  fontSize: number;
  color: string;
  startFrame?: number;
  stagger?: number; // frames between words
  weight?: number;
  italic?: boolean;
  align?: "center" | "left";
  lineHeight?: number;
  letterSpacing?: number;
};

// Editorial mask reveal: each word slides up from behind a clip line
// with a smooth ease (no bounce) — the classic branding-reel feel.
export const RevealText: React.FC<Props> = ({
  lines,
  fontFamily,
  fontSize,
  color,
  startFrame = 0,
  stagger = 4,
  weight = 700,
  italic = false,
  align = "left",
  lineHeight = 1.04,
  letterSpacing = 0,
}) => {
  const frame = useCurrentFrame();
  let wordIdx = 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: align === "center" ? "center" : "flex-start",
            gap: `${fontSize * 0.28}px`,
            overflow: "hidden",
            paddingBottom: fontSize * 0.12,
          }}
        >
          {line.split(" ").map((word, wi) => {
            const delay = startFrame + wordIdx * stagger;
            wordIdx += 1;
            const p = interpolate(frame, [delay, delay + 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            const ty = interpolate(p, [0, 1], [fontSize * 1.1, 0]);
            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  transform: `translateY(${ty}px)`,
                  color,
                  fontFamily,
                  fontWeight: weight,
                  fontStyle: italic ? "italic" : "normal",
                  fontSize,
                  lineHeight,
                  letterSpacing,
                  whiteSpace: "nowrap",
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
