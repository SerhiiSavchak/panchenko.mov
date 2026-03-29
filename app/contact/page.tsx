import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SOCIALS } from "@/data/shared";

export const metadata = {
  title: "Contact | PANchenko",
  description: "Get in touch for your next project.",
};

export default function ContactPage() {
  const email = SOCIALS.find((s) => s.label === "Email");
  const instagram = SOCIALS.find((s) => s.label === "Instagram");
  const telegram = SOCIALS.find((s) => s.label === "Telegram");

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl page-enter">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Have a project in mind? Let&apos;s create something together.
              <br />
              Based in Toronto, available worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 page-enter-delay-1">
            {/* Contact Info */}
            <div className="space-y-8">
              {email && (
                <div>
                  <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Email
                  </h3>
                  <a
                    href={email.href}
                    className="text-lg hover:text-muted-foreground transition-colors"
                  >
                    {email.handle}
                  </a>
                </div>
              )}

              {instagram && (
                <div>
                  <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Instagram
                  </h3>
                  <a
                    href={instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:text-muted-foreground transition-colors"
                  >
                    {instagram.handle}
                  </a>
                </div>
              )}

              {telegram && (
                <div>
                  <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Telegram
                  </h3>
                  <a
                    href={telegram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:text-muted-foreground transition-colors"
                  >
                    {telegram.handle}
                  </a>
                </div>
              )}

              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Location
                </h3>
                <p className="text-lg">Toronto, ON</p>
              </div>
            </div>

            {/* Response Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Response Time
                </h3>
                <p className="text-lg">Within 24-48 hours</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Fastest via Instagram DM
                </p>
              </div>

              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  What to Include
                </h3>
                <ul className="text-muted-foreground space-y-1 text-sm leading-relaxed">
                  <li>Project type and concept</li>
                  <li>Timeline and deadline</li>
                  <li>Budget range</li>
                  <li>References or inspiration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
