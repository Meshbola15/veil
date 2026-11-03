import type { ConcernLevel, RiskIconTag, RiskTag } from "@/types";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";
import {
  TbAlertCircle,
  TbAlertTriangle,
  TbAtom2,
  TbBabyCarriage,
  TbBiohazard,
  TbBolt,
  TbBrain,
  TbCandy,
  TbCandyOff,
  TbPaw,
  TbCircleDot,
  TbDroplet,
  TbDropletFilled,
  TbFish,
  TbFlask,
  TbFlask2,
  TbGrain,
  TbHeartbeat,
  TbInfinity,
  TbLungs,
  TbPalette,
  TbPills,
  TbPlant2,
  TbSalt,
  TbSunHigh,
  TbTestPipe,
} from "react-icons/tb";
import { images } from "@/assets/images";

export const RISK_CATALOG: RiskTag[] = [
  // ── Health ───────────────────────────────────────────────
  {
    name: "Potential endocrine disruptor",
    iconTag: "endocrine-disruptor",
    group: "health",
    hint: "May interfere with hormones; evidence often still debated.",
  },
  {
    name: "Potential allergen",
    iconTag: "allergen",
    group: "health",
    hint: "Can trigger allergic reactions in sensitive people.",
  },
  {
    name: "Irritant",
    iconTag: "irritant",
    group: "health",
    hint: "May irritate skin, eyes, or mucous membranes.",
  },
  {
    name: "Possible carcinogen",
    iconTag: "carcinogen",
    group: "health",
    hint: "Flagged by some bodies as a suspected cancer risk.",
  },
  {
    name: "Reproductive toxicity",
    iconTag: "reproductive-toxicity",
    group: "health",
    hint: "Possible effects on fertility or development.",
  },
  {
    name: "Organ toxicity",
    iconTag: "organ-toxicity",
    group: "health",
    hint: "Possible effects on organs (liver, kidney) with high exposure.",
  },
  {
    name: "Neurotoxin",
    iconTag: "neurotoxin",
    group: "health",
    hint: "Possible effects on the nervous system.",
  },
  {
    name: "Respiratory concern",
    iconTag: "respiratory",
    group: "health",
    hint: "May be a concern when inhaled (sprays, aerosols, powders).",
  },
  {
    name: "Photosensitizer",
    iconTag: "photosensitizer",
    group: "health",
    hint: "Can increase the skin's sensitivity to sunlight.",
  },
  {
    name: "Comedogenic",
    iconTag: "comedogenic",
    group: "health",
    hint: "May clog pores — relevant for acne-prone skin.",
  },
  {
    name: "Contamination concern",
    iconTag: "contamination",
    group: "health",
    hint: "Process can leave trace impurities (e.g. 1,4-dioxane, nitrosamines).",
  },
  {
    name: "Heavy metals",
    iconTag: "heavy-metals",
    group: "health",
    hint: "May contain trace heavy metals such as lead or arsenic.",
  },

  // ── Environmental ────────────────────────────────────────
  {
    name: "Pollutant",
    iconTag: "pollutant",
    group: "environmental",
    hint: "Polluting to make or to release into the environment.",
  },
  {
    name: "Bioaccumulative",
    iconTag: "bioaccumulative",
    group: "environmental",
    hint: "Persists and builds up in the environment or living tissue.",
  },
  {
    name: "Microplastic",
    iconTag: "microplastic",
    group: "environmental",
    hint: "Synthetic polymer that can contribute to microplastic pollution.",
  },
  {
    name: "Reef-harming",
    iconTag: "reef-harm",
    group: "environmental",
    hint: "Linked to coral reef damage; restricted in some regions.",
  },

  // ── Diet (food / beverage / supplement) ──────────────────
  {
    name: "Added sugar",
    iconTag: "added-sugar",
    group: "diet",
    hint: "Adds sugar with little nutritional benefit.",
  },
  {
    name: "High sodium",
    iconTag: "high-sodium",
    group: "diet",
    hint: "Contributes meaningfully to daily sodium intake.",
  },
  {
    name: "Additive",
    iconTag: "additive",
    group: "diet",
    hint: "Processing additive (emulsifier, stabilizer, etc.).",
  },
  {
    name: "Artificial sweetener",
    iconTag: "artificial-sweetener",
    group: "diet",
    hint: "Non-sugar sweetener; some people prefer to limit these.",
  },
  {
    name: "Artificial color",
    iconTag: "artificial-color",
    group: "diet",
    hint: "Synthetic dye; a few are restricted in some regions.",
  },
  {
    name: "Trans fat",
    iconTag: "trans-fat",
    group: "diet",
    hint: "Partially hydrogenated fat; widely discouraged.",
  },
  {
    name: "Stimulant",
    iconTag: "stimulant",
    group: "diet",
    hint: "Contains caffeine or another stimulant.",
  },

  // ── Medical (drugs / supplements) ────────────────────────
  {
    name: "Drug interaction",
    iconTag: "drug-interaction",
    group: "medical",
    hint: "May interact with medications in your profile.",
  },
  {
    name: "High dose",
    iconTag: "high-dose",
    group: "medical",
    hint: "Dose exceeds common daily reference levels.",
  },

  // ── Pet safety ───────────────────────────────────────────
  {
    name: "May not suit cats",
    iconTag: "toxic-to-cats",
    group: "pet",
    hint: "Can irritate or harm cats if they ingest residue while grooming.",
  },
  {
    name: "May not suit dogs",
    iconTag: "toxic-to-dogs",
    group: "pet",
    hint: "Some ingredients are poorly tolerated by dogs at typical exposure.",
  },
  {
    name: "May not suit birds",
    iconTag: "toxic-to-birds",
    group: "pet",
    hint: "Sprays, fumes, or residues can be especially risky for birds.",
  },
  {
    name: "Grooming exposure",
    iconTag: "grooming-exposure",
    group: "pet",
    hint: "Pets may lick treated skin or fur and pick up product residue.",
  },
  {
    name: "Essential oils",
    iconTag: "essential-oils-pet",
    group: "pet",
    hint: "Many essential oils are not recommended around cats and some other pets.",
  },
  {
    name: "Small pet sensitive",
    iconTag: "small-pet-sensitive",
    group: "pet",
    hint: "Rabbits, rodents, and other small mammals can be more sensitive.",
  },
  {
    name: "Reptile sensitive",
    iconTag: "reptile-sensitive",
    group: "pet",
    hint: "Reptiles may react to residues on surfaces they touch or heat sources.",
  },
  {
    name: "Surface contact",
    iconTag: "surface-contact-pet",
    group: "pet",
    hint: "Pets may walk on or rest on treated floors, counters, or fabrics.",
  },
];

