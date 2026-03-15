#!/usr/bin/env node
/**
 * Скачивает hero-видео и сжимает его для быстрой загрузки.
 * Требуется: ffmpeg в PATH (https://ffmpeg.org/download.html)
 *
 * Результат: public/videos/hero.mp4 (~500KB–1.5MB вместо 3–5MB)
 * После запуска: установите useLocalHero: true в lib/media.ts
 */

import { createWriteStream } from "fs";
import { mkdir, unlink } from "fs/promises";
import { spawn } from "child_process";
import ffmpegPath from "ffmpeg-static";
import { tmpdir } from "os";
import { join } from "path";
const SOURCE_URL = "https://assets.mixkit.co/videos/46422/46422-720.mp4";
const OUTPUT_DIR = "public/videos";
const OUTPUT_FILE = "hero.mp4";

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const tmp = join(tmpdir(), `hero-${Date.now()}.mp4`);
  const dest = createWriteStream(tmp);
  const reader = res.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    dest.write(Buffer.from(value));
  }
  dest.end();
  await new Promise((r) => dest.on("finish", r));
  return tmp;
}

async function compress(inputPath, outputPath) {
  const ffmpeg = ffmpegPath || "ffmpeg";
  return new Promise((resolve, reject) => {
    const ff = spawn(ffmpeg, [
      "-i", inputPath,
      "-vcodec", "libx264",
      "-crf", "24",
      "-preset", "medium",
      "-vf", "scale=1280:-2",
      "-an",
      "-y",
      outputPath,
    ], { stdio: "inherit" });

    ff.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))));
    ff.on("error", reject);
  });
}

async function main() {
  console.log("Hero video compression\n");
  console.log("1. Downloading source...");
  const tmp = await download(SOURCE_URL);
  console.log("   Done.\n");

  console.log("2. Compressing (720p, CRF 24)...");
  const outputPath = join(process.cwd(), OUTPUT_DIR, OUTPUT_FILE);
  await mkdir(join(process.cwd(), OUTPUT_DIR), { recursive: true });
  await compress(tmp, outputPath);
  await unlink(tmp);
  console.log("   Done.\n");

  console.log(`3. Output: ${outputPath}`);
  console.log("\nNext step: set useLocalHero: true in lib/media.ts");
}

main().catch((e) => {
  console.error(e.message);
  if (e.message.includes("ffmpeg")) {
    console.error("\nInstall ffmpeg: https://ffmpeg.org/download.html");
  }
  process.exit(1);
});
