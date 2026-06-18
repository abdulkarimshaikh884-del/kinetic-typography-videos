import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedWords } from "../components/AnimatedWords";
import { Background } from "../components/Background";

export const HookScene: React.FC<{
  lines: string[];
  highlight: string[];
  accent: string;
}> = ({ lines, highlight, accent }) => {
  return (
    <AbsoluteFill>
      <Background accent={accent} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 90,
        }}
      >
        <AnimatedWords
          lines={lines}
          highlight={highlight}
          accent={accent}
          fontSize={108}
          staggerPerWord={4}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
