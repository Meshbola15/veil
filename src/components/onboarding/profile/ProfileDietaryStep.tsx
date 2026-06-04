import { ProfileStepHeader } from "@/components/onboarding/profile/ProfileStepHeader";
import { DIETARY_OPTIONS } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface ProfileDietaryStepProps {
  selected: string[];
  onToggle: (pref: string) => void;
}

export function ProfileDietaryStep({ selected, onToggle }: ProfileDietaryStepProps) {
  return (
    <div>
      <ProfileStepHeader
        title="How do you eat?"
        subtitle="We'll factor dietary preferences into your scores."
      />
      <div className="flex flex-wrap gap-2">
        {DIETARY_OPTIONS.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={cn(
                "chip px-3 py-2.5 text-sm transition-colors",
                isSelected
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary shadow-sm active:bg-background",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
