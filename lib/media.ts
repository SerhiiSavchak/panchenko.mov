// Comprehensive media system - Pexels free stock

// Hero: локальный монтаж из портфолио — /public/videos/hero-cut.mp4 + hero-cut-poster.jpg
export const HERO_VIDEO = {
  video: "https://assets.mixkit.co/videos/46422/46422-720.mp4",
  poster: "https://assets.mixkit.co/videos/46422/46422-thumb-720-0.jpg",
  fallbackImage: null as string | null,
  useLocalHero: true,
  localVideo: "/videos/hero-cut.mp4",
  localPoster: "/videos/hero-cut-poster.jpg",
} as const;

/** Active hero URLs (local montage or remote fallback). */
export function getHeroVideoSrc(): string {
  return HERO_VIDEO.useLocalHero ? HERO_VIDEO.localVideo : HERO_VIDEO.video;
}

export function getHeroPosterSrc(): string {
  return HERO_VIDEO.useLocalHero ? HERO_VIDEO.localPoster : HERO_VIDEO.poster;
}

// Stock fallbacks for generic video components (not portfolio works)
export const REEL_VIDEOS = [
  "https://assets.mixkit.co/videos/47497/47497-720.mp4",
  "https://assets.mixkit.co/videos/13019/13019-720.mp4",
  "https://videos.pexels.com/video-files/27974758/12279599_2560_1440_60fps.mp4",
  "https://videos.pexels.com/video-files/4568863/4568863-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/27974758/12279599_2560_1440_60fps.mp4",
  "https://videos.pexels.com/video-files/9943217/9943217-sd_640_360_24fps.mp4",
  "https://assets.mixkit.co/videos/47497/47497-720.mp4",
  "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/27974758/12279599_2560_1440_60fps.mp4",
  "https://assets.mixkit.co/videos/47497/47497-720.mp4",
];

// BTS (behind the scenes) — качественные фото съёмочного процесса
export const ABOUT_IMAGES = [
  "https://images.pexels.com/photos/9501852/pexels-photo-9501852.jpeg?auto=compress&w=1600", // оператор с камерой
  "https://images.pexels.com/photos/3062545/pexels-photo-3062545.jpeg?auto=compress&w=1600", // площадка, съёмочная группа
  "https://images.pexels.com/photos/4910312/pexels-photo-4910312.jpeg?auto=compress&w=1600", // BTS filming
  "https://images.pexels.com/photos/7625042/pexels-photo-7625042.jpeg?auto=compress&w=1600",  // видео production
] as const;

// Hero-картинка для Build Your Shoot — BTS съёмок фильма
export const BUILD_SHOOT_HERO =
  "https://images.pexels.com/photos/3062545/pexels-photo-3062545.jpeg?auto=compress&w=1920";

export const CONSTRUCTOR_MEDIA = {
  brand: {
    image: BUILD_SHOOT_HERO,
    overlay: "light-sweep",
  },
  reels: {
    image: BUILD_SHOOT_HERO,
    overlay: "none",
  },
  editorial: {
    image: BUILD_SHOOT_HERO,
    overlay: "graffiti",
  },
  "music-video": {
    image: BUILD_SHOOT_HERO,
    overlay: "impact",
  },
} as const;

// BTS cards — ReelRail: клиентские превью из featured
export const BTS_RAW_CARDS = [
  { title: "After Hours", href: "/work/after-hours", badge: "Brand", video: "/assets/featured/after-hours/preview.mp4", poster: "/assets/featured/after-hours/poster.jpg" },
  { title: "Built Daily", href: "/work/built-daily", badge: "Reels", video: "/assets/featured/built-daily/preview.mp4", poster: "/assets/featured/built-daily/poster.jpg" },
  { title: "Relocation", href: "/work/relocation", badge: "Editorial", video: "/assets/featured/relocation/preview.mp4", poster: "/assets/featured/relocation/poster.jpg" },
  { title: "City Frequency", href: "/work/city-frequency", badge: "Reels", video: "/assets/featured/city-frequency/preview.mp4", poster: "/assets/featured/city-frequency/poster.jpg" },
  { title: "Red Room Session", href: "/work/red-room-session", badge: "MV", video: "/assets/featured/red-room-session/preview.mp4", poster: "/assets/featured/red-room-session/poster.jpg" },
] as const;
