// ============================================================
//  Warm / mellow soundtrack for the Branding Reel.
//  Soft maj7 pads, felt-piano arpeggio, gentle brush + light
//  reverb. Calm, editorial, no aggressive drums.
//  Output: public/soundtrack-brand.wav (16-bit stereo, 44.1kHz)
// ============================================================
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const SR = 44100;
const FPS = 30;

const SCENE_FRAMES = [140, 150, 150, 150, 150, 150, 150];
const TRANSITION = 16;
const TOTAL_FRAMES =
  SCENE_FRAMES.reduce((a, b) => a + b, 0) - (SCENE_FRAMES.length - 1) * TRANSITION;
const DURATION = TOTAL_FRAMES / FPS + 1.2; // tail for reverb
const N = Math.floor(DURATION * SR);

const sceneStarts = [];
let acc = 0;
for (let i = 0; i < SCENE_FRAMES.length; i++) {
  sceneStarts.push(acc - i * TRANSITION);
  acc += SCENE_FRAMES[i];
}
const cutTimes = sceneStarts.slice(1).map((f) => f / FPS);

const BPM = 76;
const beat = 60 / BPM;
const note = (s) => 220 * Math.pow(2, s / 12);
const clamp = (x) => Math.max(-1, Math.min(1, x));
const sat = (x) => Math.tanh(x * 1.1) / Math.tanh(1.1);

let seed = 778;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

// warm maj7 chord progression (roots in semitones from A3), voiced r, +4, +7, +11
const roots = [-16, -9, -14, -11];
const voice = (r) => [r, r + 4, r + 7, r + 11, r + 16];

const dryL = new Float64Array(N);
const dryR = new Float64Array(N);

// chord changes every 2 bars (8 beats)
const chordLen = beat * 8;

for (let i = 0; i < N; i++) {
  const t = i / SR;
  const ci = Math.floor(t / chordLen) % roots.length;
  const chord = voice(roots[ci]);

  let l = 0;
  let r = 0;

  // --- soft pad (sines, slow tremolo, gentle attack across chord) ---
  const chordPos = (t % chordLen) / chordLen;
  const padAtt = Math.min(1, chordPos * 6) * (1 - Math.max(0, chordPos - 0.9) * 6);
  let pad = 0;
  for (let v = 0; v < chord.length; v++) {
    const f = note(chord[v]);
    const trem = 1 + 0.04 * Math.sin(2 * Math.PI * 0.3 * t + v);
    pad += Math.sin(2 * Math.PI * f * t) * 0.045 * trem;
  }
  pad *= Math.max(0.2, padAtt);
  l += pad * 0.95;
  r += pad;

  // --- soft sub root, gentle pulse on the beat (no click) ---
  const bp = (t / beat) % 1;
  const sub =
    Math.sin(2 * Math.PI * note(roots[ci] - 12) * t) *
    0.12 *
    (0.6 + 0.4 * Math.exp(-bp * 3));
  l += sub;
  r += sub;

  // --- felt-piano arpeggio: one chord tone per beat, soft decay ---
  const beatIdx = Math.floor(t / beat);
  const bf = (t / beat) - beatIdx;
  const arpNote = chord[beatIdx % chord.length] + 12;
  const aEnv = Math.exp(-bf * beat * 4.5);
  const arp =
    (Math.sin(2 * Math.PI * note(arpNote) * t) +
      0.25 * Math.sin(2 * Math.PI * note(arpNote) * 2 * t) +
      0.12 * Math.sin(2 * Math.PI * note(arpNote) * 3 * t)) *
    aEnv *
    0.07;
  l += arp;
  r += arp * 0.92;

  // --- gentle brush on off-beats (very soft) ---
  if (Math.floor((t / beat) * 2) % 2 === 1) {
    const hb = ((t / beat) * 2) % 1;
    const brush = (rnd() * 2 - 1) * Math.exp(-hb * beat * 40) * 0.025;
    l += brush;
    r += brush;
  }

  // --- soft bell + swell on scene cuts ---
  for (const ct of cutTimes) {
    const dr = t - (ct - 1.0);
    if (dr > 0 && dr < 1.0) {
      const env = Math.sin((dr / 1.0) * Math.PI) * 0.5;
      // airy filtered noise swell
      const sw = (rnd() * 2 - 1) * env * 0.05;
      l += sw;
      r += sw;
    }
    const di = t - ct;
    if (di > 0 && di < 1.8) {
      const env = Math.exp(-di * 2.2);
      const bell =
        (Math.sin(2 * Math.PI * note(roots[ci] + 19) * di) * 0.6 +
          Math.sin(2 * Math.PI * note(roots[ci] + 24) * di) * 0.4) *
        env *
        0.12;
      l += bell;
      r += bell;
    }
  }

  dryL[i] = l;
  dryR[i] = r;
}

// --- light reverb: a few attenuated delay taps ---
const taps = [
  { d: 0.031, g: 0.28 },
  { d: 0.053, g: 0.22 },
  { d: 0.089, g: 0.16 },
  { d: 0.131, g: 0.11 },
];
const left = new Float64Array(N);
const right = new Float64Array(N);
for (let i = 0; i < N; i++) {
  let l = dryL[i];
  let r = dryR[i];
  for (const tp of taps) {
    const ds = Math.floor(tp.d * SR);
    if (i - ds >= 0) {
      l += dryL[i - ds] * tp.g;
      r += dryR[i - ds] * tp.g;
    }
  }
  left[i] = sat(l * 0.8);
  right[i] = sat(r * 0.8);
}

// fade in/out
const f = Math.floor(0.4 * SR);
for (let i = 0; i < f; i++) {
  const g = i / f;
  left[i] *= g;
  right[i] *= g;
  left[N - 1 - i] *= g;
  right[N - 1 - i] *= g;
}

// write WAV
const channels = 2;
const dataSize = N * channels * 2;
const buf = Buffer.alloc(44 + dataSize);
buf.write("RIFF", 0);
buf.writeUInt32LE(36 + dataSize, 4);
buf.write("WAVE", 8);
buf.write("fmt ", 12);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20);
buf.writeUInt16LE(channels, 22);
buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * channels * 2, 28);
buf.writeUInt16LE(channels * 2, 32);
buf.writeUInt16LE(16, 34);
buf.write("data", 36);
buf.writeUInt32LE(dataSize, 40);
let off = 44;
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(clamp(left[i]) * 32767), off);
  off += 2;
  buf.writeInt16LE(Math.round(clamp(right[i]) * 32767), off);
  off += 2;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = `${__dirname}/../public/soundtrack-brand.wav`;
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, buf);
console.log(
  `Wrote ${outPath} | ${DURATION.toFixed(2)}s | ${(dataSize / 1e6).toFixed(
    2
  )} MB | cuts at ${cutTimes.map((c) => c.toFixed(1)).join(", ")}s`
);
