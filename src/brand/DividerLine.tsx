import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { BRAND, rgba } from "./brandTheme";

// A thin rule that draws horizontally — editorial divider.
export const DividerLine: React.FC<{
  startFrame?: number;
  color?: string;
  thickness?: number;
  width?: number | string;
  duration?: number;
}> = ({
  startFrame = 0,
  color = BRAND.ink,
  thickness = 2,
  width = "100%",
  duration = 26,
}) => {
  const frame = useCurrentFrame();
  const sx = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div style={{ width, height: thickness, overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: rgba(color, 0.55),
          transform: `scaleX(${sx})`,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};
