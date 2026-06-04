import { memo } from "react";
import { cn } from "@/lib/utils";
import { useScannerRuntime } from "@/components/scanner/ScannerRuntimeContext";

type Props = {
  detectionPaused?: boolean;
  detectedFlash: boolean;
};

function ScannerViewfinder({
  detectionPaused = false,
  detectedFlash,
}: Props) {
  const { ready } = useScannerRuntime();

  if (!ready) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div
        className={cn(
          "rounded-xl border-2 transition-colors duration-200",
          detectedFlash
            ? "border-score-safe shadow-[0_0_0_9999px_rgba(76,175,80,0.18)]"
            : "border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.42)]",
        )}
        style={{
          width: "min(82vw, 320px)",
          height: "min(22vh, 168px)",
        }}
        aria-hidden
      />
      {!detectionPaused && (
        <p className="absolute bottom-[calc(50%-min(22vh,168px)/2-2.5rem)] font-inter text-xs tracking-wide text-white/80">
          Align barcode within frame
        </p>
      )}
    </div>
  );
}

export default memo(ScannerViewfinder);
