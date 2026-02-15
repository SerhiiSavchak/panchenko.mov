"use client";

import { useState, useRef, useMemo } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";
import { CONSTRUCTOR_MEDIA } from "@/lib/media";
import { useScrollReveal } from "@/lib/scroll-animate";

const PROJECT_TYPES = [
  { id: "rap", label: "Rap / Trap", min: 650, max: 950 },
  { id: "cars", label: "Cars", min: 450, max: 750 },
  { id: "fight", label: "Fight", min: 350, max: 650 },
  { id: "brand", label: "Brand", min: 550, max: 900 },
  { id: "reels", label: "Reels", min: 300, max: 600 },
] as const;

const EDIT_TIERS = [
  { id: "basic", label: "Basic", multiplier: 1 },
  { id: "pro", label: "Pro", multiplier: 1.25 },
  { id: "insane", label: "Insane", multiplier: 1.6 },
] as const;

const TEAM_OPTIONS = [
  { id: "solo", label: "Solo", multiplier: 1 },
  { id: "assistant", label: "+ Assistant", multiplier: 1.15 },
  { id: "second-cam", label: "+ 2nd Cam", multiplier: 1.35 },
] as const;

const RUSH_OPTIONS = [
  { id: "normal", label: "Normal", multiplier: 1, timeline: "5-7 days" },
  { id: "72h", label: "72h Rush", multiplier: 1.2, timeline: "3 days" },
  { id: "24h", label: "24h Rush", multiplier: 1.45, timeline: "24 hours" },
] as const;

const ADD_ONS = [
  { id: "color", label: "Color Grade", min: 120, max: 220 },
  { id: "vfx", label: "VFX", min: 180, max: 400 },
  { id: "captions", label: "Captions", min: 40, max: 90 },
  { id: "formats", label: "All Formats", min: 30, max: 80 },
] as const;

const EXTRA_HOUR = { min: 90, max: 140 };

interface BuildYourShootProps {
  onQuoteOpen: () => void;
}

