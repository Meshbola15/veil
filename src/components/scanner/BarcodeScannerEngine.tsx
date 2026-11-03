import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Html5Qrcode } from "html5-qrcode";
import type { BarcodeDetection } from "@/lib/scanner/barcode";
import { useLatest } from "@/hooks/useLatest";
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
 * Minimum gap between accepted detections so a single barcode held in frame
 * isn't reported on every camera frame. Detection keeps running continuously,
 * even while a result is already on screen.
 */
const DETECTION_COOLDOWN_MS = 1000;

/** Stop every media track attached to a <video> inside `root`. */
function releaseVideoStreams(root: HTMLElement | null): void {
  root?.querySelectorAll("video").forEach((video) => {
    const stream = video.srcObject;
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    video.srcObject = null;
  });
}

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
  const regionRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  /**
   * Bumped by every stop. A queued start whose generation is no longer
   * current (unmounted / retried before it ran) is skipped entirely.
   */
  const generationRef = useRef(0);
  /**
   * Start/stop are serialised through this queue. `scanner.start()` is async
   * (camera permission + stream negotiation) and html5-qrcode cannot be
   * stopped mid-start, so overlapping calls used to leak live camera streams
   * when the screen was left quickly. Each op waits for the previous one.
   */
  const opQueueRef = useRef<Promise<void>>(Promise.resolve());
  const pausedRef = useLatest(detectionPaused);
  const lastAcceptedAtRef = useRef(0);
  const onDetectedRef = useLatest(onBarcodeDetected);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-arm immediately when a new scan session begins (e.g. result dismissed).
  useEffect(() => {
    lastAcceptedAtRef.current = 0;
  }, [scanSession]);

  const fitCameraToScreen = useCallback(() => {
    fitScannerRegionToScreen(regionId);
  }, [regionId]);

  const enqueue = useCallback((op: () => Promise<void>) => {
    const next = opQueueRef.current.then(op, op);
    opQueueRef.current = next.catch(() => undefined);
    return next;
  }, []);

  const disposeScanner = useCallback(async (scanner: Html5Qrcode) => {
    // Always attempt stop(): `isScanning` only flips on the first rendered
    // frame, so checking it skipped stops that landed just before that.
    try {
      await scanner.stop();
    } catch {
      /* not running */
    }
    // Backstop: html5-qrcode drops its stream handle if start fails after the
    // camera was acquired. Stop anything still attached to our <video>s.
    releaseVideoStreams(regionRef.current);
    try {
      scanner.clear();
    } catch {
      /* already cleared */
    }
  }, []);

  const stopScanner = useCallback(() => {
    generationRef.current += 1;
    return enqueue(async () => {
      const scanner = scannerRef.current;
      scannerRef.current = null;
      if (scanner) await disposeScanner(scanner);
      releaseVideoStreams(regionRef.current);
    });
  }, [disposeScanner, enqueue]);

  const startScanner = useCallback(() => {
    const generation = generationRef.current;
    const isStale = () => generation !== generationRef.current;

    return enqueue(async () => {
      if (isStale()) return;

      let scanner: Html5Qrcode | null = null;
      try {
        scanner = new Html5Qrcode(regionId, {
          verbose: false,
          formatsToSupport: SCANNER_FORMATS,
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true,
          },
        });
        scannerRef.current = scanner;

        const cameraId = await pickRearCameraId();
        if (isStale()) return; // the queued stop will dispose it

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
            if (pausedRef.current) return;
            const now = Date.now();
            if (now - lastAcceptedAtRef.current < DETECTION_COOLDOWN_MS) return;
            lastAcceptedAtRef.current = now;
            const formatCode = result.result.format?.format;
            onDetectedRef.current(mapHtml5Detection(text, formatCode));
          },
          () => {
            /* no barcode in frame */
          },
        );

        if (isStale()) return; // the queued stop will dispose it

        fitCameraToScreen();
        requestAnimationFrame(fitCameraToScreen);
        setReady(true);
      } catch {
        if (scanner && scannerRef.current === scanner) {
          scannerRef.current = null;
          await disposeScanner(scanner);
        }
        if (!isStale()) setError("Camera unavailable on this device.");
      }
    });
  }, [
    regionId,
    fitCameraToScreen,
    disposeScanner,
    enqueue,
    pausedRef,
    onDetectedRef,
  ]);

  useEffect(() => {
    // Subscribe to the camera (external system) for the life of the screen.
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

  // Stable context value: consumers only re-render when ready/error change.
  const runtime = useMemo<ScannerRuntimeValue>(
    () => ({
      ready,
      error,
      retry: () => {
        setError(null);
        setReady(false);
        void stopScanner();
        void startScanner();
      },
    }),
    [ready, error, stopScanner, startScanner],
  );

  return (
    <ScannerRuntimeContext.Provider value={runtime}>
      <div ref={regionRef} id={regionId} className="barcode-scanner-region" />

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
