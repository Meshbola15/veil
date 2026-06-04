import Button from "@/components/common/button";
import { ArrowRightIcon } from "@/lib/icons";

interface OnboardingNextButtonProps {
  onNext: () => void;
  label?: string;
  disabled?: boolean;
  variant?: "primary" | "surface";
}

export function OnboardingNextButton({
  onNext,
  label = "Continue",
  disabled = false,
  variant = "primary",
}: OnboardingNextButtonProps) {
  if (variant === "surface") {
    return (
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="touch-target w-full rounded-full bg-surface/90 py-4 font-inter text-base font-semibold text-text-primary shadow-sm backdrop-blur-sm disabled:opacity-50"
      >
        {label}
      </button>
    );
  }

  return (
    <Button
      onClick={onNext}
      disabled={disabled}
      className="w-full font-inter text-base font-semibold disabled:opacity-50"
    >
      {label}
      <ArrowRightIcon className="h-4 w-4" />
    </Button>
  );
}
