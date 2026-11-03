import { memo, useCallback, useEffect, useState } from "react";
import {
  HiOutlineSpeakerWave,
  HiOutlineSpeakerXMark,
} from "react-icons/hi2";
import { Torch } from "@capawesome/capacitor-torch";
import { useScannerRuntime } from "@/components/scanner/ScannerRuntimeContext";
import { cn } from "@/lib/utils";
import { FlashlightOffIcon, FlashlightOnIcon } from "@/lib/icons";

type Props = {
  soundMuted: boolean;
  onSoundMuted: (muted: boolean) => void;
};

function ScannerControls({ soundMuted, onSoundMuted }: Props) {
  const { ready } = useScannerRuntime();
  const [flashOn, setFlashOn] = useState(false);

  useEffect(() => {
    return () => {
      void Torch.disable().catch(() => undefined);
    };
  }, []);

  const toggleFlash = useCallback(async () => {
    const next = !flashOn;
    try {
      if (next) {
        await Torch.enable();
      } else {
        await Torch.disable();
      }
      setFlashOn(next);
    } catch {
      /* flash unavailable */
    }
  }, [flashOn]);

  return (
    <div className="safe-top pointer-events-auto absolute left-0 right-0 top-4 z-40 flex items-center justify-between px-5 pb-3 pt-3">
      <button
        type="button"
        onClick={() => void toggleFlash()}
        disabled={!ready}
        className={cn(
          "touch-target flex size-10 items-center justify-center rounded-full",
          flashOn ? "bg-white text-black" : "bg-black/40 text-white",
        )}
        aria-label={flashOn ? "Turn flash off" : "Turn flash on"}
        aria-pressed={flashOn}
      >
        {flashOn ? (
          <FlashlightOnIcon className="size-5" />
        ) : (
          <FlashlightOffIcon className="size-5" />
        )}
      </button>

      <button
        type="button"
        onClick={() => onSoundMuted(!soundMuted)}
        className={cn(
          "touch-target flex size-10 items-center justify-center rounded-full",
          soundMuted ? "bg-black/40 text-white" : "bg-white text-black",
        )}
        aria-label={soundMuted ? "Unmute scan sounds" : "Mute scan sounds"}
        aria-pressed={soundMuted}
      >
        {soundMuted ? (
          <HiOutlineSpeakerXMark className="size-5" strokeWidth={1.75} />
        ) : (
          <HiOutlineSpeakerWave className="size-5" strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}

export default memo(ScannerControls);
