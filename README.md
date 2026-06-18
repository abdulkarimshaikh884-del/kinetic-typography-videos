# Kinetic Typography Video Generator

Kinetic typography (animated text) videos for YouTube, built with [Remotion](https://www.remotion.dev/) — write video with React.

The included sample renders a **41.5s vertical (1080x1920)** Shorts/Reels video titled *"5 Secret FREE AI Tools"*.

## Quick start

```bash
npm install          # install dependencies
npm run dev          # open Remotion Studio to preview/edit live
npm run build        # render the video to out/video.mp4
```

## Project structure

```
src/
  index.ts                  # Remotion entry point
  Root.tsx                  # registers compositions
  KineticTypography.tsx     # main timeline (sequences all scenes)
  script.ts                 # EDIT THIS: all text, colors, timing, tools
  components/
    AnimatedWords.tsx       # word-by-word spring/scale/blur animation
    Background.tsx          # animated gradient + floating particles
  scenes/
    HookScene.tsx           # opening hook scenes
    ToolScene.tsx           # per-tool scene with number badge
    OutroScene.tsx          # subscribe call-to-action
```

## How to customize

Everything you'd normally change lives in **`src/script.ts`**:
- Text for each scene
- Highlighted keywords and their glow colors
- Scene durations
- The list of tools featured

Change the script, run `npm run dev` to preview, then `npm run build` to render.

## Adding music / voiceover

1. Drop your audio file into `public/` (e.g. `public/audio.mp3`).
2. Add `<Audio src={staticFile("audio.mp3")} />` inside `KineticTypography.tsx`.
3. Re-render.

## Output

- `out/video.mp4` — rendered sample (1080x1920, 30fps).

---

Built with Remotion. Generated with Kiro.
