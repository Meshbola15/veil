import { useCallback, useEffect, useRef, useState } from "react";
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
import { useLatest } from "@/hooks/useLatest";

export default function ScanPage() {
  const navigate = useNavigate();
  const setCurrentResult = useScanStore((s) => s.setCurrentResult);
  const addToHistory = useScanStore((s) => s.addToHistory);

  const [detection, setDetection] = useState<BarcodeDetection | null>(null);
  const [scanResults, setScanResults] = useState<ScanResult[] | null>(null);
  const [scanSession, setScanSession] = useState(0);
  const [soundMuted, setSoundMuted] = useState(true);

  // Tracks the barcode currently on screen so the same product held in frame
  // doesn't keep re-firing while a different product replaces the result.
  const activeBarcodeRef = useRef<string | null>(null);

  // One preloaded <audio> reused for every scan: no per-scan decode/allocation,
  // so the beep plays without latency.
  const beepRef = useRef<HTMLAudioElement | null>(null);
  const soundMutedRef = useLatest(soundMuted);

  useEffect(() => {
    if (soundMuted || beepRef.current) return;
    const audio = new Audio(beep);
    audio.preload = "auto";
    beepRef.current = audio;
  }, [soundMuted]);

  useEffect(
    () => () => {
      beepRef.current?.pause();
      beepRef.current = null;
    },
    [],
  );

  const isSheetVisible = Boolean(
    detection && scanResults && scanResults.length > 0,
  );

  const handleBarcodeDetected = useCallback(
    (result: BarcodeDetection) => {
      if (activeBarcodeRef.current === result.value) return;
      activeBarcodeRef.current = result.value;
      const matches = mockResultsForBarcode(result.value);
      const primary = matches[0]!;
      setDetection(result);
      setScanResults(matches);
      setCurrentResult(primary);
      addToHistory(primary);
      void Haptics.impact({ style: ImpactStyle.Medium }).catch(() => undefined);
      const audio = beepRef.current;
      if (!soundMutedRef.current && audio) {
        audio.currentTime = 0;
        void audio.play().catch(() => undefined);
      }
    },
    [addToHistory, setCurrentResult, soundMutedRef],
  );

  const handleDismissResult = useCallback(() => {
    activeBarcodeRef.current = null;
    setDetection(null);
    setScanResults(null);
    setCurrentResult(null);
    setScanSession((n) => n + 1);
  }, [setCurrentResult]);

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
        detectionPaused={false}
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
