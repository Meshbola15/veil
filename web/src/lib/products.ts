import type { HouseholdMember, Product, Tier } from "../types";

export const demoProducts: Product[] = [
  {
    id: "mixed-vegetables",
    barcode: "0078742118405",
    name: "Unsalted Mixed Vegetables",
    brand: "Green Table",
    category: "food",
    imageEmoji: "🥕",
    ingredients: ["Carrots", "Green beans", "Sweetcorn", "Peas"],
    baseScore: 92,
    flags: [],
    metadata: { serving: "1 cup", energy: "70 kcal", fibre: "5 g" },
  },
  {
    id: "sandwich-cookies",
    barcode: "044000032221",
    name: "Original Sandwich Cookies",
    brand: "Oreo",
    category: "food",
    imageEmoji: "🍪",
    ingredients: ["Wheat flour", "Sugar", "Palm oil", "Cocoa", "Soya lecithin", "Salt"],
    baseScore: 64,
    flags: [
      { key: "gluten", ingredient: "Wheat flour", tier: "avoid", reason: "Contains gluten and may not suit your profile." },
      { key: "soy", ingredient: "Soya lecithin", tier: "caution", reason: "Contains soy, which you asked Veil to watch." },
    ],
    metadata: { serving: "3 cookies", energy: "160 kcal", sugar: "14 g" },
  },
  {
    id: "peanut-butter",
    barcode: "051500255162",
    name: "Creamy Peanut Butter",
    brand: "Jif",
    category: "food",
    imageEmoji: "🥜",
    ingredients: ["Roasted peanuts", "Sugar", "Molasses", "Vegetable oils", "Salt"],
    baseScore: 78,
    flags: [
      { key: "peanut", ingredient: "Roasted peanuts", tier: "avoid", reason: "Peanuts are the primary ingredient and are flagged for your allergy." },
    ],
    metadata: { serving: "2 tbsp", energy: "190 kcal", protein: "7 g" },
  },
  {
    id: "yoghurt",
    barcode: "5000159461122",
    name: "Greek Style Natural Yoghurt",
    brand: "Everyday",
    category: "food",
    imageEmoji: "🥣",
    ingredients: ["Whole milk", "Live yoghurt cultures"],
    baseScore: 84,
    flags: [
      { key: "dairy", ingredient: "Whole milk", tier: "avoid", reason: "Contains dairy and may not suit your profile." },
    ],
    metadata: { serving: "150 g", energy: "112 kcal", protein: "6.4 g" },
  },
  {
    id: "surface-cleaner",
    barcode: "5011417565207",
    name: "Multi-Surface Cleaner",
    brand: "Fresh Home",
    category: "household",
    imageEmoji: "🧴",
    ingredients: ["Water", "Non-ionic surfactants", "Limonene", "Eucalyptus oil", "Fragrance"],
    baseScore: 58,
    flags: [
      { key: "cat-essential-oils", ingredient: "Eucalyptus oil", tier: "avoid", reason: "Eucalyptus oil can be harmful to cats. If exposed, contact your vet." },
      { key: "bird-fragrance", ingredient: "Fragrance", tier: "caution", reason: "Strong scented products may irritate birds." },
      { key: "fragrance", ingredient: "Fragrance", tier: "caution", reason: "Fragrance is flagged for your sensitivity preference." },
    ],
    metadata: { use: "Hard surfaces", format: "Spray", volume: "500 ml" },
  },
];

export function findProduct(barcode: string, customProducts: Product[] = []) {
  return [...customProducts, ...demoProducts].find((product) => product.barcode === barcode);
}

export function memberFlags(product: Product, member?: HouseholdMember) {
  if (!member) return product.flags;
  const keys = new Set(member.concerns);
  if (member.kind === "cat") keys.add("cat-essential-oils");
  if (member.kind === "bird") keys.add("bird-fragrance");
  return product.flags.filter((flag) => keys.has(flag.key));
}

export function scoreFor(product: Product, member?: HouseholdMember) {
  const flags = memberFlags(product, member);
  const penalty = flags.reduce((sum, flag) => sum + (flag.tier === "avoid" ? 38 : 16), 0);
  return Math.max(0, product.baseScore - penalty);
}

export function tierFor(score: number): Tier {
  if (score >= 75) return "safe";
  if (score >= 40) return "caution";
  return "avoid";
}

export function tierCopy(tier: Tier) {
  return tier === "safe" ? "Great match for you" : tier === "caution" ? "Some things to consider" : "May not suit your profile";
}