export function BuildYourShoot({ onQuoteOpen }: BuildYourShootProps) {
  const ref = useRef(null);
  const inView = useScrollReveal(ref, {
    once: true,
    rootMargin: "-60px 0px",
    rootMarginMobile: "100px 0px -40px 0px",
  });

  const reducedMotion = useReducedMotion();
  const [projectType, setProjectType] = useState<string>("rap");
  const [editTier, setEditTier] = useState<string>("basic");
  const [team, setTeam] = useState<string>("solo");
  const [rush, setRush] = useState<string>("normal");
  const [extraHours, setExtraHours] = useState(0);
  const [addOns, setAddOns] = useState<Set<string>>(new Set());

  const toggleAddOn = (id: string) => {
    setAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const estimate = useMemo(() => {
    const proj = PROJECT_TYPES.find((p) => p.id === projectType)!;
    const edit = EDIT_TIERS.find((e) => e.id === editTier)!;
    const tm = TEAM_OPTIONS.find((t) => t.id === team)!;
    const rs = RUSH_OPTIONS.find((r) => r.id === rush)!;
    let baseMin = proj.min + extraHours * EXTRA_HOUR.min;
    let baseMax = proj.max + extraHours * EXTRA_HOUR.max;
    baseMin *= edit.multiplier * tm.multiplier * rs.multiplier;
    baseMax *= edit.multiplier * tm.multiplier * rs.multiplier;
    ADD_ONS.forEach((ao) => {
      if (addOns.has(ao.id)) { baseMin += ao.min; baseMax += ao.max; }
    });
    return { min: Math.round(baseMin * 0.88), max: Math.round(baseMax * 1.12) };
  }, [projectType, editTier, team, rush, extraHours, addOns]);

  const rushTimeline = RUSH_OPTIONS.find((r) => r.id === rush)!.timeline;

  const deliverables = useMemo(() => {
    const items = ["4K master file", "2h included shoot time"];
    const edit = EDIT_TIERS.find((e) => e.id === editTier)!;
    if (edit.id === "pro") items.push("Cinematic color grading", "2 revision rounds");
    if (edit.id === "insane") items.push("Advanced color + VFX", "Unlimited revisions", "Priority turnaround");
    if (edit.id === "basic") items.push("Basic color grading", "1 revision round");
    ADD_ONS.forEach((ao) => { if (addOns.has(ao.id)) items.push(ao.label); });
    items.push("All social formats");
    return items;
  }, [editTier, addOns]);

  const media = CONSTRUCTOR_MEDIA[projectType as keyof typeof CONSTRUCTOR_MEDIA] ?? CONSTRUCTOR_MEDIA.rap;

  return (
    <Section id="build-your-shoot">
      <div ref={ref}>
        {/* Neon activation line */}
        <div
          className={`h-px bg-gradient-to-r from-accent to-accent-secondary mb-10 activate-line ${inView ? "visible" : ""}`}
        />

        <SectionHeader label="Interactive" title="Build Your Shoot" className="mb-6" />

        {/* Dynamic Media Panel */}
        <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-sm border border-border neon-box-glow">
          <AnimatePresence mode="wait">
            <motion.div
              key={projectType}
              initial={reducedMotion ? {} : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={media.image}
                alt="Behind the scenes — epic film production"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                loading="lazy"
                className="object-cover object-center"
              />
              {/* Overlay per type */}
              <MediaOverlay type={media.overlay} reducedMotion={reducedMotion} />
              {/* Dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Panel power-on animation */}
          {inView && !reducedMotion && (
            <>
              <div className="absolute top-0 left-0 right-0 h-px bg-accent/60 panel-border-top" />
              <div className="absolute top-0 right-0 bottom-0 w-px bg-accent/40 panel-border-right" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/60 panel-border-bottom" />
              <div className="absolute top-0 left-0 bottom-0 w-px bg-accent/40 panel-border-left" />
            </>
          )}

          {/* Current type label */}
          <div className="absolute bottom-4 left-4 z-10">
            <span
              key={projectType}
              className="font-display text-3xl md:text-5xl text-accent label-fade-in block"
            >
              {DISPLAY_LABELS[projectType as keyof typeof DISPLAY_LABELS] ?? projectType.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left: Controls */}
          <div className="lg:w-1/2 flex flex-col gap-8">
            <OptionGroup label="Project Type" options={PROJECT_TYPES.map((p) => ({ id: p.id, label: p.label }))} value={projectType} onChange={setProjectType} reducedMotion={reducedMotion} />
            <OptionGroup label="Edit Level" options={EDIT_TIERS.map((e) => ({ id: e.id, label: e.label }))} value={editTier} onChange={setEditTier} reducedMotion={reducedMotion} />
            <OptionGroup label="Team" options={TEAM_OPTIONS.map((t) => ({ id: t.id, label: t.label }))} value={team} onChange={setTeam} reducedMotion={reducedMotion} />
            <OptionGroup label="Turnaround" options={RUSH_OPTIONS.map((r) => ({ id: r.id, label: r.label }))} value={rush} onChange={setRush} reducedMotion={reducedMotion} />

            {/* Extra Hours */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Extra Hours (2h included)</span>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setExtraHours(Math.max(0, extraHours - 1))} className="w-10 h-10 border border-border text-foreground hover:border-accent hover:text-accent transition-colors flex items-center justify-center" aria-label="Decrease hours">-</button>
                <span className="font-display text-2xl text-accent w-8 text-center">{extraHours}</span>
                <button type="button" onClick={() => setExtraHours(extraHours + 1)} className="w-10 h-10 border border-border text-foreground hover:border-accent hover:text-accent transition-colors flex items-center justify-center" aria-label="Increase hours">+</button>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Add-ons</span>
              <div className="flex flex-wrap gap-2">
                {ADD_ONS.map((ao) => (
                  <button
                    key={ao.id}
                    type="button"
                    onClick={() => toggleAddOn(ao.id)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                      addOns.has(ao.id)
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    {ao.label}
                    <span className="ml-1 text-[10px] opacity-60">+${ao.min}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live estimate */}
          <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-card p-6 md:p-8 neon-box-glow">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Estimated Range</span>
              <div
                key={`${estimate.min}-${estimate.max}`}
                className={`font-display text-4xl md:text-5xl text-accent mt-2 ${!reducedMotion ? "label-fade-in" : ""}`}
              >
                ${estimate.min.toLocaleString()} &ndash; ${estimate.max.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">CAD, before tax</p>

              <div className="mt-6 pt-6 border-t border-border">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Timeline</span>
                <p className="font-display text-xl text-foreground mt-1">{rushTimeline}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">What You Get</span>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {deliverables.map((d) => (
                    <li key={d} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">+</span>{d}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={onQuoteOpen}
                className="w-full mt-8 py-3 text-sm uppercase tracking-widest font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Get This Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const DISPLAY_LABELS = { rap: "RAP / TRAP", cars: "CARS", fight: "FIGHT", brand: "BRAND", reels: "REELS" };

// Overlay animations per project type - CSS only
function MediaOverlay({ type, reducedMotion }: { type: string; reducedMotion: boolean }) {
  if (reducedMotion) return null;

  if (type === "graffiti") {
    return (
      <div
        className="absolute inset-0 mix-blend-overlay overlay-graffiti opacity-0"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(168,85,247,0.1) 10px, rgba(168,85,247,0.1) 20px)",
        }}
        aria-hidden="true"
      />
    );
  }

  if (type === "motion-blur") {
    return <div className="absolute inset-0 overlay-motion-blur" aria-hidden="true" />;
  }

  if (type === "impact") {
    return <div className="absolute inset-0 bg-foreground overlay-impact opacity-0" aria-hidden="true" />;
  }

  if (type === "light-sweep") {
    return (
      <div
        className="absolute inset-0 w-1/3 overlay-light-sweep"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        aria-hidden="true"
      />
    );
  }

  return null;
}

function OptionGroup({
  label, options, value, onChange, reducedMotion,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  reducedMotion: boolean;
}) {
  return (
    <div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`relative px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
              value === opt.id
                ? "border-accent text-accent"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {value === opt.id && !reducedMotion && (
              <motion.div layoutId={`option-${label}`} className="absolute inset-0 border border-accent bg-accent/5" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
