import { OnboardingBodyText } from "@/components/onboarding/OnboardingBodyText";
import { OnboardingStepShell } from "@/components/onboarding/OnboardingStepShell";

interface CameraPermissionStepProps {
  denied: boolean;
}

export function CameraPermissionStep({ denied }: CameraPermissionStepProps) {
  return (
    <OnboardingStepShell
      title="Allow camera"
      titleLine2="access"
      media="none"
      body={
        <>
          <OnboardingBodyText>
            The scanner needs your camera to read barcodes.
          </OnboardingBodyText>
          {denied && (
            <p className="mt-3 font-inter text-xs text-text-secondary">
              You can enable this in Settings later.
            </p>
          )}
        </>
      }
    />
  );
}
