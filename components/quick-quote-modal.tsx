"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormField, Input, Textarea, Select, Button } from "@/components/ui";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/data/shared";

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickQuoteModal({ isOpen, onClose }: QuickQuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="interactive-area fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[61] bg-card border border-border p-6 md:p-8 md:w-full md:max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl text-foreground">
                Quick Quote
              </h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="font-display text-2xl text-accent">Sent!</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {"We'll get back to you within 24hrs."}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormField label="Name" required>
                  <Input type="text" required placeholder="Your name" />
                </FormField>
                <FormField label="Contact (IG / Telegram / Email)" required>
                  <Input type="text" required placeholder="@handle or email" />
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
                <FormField label="Budget Range" required>
                  <Select required>
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
                    type="text"
                    placeholder="e.g. March 2026, ASAP, Flexible"
                  />
                </FormField>
                <FormField label="Message">
                  <Textarea
                    rows={3}
                    placeholder="Brief description of your project..."
                  />
                </FormField>
                <Button type="submit" fullWidth className="mt-2">
                  Send Request
                </Button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
