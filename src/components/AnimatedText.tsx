import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { hexToRgba } from "../theme";

type Props = {
  lines: string[];
  highlight: string[];
  accent: string;
  fontSize: number;
  startFrame?: number;
  staggerPerChar?: number;
  align?: "center" | "left";
};

// Kinetic typography text: animates per-character with a 3D spring
// entrance (rotateX + slide + blur). Highlighted words glow in the
// accent color and get an animated light sweep.
export const AnimatedText: React.FC<Props> = ({
  lines,
  highlight,
  accent,
  fontSize,
  startFrame = 0,
  staggerPerChar = 1.1,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hot = new Set(highlight.map((h) => h.toLowerCase()));

  let charCounter = 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: fontSize * 0.16,
        width: "100%",
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: align === "center" ? "center" : "flex-start",
            gap: fontSize * 0.26,
            perspective: 800,
          }}
        >
          {line.split(" ").map((word, wi) => {
            const clean = word.replace(/[.,!?…]/g, "").toLowerCase();
            const isHot = hot.has(clean) || hot.has(word.toLowerCase());
            return (
              <span
                key={wi}
                style={{
                  display: "inline-flex",
                  position: "relative",
                  whiteSpace: "nowrap",
                }}
              >
                {word.split("").map((ch, ci) => {
                  const delay = startFrame + charCounter * staggerPerChar;
                  charCounter += 1;
                  const e = spring({
                    frame: frame - delay,
                    fps,
                    config: { damping: 13, mass: 0.5, stiffness: 130 },
                  });
                  const ty = interpolate(e, [0, 1], [70, 0]);
                  const rx = interpolate(e, [0, 1], [-92, 0]);
                  const op = interpolate(e, [0, 1], [0, 1]);
                  const bl = interpolate(e, [0, 1], [10, 0]);
                  return (
                    <span
                      key={ci}
                      style={{
                        display: "inline-block",
                        transform: `translateY(${ty}px) rotateX(${rx}deg)`,
                        opacity: op,
                        filter: `blur(${bl}px)`,
                        color: isHot ? accent : "#fff",
                        fontWeight: isHot ? 900 : 800,
                        textShadow: isHot
                          ? `0 0 22px ${accent}, 0 0 46px ${hexToRgba(
                              accent,
                              0.7
                            )}`
                          : "0 6px 20px rgba(0,0,0,0.6)",
                        fontSize,
                        letterSpacing: "-1px",
                        lineHeight: 1.02,
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
                {/* light sweep on highlighted words */}
                {isHot && (
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(105deg, transparent 35%, ${hexToRgba(
                        "#ffffff",
                        0.85
                      )} 50%, transparent 65%)`,
                      mixBlendMode: "overlay",
                      transform: `translateX(${interpolate(
                        (frame - startFrame) % 120,
                        [0, 60],
                        [-140, 140],
                        { extrapolateRight: "clamp" }
                      )}%)`,
                      opacity: 0.5,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
