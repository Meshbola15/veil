import type { Pet } from "@/types/pet";
import type { AgeGroup, Gender } from "@/types/onboarding";

export type { Pet, PetSpecies } from "@/types/pet";
export type { AgeGroup, Gender } from "@/types/onboarding";

export type ProductCategory =
  | "food"
  | "cosmetic"
  | "drug"
  | "supplement"
  | "household";

export type ScoreTier = "safe" | "caution" | "avoid";
export type Tier = ScoreTier;
import type { PetSpecies } from "@/types/pet";

/** Product record from the catalog / API */
export interface CatalogProduct {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  ingredients: string[];
  metadata: Record<string, unknown>;
  sourceDb: string;
  createdAt: string;
}

/** Slim product card for result UI and alternatives */
export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  score: number;
  tier: Tier;
  ingredients: string[];
}

/** Short ingredient flag on ScanResult (store / history) */
export interface FlaggedIngredientRef {
  name: string;
  tier: ScoreTier;
  reason: string;
}

export interface SupportingLink {
  name: string;
  title: string;
  url: string;
}

/** Full ingredient row for product detail screens */
export interface FlaggedIngredient {
  id: string;
  /** Display name, or several synonyms joined in the UI */
  name: string | string[];
  aliases?: string[];
  concernLevel: ConcernLevel;
  /** Short function label in the subtitle, e.g. "UV filter", "emollient" */
  role: string;
  tags: RiskTag[];
  reason: string;
  supportingLinks: SupportingLink[];
  whatIsIt: string[];
  riskToPets: IngredientPetRisk[];
}

export interface PetSafetyFlag {
  petId: string;
  petName: string;
  species: PetSpecies;
  tier: ScoreTier;
  reason: string;
}

/** API / store shape after a scan */
export interface ScanResult {
  product: CatalogProduct;
  score: number;
  tier: ScoreTier;
  flags: string[];
  flaggedIngredients: FlaggedIngredientRef[];
  alternatives: CatalogProduct[];
  petFlags: PetSafetyFlag[];
}

export interface ScanHistoryEntry {
  id: string;
  scannedAt: string;
  result: ScanResult;
}

/** Flattened view model for product result & history detail screens */
export interface ScanResultView extends ProductSummary {
  flags: string[];
  ingredients: string[];
  flaggedIngredients: {
    name: string;
    id: string;
    // details: FlaggedIngredient;
  }[];
  alternatives: ProductSummary[];
  petFlags: PetSafetyFlag[];
}

export interface HealthProfile {
  userId: string;
  name: string;
  ageGroup: AgeGroup | "";
  gender: Gender | "";
  allergies: string[];
  medications: string[];
  conditions: string[];
  dietaryPreferences: string[];
  pets: Pet[];
  updatedAt: string;
}

/** @deprecated Use CatalogProduct */
export type Product = CatalogProduct;

// ─────────────────────────────────────────────────────────────
// Risk taxonomy — the "Associated Risks" a flagged ingredient can carry.
// These are HAZARDS, not functions. Roles like "UV filter" / "preservative"
// live in `FlaggedIngredient.role`, not here (see ROLE_CATALOG at bottom).
// ─────────────────────────────────────────────────────────────

export type RiskIconTag =
  // health
  | "endocrine-disruptor"
  | "allergen"
  | "irritant"
  | "carcinogen"
  | "reproductive-toxicity"
  | "organ-toxicity"
  | "neurotoxin"
  | "respiratory"
  | "photosensitizer"
  | "comedogenic"
  | "contamination"
  | "heavy-metals"
  // environmental
  | "pollutant"
  | "bioaccumulative"
  | "microplastic"
  | "reef-harm"
  // diet (food / beverage / supplement)
  | "added-sugar"
  | "high-sodium"
  | "additive"
  | "artificial-sweetener"
  | "artificial-color"
  | "trans-fat"
  | "stimulant"
  // medical (drugs / supplements)
  | "drug-interaction"
  | "high-dose"
  // pet safety
  | "toxic-to-cats"
  | "toxic-to-dogs"
  | "toxic-to-birds"
  | "grooming-exposure"
  | "essential-oils-pet"
  | "small-pet-sensitive"
  | "reptile-sensitive"
  | "surface-contact-pet";

export type RiskGroup = "health" | "environmental" | "diet" | "medical" | "pet";

export interface RiskTag {
  name: string; // tile label
  iconTag: RiskIconTag; // maps to a React Icon in the component
  group: RiskGroup;
  hint: string; // short plain-language meaning (good for tooltips / detail sheet)
}

export type PetRiskTier = "safe" | "caution" | "avoid";

export interface IngredientPetRisk {
  species: PetSpecies; // which animal this entry applies to
  tier: PetRiskTier; // safe / caution / avoid
  reason: string; // plain-language, species-specific
}

export type ConcernLevel = "high" | "moderate" | "low";


export interface SearchResult {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  score: number;
  tier: Tier;
}