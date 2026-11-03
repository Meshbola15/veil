import type { ScanResultView, SearchResult } from "@/types";

/*
 * Lightweight product fixtures. Kept separate from `mock.tsx` (which pulls in
 * the full risk catalog + icon set) so list screens like History and Search
 * don't download that weight just to render a product card.
 */

export const mockScan: ScanResultView = {
  id: "1",
  name: "Daily Defense SPF 50",
  brand: "Beauty Formulas",
  category: "cosmetic",
  imageUrl: "https://placehold.co/150x150?text=SPF",
  score: 42,
  tier: "caution",
  flags: ["Contains chemical UV filters", "Fragrance in formula"],

  ingredients: [
    "Octinoxate",
    "Octocrylene",
    "Paraffinum liquidum",
    "Phenoxyethanol",
    "Acrylates/Methacrylate Copolymer",
    "Carbomer",
    "Ceteareth-25",
    "Dimethicone",
  ],
  flaggedIngredients: [
    {
      id: "ing_octinoxate",
      name: "Octinoxate",
    },
    {
      id: "ing_octocrylene",
      name: "Octocrylene",
    },
    {
      id: "ing_paraffinum",
      name: "Paraffinum liquidum",
    },
    {
      id: "ing_phenoxyethanol",
      name: "Phenoxyethanol",
    },
    {
      id: "ing_acrylates_copolymer",
      name: "Acrylates/Methacrylate Copolymer",
    },
    {
      id: "ing_texture_group",
      name: "Carbomer, Ceteareth-25, Dimethicone",
    },
  ],

  alternatives: [
    {
      id: "alt_mineral_spf",
      name: "Mineral Shield SPF 30",
      brand: "Veil Labs",
      category: "cosmetic",
      imageUrl: "https://placehold.co/150x150?text=Mineral",
      score: 78,
      tier: "safe",
      ingredients: ["Zinc oxide", "Titanium dioxide", "Glycerin"],
    },
  ],

  petFlags: [
    {
      petId: "pet_luna",
      petName: "Luna",
      species: "cat",
      tier: "caution",
      reason:
        "Chemical UV filters and phenoxyethanol can irritate cats if they groom treated skin. Let it fully absorb before contact.",
    },
    {
      petId: "pet_max",
      petName: "Max",
      species: "dog",
      tier: "safe",
      reason: "No flagged ingredients for dogs at normal use.",
    },
  ],
};

/** Catalog-style hits returned from text search (personalized scores for demo profile). */
export const mockSearchResults: SearchResult[] = [
  {
    id: "search_cerave_cleanser",
    name: "Hydrating Facial Cleanser",
    brand: "CeraVe",
    category: "cosmetic",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=CeraVe",
    score: 91,
    tier: "safe",
  },
  {
    id: "search_cheerios",
    name: "Cheerios Original Cereal",
    brand: "General Mills",
    category: "food",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Cheerios",
    score: 85,
    tier: "safe",
  },
  {
    id: "search_naturemade_d3",
    name: "Vitamin D3 2000 IU Softgels",
    brand: "Nature Made",
    category: "supplement",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=D3",
    score: 86,
    tier: "safe",
  },
  {
    id: "search_kind_bar",
    name: "Dark Chocolate Nuts & Sea Salt Bar",
    brand: "KIND",
    category: "food",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=KIND",
    score: 78,
    tier: "safe",
  },
  {
    id: "search_seventh_gen_detergent",
    name: "Free & Clear Laundry Detergent",
    brand: "Seventh Generation",
    category: "household",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=7th+Gen",
    score: 81,
    tier: "safe",
  },
  {
    id: "search_rxbar",
    name: "Chocolate Sea Salt Protein Bar",
    brand: "RXBAR",
    category: "food",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=RXBAR",
    score: 83,
    tier: "safe",
  },
  {
    id: "search_native_deodorant",
    name: "Coconut & Vanilla Deodorant",
    brand: "Native",
    category: "cosmetic",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Native",
    score: 74,
    tier: "caution",
  },
  {
    id: "search_oatly",
    name: "Original Oatmilk",
    brand: "Oatly",
    category: "food",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Oatly",
    score: 72,
    tier: "caution",
  },
  {
    id: "search_dove_bar",
    name: "Sensitive Skin Beauty Bar",
    brand: "Dove",
    category: "cosmetic",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Dove",
    score: 69,
    tier: "caution",
  },
  {
    id: "search_tylenol",
    name: "Extra Strength Acetaminophen 500 mg",
    brand: "Tylenol",
    category: "drug",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Tylenol",
    score: 61,
    tier: "caution",
  },
  {
    id: "search_campbells_soup",
    name: "Condensed Tomato Soup",
    brand: "Campbell's",
    category: "food",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Campbell",
    score: 52,
    tier: "caution",
  },
  {
    id: "search_mrs_meyers_dish",
    name: "Clean Day Dish Soap — Lemon Verbena",
    brand: "Mrs. Meyer's",
    category: "household",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Dish",
    score: 56,
    tier: "caution",
  },
  {
    id: "search_method_cleaner",
    name: "All-Purpose Cleaner — Pink Grapefruit",
    brand: "Method",
    category: "household",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Method",
    score: 48,
    tier: "caution",
  },
  {
    id: "search_beauty_formulas_spf",
    name: "Daily Defense SPF 50",
    brand: "Beauty Formulas",
    category: "cosmetic",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=SPF+50",
    score: 42,
    tier: "caution",
  },
  {
    id: "search_lrp_sunscreen",
    name: "Anthelios Melt-In Milk Sunscreen SPF 60",
    brand: "La Roche-Posay",
    category: "cosmetic",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=LRP",
    score: 38,
    tier: "avoid",
  },
  {
    id: "search_clorox_bleach",
    name: "Disinfecting Bleach",
    brand: "Clorox",
    category: "household",
    imageUrl: "https://placehold.co/150x150/f5f5f5/6b6b6b?text=Bleach",
    score: 28,
    tier: "avoid",
  },
];

/** Demo search: match product name, brand, or category (case-insensitive). */
export function filterMockSearchResults(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return mockSearchResults.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q),
  );
}
