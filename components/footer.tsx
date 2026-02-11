import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-foreground">
            PANchenko
          </span>
          <span className="text-[10px] text-muted-foreground">
            @panchenko.mov
          </span>
        </div>
        <nav className="flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
          <Link href="/work" className="hover:text-accent transition-colors">
            Work
          </Link>
          <Link
            href="/contact"
            className="hover:text-accent transition-colors"
          >
            Contact
          </Link>
          <a
            href="https://instagram.com/panchenko.mov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Instagram
          </a>
        </nav>
        <span className="text-[10px] text-muted-foreground">
          {"Toronto \u00A9 2025"}
        </span>
      </div>
    </footer>
  );
}
