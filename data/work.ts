import worksContent from "@/data/works-content.json";

export type WorkCategory = "brand" | "reels" | "editorial" | "music-video";

export const categoryLabels: Record<WorkCategory, string> = {
  brand: "Brand",
  reels: "Reels",
  editorial: "Editorial",
  "music-video": "Music Video",
};

export interface CreditLine {
  role: string;
  value: string;
}

/** Portfolio work — single source of truth for cards, filters, and `/work/[slug]`. */
export interface WorkItem {
  slug: string;
  title: string;
  category: WorkCategory;
  year: number;
  headline: string;
  description: string;
  poster: string;
  video: string;
  services: string[];
  results: string[];
  credits: CreditLine[];
  gallery: string[];
}

const feat = (slug: string, file: string) => `/assets/featured/${slug}/${file}`;

const featuredGallery = (slug: string): string[] => [
  feat(slug, "gallery-01.jpg"),
  feat(slug, "gallery-02.jpg"),
  feat(slug, "gallery-03.jpg"),
];

function mapCategoryLabel(label: string): WorkCategory {
  const m: Record<string, WorkCategory> = {
    Brand: "brand",
    Reels: "reels",
    Editorial: "editorial",
    "Music Video": "music-video",
  };
  const c = m[label];
  if (!c) throw new Error(`Unknown category in works-content: ${label}`);
  return c;
}

type JsonWork = (typeof worksContent)[number];

export const categories: { value: WorkCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "brand", label: "Brand" },
  { value: "reels", label: "Reels" },
  { value: "editorial", label: "Editorial" },
  { value: "music-video", label: "Music Video" },
];

export const works: WorkItem[] = (worksContent as JsonWork[]).map((w) => ({
  slug: w.slug,
  title: w.title,
  category: mapCategoryLabel(w.category),
  year: Number.parseInt(w.year, 10),
  headline: w.headline,
  description: w.description,
  poster: feat(w.slug, "poster.jpg"),
  video: feat(w.slug, "preview.mp4"),
  services: w.services,
  results: w.results,
  credits: w.credits,
  gallery: featuredGallery(w.slug),
}));
