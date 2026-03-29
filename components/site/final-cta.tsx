import Link from "next/link";
import { SOCIALS } from "@/data/shared";

export function FinalCta() {
  const email = SOCIALS.find((s) => s.label === "Email");

  return (
    <section className="py-24 md:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Have a project in mind?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Let&apos;s create something cinematic together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Get in Touch
            </Link>
            
            {email && (
              <a
                href={email.href}
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium border border-border hover:border-foreground transition-colors"
              >
                {email.handle}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
