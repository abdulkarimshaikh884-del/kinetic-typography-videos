import React from "react";
import { AbsoluteFill, interpolate, Series, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { SCENES } from "./script";
import { HookScene } from "./scenes/HookScene";
import { ToolScene } from "./scenes/ToolScene";
import { OutroScene } from "./scenes/OutroScene";

const { fontFamily } = loadFont();

// Fades each scene in at the start and out at the end for smooth cuts.
const SceneWrapper: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {children}
    </AbsoluteFill>
  );
};

export const KineticTypography: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#07070b" }}>
      <Series>
        {SCENES.map((scene, i) => (
          <Series.Sequence
            key={i}
            durationInFrames={scene.durationInFrames}
          >
            <SceneWrapper durationInFrames={scene.durationInFrames}>
              {scene.kind === "hook" && (
                <HookScene
                  lines={scene.lines}
                  highlight={scene.highlight}
                  accent={scene.accent}
                />
              )}
              {scene.kind === "tool" && (
                <ToolScene
                  number={scene.number}
                  name={scene.name}
                  tagline={scene.tagline}
                  highlight={scene.highlight}
                  accent={scene.accent}
                />
              )}
              {scene.kind === "outro" && (
                <OutroScene
                  lines={scene.lines}
                  highlight={scene.highlight}
                  accent={scene.accent}
                />
              )}
            </SceneWrapper>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
