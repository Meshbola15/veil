import { useCallback, useRef, useState } from "react";
import type { BarcodeDetection } from "@/lib/scanner/barcode";
import BarcodeScannerEngine from "@/components/scanner/BarcodeScannerEngine";
import ScannerViewfinder from "@/components/scanner/ScannerViewfinder";
import ScannerControls from "@/components/scanner/ScannerControls";

type Props = {
  onBarcodeDetected: (detection: BarcodeDetection) => void;
  onClose?: () => void;
  /** Blocks new barcode callbacks; camera video keeps playing */
  detectionPaused?: boolean;
  /** Bumped when the result sheet dismisses so scanning can resume immediately */
  scanSession?: number;
  soundMuted: boolean;
  onSoundMuted: (muted: boolean) => void;
};

const DETECTED_FLASH_MS = 450;

function Camera({
  onBarcodeDetected,
  detectionPaused = false,
  scanSession = 0,
  soundMuted,
  onSoundMuted,
}: Props) {
  const onDetectedRef = useRef(onBarcodeDetected);
  onDetectedRef.current = onBarcodeDetected;

  const [detectedFlash, setDetectedFlash] = useState(false);

  const handleDetection = useCallback((value: BarcodeDetection) => {
    setDetectedFlash(true);
    window.setTimeout(() => setDetectedFlash(false), DETECTED_FLASH_MS);
    onDetectedRef.current(value);
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-black select-none">
      <BarcodeScannerEngine
        onBarcodeDetected={handleDetection}
        detectionPaused={detectionPaused}
        scanSession={scanSession}
      >
        <ScannerViewfinder
          detectionPaused={detectionPaused}
          detectedFlash={detectedFlash}
        />
        <ScannerControls
          soundMuted={soundMuted}
          onSoundMuted={onSoundMuted}
        />
      </BarcodeScannerEngine>
    </div>
  );
}

export default Camera;
