import { OnboardingBodyText } from "@/components/onboarding/OnboardingBodyText";
import { OnboardingStepShell } from "@/components/onboarding/OnboardingStepShell";

const DIETARY_OPTIONS = [
  "Vegan",
  "Vegetarian",
  "Pescatarian",
  "Gluten-free",
  "Dairy-free",
  "Halal",
  "Kosher",
  "Keto",
  "Low-sugar",
  "Low-sodium",
] as const;

interface DietaryPrefsStepProps {
  selected: string[];
  onToggle: (pref: string) => void;
}

export function DietaryPrefsStep({ selected, onToggle }: DietaryPrefsStepProps) {
  return (
    <OnboardingStepShell
      title="Any dietary"
      titleLine2="preferences?"
      media="none"
      body={
        <OnboardingBodyText>We&apos;ll factor these into your scores.</OnboardingBodyText>
      }
    >
      <div className="flex flex-wrap gap-2">
        {DIETARY_OPTIONS.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`chip px-3 py-2.5 text-sm transition-colors ${
                isSelected
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary shadow-sm active:bg-background"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </OnboardingStepShell>
  );
}
