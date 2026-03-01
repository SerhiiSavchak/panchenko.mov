"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FormField, Input, Textarea, Select, Button } from "@/components/ui";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/data/shared";
import { useLenis } from "@/components/lenis-provider";

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  contact?: string;
  projectType?: string;
  budget?: string;
}

const CONTACT_REGEX = /^([@a-zA-Z0-9._-]+|[\w.-]+@[\w.-]+\.\w+)$/;
const EXIT_DURATION_MS = 350;

export function QuickQuoteModal({ isOpen, onClose }: QuickQuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
      unlockTimeoutRef.current = null;
    }
    savedScrollY.current = window.scrollY;
    document.body.classList.add("modal-scroll-lock");
    document.body.style.top = `-${savedScrollY.current}px`;
    lenis?.stop();
    return () => {
      const scrollY = savedScrollY.current;
      const t = setTimeout(() => {
        unlockTimeoutRef.current = null;
        document.body.classList.remove("modal-scroll-lock");
        document.body.style.top = "";
        window.scrollTo({ top: scrollY, behavior: "auto" });
        lenis?.start();
      }, EXIT_DURATION_MS);
      unlockTimeoutRef.current = t;
    };
  }, [isOpen, lenis]);

  const validate = (formData: FormData): FormErrors => {
    const err: FormErrors = {};
    const name = (formData.get("name") as string)?.trim();
    const contact = (formData.get("contact") as string)?.trim();
    const projectType = formData.get("projectType") as string;
    const budget = formData.get("budget") as string;

    if (!name || name.length < 2) err.name = "Enter your name (min 2 characters)";
    if (!contact) err.contact = "Required";
    else if (!CONTACT_REGEX.test(contact)) err.contact = "Enter valid @handle or email";
    if (!projectType) err.projectType = "Select a project type";
    if (!budget) err.budget = "Select a budget range";

    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formErrors = validate(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    setIsSubmitting(true);
    setSubmitted(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="interactive-area fixed inset-0 z-[60] bg-background/85 backdrop-blur-md"
            onClick={onClose}
          />
          <div className="fixed z-[61] inset-0 pointer-events-none flex items-center justify-center quick-quote-modal-mobile p-0 md:p-4 md:inset-0">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-lg max-h-full md:max-h-[85vh] md:rounded-sm bg-card border border-border flex flex-col shadow-xl"
            >
            <div className="flex items-center justify-between shrink-0 p-6 md:p-8 pb-4 border-b border-border">
              <h2 className="font-display text-3xl text-foreground">
                Quick Quote
              </h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none p-1"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain modal-scroll-touch"
            >
              <div className="px-6 md:px-8 py-6 md:py-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12"
                  >
                    <p className="font-display text-2xl text-accent">Sent!</p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {"We'll get back to you within 24hrs."}
                    </p>
                  </motion.div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 min-w-0"
                    noValidate
                  >
                    <FormField label="Name" required error={errors.name}>
                      <Input
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        minLength={2}
                        className={errors.name ? "border-red-500/70" : ""}
                      />
                    </FormField>
                    <FormField label="Contact (IG / Telegram / Email)" required error={errors.contact}>
                      <Input
                        name="contact"
                        type="text"
                        required
                        placeholder="@handle or email"
                        className={errors.contact ? "border-red-500/70" : ""}
                      />
                    </FormField>
                    <FormField label="Project Type" required error={errors.projectType}>
                      <Select
                        name="projectType"
                        required
                        className={errors.projectType ? "border-red-500/70" : ""}
                      >
                        <option value="">Select type</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Select>
                    </FormField>
                    <FormField label="Budget Range" required error={errors.budget}>
                      <Select
                        name="budget"
                        required
                        className={errors.budget ? "border-red-500/70" : ""}
                      >
                        <option value="">Select range</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </Select>
                    </FormField>
                    <FormField label="Deadline">
                      <Input
                        name="deadline"
                        type="text"
                        placeholder="e.g. March 2026, ASAP, Flexible"
                      />
                    </FormField>
                    <FormField label="Message">
                      <Textarea
                        name="message"
                        rows={3}
                        placeholder="Brief description of your project..."
                      />
                    </FormField>
                  </form>
                )}
              </div>
            </div>

            {!submitted && (
              <div className="shrink-0 p-6 md:p-8 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-border bg-card">
                <Button
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={(e) => {
                    e.preventDefault();
                    formRef.current?.requestSubmit();
                  }}
                >
                  {isSubmitting ? "Sending…" : "Send Request"}
                </Button>
              </div>
            )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
