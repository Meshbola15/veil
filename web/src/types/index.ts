export type ProductCategory = "food" | "cosmetic" | "drug" | "supplement" | "household";
export type Tier = "safe" | "caution" | "avoid";
export type MemberKind = "person" | "dog" | "cat" | "bird" | "rabbit";

export interface IngredientFlag {
  key: string;
  ingredient: string;
  tier: Exclude<Tier, "safe">;
  reason: string;
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageEmoji: string;
  ingredients: string[];
  baseScore: number;
  flags: IngredientFlag[];
  metadata: Record<string, string>;
}

export interface HouseholdMember {
  id: string;
  name: string;
  kind: MemberKind;
  concerns: string[];
}

export interface ScanRecord {
  barcode: string;
  scannedAt: string;
}
