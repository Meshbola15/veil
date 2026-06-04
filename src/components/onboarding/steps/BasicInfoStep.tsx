import { OnboardingBodyText } from "@/components/onboarding/OnboardingBodyText";
import { OnboardingStepShell } from "@/components/onboarding/OnboardingStepShell";

interface BasicInfoStepProps {
  name: string;
  dateOfBirth: string;
  onNameChange: (name: string) => void;
  onDateOfBirthChange: (dateOfBirth: string) => void;
}

export function BasicInfoStep({
  name,
  dateOfBirth,
  onNameChange,
  onDateOfBirthChange,
}: BasicInfoStepProps) {
  return (
    <OnboardingStepShell
      title="Let's personalise"
      titleLine2="your experience"
      media="none"
      body={
        <OnboardingBodyText>
          Your name and age help us tailor your scores.
        </OnboardingBodyText>
      }
    >
      <div className="flex flex-col gap-3">
        <div>
          <label
            htmlFor="onboarding-name"
            className="mb-1.5 block font-inter text-xs font-medium text-text-secondary"
          >
            First name
          </label>
          <input
            id="onboarding-name"
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Alex"
            className="w-full rounded-input bg-surface p-4 font-inter text-base text-text-primary shadow-sm outline-none placeholder:text-text-disabled focus:ring-2 focus:ring-text-primary/15"
          />
        </div>
        <div>
          <label
            htmlFor="onboarding-dob"
            className="mb-1.5 block font-inter text-xs font-medium text-text-secondary"
          >
            Date of birth <span className="font-normal">(optional)</span>
          </label>
          <input
            id="onboarding-dob"
            type="date"
            value={dateOfBirth}
            onChange={(e) => onDateOfBirthChange(e.target.value)}
            className="w-full rounded-input bg-surface p-4 font-inter text-base text-text-primary shadow-sm outline-none focus:ring-2 focus:ring-text-primary/15"
          />
        </div>
      </div>
    </OnboardingStepShell>
  );
}
