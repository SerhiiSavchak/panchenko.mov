"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FormField, Input, Textarea, Select, Button } from "@/components/ui";
import { PROJECT_TYPES, BUDGET_RANGES, SOCIALS } from "@/data/shared";

const ScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then((m) => ({ default: m.ScrollProgress })),
  { ssr: false }
);

const QuickQuoteModal = dynamic(
  () => import("@/components/quick-quote-modal").then((m) => ({ default: m.QuickQuoteModal })),
  { ssr: false }
);

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

const EMAIL_REGEX = /^[\w.-]+@[\w.-]+\.\w+$/;

export default function ContactPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (formData: FormData): FormErrors => {
    const err: FormErrors = {};
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const projectType = formData.get("projectType") as string;
    const message = (formData.get("message") as string)?.trim();

    if (!name || name.length < 2) err.name = "Enter your name (min 2 characters)";
    if (!email) err.email = "Email is required";
    else if (!EMAIL_REGEX.test(email)) err.email = "Enter a valid email address";
    if (!projectType) err.projectType = "Select a project type";
    if (!message || message.length < 10) err.message = "Describe your project (min 10 characters)";

    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const formErrors = validate(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitted(true);
  };

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />

      <main className="pt-[calc(5rem+env(safe-area-inset-top,0px))] md:pt-[calc(7rem+env(safe-area-inset-top,0px))] pb-16 md:pb-24 px-4 md:px-8 lg:px-16 min-h-[100dvh] overflow-x-clip">
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
                  onClick={() => {
                    setSubmitted(false);
                    setIsSubmitting(false);
                  }}
                  className="mt-6 !p-0 !tracking-widest"
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24 md:pb-8"
                noValidate
              >
                <FormField label="Name" required error={errors.name} className="md:col-span-2">
                  <Input name="name" type="text" required placeholder="Your name" minLength={2} className={errors.name ? "border-red-500/70" : ""} />
                </FormField>
                <FormField label="Email" required error={errors.email}>
                  <Input name="email" type="email" required placeholder="your@email.com" className={errors.email ? "border-red-500/70" : ""} />
                </FormField>
                <FormField label="IG / Telegram">
                  <Input name="social" type="text" placeholder="@handle" />
                </FormField>
                <FormField label="Project Type" required error={errors.projectType}>
                  <Select name="projectType" required className={errors.projectType ? "border-red-500/70" : ""}>
                    <option value="">Select type</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </FormField>
                <FormField label="Budget Range">
                  <Select name="budget">
                    <option value="">Select range</option>
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Select>
                </FormField>
                <FormField label="Deadline" className="md:col-span-2">
                  <Input name="deadline" type="text" placeholder="e.g. March 2026, ASAP, Flexible" />
                </FormField>
                <FormField label="Tell me about your project" required error={errors.message} className="md:col-span-2">
                  <Textarea name="message" required rows={5} placeholder="Describe your vision, references, goals..." minLength={10} className={errors.message ? "border-red-500/70" : ""} />
                </FormField>
                <div className="md:col-span-2 flex flex-wrap gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 scroll-mt-24 scroll-mb-24"
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
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
