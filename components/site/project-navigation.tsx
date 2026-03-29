import Link from "next/link";
import type { WorkItem } from "@/data/work";

interface ProjectNavigationProps {
  previous: WorkItem | null;
  next: WorkItem | null;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  return (
    <nav className="border-t border-border/50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {previous ? (
            <Link
              href={`/work/${previous.slug}`}
              className="group flex flex-col items-start"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Previous
              </span>
              <span className="text-base md:text-lg font-medium group-hover:text-muted-foreground transition-colors">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Next
              </span>
              <span className="text-base md:text-lg font-medium group-hover:text-muted-foreground transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </nav>
  );
}
