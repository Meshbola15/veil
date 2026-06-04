import { ProfileStepHeader } from "@/components/onboarding/profile/ProfileStepHeader";
import type { AgeGroup } from "@/types/onboarding";
import { AGE_GROUP_OPTIONS } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface ProfileAgeGroupStepProps {
  ageGroup: AgeGroup | "";
  onSelect: (ageGroup: AgeGroup) => void;
}

export function ProfileAgeGroupStep({ ageGroup, onSelect }: ProfileAgeGroupStepProps) {
  return (
    <div>
      <ProfileStepHeader
        title="What's your age group?"
        subtitle="This helps us tailor scores and guidance for you."
      />
      <div className="flex flex-wrap gap-2">
        {AGE_GROUP_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={cn(
              "chip px-4 py-2.5 text-sm transition-colors",
              ageGroup === value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary shadow-sm active:bg-background",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
