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

export const works: WorkItem[] = [
  {
    slug: "midnight-run-mv",
    title: "Midnight Run",
    category: "rap",
    year: 2025,
    thumbnail: img(0),
    previewVideo: vid(0),
    shortDesc: "Music video for Toronto rapper. Dark cinematic visuals, night city atmosphere.",
    services: ["Directing", "Shooting", "Color Grading", "Editing"],
    results: "1.2M views in first 2 weeks",
    gallery: [img(0), img(1), img(2)],
    credits: "Artist: TBD | Director: PANchenko | DP: PANchenko",
  },
  {
    slug: "shadow-play",
    title: "Shadow Play",
    category: "rap",
    year: 2025,
    thumbnail: img(1),
    previewVideo: vid(1),
    shortDesc: "Trap energy meets cinematic storytelling. Raw street footage, heavy grading.",
    services: ["Directing", "Shooting", "Editing", "Color Grading"],
    results: "Featured on WorldStar",
    gallery: [img(1), img(3), img(4)],
    credits: "Artist: TBD | Director: PANchenko",
  },
  {
    slug: "neon-nights",
    title: "Neon Nights",
    category: "rap",
    year: 2024,
    thumbnail: img(6),
    previewVideo: vid(2),
    shortDesc: "Late-night vibes. Neon-soaked visuals with cinematic grain.",
    services: ["Directing", "Shooting", "Editing"],
    results: "800K+ views",
    gallery: [img(6), img(0)],
    credits: "Artist: TBD | Director: PANchenko",
  },
  {
    slug: "gt3-rs-campaign",
    title: "GT3 RS Campaign",
    category: "cars",
    year: 2025,
    thumbnail: img(2),
    previewVideo: vid(3),
    shortDesc: "Automotive content for luxury dealership. Cinematic reveal shots.",
    services: ["Shooting", "Editing", "Color Grading", "Deliverables"],
    results: "3x engagement increase for dealership",
    gallery: [img(2), img(8), img(5)],
    credits: "Client: TBD | Director: PANchenko",
  },
  {
    slug: "drift-session",
    title: "Drift Session",
    category: "cars",
    year: 2024,
    thumbnail: img(8),
    previewVideo: vid(4),
    shortDesc: "Raw drift footage. Smoke, speed, cinematic slow-mo.",
    services: ["Shooting", "Editing"],
    results: "Viral on car community pages",
    gallery: [img(8), img(2)],
    credits: "Director: PANchenko",
  },
  {
    slug: "fight-night",
    title: "Fight Night",
    category: "fight",
    year: 2025,
    thumbnail: img(3),
    previewVideo: vid(5),
    shortDesc: "Combat sports highlight reel. Slow-mo impacts, ring atmosphere.",
    services: ["Shooting", "Editing", "Color Grading"],
    results: "Used by fighter for promo material",
    gallery: [img(3), img(5), img(9)],
    credits: "Fighter: TBD | Director: PANchenko",
  },
  {
    slug: "underground-bout",
    title: "Underground Bout",
    category: "fight",
    year: 2024,
    thumbnail: img(9),
    previewVideo: vid(6),
    shortDesc: "Raw underground fight event coverage. Documentary style with cinematic flair.",
    services: ["Directing", "Shooting", "Editing"],
    results: "500K+ views across platforms",
    gallery: [img(9), img(3)],
    credits: "Director: PANchenko",
  },
  {
    slug: "hutsy-financial-brand",
    title: "Hutsy Financial",
    category: "brand",
    year: 2025,
    thumbnail: img(4),
    previewVideo: vid(7),
    shortDesc: "In-house brand content for Hutsy Financial. Product storytelling & social.",
    services: ["Directing", "Shooting", "Editing", "Color Grading", "Deliverables"],
    results: "Ongoing in-house partnership",
    gallery: [img(4), img(10), img(11)],
    credits: "Client: Hutsy Financial | Director: PANchenko",
  },
  {
    slug: "streetwear-lookbook",
    title: "Streetwear Lookbook",
    category: "brand",
    year: 2024,
    thumbnail: img(10),
    previewVideo: vid(8),
    shortDesc: "Fashion lookbook for Toronto streetwear brand. Editorial + motion.",
    services: ["Directing", "Shooting", "Editing"],
    results: "Full collection sold out in 48hrs",
    gallery: [img(10), img(4)],
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
