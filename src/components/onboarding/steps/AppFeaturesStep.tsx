import { OnboardingBodyText } from "@/components/onboarding/OnboardingBodyText";
import { OnboardingStepShell } from "@/components/onboarding/OnboardingStepShell";
import { HiOutlineChatBubbleLeftRight, HiOutlineMagnifyingGlass, HiOutlineArrowPath } from "react-icons/hi2";
import { TbShieldCheck } from "react-icons/tb";

const FEATURES = [
  {
    Icon: HiOutlineMagnifyingGlass,
    label: "Scan anything",
    description: "Food, cosmetics, drugs, supplements, household products",
  },
  {
    Icon: TbShieldCheck,
    label: "Your personal score",
    description: "Rated for your allergies, meds, and conditions",
  },
  {
    Icon: HiOutlineArrowPath,
    label: "Better alternatives",
    description: "Find options that may suit your profile better",
  },
  {
    Icon: HiOutlineChatBubbleLeftRight,
    label: "Ask the AI",
    description: "Get answers based on what you've scanned",
  },
] as const;

export function AppFeaturesStep() {
  return (
    <OnboardingStepShell
      title="Here's what you can do"
      media="none"
      body={
        <OnboardingBodyText>
          Everything you need to make informed choices about what you use.
        </OnboardingBodyText>
      }
    >
      <ul className="flex flex-col gap-3">
        {FEATURES.map(({ Icon, label, description }) => (
          <li key={label} className="flex gap-3 border-b border-border/80 pb-3 last:border-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface shadow-sm">
              <Icon size={20} className="text-text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-inter text-sm font-semibold text-text-primary">{label}</p>
              <p className="mt-0.5 font-inter text-sm text-text-secondary">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </OnboardingStepShell>
  );
}
