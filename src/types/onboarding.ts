import type { Pet } from "@/types/pet";

export type AgeGroup = "under_25" | "25_34" | "35_44" | "45_60" | "over_60";

export type Gender = "woman" | "man" | "non_binary";

export interface OnboardingData {
  name: string;
  ageGroup: AgeGroup | "";
  gender: Gender | "";
  allergies: string[];
  medications: string[];
  conditions: string[];
  dietaryPreferences: string[];
  hasPets: boolean;
  pets: Pet[];
  notificationsEnabled: boolean;
  cameraPermissionGranted: boolean;
}

export const defaultOnboardingData: OnboardingData = {
  name: "",
  ageGroup: "",
  gender: "",
  allergies: [],
  medications: [],
  conditions: [],
  dietaryPreferences: [],
  hasPets: false,
  pets: [],
  notificationsEnabled: false,
  cameraPermissionGranted: false,
};

export const AGE_GROUP_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: "under_25", label: "Under 25" },
  { value: "25_34", label: "25 - 34" },
  { value: "35_44", label: "35 - 44" },
  { value: "45_60", label: "45 - 60" },
  { value: "over_60", label: "Over 60" },
];

export const GENDER_OPTIONS: {
  value: Gender;
  label: string;
  symbol: string;
}[] = [
  { value: "woman", label: "Female", symbol: "♀" },
  { value: "man", label: "Male", symbol: "♂" },
  { value: "non_binary", label: "Non-binary", symbol: "⚧" },
];

export const DIETARY_OPTIONS = [
  "Vegan",
  "Vegetarian",
  "Pescatarian",
  "Gluten-free",
  "Dairy-free",
  "Halal",
  "Kosher",
  "Keto",
  "Low-sugar",
  "Low-sodium",
] as const;
