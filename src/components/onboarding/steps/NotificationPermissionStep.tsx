import { OnboardingBodyText } from "@/components/onboarding/OnboardingBodyText";
import { OnboardingStepShell } from "@/components/onboarding/OnboardingStepShell";

export function NotificationPermissionStep() {
  return (
    <OnboardingStepShell
      title="Stay in"
      titleLine2="the loop"
      media="none"
      body={
        <OnboardingBodyText>
          Get reminders to keep your streak and alerts when we add products you&apos;ve searched
          for.
        </OnboardingBodyText>
      }
    />
  );
}
