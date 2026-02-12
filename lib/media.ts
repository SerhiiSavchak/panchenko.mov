// Comprehensive media system - Pexels free stock
// Cars: street racing, drift, neon night. Rap: studio, mic, urban. Fight: boxing

export const HERO_THEMES = {
  rap: {
    video: "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/photos/7619638/pexels-photo-7619638.jpeg?auto=compress&w=1200",
  },
  cars: {
    video: "https://videos.pexels.com/video-files/4568812/4568812-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/photos/1639897/pexels-photo-1639897.jpeg?auto=compress&w=1200",
  },
  fight: {
    video: "https://videos.pexels.com/video-files/9943217/9943217-uhd_2560_1440_24fps.mp4",
    poster: "https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&w=1200",
  },
  brand: {
    video: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=1200",
  },
} as const;

export type HeroThemeKey = keyof typeof HERO_THEMES;

// Rap: studio/mic/urban. Cars: drift/street racing. Fight: boxing
export const REEL_VIDEOS = [
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/4488162/4488162-sd_640_360_24fps.mp4",
  "https://videos.pexels.com/video-files/4568812/4568812-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/4568863/4568863-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/5991156/5991156-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/9943217/9943217-sd_640_360_24fps.mp4",
  "https://videos.pexels.com/video-files/5752065/5752065-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/4568812/4568812-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
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

// Street Motion - faster switching
export const STREET_MOTION_VIDEOS = {
  rap: "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4",
  cars: "https://videos.pexels.com/video-files/4568812/4568812-hd_1920_1080_25fps.mp4",
  fight: "https://videos.pexels.com/video-files/9943217/9943217-uhd_2560_1440_24fps.mp4",
  brand: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
  cinema: "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4",
} as const;

export const CONSTRUCTOR_MEDIA = {
  rap: {
    image: "https://images.pexels.com/photos/7619638/pexels-photo-7619638.jpeg?auto=compress&w=600",
    overlay: "graffiti",
  },
  cars: {
    image: "https://images.pexels.com/photos/1639897/pexels-photo-1639897.jpeg?auto=compress&w=600",
    overlay: "motion-blur",
  },
  fight: {
    image: "https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&w=600",
    overlay: "impact",
  },
  brand: {
    image: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=600",
    overlay: "light-sweep",
  },
  reels: {
    image: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&w=600",
    overlay: "none",
  },
} as const;

// Signature Lanes - all videos (Rap: studio, Cars: drift, Fight: boxing)
export const SIGNATURE_LANE_VIDEOS = [
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/4568812/4568812-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/9943217/9943217-sd_640_360_24fps.mp4",
  "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
];

// Gear - video previews (cinema/equipment B-roll - known working Pexels IDs)
export const GEAR_VIDEOS = [
  "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/4488162/4488162-sd_640_360_24fps.mp4",
  "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/4488162/4488162-sd_640_360_24fps.mp4",
];

// Gear section - high-quality cinema equipment images (Pexels)
export const GEAR_IMAGES = [
  "https://images.pexels.com/photos/2746186/pexels-photo-2746186.jpeg?auto=compress&w=600",
  "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&w=600",
  "https://images.pexels.com/photos/2491282/pexels-photo-2491282.jpeg?auto=compress&w=600",
  "https://images.pexels.com/photos/9501852/pexels-photo-9501852.jpeg?auto=compress&w=600",
  "https://images.pexels.com/photos/2673947/pexels-photo-2673947.jpeg?auto=compress&w=600",
  "https://images.pexels.com/photos/4109897/pexels-photo-4109897.jpeg?auto=compress&w=600",
  "https://images.pexels.com/photos/3016453/pexels-photo-3016453.jpeg?auto=compress&w=600",
  "https://images.pexels.com/photos/2062995/pexels-photo-2062995.jpeg?auto=compress&w=600",
];

export function pickFallback(arr: string[], index = 0): string {
  return arr[index % arr.length];
}
