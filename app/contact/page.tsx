"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { QuickQuoteModal } from "@/components/quick-quote-modal";

const projectTypes = [
  "Music Video",
  "Brand Content",
  "Car Shoot",
  "Fight Coverage",
  "Short-Form / Reels",
  "Other",
];

const budgetRanges = [
  "Under $1K",
  "$1K - $3K",
  "$3K - $5K",
  "$5K - $10K",
  "$10K+",
  "Let's discuss",
];

const socials = [
  {
    label: "Instagram",
    handle: "@panchenko.mov",
    href: "https://instagram.com/panchenko.mov",
  },
  {
    label: "Telegram",
    handle: "@panchenko",
    href: "https://t.me/panchenko",
  },
  {
    label: "Email",
    handle: "hello@panchenko.mov",
    href: "mailto:hello@panchenko.mov",
  },
];

export default function ContactPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />

      <main className="pt-24 pb-16 md:pb-24 px-4 md:px-8 lg:px-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Get In Touch
          </span>
          <h1 className="font-display text-6xl md:text-8xl text-foreground mt-1 mb-4">
            Contact
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mb-12 leading-relaxed">
            {"Got a project in mind? Let's talk. Fill out the form below or hit me up directly through socials. Based in Toronto, available worldwide."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div className="border border-border p-12 text-center">
                <h2 className="font-display text-3xl text-accent">
                  Message Sent!
                </h2>
                <p className="text-muted-foreground mt-3 text-sm">
                  {"I'll get back to you within 24 hours. Check your DMs or inbox."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors border-b border-border hover:border-accent pb-1 cursor-pointer"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    IG / Telegram
                  </label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="@handle"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Project Type *
                  </label>
                  <select
                    required
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Budget Range
                  </label>
                  <select className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                    <option value="">Select range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Deadline
                  </label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. March 2026, ASAP, Flexible"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Tell me about your project *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Describe your vision, references, goals..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-12 py-3 text-sm uppercase tracking-widest font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                Socials
              </h3>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-border pb-3 hover:border-accent transition-colors"
                  >
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </span>
                    <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                      {s.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                Location
              </h3>
              <p className="text-sm text-foreground">Toronto, ON</p>
              <p className="text-xs text-muted-foreground mt-1">
                Available for travel worldwide
              </p>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                Response Time
              </h3>
              <p className="text-sm text-foreground">Within 24 hours</p>
              <p className="text-xs text-muted-foreground mt-1">
                Fastest via Instagram DM
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <QuickQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
