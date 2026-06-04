import { OnboardingQuestionCard } from "@/components/onboarding/OnboardingQuestionCard";
import { OnboardingOptionPill } from "@/components/onboarding/OnboardingOptionPill";
import { GENDER_OPTIONS, type Gender } from "@/types/onboarding";

interface GenderStepProps {
  value: Gender | "";
  onSelect: (gender: Gender) => void;
}

export function GenderStep({ value, onSelect }: GenderStepProps) {
  return (
    <>
      <OnboardingQuestionCard
        title="What gender do you identify with?"
        subtitle="Hormones influence how skin and body react to many product ingredients."
      />
      <div className="mt-6 flex w-full flex-col gap-3">
        {GENDER_OPTIONS.map((option) => (
          <OnboardingOptionPill
            key={option.value}
            label={option.label}
            icon={<span aria-hidden>{option.symbol}</span>}
            selected={value === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </>
  );
}
