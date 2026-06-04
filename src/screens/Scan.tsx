import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "@/components/scanner/camera";
import { ScanResultSheet } from "@/components/scanner/ScanResultSheet";
import type { BarcodeDetection } from "@/lib/scanner/barcode";
import { mockResultsForBarcode } from "@/lib/scanner/mockScanLookup";
import { useScanStore } from "@/stores/useScanStore";
import type { ScanResult } from "@/types";
import DashboardNavigation from "@/components/common/DashboardNavigation";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import beep from "@/assets/audio/beep.mp3";

export default function ScanPage() {
  const navigate = useNavigate();
  const setCurrentResult = useScanStore((s) => s.setCurrentResult);
  const addToHistory = useScanStore((s) => s.addToHistory);

  const [detection, setDetection] = useState<BarcodeDetection | null>(null);
  const [scanResults, setScanResults] = useState<ScanResult[] | null>(null);
  const [scanSession, setScanSession] = useState(0);
  const [soundMuted, setSoundMuted] = useState(true);

  const isSheetVisible = Boolean(detection && scanResults && scanResults.length > 0);

  const handleBarcodeDetected = useCallback(
    (result: BarcodeDetection) => {
      const matches = mockResultsForBarcode(result.value);
      const primary = matches[0]!;
      setDetection(result);
      setScanResults(matches);
      setCurrentResult(primary);
      addToHistory(primary);
      void Haptics.impact({ style: ImpactStyle.Medium });
      if (!soundMuted) {
        void new Audio(beep).play().catch(() => undefined);
      }
    },
    [addToHistory, setCurrentResult, soundMuted],
  );

  const handleDismissResult = () => {
    setDetection(null);
    setScanResults(null);
    setCurrentResult(null);
    setScanSession((n) => n + 1);
  };

  const handleAddProduct = useCallback(() => {
    // TODO: navigate to community product submission flow
  }, []);

  const handleClose = () => {
    handleDismissResult();
    navigate(-1);
  };

  return (
    <div className="mobile-screen relative h-dvh overflow-hidden bg-black">
      <Camera
        detectionPaused={isSheetVisible}
        scanSession={scanSession}
        onBarcodeDetected={handleBarcodeDetected}
        onClose={handleClose}
        soundMuted={soundMuted}
        onSoundMuted={setSoundMuted}
      />

      {isSheetVisible && detection && scanResults && (
        <ScanResultSheet
          open={isSheetVisible}
          detection={detection}
          scanResults={scanResults}
          onDismiss={handleDismissResult}
          onScanAgain={handleDismissResult}
          onAddProduct={handleAddProduct}
        />
      )}

      <DashboardNavigation />
    </div>
  );
}
