import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SocialAuthButtonProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "google" | "apple";
}

export function SocialAuthButton({
  label,
  icon,
  onClick,
  disabled = false,
  variant = "google",
}: SocialAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "touch-target flex w-full items-center justify-center gap-3 rounded-chip px-5 py-4 font-inter text-base font-semibold transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "apple"
          ? "bg-accent text-white"
          : "bg-surface text-text-primary shadow-card",
      )}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
      {label}
    </button>
  );
}
