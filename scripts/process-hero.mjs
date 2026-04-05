#!/usr/bin/env node
/**
 * Re-encode hero montage (better CRF, streaming-friendly). Writes via temp file.
 *   node scripts/process-hero.mjs
 *   HERO_INPUT="C:/path/source.mp4" node scripts/process-hero.mjs
 * Env: HERO_CRF (default 16), HERO_PRESET (default slower — better quality/size than slow)
 */

import { existsSync } from "fs";
import { spawn } from "child_process";
import { resolve } from "path";
import { renameSync, unlinkSync } from "fs";
import ffmpegPath from "ffmpeg-static";

const REPO_ROOT = resolve(process.cwd());
const OUT = resolve(REPO_ROOT, "public/videos/hero-cut.mp4");
const TMP = resolve(REPO_ROOT, "public/videos/hero-cut.processing.mp4");

function run(cmd, args) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "inherit" });
    p.on("error", rej);
    p.on("close", (c) => (c === 0 ? res() : rej(new Error(`exit ${c}`))));
  });
}

async function main() {
  const ffmpeg = ffmpegPath;
  if (!ffmpeg || !existsSync(ffmpeg)) {
    console.error("ffmpeg-static missing. Run: npm install");
    process.exit(1);
  }
  const input = resolve(process.env.HERO_INPUT || OUT);
  if (!existsSync(input)) {
    console.error(`Input not found: ${input}`);
    process.exit(1);
  }

  const crf = String(Math.min(23, Math.max(14, Number.parseInt(process.env.HERO_CRF ?? "16", 10) || 16)));
  const preset = process.env.HERO_PRESET || "slower";

  console.log(`Hero re-encode\n  in:  ${input}\n  out: ${OUT}\n  CRF: ${crf}  preset: ${preset}\n`);

  await run(ffmpeg, [
    "-y",
    "-i",
    input,
    "-an",
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-pix_fmt",
    "yuv420p",
    "-tune",
    "film",
    "-crf",
    crf,
    "-preset",
    preset,
    "-movflags",
    "+faststart",
    TMP,
  ]);

  try {
    unlinkSync(OUT);
  } catch {
    /* ok */
  }
  renameSync(TMP, OUT);
  console.log(`Done: ${OUT}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
