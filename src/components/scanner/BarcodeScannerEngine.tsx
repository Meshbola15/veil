import {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Html5Qrcode } from "html5-qrcode";
import type { BarcodeDetection } from "@/lib/scanner/barcode";
import {
  SCANNER_FPS,
  SCANNER_FORMATS,
  fitScannerRegionToScreen,
  getViewfinderQrBox,
  mapHtml5Detection,
  pickRearCameraId,
} from "@/lib/scanner/html5ScannerConfig";
import {
  ScannerRuntimeContext,
  type ScannerRuntimeValue,
} from "@/components/scanner/ScannerRuntimeContext";

type Props = {
  onBarcodeDetected: (detection: BarcodeDetection) => void;
  detectionPaused?: boolean;
  scanSession?: number;
  children?: ReactNode;
};

/**
 * Owns the Html5Qrcode lifecycle only. UI state (flash, sound, overlays)
 * lives in sibling components so scanner start/stop is not retriggered.
 */
function BarcodeScannerEngine({
  onBarcodeDetected,
  detectionPaused = false,
  scanSession = 0,
  children,
}: Props) {
  const regionId = useId().replace(/:/g, "");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const pausedRef = useRef(detectionPaused);
  const handlingRef = useRef(false);
  const onDetectedRef = useRef(onBarcodeDetected);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  pausedRef.current = detectionPaused;
  onDetectedRef.current = onBarcodeDetected;

  if (!detectionPaused) {
    handlingRef.current = false;
  }

  useEffect(() => {
    handlingRef.current = false;
  }, [scanSession, detectionPaused]);

  const fitCameraToScreen = useCallback(() => {
    fitScannerRegionToScreen(regionId);
  }, [regionId]);

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current;
    scannerRef.current = null;
    if (!scanner) return;
    try {
      if (scanner.isScanning) await scanner.stop();
      scanner.clear();
    } catch {
      /* already stopped */
    }
  }, []);

  const startScanner = useCallback(async () => {
    setError(null);
    setReady(false);

    try {
      const scanner = new Html5Qrcode(regionId, {
        verbose: false,
        formatsToSupport: SCANNER_FORMATS,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
      });
      scannerRef.current = scanner;

      const cameraId = await pickRearCameraId();

      await scanner.start(
        cameraId,
        {
          fps: SCANNER_FPS,
          qrbox: (viewWidth, viewHeight) =>
            getViewfinderQrBox(viewWidth, viewHeight),
          disableFlip: false,
          videoConstraints: {
            facingMode: { ideal: "environment" },
            width: { min: 640, ideal: 1280 },
            height: { min: 480, ideal: 720 },
          },
        },
        (text, result) => {
          if (pausedRef.current || handlingRef.current) return;
          handlingRef.current = true;
          const formatCode = result.result.format?.format;
          onDetectedRef.current(mapHtml5Detection(text, formatCode));
        },
        () => {
          /* no barcode in frame */
        },
      );

      fitCameraToScreen();
      requestAnimationFrame(fitCameraToScreen);
      setReady(true);
    } catch {
      setError("Camera unavailable on this device.");
    }
  }, [regionId, fitCameraToScreen]);

  useEffect(() => {
    void startScanner();
    return () => {
      void stopScanner();
    };
  }, [startScanner, stopScanner]);

  useEffect(() => {
    if (!ready) return;

    fitCameraToScreen();
    const root = document.getElementById(regionId);
    const video = root?.querySelector("video");
    video?.addEventListener("loadedmetadata", fitCameraToScreen);

    window.addEventListener("resize", fitCameraToScreen);
    return () => {
      video?.removeEventListener("loadedmetadata", fitCameraToScreen);
      window.removeEventListener("resize", fitCameraToScreen);
    };
  }, [ready, regionId, fitCameraToScreen]);

  const runtime: ScannerRuntimeValue = {
    ready,
    error,
    retry: () => {
      void stopScanner().then(() => startScanner());
    },
  };

  return (
    <ScannerRuntimeContext.Provider value={runtime}>
      <div id={regionId} className="barcode-scanner-region" />

      {!ready && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <div
            className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-white"
            aria-label="Starting camera"
          />
        </div>
      )}

      {error && (
        <div className="absolute inset-x-0 top-1/2 z-30 mx-auto w-full max-w-xs -translate-y-1/2 px-6 text-center">
          <p className="font-inter text-sm text-white/90">{error}</p>
          <button
            type="button"
            onClick={() => runtime.retry()}
            className="mt-3 font-inter text-sm font-semibold text-white underline"
          >
            Retry camera
          </button>
        </div>
      )}

      {children}
    </ScannerRuntimeContext.Provider>
  );
}

export default memo(BarcodeScannerEngine);
