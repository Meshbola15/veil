import { ChevronBackIcon } from "@/lib/icons";

interface OnboardingHeaderProps {
  onBack?: () => void;
  showBack?: boolean;
}

export function OnboardingHeader({ onBack, showBack = false }: OnboardingHeaderProps) {
  if (!showBack || !onBack) {
    return null;
  }

  return (
    <div className="flex items-center justify-start">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="touch-target flex size-10 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-sm backdrop-blur-sm"
      >
        <ChevronBackIcon size={20} className="text-white" />
      </button>
    </div>
  );
}
