import { ProfileStepHeader } from "@/components/onboarding/profile/ProfileStepHeader";
import type { Gender } from "@/types/onboarding";
import { GENDER_OPTIONS } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface ProfileGenderStepProps {
  gender: Gender | "";
  onSelect: (gender: Gender) => void;
}

export function ProfileGenderStep({ gender, onSelect }: ProfileGenderStepProps) {
  return (
    <div>
      <ProfileStepHeader
        title="How do you identify?"
        subtitle="Optional — used only to personalize your profile."
      />
      <div className="flex flex-col gap-2">
        {GENDER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={cn(
              "w-full rounded-input px-4 py-3.5 text-left font-inter text-sm font-medium transition-colors",
              gender === value
                ? "bg-accent text-white"
                : "bg-surface text-text-primary shadow-sm active:bg-background",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
