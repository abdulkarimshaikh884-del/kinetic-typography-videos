// ============================================================
//  Procedural soundtrack generator (no ffmpeg needed)
//  Synthesizes a cinematic "tech" bed: sub drone, pulsing bass,
//  arpeggio, soft hats, noise risers + impact booms on scene cuts.
//  Output: public/soundtrack.wav  (16-bit stereo, 44.1kHz)
// ============================================================
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const SR = 44100;
const FPS = 30;

// Must mirror src/script.ts scene durations + transition length.
const SCENE_FRAMES = [150, 120, 165, 165, 165, 165, 165, 165];
const TRANSITION = 16;
const TOTAL_FRAMES =
  SCENE_FRAMES.reduce((a, b) => a + b, 0) - (SCENE_FRAMES.length - 1) * TRANSITION;
const DURATION = TOTAL_FRAMES / FPS + 0.4; // small tail
const N = Math.floor(DURATION * SR);

// Scene start times (frames) in the final, transition-overlapped timeline.
const sceneStarts = [];
let acc = 0;
for (let i = 0; i < SCENE_FRAMES.length; i++) {
  sceneStarts.push(acc - i * TRANSITION);
  acc += SCENE_FRAMES[i];
}
const cutTimes = sceneStarts.slice(1).map((f) => f / FPS); // seconds of each cut

const BPM = 124;
const beat = 60 / BPM;

// --- helpers ---
const clamp = (x) => Math.max(-1, Math.min(1, x));
const note = (semis) => 220 * Math.pow(2, semis / 12); // relative to A3
// soft saturating limiter for a glued master
const sat = (x) => Math.tanh(x * 1.3) / Math.tanh(1.3);

// simple seeded noise
let seed = 12345;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

// A minor-ish chord progression, one chord per ~4 beats (changes feel)
// scale degrees (semitones from A3)
const chords = [
  [-12, -5, 0, 4], // A minor low
  [-10, -3, 2, 5], // B dim-ish
  [-8, -1, 4, 7], // C
  [-5, 2, 7, 11], // E
];

const left = new Float64Array(N);
const right = new Float64Array(N);

for (let i = 0; i < N; i++) {
  const t = i / SR;
  const beatPos = t / beat;
  const beatIdx = Math.floor(beatPos);
  const beatFrac = beatPos - beatIdx;

  let l = 0;
  let r = 0;

  // ---- sub drone (root) very low, constant bed ----
  const drone =
    Math.sin(2 * Math.PI * note(-24) * t) * 0.12 +
    Math.sin(2 * Math.PI * note(-24) * 1.005 * t) * 0.08;
  l += drone;
  r += drone;

  // ---- pad chord (slowly evolving) ----
  const chord = chords[Math.floor(t / (beat * 4)) % chords.length];
  let pad = 0;
  for (let v = 0; v < chord.length; v++) {
    const f = note(chord[v]);
    const vib = 1 + 0.0015 * Math.sin(2 * Math.PI * 4.5 * t + v);
    pad += Math.sin(2 * Math.PI * f * vib * t) * 0.05;
  }
  // gentle stereo spread
  l += pad * 0.9;
  r += pad * 1.0;

  // ---- kick on every beat ----
  const kEnv = Math.exp(-beatFrac * beat * 18);
  const kPitch = note(-24) * (1 + 6 * Math.exp(-beatFrac * beat * 40));
  const kick = Math.sin(2 * Math.PI * kPitch * (beatFrac * beat)) * kEnv * 0.55;
  l += kick;
  r += kick;

  // ---- hats on 8th off-beats ----
  const eighth = (beatPos * 2) % 1;
  if (Math.floor(beatPos * 2) % 2 === 1) {
    const hEnv = Math.exp(-eighth * beat * 60);
    const hat = (rnd() * 2 - 1) * hEnv * 0.07;
    l += hat;
    r += hat * 0.9;
  }

  // ---- arpeggio pluck (16th notes through chord) ----
  const sixteenth = beatPos * 4;
  const stepIdx = Math.floor(sixteenth);
  const stepFrac = sixteenth - stepIdx;
  const arpNote = chord[stepIdx % chord.length] + 12;
  const aEnv = Math.exp(-stepFrac * beat * 8) * 0.9;
  const arp =
    (Math.sin(2 * Math.PI * note(arpNote) * t) +
      0.3 * Math.sin(2 * Math.PI * note(arpNote) * 2 * t)) *
    aEnv *
    0.06;
  l += arp;
  r += arp;

  // ---- noise risers + impact booms on scene cuts ----
  for (const ct of cutTimes) {
    // riser: 0.8s before the cut
    const dr = t - (ct - 0.8);
    if (dr > 0 && dr < 0.8) {
      const env = dr / 0.8; // ramp up
      const sweep = (rnd() * 2 - 1) * env * env * 0.18;
      l += sweep;
      r += sweep;
    }
    // impact boom at the cut
    const di = t - ct;
    if (di > 0 && di < 0.6) {
      const env = Math.exp(-di * 8);
      const boomPitch = note(-24) * (1 + 3 * Math.exp(-di * 30));
      const boom = Math.sin(2 * Math.PI * boomPitch * di) * env * 0.6;
      const noiseHit = (rnd() * 2 - 1) * Math.exp(-di * 30) * 0.25;
      l += boom + noiseHit;
      r += boom + noiseHit;
    }
  }

  // master gain + limiter
  left[i] = sat(l * 0.8);
  right[i] = sat(r * 0.8);
}

// ---- global fade in/out ----
const fadeN = Math.floor(0.25 * SR);
for (let i = 0; i < fadeN; i++) {
  const g = i / fadeN;
  left[i] *= g;
  right[i] *= g;
  left[N - 1 - i] *= g;
  right[N - 1 - i] *= g;
}

// ---- write 16-bit PCM stereo WAV ----
const bytesPerSample = 2;
const channels = 2;
const dataSize = N * channels * bytesPerSample;
const buf = Buffer.alloc(44 + dataSize);
buf.write("RIFF", 0);
buf.writeUInt32LE(36 + dataSize, 4);
buf.write("WAVE", 8);
buf.write("fmt ", 12);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); // PCM
buf.writeUInt16LE(channels, 22);
buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * channels * bytesPerSample, 28);
buf.writeUInt16LE(channels * bytesPerSample, 32);
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
const outPath = `${__dirname}/../public/soundtrack.wav`;
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, buf);
console.log(
  `Wrote ${outPath} | ${DURATION.toFixed(2)}s | ${(dataSize / 1e6).toFixed(
    2
  )} MB | cuts at ${cutTimes.map((c) => c.toFixed(1)).join(", ")}s`
);
