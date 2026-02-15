"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { QuickQuoteModal } from "@/components/quick-quote-modal";
import { FormField, Input, Textarea, Select, Button } from "@/components/ui";
import { PROJECT_TYPES, BUDGET_RANGES, SOCIALS } from "@/data/shared";

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

      <main className="pt-24 pb-16 md:pb-24 px-4 md:px-8 lg:px-16 min-h-screen overflow-x-clip">
        <div className="page-enter">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Get In Touch
          </span>
          <h1 className="font-display text-6xl md:text-8xl text-foreground mt-1 mb-4">
            Contact
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mb-12 leading-relaxed">
            {"Got a project in mind? Let's talk. Fill out the form below or hit me up directly through socials. Based in Toronto, available worldwide."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Form */}
          <div className="page-enter-delay-1 lg:col-span-2">
            {submitted ? (
              <div className="border border-border p-12 text-center">
                <h2 className="font-display text-3xl text-accent">
                  Message Sent!
                </h2>
                <p className="text-muted-foreground mt-3 text-sm">
                  {"I'll get back to you within 24 hours. Check your DMs or inbox."}
                </p>
                <Button
                  variant="link"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 !p-0 !tracking-widest"
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <FormField label="Name" required className="md:col-span-2">
                  <Input type="text" required placeholder="Your name" />
                </FormField>
                <FormField label="Email" required>
                  <Input type="email" required placeholder="your@email.com" />
                </FormField>
                <FormField label="IG / Telegram">
                  <Input type="text" placeholder="@handle" />
                </FormField>
                <FormField label="Project Type" required>
                  <Select required>
                    <option value="">Select type</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </FormField>
                <FormField label="Budget Range">
                  <Select>
                    <option value="">Select range</option>
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Select>
                </FormField>
                <FormField label="Deadline" className="md:col-span-2">
                  <Input
                    type="text"
                    placeholder="e.g. March 2026, ASAP, Flexible"
                  />
                </FormField>
                <FormField label="Tell me about your project" required className="md:col-span-2">
                  <Textarea
                    required
                    rows={5}
                    placeholder="Describe your vision, references, goals..."
                  />
                </FormField>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full md:w-auto px-12">
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="page-enter-delay-2 flex flex-col gap-8">
            <div>
              <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                Socials
              </h3>
              <div className="flex flex-col gap-3">
                {SOCIALS.map((s) => (
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
          </div>
        </div>
      </main>

      <Footer />
      <QuickQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
