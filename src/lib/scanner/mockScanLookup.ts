import { MOCK_SCAN_HISTORY } from "@/lib/fixtures/scanHistory";
import type { ScanResult } from "@/types";

/** All catalog matches for a barcode (duplicate barcodes = multiple products). */
export function mockResultsForBarcode(barcode: string): ScanResult[] {
  const matches = MOCK_SCAN_HISTORY.filter(
    (entry) => entry.result.product.barcode === barcode,
  ).map((entry) => entry.result);

  if (matches.length > 0) return matches;

  return [MOCK_SCAN_HISTORY[0]!.result];
}
