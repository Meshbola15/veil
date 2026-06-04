import type { ReactNode } from "react";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";

interface OnboardingShellProps {
  children: ReactNode;
  onBack?: () => void;
  footer?: ReactNode;
  scrollable?: boolean;
}

export function OnboardingShell({
  children,
  onBack,
  footer,
  scrollable = false,
}: OnboardingShellProps) {
  return (
    <div className="onboarding-gradient mobile-screen flex h-dvh max-h-dvh flex-col overflow-hidden">
      <div className="safe-top absolute left-0 right-0 top-0 z-10 px-5 pt-2">
        <OnboardingHeader onBack={onBack} showBack={Boolean(onBack)} />
      </div>

      <main
        className={`min-h-0 flex-1 px-5 pb-4 pt-14 ${
          scrollable
            ? "overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
            : "flex flex-col items-center justify-center overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
        }`}
      >
        <div className="flex w-full max-w-sm flex-col items-center">{children}</div>
      </main>

      {footer && (
        <footer className="safe-bottom z-10 shrink-0 px-5 pb-4 pt-2">{footer}</footer>
      )}
    </div>
  );
}
