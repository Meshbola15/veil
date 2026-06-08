import type { BarcodeDetection } from "@/lib/scanner/barcode";
import type { ScanResult } from "@/types";
import { HiOutlineXMark } from "react-icons/hi2";
import { TbBarcode } from "react-icons/tb";

interface BarcodeResultModalProps {
  open: boolean;
  detection: BarcodeDetection | null;
  scanResult?: ScanResult | null;
  onClose: () => void;
  onScanAgain: () => void;
}

export function BarcodeResultModal({
  open,
  detection,
  scanResult = null,
  onClose,
  onScanAgain,
}: BarcodeResultModalProps) {
  if (!open || !detection) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/50 px-4 pb-6 pt-12 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="barcode-result-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-card bg-surface p-5 shadow-modal safe-bottom">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background text-text-secondary active:opacity-70"
        >
          <HiOutlineXMark size={20} />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-background">
          <TbBarcode size={26} className="text-text-primary" />
        </div>

        <h2
          id="barcode-result-title"
          className="font-bricolage text-xl font-semibold text-text-primary"
        >
          Barcode detected
        </h2>
        <p className="mt-1 font-inter text-sm text-text-secondary">
          {scanResult
            ? `${scanResult.product.brand} · ${scanResult.product.name}`
            : "Product lookup will use this code next."}
        </p>

        <dl className="mt-5 space-y-3">
          {scanResult && (
            <div>
              <dt className="font-inter text-xs font-medium uppercase tracking-wide text-text-secondary">
                Your score
              </dt>
              <dd className="mt-1 font-bricolage text-2xl font-semibold text-text-primary">
                {scanResult.score}
              </dd>
            </div>
          )}
          <div>
            <dt className="font-inter text-xs font-medium uppercase tracking-wide text-text-secondary">
              Barcode
            </dt>
            <dd className="mt-1 break-all font-inter text-base font-medium text-text-primary">
              {detection.value}
            </dd>
          </div>
          <div>
            <dt className="font-inter text-xs font-medium uppercase tracking-wide text-text-secondary">
              Symbology
            </dt>
            <dd className="mt-1 font-inter text-sm text-text-primary">{detection.format}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onScanAgain}
            className="touch-target w-full rounded-chip bg-accent py-3.5 font-inter text-base font-semibold text-white active:scale-[0.98]"
          >
            Scan again
          </button>
          <button
            type="button"
            onClick={onClose}
            className="touch-target w-full py-3 font-inter text-sm font-medium text-text-secondary active:text-text-primary"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
