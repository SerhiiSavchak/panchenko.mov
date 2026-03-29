import Image from "next/image";
import type { WorkItem } from "@/data/work";

interface ProjectGalleryProps {
  work: WorkItem;
}

export function ProjectGallery({ work }: ProjectGalleryProps) {
  if (!work.gallery || work.gallery.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 page-enter-delay-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {work.gallery.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-[16/9] overflow-hidden bg-muted ${
                index === 0 && work.gallery.length % 2 !== 0 ? "md:col-span-2" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${work.title} - Image ${index + 1}`}
                fill
                sizes={index === 0 && work.gallery.length % 2 !== 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
