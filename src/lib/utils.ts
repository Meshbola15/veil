import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PET_SPECIES_OPTIONS } from "@/types/pet";
import type {
  ConcernLevel,
  FlaggedIngredient,
  PetSpecies,
  ScoreTier,
} from "@/types";
import { mockFlaggedIngredients } from "@/data/mock";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreTextAndColor(score: number) {
  if (score >= 80) {
    return { text: "Safe", color: "bg-green-500" };
  } else if (score >= 60) {
    return { text: "Caution", color: "bg-yellow-500" };
  } else {
    return { text: "Avoid", color: "bg-red-500" };
  }
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

export const categories = [
  { id: "1", name: "Food" },
  { id: "2", name: "Drink" },
  { id: "3", name: "Cleaning" },
  { id: "4", name: "Personal Care" },
  { id: "5", name: "Home" },
  { id: "6", name: "Other" },
  { id: "7", name: "Pet" },
];

export const getFlaggedIngredient = (name: string): FlaggedIngredient => {
  return mockFlaggedIngredients.find(
    (ingredient) => ingredient.name === name,
  ) as FlaggedIngredient;
};
