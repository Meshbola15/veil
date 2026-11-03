import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { HiOutlineCamera, HiOutlinePhoto, HiOutlineStop } from "react-icons/hi2";

interface CameraScannerProps {
  onDetected: (barcode: string) => void;
}

const readerId = "veil-web-reader";

export function CameraScanner({ onDetected }: CameraScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "starting" | "live" | "error">("idle");
  const [message, setMessage] = useState("");

  const stop = async () => {
    const scanner = scannerRef.current;
    if (scanner?.isScanning) {
      try { await scanner.stop(); } catch { /* camera already stopped */ }
    }
    setStatus("idle");
  };

  useEffect(() => {
    scannerRef.current = new Html5Qrcode(readerId, {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.CODE_128,
      ],
      verbose: false,
    });
    return () => { void stop(); scannerRef.current?.clear(); };
  }, []);

  const start = async () => {
    setStatus("starting");
    setMessage("");
    try {
      await scannerRef.current?.start(
        { facingMode: "environment" },
        { fps: 12, qrbox: { width: 270, height: 170 }, aspectRatio: 1 },
        (value) => { void stop(); onDetected(value.replace(/\D/g, "")); },
        () => undefined,
      );
      setStatus("live");
    } catch {
      setStatus("error");
      setMessage("Camera access was not available. Allow it in browser settings, choose a photo, or enter the barcode below.");
    }
  };

  const scanPhoto = async (file?: File) => {
    if (!file || !scannerRef.current) return;
    await stop();
    setMessage("");
    try {
      const value = await scannerRef.current.scanFile(file, true);
      onDetected(value.replace(/\D/g, ""));
    } catch {
      setStatus("error");
      setMessage("No barcode was found in that photo. Try a clearer image or enter the digits below.");
    }
  };

  return (
    <div className="relative h-full min-h-[390px] overflow-hidden rounded-[30px] bg-[#111111]">
      <div id={readerId} className="absolute inset-0 size-full overflow-hidden [&_video]:size-full [&_video]:object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-x-10 top-20 h-48">
        <span className="absolute left-0 top-0 size-10 border-l-4 border-t-4 border-white" />
        <span className="absolute right-0 top-0 size-10 border-r-4 border-t-4 border-white" />
        <span className="absolute bottom-0 left-0 size-10 border-b-4 border-l-4 border-white" />
        <span className="absolute bottom-0 right-0 size-10 border-b-4 border-r-4 border-white" />
        {status === "live" ? <span className="absolute inset-x-5 top-1/2 h-0.5 animate-pulse bg-white" /> : null}
      </div>

      {status !== "live" ? (
        <div className="absolute inset-0 grid place-items-center px-8 text-center text-white">
          <div>
            <HiOutlineCamera size={48} className="mx-auto text-white/70" />
            <p className="mt-4 text-base font-semibold">{status === "starting" ? "Starting camera…" : "Scan with your back camera"}</p>
            <p className="mt-1 text-sm leading-6 text-white/60">{message || "Keep the barcode flat and inside the frame."}</p>
            {status !== "starting" ? <button onClick={start} className="mt-5 min-h-12 rounded-full bg-white px-6 text-sm font-semibold text-[#1A1A1A]">Open camera</button> : null}
          </div>
        </div>
      ) : null}

      <div className="absolute inset-x-4 bottom-4 flex justify-center gap-3">
        {status === "live" ? <button onClick={() => void stop()} aria-label="Stop camera" className="grid size-11 place-items-center rounded-full bg-black/60 text-white"><HiOutlineStop size={20} /></button> : null}
        <button onClick={() => fileRef.current?.click()} aria-label="Choose barcode photo" className="grid size-11 place-items-center rounded-full bg-black/60 text-white"><HiOutlinePhoto size={20} /></button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(event) => void scanPhoto(event.target.files?.[0])} />
      </div>
    </div>
  );
}
