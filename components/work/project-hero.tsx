import Image from "next/image";
import type { WorkItem } from "@/data/work";

interface ProjectHeroProps {
  work: WorkItem;
}

export function ProjectHero({ work }: ProjectHeroProps) {
  return (
    <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-muted page-enter">
      <Image
        src={work.thumbnail}
        alt={work.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
