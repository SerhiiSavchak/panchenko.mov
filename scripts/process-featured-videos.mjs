#!/usr/bin/env node
/**
 * Production pipeline: source MOVs → optimized H.264 preview + JPEG poster per featured slug.
 * Uses ffmpeg-static (no system ffmpeg required). Run from repo root after placing sources.
 *
 * Usage:
 *   npm run process:featured
 *   MEDIA_SOURCES_DIR="C:/path/to/folder" npm run process:featured
 *
 * Expected inputs: see scripts/featured-sources.json (copy IMG_*.MOV into media-sources/).
 * Outputs: public/assets/featured/<slug>/preview.mp4 (H.264 + AAC when source has audio) + poster.jpg
 */

import { readFile, mkdir, readdir } from "fs/promises";
import { existsSync } from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

import ffmpegPath from "ffmpeg-static";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const DEFAULT_SOURCES_DIR = join(REPO_ROOT, "media-sources");
const OUT_ROOT = join(REPO_ROOT, "public", "assets", "featured");
const MAP_PATH = join(__dirname, "featured-sources.json");

/** Poster frame within 15–30% of duration (avoids many black intros). Override: POSTER_FRACTION=0.25 */
const POSTER_FRACTION = Math.min(
  0.35,
  Math.max(0.1, Number.parseFloat(process.env.POSTER_FRACTION ?? "0.22") || 0.22)
);

function spawnAsync(cmd, args, opts = {}) {
  return new Promise((resolvePromise, reject) => {
    const p = spawn(cmd, args, { stdio: opts.stdio ?? "pipe", ...opts });
    let stderr = "";
    if (p.stderr) p.stderr.on("data", (d) => (stderr += d.toString()));
    p.on("error", reject);
    p.on("close", (code) =>
      code === 0 ? resolvePromise(stderr) : reject(new Error(`${cmd} exited ${code}\n${stderr}`))
    );
  });
}

/** ffmpeg -i exits 1 with no output file, but stderr still contains Duration. */
function probeDurationSeconds(ffmpeg, inputPath) {
  return new Promise((resolvePromise, reject) => {
    const p = spawn(ffmpeg, ["-hide_banner", "-i", inputPath], {
      stdio: ["ignore", "ignore", "pipe"],
    });
    let stderr = "";
    p.stderr.on("data", (d) => (stderr += d.toString()));
    p.on("error", reject);
    p.on("close", () => {
      const m = stderr.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d+)/);
      if (!m) {
        reject(new Error(`Could not read duration for ${inputPath}\n${stderr.slice(0, 400)}`));
        return;
      }
      const h = Number(m[1]);
      const min = Number(m[2]);
      const sec = Number(m[3]);
      resolvePromise(h * 3600 + min * 60 + sec);
    });
  });
}

