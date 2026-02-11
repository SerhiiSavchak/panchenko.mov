"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
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
                className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none cursor-pointer"
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
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Name
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
                    Contact (IG / Telegram / Email)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="@handle or email"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Project Type
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
                  <select
                    required
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Deadline
                  </label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. March 2026, ASAP, Flexible"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Brief description of your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm uppercase tracking-widest font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors mt-2 cursor-pointer"
                >
                  Send Request
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
