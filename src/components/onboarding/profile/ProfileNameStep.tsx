import { ProfileStepHeader } from "@/components/onboarding/profile/ProfileStepHeader";

interface ProfileNameStepProps {
  name: string;
  onNameChange: (name: string) => void;
}

export function ProfileNameStep({ name, onNameChange }: ProfileNameStepProps) {
  return (
    <div>
      <ProfileStepHeader
        title="What's your first name?"
        subtitle="We'll use this to personalize your experience."
      />
      <input
        id="profile-name"
        type="text"
        autoComplete="given-name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Alex"
        className="w-full rounded-input bg-surface p-4 font-inter text-base text-text-primary shadow-sm outline-none placeholder:text-text-disabled focus:ring-2 focus:ring-text-primary/15"
      />
    </div>
  );
}
