// Comprehensive media system - Pexels free stock
// Cars: street racing, drift, neon night. Rap: studio, mic, urban. Fight: boxing

// Hero: desktop = high-res, mobile = 720p/SD for reliability on iPhone etc.
export const HERO_THEMES = {
  rap: {
    video: "https://assets.mixkit.co/videos/47497/47497-720.mp4",
    videoMobile: "https://assets.mixkit.co/videos/47497/47497-720.mp4",
    poster: "https://assets.mixkit.co/videos/47497/47497-thumb-720-4.jpg",
  },
  cars: {
    video: "https://videos.pexels.com/video-files/27974758/12279599_2560_1440_60fps.mp4",
    videoMobile: "https://videos.pexels.com/video-files/27974758/12279599-sd_640_360_60fps.mp4",
    poster: "https://images.pexels.com/photos/1639897/pexels-photo-1639897.jpeg?auto=compress&w=1600",
  },
  fight: {
    video: "https://videos.pexels.com/video-files/9943217/9943217-uhd_2560_1440_24fps.mp4",
    videoMobile: "https://videos.pexels.com/video-files/9943217/9943217-sd_640_360_24fps.mp4",
    poster: "https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&w=1200",
  },
  brand: {
    video: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    videoMobile: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
    poster: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=1200",
  },
} as const;

export type HeroThemeKey = keyof typeof HERO_THEMES;

// Rap: Mixkit реперский клип. Cars: Pexels drift (Tokyo Drift style). Fight: boxing
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

// Rap indices 0,1,6: studio/mic/urban. Cars 2,8: drift/night. Fight 3,9: boxing
export const WORK_IMAGES = [
  "https://images.pexels.com/photos/7619638/pexels-photo-7619638.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/3209261/pexels-photo-3209261.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/1639897/pexels-photo-1639897.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/3721311/pexels-photo-3721311.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/2628207/pexels-photo-2628207.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&w=800",
];

// Street Motion - video + poster for instant crossfade (no black flash)
// Mobile = 720p/SD for performance on smaller devices
export const STREET_MOTION_VIDEOS = {
  rap: {
    video: "https://assets.mixkit.co/videos/47497/47497-720.mp4",
    videoMobile: "https://assets.mixkit.co/videos/47497/47497-720.mp4",
    poster: "https://assets.mixkit.co/videos/47497/47497-thumb-720-4.jpg",
  },
  cars: {
    video: "https://videos.pexels.com/video-files/27974758/12279599_2560_1440_60fps.mp4",
    videoMobile: "https://videos.pexels.com/video-files/27974758/12279599-sd_640_360_60fps.mp4",
    poster: "https://images.pexels.com/photos/1639897/pexels-photo-1639897.jpeg?auto=compress&w=1200",
  },
  fight: {
    video: "https://videos.pexels.com/video-files/9943217/9943217-uhd_2560_1440_24fps.mp4",
    videoMobile: "https://videos.pexels.com/video-files/9943217/9943217-sd_640_360_24fps.mp4",
    poster: "https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&w=1200",
  },
  brand: {
    video: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    videoMobile: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
    poster: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=1200",
  },
  cinema: {
    video: "https://assets.mixkit.co/videos/47497/47497-720.mp4",
    videoMobile: "https://assets.mixkit.co/videos/47497/47497-720.mp4",
    poster: "https://assets.mixkit.co/videos/47497/47497-thumb-720-4.jpg",
  },
} as const;

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
  rap: {
    image: BUILD_SHOOT_HERO,
    overlay: "graffiti",
  },
  cars: {
    image: BUILD_SHOOT_HERO,
    overlay: "motion-blur",
  },
  fight: {
    image: BUILD_SHOOT_HERO,
    overlay: "impact",
  },
  brand: {
    image: BUILD_SHOOT_HERO,
    overlay: "light-sweep",
  },
  reels: {
    image: BUILD_SHOOT_HERO,
    overlay: "none",
  },
} as const;

// Signature Lanes - rap, cars (Tokyo Drift), fight, brand
// Mobile: SD/720p for reliable decode on iPhone; desktop can use higher res
export const SIGNATURE_LANE_VIDEOS = [
  { video: "https://assets.mixkit.co/videos/47497/47497-720.mp4", videoMobile: "https://assets.mixkit.co/videos/47497/47497-720.mp4", poster: "https://assets.mixkit.co/videos/47497/47497-thumb-720-4.jpg" },
  { video: "https://videos.pexels.com/video-files/27974758/12279599_2560_1440_60fps.mp4", videoMobile: "https://videos.pexels.com/video-files/27974758/12279599-sd_640_360_60fps.mp4", poster: "https://images.pexels.com/photos/1639897/pexels-photo-1639897.jpeg?auto=compress&w=400" },
  { video: "https://videos.pexels.com/video-files/9943217/9943217-sd_640_360_24fps.mp4", videoMobile: "https://videos.pexels.com/video-files/9943217/9943217-sd_640_360_24fps.mp4", poster: "https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&w=400" },
  { video: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4", videoMobile: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4", poster: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=400" },
  { video: "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4", videoMobile: "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4", poster: "https://images.pexels.com/photos/7619638/pexels-photo-7619638.jpeg?auto=compress&w=400" },
] as const;

export function pickFallback(arr: string[], index = 0): string {
  return arr[index % arr.length];
}

// BTS and Raw Cuts cards — local assets for ReelRail
export const BTS_RAW_CARDS = [
  { title: "BTS", href: "/bts", badge: "BTS", video: "/assets/featured/hutsy-financial-brand/preview.mp4", poster: "/assets/featured/hutsy-financial-brand/poster.jpg" },
  { title: "Raw Cuts", href: "/raw-cuts", badge: "Raw", video: "/assets/featured/drift-session/preview.mp4", poster: "/assets/featured/drift-session/poster.jpg" },
  { title: "BTS: On Set", href: "/bts", badge: "BTS", video: "/assets/featured/midnight-run-mv/preview.mp4", poster: "/assets/featured/midnight-run-mv/poster.jpg" },
  { title: "Raw: Drift", href: "/raw-cuts", badge: "Raw", video: "/assets/featured/drift-session/preview.mp4", poster: "/assets/featured/drift-session/poster.jpg" },
  { title: "BTS: Fight", href: "/bts", badge: "BTS", video: "/assets/featured/fight-night/preview.mp4", poster: "/assets/featured/fight-night/poster.jpg" },
  { title: "Raw: Street", href: "/raw-cuts", badge: "Raw", video: "/assets/featured/streetwear-lookbook/preview.mp4", poster: "/assets/featured/streetwear-lookbook/poster.jpg" },
] as const;