/** Risks that apply when evaluating ingredients for pets in the user's profile */
export const PET_RISK_CATALOG: RiskTag[] = RISK_CATALOG.filter(
  (entry) => entry.group === "pet",
);

/** Tabler icon component per risk tag — single source for Associated risks UI */
export const RISK_ICONS: Record<RiskIconTag, IconType> = {
  "endocrine-disruptor": TbFlask2,
  allergen: TbPlant2,
  irritant: TbAlertTriangle,
  carcinogen: TbBiohazard,
  "reproductive-toxicity": TbBabyCarriage,
  "organ-toxicity": TbHeartbeat,
  neurotoxin: TbBrain,
  respiratory: TbLungs,
  photosensitizer: TbSunHigh,
  comedogenic: TbCircleDot,
  contamination: TbTestPipe,
  "heavy-metals": TbAtom2,
  pollutant: TbDroplet,
  bioaccumulative: TbInfinity,
  microplastic: TbGrain,
  "reef-harm": TbFish,
  "added-sugar": TbCandy,
  "high-sodium": TbSalt,
  additive: TbFlask,
  "artificial-sweetener": TbCandyOff,
  "artificial-color": TbPalette,
  "trans-fat": TbDropletFilled,
  stimulant: TbBolt,
  "drug-interaction": TbPills,
  "high-dose": TbAlertCircle,
  "toxic-to-cats": TbPaw,
  "toxic-to-dogs": TbPaw,
  "toxic-to-birds": TbPaw,
  "grooming-exposure": TbPaw,
  "essential-oils-pet": TbPaw,
  "small-pet-sensitive": TbPaw,
  "reptile-sensitive": TbPaw,
  "surface-contact-pet": TbPaw,
};

export const PET_NAME_ICONS: Record<string, string> = {
  cat: images.cat,
  dog: images.dog,
  bird: images.bird,
  rabbit: images.rabbit,
  rat: images.rat,
  snake: images.snake,
  // PetSpecies values that have no dedicated illustration yet.
  small_mammal: images.rat,
  reptile: images.snake,
  other: images.dog,
};

export function riskByIcon(iconTag: RiskIconTag): RiskTag {
  const tag = RISK_CATALOG.find((entry) => entry.iconTag === iconTag);
  if (!tag) {
    throw new Error(`No RISK_CATALOG entry for iconTag: ${iconTag}`);
  }
  return tag;
}

export function petRiskByIcon(iconTag: RiskIconTag): RiskTag {
  const tag = PET_RISK_CATALOG.find((entry) => entry.iconTag === iconTag);
  if (!tag) {
    throw new Error(`No PET_RISK_CATALOG entry for iconTag: ${iconTag}`);
  }
  return tag;
}

interface RiskIconProps {
  iconTag: RiskIconTag;
  size?: number;
  className?: string;
}

export function RiskIcon({ iconTag, size = 20, className }: RiskIconProps) {
  const Icon = RISK_ICONS[iconTag];
  return (
    <div className="flex items-center justify-center size-16 rounded-full bg-blue-400">
      <Icon
        size={size}
        className={cn("shrink-0 text-white size-8", className)}
        strokeWidth={1.2}
        aria-hidden
      />
    </div>
  );
}

export const CONCERN_META: Record<
  ConcernLevel,
  { label: string; color: string }
> = {
  high: { label: "Higher concern", color: "#E53935" },
  moderate: { label: "Moderate", color: "#F5A623" },
  low: { label: "Low", color: "#4CAF50" },
};

// ─────────────────────────────────────────────────────────────
// Roles / functions (NOT risks) — what an ingredient does.
// Use these for `FlaggedIngredient.role`. Plain strings are fine,
// but a union keeps them consistent across the app.
// ─────────────────────────────────────────────────────────────
export type IngredientRole =
  | "UV filter"
  | "preservative"
  | "emollient"
  | "humectant"
  | "surfactant"
  | "emulsifier"
  | "fragrance"
  | "colorant"
  | "film former"
  | "thickener"
  | "solvent"
  | "antioxidant"
  | "active ingredient"
  | "sweetener"
  | "flavoring";
