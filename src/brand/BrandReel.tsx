import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadSans } from "@remotion/google-fonts/Montserrat";
import {
  TransitionSeries,
  linearTiming,
  type TransitionPresentation,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { PaperBackground } from "./PaperBackground";
import { RevealText } from "./RevealText";
import { DividerLine } from "./DividerLine";
import {
  BRAND,
  BRAND_SCENES,
  TRANSITION_FRAMES,
  type BrandScene,
  rgba,
} from "./brandTheme";

const serif = loadSerif().fontFamily;
const sans = loadSans().fontFamily;

const PAD = 132;

// small uppercase label with a leading dot
const Kicker: React.FC<{ text: string; color?: string; delay?: number }> = ({
  text,
  color = BRAND.ink,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: op }}>
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: BRAND.clay }} />
      <span
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: 7,
          color: rgba(color, 0.75),
        }}
      >
        {text}
      </span>
    </div>
  );
};

const IntroScene: React.FC<{ s: Extract<BrandScene, { kind: "intro" }> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const fy = interpolate(frame, [40, 70], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const fo = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <PaperBackground seedKey="intro" />
      <AbsoluteFill style={{ padding: PAD, justifyContent: "center", gap: 40 }}>
        <Kicker text={s.label} />
        <DividerLine startFrame={10} width="44%" />
        <div style={{ marginTop: 8 }}>
          <RevealText
            lines={s.title}
            fontFamily={serif}
            fontSize={150}
            color={BRAND.ink}
            weight={600}
            italic
            startFrame={14}
            stagger={5}
            lineHeight={0.98}
          />
        </div>
        <div style={{ transform: `translateY(${fy}px)`, opacity: fo, marginTop: 24 }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 44, color: BRAND.inkSoft }}>
            {s.footer}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ItemScene: React.FC<{ s: Extract<BrandScene, { kind: "item" }> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const numP = interpolate(frame, [4, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const descO = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(descO, [0, 1], [18, 0]);
  const pad = String(s.index).padStart(2, "0");

  return (
    <AbsoluteFill>
      <PaperBackground accent={s.accent} seedKey={`item${s.index}`} />
      {/* left accent bar */}
      <div
        style={{
          position: "absolute",
          left: PAD - 36,
          top: PAD + 40,
          width: 8,
          height: interpolate(numP, [0, 1], [0, 360]),
          background: s.accent,
        }}
      />
      <AbsoluteFill style={{ padding: PAD, justifyContent: "center", gap: 30 }}>
        <Kicker text={s.tag} delay={6} />

        {/* big index */}
        <div
          style={{
            fontFamily: serif,
            fontSize: 230,
            lineHeight: 0.9,
            color: s.accent,
            fontWeight: 500,
            transform: `translateY(${interpolate(numP, [0, 1], [40, 0])}px)`,
            opacity: numP,
          }}
        >
          {pad}
          <span style={{ fontSize: 70, color: BRAND.inkSoft }}> / 0{s.total}</span>
        </div>

        <RevealText
          lines={[s.name]}
          fontFamily={serif}
          fontSize={104}
          color={BRAND.ink}
          weight={700}
          startFrame={20}
          stagger={4}
        />

        <DividerLine startFrame={34} width="60%" color={s.accent} />

        <div
          style={{
            transform: `translateY(${descY}px)`,
            opacity: descO,
            maxWidth: "78%",
            marginTop: 8,
          }}
        >
          <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 46, lineHeight: 1.4, color: rgba(BRAND.ink, 0.78) }}>
            {s.desc}
          </span>
        </div>
      </AbsoluteFill>

      {/* free tag bottom-right */}
      <div
        style={{
          position: "absolute",
          right: PAD,
          bottom: PAD,
          fontFamily: sans,
          fontSize: 26,
          letterSpacing: 4,
          color: rgba(BRAND.ink, 0.6),
          border: `2px solid ${rgba(BRAND.ink, 0.3)}`,
          padding: "10px 22px",
          borderRadius: 99,
          opacity: descO,
        }}
      >
        100% FREE
      </div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC<{ s: Extract<BrandScene, { kind: "outro" }> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const btn = interpolate(frame, [70, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill>
      <PaperBackground seedKey="outro" />
      <AbsoluteFill style={{ padding: PAD, justifyContent: "center", alignItems: "center", gap: 38 }}>
        <Kicker text={s.label} />
        <div style={{ textAlign: "center" }}>
          <RevealText
            lines={s.title}
            fontFamily={serif}
            fontSize={140}
            color={BRAND.ink}
            weight={600}
            italic
            align="center"
            startFrame={14}
            stagger={5}
            lineHeight={1.0}
          />
        </div>
        <DividerLine startFrame={40} width="30%" />
        <div
          style={{
            transform: `scale(${interpolate(btn, [0, 1], [0.9, 1])})`,
            opacity: btn,
            marginTop: 16,
            fontFamily: sans,
            fontWeight: 600,
            fontSize: 40,
            letterSpacing: 3,
            color: BRAND.paper,
            background: BRAND.ink,
            padding: "22px 56px",
            borderRadius: 99,
          }}
        >
          SUBSCRIBE
        </div>
        <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 40, color: BRAND.inkSoft, opacity: btn }}>
          {s.footer}
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const renderBrandScene = (s: BrandScene) => {
  if (s.kind === "intro") return <IntroScene s={s} />;
  if (s.kind === "item") return <ItemScene s={s} />;
  return <OutroScene s={s} />;
};

const TRANS: Array<() => TransitionPresentation<any>> = [
  () => fade(),
  () => slide({ direction: "from-right" }),
  () => fade(),
  () => slide({ direction: "from-bottom" }),
  () => fade(),
  () => slide({ direction: "from-right" }),
];

export const BrandReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.paper }}>
      <TransitionSeries>
        {BRAND_SCENES.flatMap((s, i) => {
          const seq = (
            <TransitionSeries.Sequence key={`bs-${i}`} durationInFrames={s.durationInFrames}>
              {renderBrandScene(s)}
            </TransitionSeries.Sequence>
          );
          if (i === BRAND_SCENES.length - 1) return [seq];
          const tr = (
            <TransitionSeries.Transition
              key={`bt-${i}`}
              presentation={TRANS[i % TRANS.length]()}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
          );
          return [seq, tr];
        })}
      </TransitionSeries>
      <Audio src={staticFile("soundtrack-brand.wav")} volume={0.8} />
    </AbsoluteFill>
  );
};
