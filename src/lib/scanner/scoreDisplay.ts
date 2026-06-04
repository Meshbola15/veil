import type { ScoreTier } from "@/types";

/** Compact label on scan result peek card */
export const SCAN_PEEK_TIER_LABELS: Record<ScoreTier, string> = {
  safe: "Excellent",
  caution: "Average",
  avoid: "Poor",
};

export const SCAN_SHEET_TIER_LABELS: Record<ScoreTier, string> = {
  safe: "Good",
  caution: "Fair",
  avoid: "Poor",
};

export const SCORE_TIER_COLORS: Record<ScoreTier, string> = {
  safe: "var(--color-score-safe)",
  caution: "var(--color-score-caution)",
  avoid: "var(--color-score-avoid)",
};
