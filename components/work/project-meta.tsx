import type { WorkItem } from "@/data/work";
import { categories } from "@/data/work";

interface ProjectMetaProps {
  work: WorkItem;
}

export function ProjectMeta({ work }: ProjectMetaProps) {
  const categoryLabel = categories.find((c) => c.value === work.category)?.label || work.category;

  return (
    <section className="py-12 md:py-16 page-enter-delay-1">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            {work.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
            <span>{categoryLabel}</span>
            <span className="text-border">|</span>
            <span>{work.year}</span>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            {work.shortDesc}
          </p>
          
          {work.services.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {work.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 text-sm border border-border/50 text-muted-foreground"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {work.credits && (
            <p className="text-sm text-muted-foreground">
              {work.credits}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
