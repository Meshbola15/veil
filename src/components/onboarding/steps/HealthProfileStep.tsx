import { OnboardingBodyText } from "@/components/onboarding/OnboardingBodyText";
import { OnboardingStepShell } from "@/components/onboarding/OnboardingStepShell";
import { TagInput } from "@/components/onboarding/TagInput";

interface HealthProfileStepProps {
  allergies: string[];
  medications: string[];
  conditions: string[];
  onAllergiesChange: (tags: string[]) => void;
  onMedicationsChange: (tags: string[]) => void;
  onConditionsChange: (tags: string[]) => void;
}

export function HealthProfileStep({
  allergies,
  medications,
  conditions,
  onAllergiesChange,
  onMedicationsChange,
  onConditionsChange,
}: HealthProfileStepProps) {
  return (
    <OnboardingStepShell
      title="Any allergies,"
      titleLine2="meds, or conditions?"
      media="none"
      body={
        <OnboardingBodyText>
          This is how we make your score personal. You can update this anytime.
        </OnboardingBodyText>
      }
    >
      <div className="flex flex-col gap-4">
        <TagInput
          label="Allergies"
          placeholder="e.g. Peanuts, Gluten"
          tags={allergies}
          onChange={onAllergiesChange}
        />
        <TagInput
          label="Medications"
          placeholder="e.g. Metformin"
          tags={medications}
          onChange={onMedicationsChange}
        />
        <TagInput
          label="Medical conditions"
          placeholder="e.g. Diabetes"
          tags={conditions}
          onChange={onConditionsChange}
        />
      </div>
    </OnboardingStepShell>
  );
}
