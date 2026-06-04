import { Capacitor } from "@capacitor/core";

export type PhotoCaptureSource = "camera" | "gallery";

function pickImageFromFileInput(
  accept: string,
  capture?: "environment" | "user",
): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    if (capture) input.setAttribute("capture", capture);

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () =>
        resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    };

    input.click();
  });
}

export async function capturePhoto(
  source: PhotoCaptureSource,
): Promise<string | null> {
  if (Capacitor.isNativePlatform()) {
    const { Camera, CameraResultType, CameraSource } =
      await import("@capacitor/camera");
    const cameraSource =
      source === "camera" ? CameraSource.Camera : CameraSource.Photos;

    try {
      const photo = await Camera.getPhoto({
        quality: 88,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: cameraSource,
        promptLabelHeader: "Scan ingredients",
        promptLabelPhoto: "From gallery",
        promptLabelPicture: "Take photo",
      });
      return photo.dataUrl ?? null;
    } catch {
      return null;
    }
  }

  return pickImageFromFileInput(
    "image/*",
    source === "camera" ? "environment" : undefined,
  );
}
