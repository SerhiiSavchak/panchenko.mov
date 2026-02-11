// Fallback remote video URLs when local files are missing
export const HERO_FALLBACKS = [
  "https://cdn.coverr.co/videos/coverr-night-driving-in-the-city-4928/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-a-man-rapping-in-a-studio-4739/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-city-traffic-at-night-2535/1080p.mp4",
];

export const REEL_FALLBACKS = [
  "https://cdn.coverr.co/videos/coverr-night-driving-in-the-city-4928/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-a-man-rapping-in-a-studio-4739/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-city-traffic-at-night-2535/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-car-driving-on-the-highway-3889/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-night-city-lights-2404/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-drone-footage-of-a-city-at-night-2381/1080p.mp4",
];

export function pickFallback(fallbacks: string[], index = 0): string {
  return fallbacks[index % fallbacks.length];
}
