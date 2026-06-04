import { ProfileStepHeader } from "@/components/onboarding/profile/ProfileStepHeader";
import { TagInput } from "@/components/onboarding/TagInput";

interface ProfileHealthStepProps {
  allergies: string[];
  medications: string[];
  conditions: string[];
  onAllergiesChange: (tags: string[]) => void;
  onMedicationsChange: (tags: string[]) => void;
  onConditionsChange: (tags: string[]) => void;
}

export function ProfileHealthStep({
  allergies,
  medications,
  conditions,
  onAllergiesChange,
  onMedicationsChange,
  onConditionsChange,
}: ProfileHealthStepProps) {
  return (
    <div>
      <ProfileStepHeader
        title="Any medical restrictions?"
        subtitle="Allergies, medications, and conditions help us flag what may not suit your profile."
      />
      <div className="flex flex-col gap-4">
        <TagInput
          label="Allergies"
          placeholder="e.g. Peanuts, Gluten, Latex"
          tags={allergies}
          onChange={onAllergiesChange}
        />
        <TagInput
          label="Medications"
          placeholder="e.g. Metformin, Warfarin"
          tags={medications}
          onChange={onMedicationsChange}
        />
        <TagInput
          label="Medical conditions"
          placeholder="e.g. Diabetes, Hypertension"
          tags={conditions}
          onChange={onConditionsChange}
        />
      </div>
    </div>
  );
}
