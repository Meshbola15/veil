import { OnboardingQuestionCard } from "@/components/onboarding/OnboardingQuestionCard";
import { OnboardingOptionPill } from "@/components/onboarding/OnboardingOptionPill";
import { AGE_GROUP_OPTIONS, type AgeGroup } from "@/types/onboarding";

interface AgeStepProps {
  value: AgeGroup | "";
  onSelect: (age: AgeGroup) => void;
}

export function AgeStep({ value, onSelect }: AgeStepProps) {
  return (
    <>
      <OnboardingQuestionCard
        title="How old are you?"
        subtitle="At different ages, your skin and body respond differently to ingredients."
      />
      <div className="mt-6 flex w-full flex-col gap-3">
        {AGE_GROUP_OPTIONS.map((option) => (
          <OnboardingOptionPill
            key={option.value}
            label={option.label}
            selected={value === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </>
  );
}
