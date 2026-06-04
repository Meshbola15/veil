/** Non-standard torch constraints supported on some mobile browsers. */
type TorchMediaTrackConstraints = MediaTrackConstraints & {
  torch?: boolean;
  fillLightMode?: "auto" | "off" | "flash";
  advanced?: Array<
    MediaTrackConstraintSet & {
      torch?: boolean;
      fillLightMode?: "auto" | "off" | "flash";
    }
  >;
};

/** Toggle device torch / flash on a live camera track (Android + newer iOS WebViews). */
export async function setVideoTrackTorch(
  track: MediaStreamTrack,
  enabled: boolean,
): Promise<boolean> {
  const attempts: TorchMediaTrackConstraints[] = [
    { advanced: [{ torch: enabled }] },
    { torch: enabled },
    { fillLightMode: enabled ? "flash" : "off" },
  ];

  for (const constraints of attempts) {
    try {
      await track.applyConstraints(constraints);
      return true;
    } catch {
      /* try next constraint shape */
    }
  }

  return false;
}

export function isTorchLikelySupported(track: MediaStreamTrack | null): boolean {
  if (!track?.getCapabilities) return false;

  const capabilities = track.getCapabilities() as MediaTrackCapabilities & {
    torch?: boolean;
    fillLightMode?: string[];
  };

  return "torch" in capabilities || "fillLightMode" in capabilities;
}

export function getVideoTrackFromElement(
  root: HTMLElement | null,
): MediaStreamTrack | null {
  const video = root?.querySelector("video");
  const stream = video?.srcObject;
  if (!(stream instanceof MediaStream)) return null;
  return stream.getVideoTracks()[0] ?? null;
}
