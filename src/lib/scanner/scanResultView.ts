import type { CatalogProduct, ProductSummary, ScanResult, ScanResultView } from "@/types";

function catalogToSummary(product: CatalogProduct, score: number, tier: ScanResult["tier"]): ProductSummary {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    imageUrl: product.imageUrl,
    score,
    tier,
    ingredients: product.ingredients,
  };
}

/** Flatten API scan result for product detail UI. */
export function scanResultToView(result: ScanResult): ScanResultView {
  const { product, score, tier, flags, flaggedIngredients, alternatives, petFlags } =
    result;

  return {
    ...catalogToSummary(product, score, tier),
    flags,
    ingredients: product.ingredients,
    flaggedIngredients: flaggedIngredients.map((ref, index) => ({
      id: `flag-${product.id}-${index}`,
      name: ref.name,
    })),
    alternatives: alternatives.map((alt) =>
      catalogToSummary(alt, score, tier),
    ),
    petFlags,
  };
}
