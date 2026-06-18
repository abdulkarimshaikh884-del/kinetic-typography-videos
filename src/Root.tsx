import React from "react";
import { Composition } from "remotion";
import { KineticTypography } from "./KineticTypography";
import { FPS, WIDTH, HEIGHT, TOTAL_DURATION } from "./script";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KineticTypography"
        component={KineticTypography}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
