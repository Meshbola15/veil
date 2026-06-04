import { OnboardingBodyText } from "@/components/onboarding/OnboardingBodyText";
import { OnboardingStepShell } from "@/components/onboarding/OnboardingStepShell";

const STATS = [
  { title: "Points", description: "Earn for every scan" },
  { title: "Streaks", description: "Scan daily to keep yours" },
  { title: "Badges", description: "Unlock as you go" },
] as const;

export function GamificationStep() {
  return (
    <OnboardingStepShell
      title="Scan. Learn."
      titleLine2="Earn."
      media="none"
      body={
        <OnboardingBodyText>
          You earn points for every scan, every product you add, and every streak you keep.
        </OnboardingBodyText>
      }
    >
      <ul className="flex flex-col gap-3">
        {STATS.map(({ title, description }) => (
          <li key={title} className="border-b border-border/80 pb-3 last:border-0 last:pb-0">
            <p className="font-inter text-sm font-semibold text-text-primary">{title}</p>
            <p className="mt-0.5 font-inter text-sm text-text-secondary">{description}</p>
          </li>
        ))}
      </ul>
    </OnboardingStepShell>
  );
}
