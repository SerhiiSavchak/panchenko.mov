#!/usr/bin/env sh
# Wrapper: same pipeline as `npm run process:featured` (Node + ffmpeg-static).
# If you prefer system ffmpeg, install ffmpeg/ffprobe and use the commands below as reference.

set -e
cd "$(dirname "$0")/.."

if command -v ffmpeg >/dev/null 2>&1; then
  echo "System ffmpeg found. For reproducible builds this repo uses: npm run process:featured"
fi

echo "Running: npm run process:featured"
exec npm run process:featured

# --- Reference: per-file ffmpeg (system ffmpeg), equivalent to process-featured-videos.mjs ---
# Replace INPUT, OUT_MP4, OUT_JPG. Duration DURATION_SEC from: ffprobe -v error -show_entries format=duration -of csv=p=0 INPUT
# SEEK=$(( DURATION_SEC * 22 / 100 ))   # ~22% for poster frame
#
# ffmpeg -y -i INPUT -map 0:v:0 -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 22 -preset slow -movflags +faststart -vf "scale='min(1920,iw)':-2" OUT_MP4
# ffmpeg -y -ss SEEK -i INPUT -vframes 1 -q:v 3 -vf "scale='min(1920,iw)':-2" OUT_JPG
