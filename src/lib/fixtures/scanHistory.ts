import type { CatalogProduct, ScanHistoryEntry } from "@/types";

const now = Date.now();

function hoursAgo(hours: number): string {
  return new Date(now - hours * 60 * 60 * 1000).toISOString();
}

function catalogProduct(partial: CatalogProduct): CatalogProduct {
  return partial;
}

export const MOCK_SCAN_HISTORY: ScanHistoryEntry[] = [
  {
    id: "hist-demo",
    scannedAt: hoursAgo(1),
    result: {
      product: catalogProduct({
        id: "prod-tonic",
        barcode: "demo",
        name: "Brightening facial tonic",
        brand: "Beauty Formulas",
        category: "cosmetic",
        imageUrl: "https://via.placeholder.com/150",
        ingredients: ["Water", "Glycerin", "Niacinamide", "Fragrance"],
        metadata: {},
        sourceDb: "open_beauty_facts",
        createdAt: "2024-06-01T10:00:00.000Z",
      }),
      score: 39,
      tier: "avoid",
      flags: ["Fragrance flagged for your profile"],
      flaggedIngredients: [
        {
          name: "Fragrance",
          tier: "caution",
          reason: "May not suit sensitive skin profiles",
        },
      ],
      alternatives: [],
      petFlags: [],
    },
  },
  {
    id: "hist-003",
    scannedAt: hoursAgo(2),
    result: {
      product: catalogProduct({
        id: "prod-cerave-cream",
        barcode: "036000123456",
        name: "Moisturizing Cream",
        brand: "CeraVe",
        category: "cosmetic",
        imageUrl: "https://via.placeholder.com/150",
        ingredients: ["Purified water", "Glycerin", "Ceramide NP", "Hyaluronic acid"],
        metadata: {},
        sourceDb: "open_beauty_facts",
        createdAt: "2024-04-01T10:00:00.000Z",
      }),
      score: 91,
      tier: "safe",
      flags: [],
      flaggedIngredients: [],
      alternatives: [],
      petFlags: [],
    },
  },
  {
    id: "hist-004",
    scannedAt: hoursAgo(4),
    result: {
      product: catalogProduct({
        id: "prod-cerave-lotion",
        barcode: "036000123456",
        name: "Moisturizing Lotion",
        brand: "CeraVe",
        category: "cosmetic",
        imageUrl: "https://via.placeholder.com/150",
        ingredients: [
          "Purified water",
          "Glycerin",
          "Petrolatum",
          "Ceramide NP",
          "Fragrance",
        ],
        metadata: {},
        sourceDb: "open_beauty_facts",
        createdAt: "2024-05-01T10:00:00.000Z",
      }),
      score: 68,
      tier: "caution",
      flags: ["Fragrance flagged for your profile"],
      flaggedIngredients: [
        {
          name: "Fragrance",
          tier: "caution",
          reason: "Unspecified fragrance mix — may not suit sensitive profiles",
        },
      ],
      alternatives: [],
      petFlags: [],
    },
  },
  {
    id: "hist-002",
    scannedAt: hoursAgo(26),
    result: {
      product: catalogProduct({
        id: "prod-method-cleaner",
        barcode: "081370002345",
        name: "All-Purpose Cleaner — French Lavender",
        brand: "Method",
        category: "household",
        imageUrl: "https://via.placeholder.com/150",
        ingredients: ["Water", "Decyl glucoside", "Fragrance"],
        metadata: {},
        sourceDb: "community",
        createdAt: "2024-03-10T10:00:00.000Z",
      }),
      score: 48,
      tier: "caution",
      flags: ["Contains fragrance — may not suit sensitive skin profiles"],
      flaggedIngredients: [
        {
          name: "Fragrance",
          tier: "caution",
          reason: "Unspecified fragrance mix — harder to rule out sensitivities for your profile",
        },
      ],
      alternatives: [],
      petFlags: [
        {
          petId: "pet-luna",
          petName: "Luna",
          species: "cat",
          tier: "avoid",
          reason: "May not be safe for cats when used on surfaces they walk on.",
        },
      ],
    },
  },
];
