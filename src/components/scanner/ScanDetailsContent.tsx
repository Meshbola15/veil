import type { BarcodeDetection } from "@/lib/scanner/barcode";
import { ScanResultsCarousel } from "@/components/scanner/ScanResultsCarousel";
import type { ScanResult } from "@/types";

interface ScanDetailsContentProps {
  detection: BarcodeDetection;
  scanResults: ScanResult[];
  expanded: boolean;
  onScanAgain: () => void;
  onAddProduct?: () => void;
}

export function ScanDetailsContent({
  scanResults,
  expanded,
  onAddProduct,
}: ScanDetailsContentProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col safe-bottom">
      <ScanResultsCarousel
        scanResults={scanResults}
        expanded={expanded}
        onAddProduct={onAddProduct}
      />
    </div>
  );
}
