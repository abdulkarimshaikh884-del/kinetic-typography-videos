# Kinetic Typography Video Generator (Advanced)

Professional kinetic-typography (animated text) videos for YouTube, built with
[Remotion](https://www.remotion.dev/) — write video using React.

The sample renders a **38s vertical (1080x1920)** Shorts/Reels video titled
*"5 Secret FREE AI Tools"* — with **music + sound design**, professional scene
transitions, glassmorphism tool cards, per-character animation, an animated mesh
background, a progress bar and a brand watermark.

## Quick start

```bash
npm install          # install dependencies
npm run genaudio     # (re)generate the soundtrack into public/soundtrack.wav
npm run dev          # open Remotion Studio to preview/edit live
npm run render       # render the video to out/video.mp4 (H.264, CRF 18)
```

## What's inside

```
src/
  index.ts                  # Remotion entry point
  Root.tsx                  # registers the composition
  theme.ts                  # colors, dimensions, transition length
  script.ts                 # EDIT THIS: text, colors, icons, timing, tools
  KineticTypography.tsx      # timeline: transitions + audio + overlays
  components/
    AnimatedText.tsx         # per-character 3D spring + highlight glow + light sweep
    MeshBackground.tsx       # animated gradient blobs, grid, particles, grain, vignette
    GlassCard.tsx            # glassmorphism container for tool scenes
    Icon.tsx                 # line-icon set used on tool cards
    ProgressBar.tsx          # top progress bar
    Watermark.tsx            # animated brand mark
  scenes/
    HookScene.tsx            # opening hooks (kicker pill + camera push-in)
    ToolScene.tsx            # per-tool glass card with number, icon, FREE pill
    OutroScene.tsx           # subscribe CTA with ringing bell
scripts/
  genaudio.mjs               # procedural soundtrack generator (no ffmpeg needed)
public/
  soundtrack.wav             # generated music + SFX bed
out/
  video.mp4                  # rendered sample
```

## Customize

Everything you normally change lives in **`src/script.ts`**:
text per scene, highlighted keywords, accent colors, tool icons and scene timing.
Colors and dimensions are in **`src/theme.ts`**.

The soundtrack is generated procedurally by `scripts/genaudio.mjs`
(sub-bass, kick, arpeggio, hats + whoosh/impact on every scene cut). Run
`npm run genaudio` after changing scene durations so the audio stays in sync.
Want your own track? Drop a file in `public/` and point `<Audio>` in
`KineticTypography.tsx` at it.

## Rendering notes (headless Linux)

Remotion renders with headless Chrome. On a minimal Linux box you may need the
Chrome shared libraries (nss, nspr, gtk3, dbus, etc.). If Chrome fails to launch,
install those system packages and retry `npm run render`.

---

Built with Remotion. Generated with Kiro.
