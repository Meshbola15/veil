import { OnboardingQuestionCard } from "@/components/onboarding/OnboardingQuestionCard";

interface NameStepProps {
  value: string;
  onChange: (name: string) => void;
}

export function NameStep({ value, onChange }: NameStepProps) {
  return (
    <>
      <OnboardingQuestionCard
        title="What's your name?"
        subtitle="So we can personalize your experience."
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your name"
        autoComplete="given-name"
        className="mt-6 w-full rounded-full border-2 border-transparent bg-surface px-6 py-4 text-center font-inter text-base text-text-primary shadow-sm outline-none focus:border-accent"
      />
    </>
  );
}
