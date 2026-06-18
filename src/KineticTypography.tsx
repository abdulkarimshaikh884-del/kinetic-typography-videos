import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
  type TransitionPresentation,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { SCENES, TRANSITION_FRAMES } from "./script";
import { HookScene } from "./scenes/HookScene";
import { ToolScene } from "./scenes/ToolScene";
import { OutroScene } from "./scenes/OutroScene";
import { ProgressBar } from "./components/ProgressBar";
import { Watermark } from "./components/Watermark";
import { COLORS } from "./theme";

const { fontFamily } = loadFont();

// A rotating set of professional transitions between scenes.
const TRANSITIONS: Array<() => TransitionPresentation<any>> = [
  () => slide({ direction: "from-right" }),
  () => wipe({ direction: "from-bottom-right" }),
  () => flip({ direction: "from-left" }),
  () => slide({ direction: "from-bottom" }),
  () => fade(),
  () => wipe({ direction: "from-left" }),
  () => slide({ direction: "from-top" }),
];

const renderScene = (scene: (typeof SCENES)[number], i: number) => {
  const seedKey = `s${i}`;
  if (scene.kind === "hook") {
    return (
      <HookScene
        kicker={scene.kicker}
        lines={scene.lines}
        highlight={scene.highlight}
        accent={scene.accent}
        seedKey={seedKey}
      />
    );
  }
  if (scene.kind === "tool") {
    return (
      <ToolScene
        number={scene.number}
        name={scene.name}
        icon={scene.icon}
        tagline={scene.tagline}
        highlight={scene.highlight}
        accent={scene.accent}
        seedKey={seedKey}
      />
    );
  }
  return (
    <OutroScene
      lines={scene.lines}
      highlight={scene.highlight}
      accent={scene.accent}
      seedKey={seedKey}
    />
  );
};

export const KineticTypography: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: COLORS.bg0 }}>
      <TransitionSeries>
        {SCENES.flatMap((scene, i) => {
          const seq = (
            <TransitionSeries.Sequence
              key={`seq-${i}`}
              durationInFrames={scene.durationInFrames}
            >
              {renderScene(scene, i)}
            </TransitionSeries.Sequence>
          );
          if (i === SCENES.length - 1) return [seq];
          const present = TRANSITIONS[i % TRANSITIONS.length]();
          const trans = (
            <TransitionSeries.Transition
              key={`tr-${i}`}
              presentation={present}
              timing={
                i % 2 === 0
                  ? springTiming({
                      config: { damping: 200 },
                      durationInFrames: TRANSITION_FRAMES,
                    })
                  : linearTiming({ durationInFrames: TRANSITION_FRAMES })
              }
            />
          );
          return [seq, trans];
        })}
      </TransitionSeries>

      {/* global overlays */}
      <ProgressBar accent={COLORS.cyan} />
      <Watermark accent={COLORS.cyan} brand="TECH VAULT" />

      {/* soundtrack */}
      <Audio src={staticFile("soundtrack.wav")} volume={0.85} />
    </AbsoluteFill>
  );
};
