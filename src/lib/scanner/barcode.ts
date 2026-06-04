import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerTypeHint,
  CapacitorBarcodeScannerTypeHintALLOption,
  type CapacitorBarcodeScannerScanResult,
} from "@capacitor/barcode-scanner";

export type BarcodeDetection = {
  value: string;
  format: string;
  formatCode: number;
};

const FORMAT_LABELS: Record<number, string> = {
  [CapacitorBarcodeScannerTypeHintALLOption.ALL]: "All formats",
  0: "QR Code",
  1: "AZTEC",
  2: "CODABAR",
  3: "CODE 39",
  4: "CODE 93",
  5: "CODE 128",
  6: "DATA MATRIX",
  7: "MAXICODE",
  8: "ITF",
  9: "EAN-13",
  10: "EAN-8",
  11: "PDF 417",
  12: "RSS-14",
  13: "RSS Expanded",
  14: "UPC-A",
  15: "UPC-E",
  16: "UPC/EAN extension",
};

export function formatBarcodeLabel(formatCode: number): string {
  return FORMAT_LABELS[formatCode] ?? `Format ${formatCode}`;
}

export function mapCapacitorScanResult(
  result: CapacitorBarcodeScannerScanResult,
): BarcodeDetection {
  return {
    value: result.ScanResult,
    format: formatBarcodeLabel(result.format),
    formatCode: result.format,
  };
}

/** One-shot scan using the official Capacitor barcode scanner UI (native + web dialog). */
export async function scanWithCapacitorScanner(): Promise<BarcodeDetection | null> {
  try {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL,
      cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
      scanInstructions: "Point your camera at a barcode",
    });
    return mapCapacitorScanResult(result);
  } catch {
    return null;
  }
}
