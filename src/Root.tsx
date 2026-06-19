import React from "react";
import { Composition } from "remotion";
import { KineticTypography } from "./KineticTypography";
import { BrandReel } from "./brand/BrandReel";
import { FPS, WIDTH, HEIGHT, TOTAL_DURATION } from "./script";
import { BRAND_TOTAL } from "./brand/brandTheme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Elegant "Modern Branding Reel" style (new) */}
      <Composition
        id="BrandReel"
        component={BrandReel}
        durationInFrames={BRAND_TOTAL}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* Neon kinetic-typography style (previous) */}
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
