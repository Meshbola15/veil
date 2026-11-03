import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PET_SPECIES_OPTIONS } from "@/types/pet";
import type { ConcernLevel, PetSpecies, ScoreTier } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Score bands from the design system (agents.md → Score Badge). */
export function getScoreTier(score: number): ScoreTier {
  if (score >= 75) return "safe";
  if (score >= 40) return "caution";
  return "avoid";
}

const SCORE_DISPLAY: Record<ScoreTier, { text: string; color: string }> = {
  safe: { text: "Great match for you", color: "bg-score-safe" },
  caution: { text: "Some things to consider", color: "bg-score-caution" },
  avoid: { text: "May not suit your profile", color: "bg-score-avoid" },
};

export function getScoreTextAndColor(score: number) {
  return SCORE_DISPLAY[getScoreTier(score)];
}

export function formatIngredientName(name: string | string[]): string {
  return Array.isArray(name) ? name.join(", ") : name;
}

const CONCERN_LEVEL_LABELS: Record<ConcernLevel, string> = {
  high: "Higher concern",
  moderate: "Moderate",
  low: "Low",
};

const CONCERN_LEVEL_DOT: Record<ConcernLevel, string> = {
  high: "bg-score-avoid",
  moderate: "bg-score-caution",
  low: "bg-score-safe",
};

export function getConcernLevelLabel(level: ConcernLevel): string {
  return CONCERN_LEVEL_LABELS[level];
}

export function getConcernLevelDotClass(level: ConcernLevel): string {
  return CONCERN_LEVEL_DOT[level];
}

const PET_TIER_BADGE_LABELS: Record<ScoreTier, string> = {
  safe: "Safe",
  caution: "Caution",
  avoid: "Avoid",
};

const PET_TIER_BADGE_CLASS: Record<ScoreTier, string> = {
  safe: "score-safe",
  caution: "score-caution",
  avoid: "score-avoid",
};

export function getPetSpeciesLabel(species: PetSpecies): string {
  return (
    PET_SPECIES_OPTIONS.find((option) => option.value === species)?.label ??
    species
  );
}

export function getPetTierBadgeLabel(tier: ScoreTier): string {
  return PET_TIER_BADGE_LABELS[tier];
}

export function getPetTierBadgeClass(tier: ScoreTier): string {
  return PET_TIER_BADGE_CLASS[tier];
}
