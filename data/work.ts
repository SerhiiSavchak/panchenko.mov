import { WORK_IMAGES, REEL_VIDEOS } from "@/lib/media";

export type WorkCategory = "rap" | "cars" | "fight" | "brand" | "reels";

export interface WorkItem {
  slug: string;
  title: string;
  category: WorkCategory;
  year: number;
  thumbnail: string;
  previewVideo: string;
  shortDesc: string;
  services: string[];
  results: string;
  gallery: string[];
  credits: string;
}

export const categories: { value: WorkCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "rap", label: "Rap / Trap" },
  { value: "cars", label: "Cars" },
  { value: "fight", label: "Fight" },
  { value: "brand", label: "Brand" },
  { value: "reels", label: "Reels" },
];

const img = (i: number) => WORK_IMAGES[i % WORK_IMAGES.length];
const vid = (i: number) => REEL_VIDEOS[i % REEL_VIDEOS.length];

// Local assets for Featured cards (poster-first, hover-to-preview)
const feat = (slug: string, file: string) => `/assets/featured/${slug}/${file}`;

export const works: WorkItem[] = [
  {
    slug: "midnight-run-mv",
    title: "Midnight Run",
    category: "rap",
    year: 2025,
    thumbnail: feat("midnight-run-mv", "poster.jpg"),
    previewVideo: feat("midnight-run-mv", "preview.mp4"),
    shortDesc: "Music video for Toronto rapper. Dark cinematic visuals, night city atmosphere.",
    services: ["Directing", "Shooting", "Color Grading", "Editing"],
    results: "1.2M views in first 2 weeks",
    gallery: [feat("midnight-run-mv", "poster.jpg"), feat("shadow-play", "poster.jpg"), feat("neon-nights", "poster.jpg")],
    credits: "Artist: TBD | Director: PANchenko | DP: PANchenko",
  },
  {
    slug: "shadow-play",
    title: "Shadow Play",
    category: "rap",
    year: 2025,
    thumbnail: feat("shadow-play", "poster.jpg"),
    previewVideo: feat("shadow-play", "preview.mp4"),
    shortDesc: "Trap energy meets cinematic storytelling. Raw street footage, heavy grading.",
    services: ["Directing", "Shooting", "Editing", "Color Grading"],
    results: "Featured on WorldStar",
    gallery: [feat("shadow-play", "poster.jpg"), feat("fight-night", "poster.jpg"), feat("hutsy-financial-brand", "poster.jpg")],
    credits: "Artist: TBD | Director: PANchenko",
  },
  {
    slug: "neon-nights",
    title: "Neon Nights",
    category: "rap",
    year: 2024,
    thumbnail: feat("neon-nights", "poster.jpg"),
    previewVideo: feat("neon-nights", "preview.mp4"),
    shortDesc: "Late-night vibes. Neon-soaked visuals with cinematic grain.",
    services: ["Directing", "Shooting", "Editing"],
    results: "800K+ views",
    gallery: [feat("neon-nights", "poster.jpg"), feat("midnight-run-mv", "poster.jpg")],
    credits: "Artist: TBD | Director: PANchenko",
  },
  {
    slug: "gt3-rs-campaign",
    title: "GT3 RS Campaign",
    category: "cars",
    year: 2025,
    thumbnail: feat("gt3-rs-campaign", "poster.jpg"),
    previewVideo: feat("gt3-rs-campaign", "preview.mp4"),
    shortDesc: "Automotive content for luxury dealership. Cinematic reveal shots.",
    services: ["Shooting", "Editing", "Color Grading", "Deliverables"],
    results: "3x engagement increase for dealership",
    gallery: [feat("gt3-rs-campaign", "poster.jpg"), feat("drift-session", "poster.jpg"), feat("streetwear-lookbook", "poster.jpg")],
    credits: "Client: TBD | Director: PANchenko",
  },
  {
    slug: "drift-session",
    title: "Drift Session",
    category: "cars",
    year: 2024,
    thumbnail: feat("drift-session", "poster.jpg"),
    previewVideo: feat("drift-session", "preview.mp4"),
    shortDesc: "Raw drift footage. Smoke, speed, cinematic slow-mo.",
    services: ["Shooting", "Editing"],
    results: "Viral on car community pages",
    gallery: [feat("drift-session", "poster.jpg"), feat("gt3-rs-campaign", "poster.jpg")],
    credits: "Director: PANchenko",
  },
  {
    slug: "fight-night",
    title: "Fight Night",
    category: "fight",
    year: 2025,
    thumbnail: feat("fight-night", "poster.jpg"),
    previewVideo: feat("fight-night", "preview.mp4"),
    shortDesc: "Combat sports highlight reel. Slow-mo impacts, ring atmosphere.",
    services: ["Shooting", "Editing", "Color Grading"],
    results: "Used by fighter for promo material",
    gallery: [feat("fight-night", "poster.jpg"), feat("streetwear-lookbook", "poster.jpg"), feat("underground-bout", "poster.jpg")],
    credits: "Fighter: TBD | Director: PANchenko",
  },
  {
    slug: "underground-bout",
    title: "Underground Bout",
    category: "fight",
    year: 2024,
    thumbnail: feat("underground-bout", "poster.jpg"),
    previewVideo: feat("underground-bout", "preview.mp4"),
    shortDesc: "Raw underground fight event coverage. Documentary style with cinematic flair.",
    services: ["Directing", "Shooting", "Editing"],
    results: "500K+ views across platforms",
    gallery: [feat("underground-bout", "poster.jpg"), feat("fight-night", "poster.jpg")],
    credits: "Director: PANchenko",
  },
  {
    slug: "hutsy-financial-brand",
    title: "Hutsy Financial",
    category: "brand",
    year: 2025,
    thumbnail: feat("hutsy-financial-brand", "poster.jpg"),
    previewVideo: feat("hutsy-financial-brand", "preview.mp4"),
    shortDesc: "In-house brand content for Hutsy Financial. Product storytelling & social.",
    services: ["Directing", "Shooting", "Editing", "Color Grading", "Deliverables"],
    results: "Ongoing in-house partnership",
    gallery: [feat("hutsy-financial-brand", "poster.jpg"), feat("streetwear-lookbook", "poster.jpg"), feat("neon-nights", "poster.jpg")],
    credits: "Client: Hutsy Financial | Director: PANchenko",
  },
  {
    slug: "streetwear-lookbook",
    title: "Streetwear Lookbook",
    category: "brand",
    year: 2024,
    thumbnail: feat("streetwear-lookbook", "poster.jpg"),
    previewVideo: feat("streetwear-lookbook", "preview.mp4"),
    shortDesc: "Fashion lookbook for Toronto streetwear brand. Editorial + motion.",
    services: ["Directing", "Shooting", "Editing"],
    results: "Full collection sold out in 48hrs",
    gallery: [feat("streetwear-lookbook", "poster.jpg"), feat("hutsy-financial-brand", "poster.jpg")],
    credits: "Brand: TBD | Director: PANchenko",
  },
  {
    slug: "day-in-the-life",
    title: "Day in the Life",
    category: "reels",
    year: 2025,
    thumbnail: img(7),
    previewVideo: vid(9),
    shortDesc: "BTS content creation reel. Camcorder aesthetic, raw behind-the-scenes.",
    services: ["Shooting", "Editing"],
    results: "100K+ reach on IG",
    gallery: [img(7), img(11)],
    credits: "Director: PANchenko",
  },
  {
    slug: "toronto-nights-reel",
    title: "Toronto Nights",
    category: "reels",
    year: 2024,
    thumbnail: img(5),
    previewVideo: vid(0),
    shortDesc: "City nightlife reel. Toronto after dark, cinematic short-form.",
    services: ["Shooting", "Editing", "Color Grading"],
    results: "Featured on Toronto community pages",
    gallery: [img(5), img(7)],
    credits: "Director: PANchenko",
  },
  {
    slug: "studio-session",
    title: "Studio Session",
    category: "reels",
    year: 2025,
    thumbnail: img(11),
    previewVideo: vid(1),
    shortDesc: "Behind-the-scenes studio session. Raw, unfiltered recording moments.",
    services: ["Shooting", "Editing"],
    results: "50K+ views",
    gallery: [img(11), img(0)],
    credits: "Artist: TBD | Director: PANchenko",
  },
];
