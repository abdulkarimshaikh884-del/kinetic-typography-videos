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
import { Icon } from "../components/Icon";
import { hexToRgba } from "../theme";

export const OutroScene: React.FC<{
  lines: string[];
  highlight: string[];
  accent: string;
  seedKey: string;
}> = ({ lines, highlight, accent, seedKey }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const btnEnter = spring({
    frame: frame - 60,
    fps,
    config: { damping: 11, stiffness: 140 },
  });
  const pulse = 1 + 0.045 * Math.sin((frame / fps) * 7);
  const btnScale = interpolate(btnEnter, [0, 1], [0, 1]) * pulse;
  const btnOp = interpolate(btnEnter, [0, 1], [0, 1]);

  // bell rings (rotates) periodically after appearing
  const ringT = (frame - 70) / fps;
  const bellRot =
    ringT > 0 ? Math.sin(ringT * 18) * Math.max(0, 14 - ringT * 6) : 0;

  return (
    <AbsoluteFill>
      <MeshBackground accent={accent} seedKey={seedKey} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 90,
          gap: 80,
        }}
      >
        <AnimatedText
          lines={lines}
          highlight={highlight}
          accent={accent}
          fontSize={96}
          staggerPerChar={1}
        />

        <div
          style={{
            transform: `scale(${btnScale})`,
            opacity: btnOp,
            display: "flex",
            alignItems: "center",
            gap: 26,
            background: `linear-gradient(135deg, ${accent}, ${hexToRgba(
              accent,
              0.75
            )})`,
            color: "#05060a",
            fontSize: 62,
            fontWeight: 900,
            padding: "30px 64px",
            borderRadius: 99,
            boxShadow: `0 0 60px ${hexToRgba(accent, 0.9)}`,
            letterSpacing: 1,
          }}
        >
          <Icon name="play" size={54} color="#05060a" />
          SUBSCRIBE
          <span
            style={{
              display: "inline-flex",
              transform: `rotate(${bellRot}deg)`,
              transformOrigin: "top center",
            }}
          >
            <Icon name="bell" size={54} color="#05060a" stroke={2.2} />
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
