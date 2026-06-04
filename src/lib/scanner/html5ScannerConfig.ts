import { Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import {
  type BarcodeDetection,
  formatBarcodeLabel,
} from "@/lib/scanner/barcode";
import { CapacitorBarcodeScannerTypeHintALLOption } from "@capacitor/barcode-scanner";

export const SCANNER_FPS = 15;
export const MIN_QR_BOX = 50;

export const SCANNER_FORMATS = [
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.QR_CODE,
];

export function mapHtml5Detection(
  decodedText: string,
  formatCode?: number,
): BarcodeDetection {
  const code = formatCode ?? CapacitorBarcodeScannerTypeHintALLOption.ALL;
  return {
    value: decodedText,
    format: formatBarcodeLabel(code),
    formatCode: code,
  };
}

export function getViewfinderQrBox(viewWidth: number, viewHeight: number) {
  const width = Math.floor(Math.min(viewWidth * 0.82, 320));
  const height = Math.floor(Math.min(viewHeight * 0.22, 168));
  return {
    width: Math.max(width, MIN_QR_BOX),
    height: Math.max(height, MIN_QR_BOX),
  };
}

export async function pickRearCameraId(): Promise<string | { facingMode: string }> {
  try {
    const cameras = await Html5Qrcode.getCameras();
    if (cameras.length === 0) {
      return { facingMode: "environment" };
    }

    const rearCamera = cameras.find((camera) =>
      /back|rear|environment|trás|arrière/i.test(camera.label),
    );

    return rearCamera?.id ?? cameras[cameras.length - 1]!.id;
  } catch {
    return { facingMode: "environment" };
  }
}

export function fitScannerRegionToScreen(regionId: string): void {
  const root = document.getElementById(regionId);
  if (!root) return;

  root.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;overflow:hidden;";

  root.querySelectorAll("div").forEach((el) => {
    if (el === root) return;
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.position = "absolute";
    el.style.inset = "0";
    el.style.overflow = "hidden";
  });

  const video = root.querySelector("video");
  if (video) {
    video.style.position = "absolute";
    video.style.inset = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.maxWidth = "none";
    video.style.objectFit = "cover";
    video.style.objectPosition = "center";
  }
}
