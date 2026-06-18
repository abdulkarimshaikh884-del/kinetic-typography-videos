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
import { GlassCard } from "../components/GlassCard";
import { Icon } from "../components/Icon";
import { hexToRgba } from "../theme";

export const ToolScene: React.FC<{
  number: number;
  name: string;
  icon: string;
  tagline: string[];
  highlight: string[];
  accent: string;
  seedKey: string;
}> = ({ number, name, icon, tagline, highlight, accent, seedKey }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const camZoom = interpolate(frame, [0, durationInFrames], [1.04, 1.1]);

  // card rises in
  const cardEnter = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 110 },
  });
  const cardY = interpolate(cardEnter, [0, 1], [120, 0]);
  const cardOp = interpolate(cardEnter, [0, 1], [0, 1]);

  // icon pops with rotation
  const iconEnter = spring({
    frame: frame - 8,
    fps,
    config: { damping: 9, stiffness: 150 },
  });
  const iconScale = interpolate(iconEnter, [0, 1], [0, 1]);
  const iconRot = interpolate(iconEnter, [0, 1], [-40, 0]);
  const iconFloat = Math.sin(frame / 16) * 8;

  // number count + punch
  const numEnter = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });
  const numScale = interpolate(numEnter, [0, 1], [0, 1]);

  // underline grows
  const lineW = interpolate(
    spring({ frame: frame - 16, fps, config: { damping: 16 } }),
    [0, 1],
    [0, 100]
  );

  // FREE pill
  const pillEnter = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 160 },
  });
  const pillScale = interpolate(pillEnter, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <MeshBackground accent={accent} seedKey={seedKey} />

      {/* giant ghost number behind everything */}
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <span
          style={{
            fontSize: 1100,
            fontWeight: 900,
            color: hexToRgba(accent, 0.07),
            transform: `translateY(-120px) scale(${interpolate(
              numEnter,
              [0, 1],
              [0.7, 1]
            )})`,
            lineHeight: 1,
          }}
        >
          {number}
        </span>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 70,
          transform: `scale(${camZoom})`,
        }}
      >
        <div
          style={{
            transform: `translateY(${cardY}px)`,
            opacity: cardOp,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 46,
          }}
        >
          <GlassCard accent={accent} style={{ width: "100%" }}>
            {/* header row: number chip + icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                }}
              >
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 28,
                    background: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${numScale})`,
                    boxShadow: `0 0 40px ${hexToRgba(accent, 0.8)}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 70,
                      fontWeight: 900,
                      color: "#05060a",
                    }}
                  >
                    {number}
                  </span>
                </div>
                <span
                  style={{
                    color: hexToRgba("#ffffff", 0.6),
                    fontSize: 32,
                    fontWeight: 800,
                    letterSpacing: 6,
                  }}
                >
                  TOOL
                </span>
              </div>

              <div
                style={{
                  transform: `scale(${iconScale}) rotate(${iconRot}deg) translateY(${iconFloat}px)`,
                  filter: `drop-shadow(0 0 22px ${accent})`,
                }}
              >
                <Icon name={icon} size={110} color={accent} stroke={1.7} />
              </div>
            </div>

            {/* tool name */}
            <div
              style={{
                fontSize: 86,
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-1.5px",
                lineHeight: 1.05,
                textShadow: "0 8px 30px rgba(0,0,0,0.6)",
              }}
            >
              {name}
            </div>
            <div
              style={{
                height: 9,
                width: `${lineW}%`,
                marginTop: 18,
                background: `linear-gradient(90deg, ${accent}, ${hexToRgba(
                  accent,
                  0.2
                )})`,
                borderRadius: 99,
                boxShadow: `0 0 20px ${accent}`,
              }}
            />

            {/* FREE pill */}
            <div
              style={{
                transform: `scale(${pillScale})`,
                marginTop: 30,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 26px",
                borderRadius: 99,
                alignSelf: "flex-start",
                background: hexToRgba(accent, 0.16),
                border: `2px solid ${accent}`,
                color: accent,
                fontWeight: 900,
                fontSize: 34,
                letterSpacing: 2,
              }}
            >
              ✓ 100% FREE
            </div>
          </GlassCard>

          {/* kinetic tagline below the card */}
          <AnimatedText
            lines={tagline}
            highlight={highlight}
            accent={accent}
            fontSize={58}
            startFrame={24}
            staggerPerChar={0.9}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
