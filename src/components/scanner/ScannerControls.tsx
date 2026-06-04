import { memo, useCallback, useEffect, useState } from "react";
import {
  HiBolt,
  HiOutlineBolt,
  HiOutlineSpeakerWave,
  HiOutlineSpeakerXMark,
} from "react-icons/hi2";
import { Torch } from "@capawesome/capacitor-torch";
import { useScannerRuntime } from "@/components/scanner/ScannerRuntimeContext";

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
    <div className="safe-top pointer-events-auto absolute left-0 right-0 top-10 z-40 flex items-center justify-between px-5 pb-3 pt-3">
      <button
        type="button"
        onClick={() => void toggleFlash()}
        disabled={!ready}
        className="touch-target flex size-10 items-center justify-center text-white disabled:opacity-40"
        aria-label={flashOn ? "Turn flash off" : "Turn flash on"}
        aria-pressed={flashOn}
      >
        {flashOn ? (
          <HiBolt size={26} strokeWidth={1.75} />
        ) : (
          <HiOutlineBolt size={26} strokeWidth={1.75} />
        )}
      </button>

      <button
        type="button"
        onClick={() => onSoundMuted(!soundMuted)}
        className="touch-target flex size-10 items-center justify-center text-white"
        aria-label={soundMuted ? "Unmute scan sounds" : "Mute scan sounds"}
        aria-pressed={soundMuted}
      >
        {soundMuted ? (
          <HiOutlineSpeakerXMark size={26} strokeWidth={1.75} />
        ) : (
          <HiOutlineSpeakerWave size={26} strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}

export default memo(ScannerControls);
