import { TagInput } from "@/components/onboarding/TagInput";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { DIETARY_OPTIONS } from "@/types/onboarding";
import { cn } from "@/lib/utils";

type Props = {
  allergies: string[];
  medications: string[];
  conditions: string[];
  dietaryPreferences: string[];
  onAllergiesChange: (tags: string[]) => void;
  onMedicationsChange: (tags: string[]) => void;
  onConditionsChange: (tags: string[]) => void;
  onDietaryToggle: (pref: string) => void;
};

export function ProfileHealthSection({
  allergies,
  medications,
  conditions,
  dietaryPreferences,
  onAllergiesChange,
  onMedicationsChange,
  onConditionsChange,
  onDietaryToggle,
}: Props) {
  return (
    <ProfileSection
      title="Your health profile"
      subtitle="Helps us flag ingredients that may not suit you."
    >
      <div className="flex flex-col gap-5">
        <TagInput
          label="Allergies"
          placeholder="e.g. Peanuts, Latex"
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
          label="Health conditions"
          placeholder="e.g. Diabetes, Eczema"
          tags={conditions}
          onChange={onConditionsChange}
        />

        <div className="flex flex-col gap-2">
          <p className="font-inter text-sm font-medium text-text-primary">
            Dietary preferences
          </p>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((option) => {
              const isSelected = dietaryPreferences.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onDietaryToggle(option)}
                  className={cn(
                    "rounded-full px-3 py-1.5 font-inter text-xs font-medium transition-colors",
                    isSelected
                      ? "bg-text-primary text-white"
                      : "bg-[#F0F0F0] text-text-secondary",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ProfileSection>
  );
}