/** Detect audio stream via ffmpeg -i stderr (same probe pattern as duration). */
function hasAudioStream(ffmpeg, inputPath) {
  return new Promise((resolvePromise, reject) => {
    const p = spawn(ffmpeg, ["-hide_banner", "-i", inputPath], {
      stdio: ["ignore", "ignore", "pipe"],
    });
    let stderr = "";
    p.stderr.on("data", (d) => (stderr += d.toString()));
    p.on("error", reject);
    p.on("close", () => {
      resolvePromise(/Stream #\d+:\d+.*Audio:/m.test(stderr));
    });
  });
}

async function encodePreview(ffmpeg, inputPath, outMp4, crfStr) {
  const withAudio = await hasAudioStream(ffmpeg, inputPath);
  console.log(`   (source audio: ${withAudio ? "encode AAC" : "video only"})`);
  const args = [
    "-y",
    "-i",
    inputPath,
    "-map",
    "0:v:0",
    ...(withAudio
      ? ["-map", "0:a:0", "-c:a", "aac", "-b:a", "256k", "-ar", "48000"]
      : ["-an"]),
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-pix_fmt",
    "yuv420p",
    "-tune",
    "film",
    "-crf",
    crfStr,
    "-preset",
    process.env.FEATURED_PRESET || "slower",
    "-movflags",
    "+faststart",
    "-vf",
    "scale='min(2560,iw)':-2",
    outMp4,
  ];
  await spawnAsync(ffmpeg, args, { stdio: "inherit" });
}

async function extractPoster(ffmpeg, inputPath, outJpg, seekSec) {
  const args = [
    "-y",
    "-ss",
    String(Math.max(0.5, seekSec)),
    "-i",
    inputPath,
    "-vframes",
    "1",
    "-q:v",
    String(Math.min(5, Math.max(1, Number.parseInt(process.env.GALLERY_JPEG_Q ?? "2", 10) || 2))),
    "-vf",
    "scale='min(2560,iw)':-2",
    outJpg,
  ];
  await spawnAsync(ffmpeg, args, { stdio: "inherit" });
}

async function main() {
  const ffmpeg = ffmpegPath;
  if (!ffmpeg || !existsSync(ffmpeg)) {
    console.error("ffmpeg-static binary missing. Run: npm install");
    process.exit(1);
  }

  const sourcesDir = resolve(process.env.MEDIA_SOURCES_DIR || DEFAULT_SOURCES_DIR);
  const mapRaw = await readFile(MAP_PATH, "utf8");
  const entries = JSON.parse(mapRaw);

  console.log("Featured video pipeline\n");
  const crfStr = String(Math.min(26, Math.max(14, Number.parseInt(process.env.FEATURED_CRF ?? "16", 10) || 16)));
  const preset = process.env.FEATURED_PRESET || "slower";

  console.log(`Sources: ${sourcesDir}`);
  console.log(`Output:  ${OUT_ROOT}`);
  console.log(`CRF:     ${crfStr} (env FEATURED_CRF)  preset: ${preset}\n`);

  if (!existsSync(sourcesDir)) {
    console.error(
      `Directory not found: ${sourcesDir}\nCreate it and copy IMG_*.MOV files (see media-sources/README.txt).`
    );
    process.exit(1);
  }

  const available = new Set(await readdir(sourcesDir));

  let ok = 0;
  for (const { slug, sourceFile } of entries) {
    const inputPath = join(sourcesDir, sourceFile);
    if (!available.has(sourceFile) && !existsSync(inputPath)) {
      console.error(`SKIP ${slug}: missing ${sourceFile} in ${sourcesDir}`);
      continue;
    }

    const outDir = join(OUT_ROOT, slug);
    await mkdir(outDir, { recursive: true });
    const outMp4 = join(outDir, "preview.mp4");
    const outJpg = join(outDir, "poster.jpg");

    console.log(`→ ${slug}`);
    console.log(`   encode ${sourceFile} → preview.mp4 …`);
    await encodePreview(ffmpeg, inputPath, outMp4, crfStr);

    // Do not overwrite poster.jpg by default — stills are usually supplied manually (website_stills).
    if (process.env.GENERATE_POSTER_FROM_VIDEO === "1") {
      const dur = await probeDurationSeconds(ffmpeg, inputPath);
      const seek = dur * POSTER_FRACTION;
      console.log(`   poster @ ${seek.toFixed(2)}s (${(POSTER_FRACTION * 100).toFixed(0)}% of ${dur.toFixed(2)}s) …`);
      await extractPoster(ffmpeg, inputPath, outJpg, seek);
    } else {
      console.log("   poster.jpg: skipped (set GENERATE_POSTER_FROM_VIDEO=1 to extract from video)");
    }

    console.log(`   done: ${outMp4}\n`);
    ok += 1;
  }

  if (ok === 0) {
    console.error("No files processed. Place source MOVs in media-sources/ and retry.");
    process.exit(1);
  }

  console.log(`Processed ${ok}/${entries.length} featured work(s).`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
