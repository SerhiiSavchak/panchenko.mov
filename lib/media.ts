// Comprehensive media system with guaranteed remote fallbacks
// Uses free stock videos from Pexels and Pixabay (direct MP4 links)

export const HERO_THEMES = {
  rap: {
    video: "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/photos/1916821/pexels-photo-1916821.jpeg?auto=compress&w=1200",
  },
  cars: {
    video: "https://videos.pexels.com/video-files/3209191/3209191-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200",
  },
  fight: {
    video: "https://videos.pexels.com/video-files/4761437/4761437-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/photos/598686/pexels-photo-598686.jpeg?auto=compress&w=1200",
  },
  brand: {
    video: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=1200",
  },
} as const;

export type HeroThemeKey = keyof typeof HERO_THEMES;

export const REEL_VIDEOS = [
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/4488162/4488162-sd_640_360_24fps.mp4",
  "https://videos.pexels.com/video-files/3209191/3209191-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/4761437/4761437-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/4488162/4488162-sd_640_360_24fps.mp4",
  "https://videos.pexels.com/video-files/3209191/3209191-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/4761437/4761437-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
];

export const WORK_IMAGES = [
  "https://images.pexels.com/photos/1916821/pexels-photo-1916821.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/598686/pexels-photo-598686.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&w=800",
];

// Constructor media per project type
export const CONSTRUCTOR_MEDIA = {
  rap: {
    image: "https://images.pexels.com/photos/1916821/pexels-photo-1916821.jpeg?auto=compress&w=600",
    overlay: "graffiti",
  },
  cars: {
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600",
    overlay: "motion-blur",
  },
  fight: {
    image: "https://images.pexels.com/photos/598686/pexels-photo-598686.jpeg?auto=compress&w=600",
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

export function pickFallback(arr: string[], index = 0): string {
  return arr[index % arr.length];
}
