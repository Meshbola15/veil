import type { ReactNode } from "react";

interface OnboardingBodyTextProps {
  children: ReactNode;
}

/** Left-aligned onboarding copy with optional bold emphasis via <strong>. */
export function OnboardingBodyText({ children }: OnboardingBodyTextProps) {
  return <p className="font-inter text-[15px] leading-relaxed text-text-primary sm:text-base">{children}</p>;
}
