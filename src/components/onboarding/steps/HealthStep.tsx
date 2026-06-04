import { OnboardingQuestionCard } from "@/components/onboarding/OnboardingQuestionCard";
import { TagInput } from "@/components/onboarding/TagInput";

interface HealthStepProps {
  allergies: string[];
  medications: string[];
  conditions: string[];
  onAllergiesChange: (tags: string[]) => void;
  onMedicationsChange: (tags: string[]) => void;
  onConditionsChange: (tags: string[]) => void;
}

export function HealthStep({
  allergies,
  medications,
  conditions,
  onAllergiesChange,
  onMedicationsChange,
  onConditionsChange,
}: HealthStepProps) {
  return (
    <>
      <OnboardingQuestionCard
        title="Any allergies or restrictions?"
        subtitle="We'll flag ingredients that may not be right for you."
      />
      <div className="onboarding-tag-inputs mt-6 w-full space-y-4 text-left">
        <TagInput
          label="Allergies"
          placeholder="Add allergy, press Enter"
          tags={allergies}
          onChange={onAllergiesChange}
        />
        <TagInput
          label="Medications"
          placeholder="Add medication, press Enter"
          tags={medications}
          onChange={onMedicationsChange}
        />
        <TagInput
          label="Health conditions"
          placeholder="Add condition, press Enter"
          tags={conditions}
          onChange={onConditionsChange}
        />
      </div>
    </>
  );
}
