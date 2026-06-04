import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OnboardingOptionPillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
}

export function OnboardingOptionPill({
  label,
  selected,
  onClick,
  icon,
}: OnboardingOptionPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "touch-target flex w-full items-center justify-center gap-3 rounded-full bg-surface px-6 py-4 font-inter text-base font-medium text-text-primary shadow-sm transition-colors",
        selected ? "border-2 border-accent" : "border-2 border-transparent",
      )}
    >
      {icon && <span className="text-lg leading-none">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
