import type { ReactNode } from "react";

export interface OnboardingSecondaryAction {
  prefix?: string;
  label: string;
  onClick: () => void;
}

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideProgress?: boolean;
  hideSecondary?: boolean;
  secondaryAction?: OnboardingSecondaryAction;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextLabel = "Continue",
  nextDisabled = false,
  hideProgress = false,
  hideSecondary = false,
  secondaryAction,
}: OnboardingLayoutProps) {
  const showSecondary = !hideSecondary && secondaryAction;

  return (
    <div className="mobile-screen flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-background">
      <header className="safe-top shrink-0 px-5 pt-2">
        <div className="mb-4 flex min-h-11 items-center justify-between">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="touch-target font-inter text-sm font-medium text-text-secondary active:text-text-primary"
            >
              Back
            </button>
          ) : (
            <span className="w-12" aria-hidden />
          )}
          <span className="font-inter text-xs font-medium text-text-secondary">
            {currentStep + 1} of {totalSteps}
          </span>
          <span className="w-12" aria-hidden />
        </div>
        {!hideProgress && (
          <div
            className="flex gap-2"
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemax={totalSteps}
          >
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                  index <= currentStep ? "bg-text-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}
      </header>

      <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-5 pt-4 [-webkit-overflow-scrolling:touch]">
        {children}
      </main>

      <footer className="safe-bottom shrink-0 border-t border-border/50 bg-background px-5 pt-4 pb-2">
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="touch-target flex w-full items-center justify-center rounded-chip bg-accent py-4 font-inter text-base font-semibold text-white transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {nextLabel}
        </button>

        {showSecondary && (
          <p className="mt-3 text-center font-inter text-[13px] leading-snug text-text-secondary">
            {secondaryAction.prefix && <span>{secondaryAction.prefix} </span>}
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="font-semibold text-text-primary underline decoration-text-primary/30 underline-offset-2 active:opacity-70"
            >
              {secondaryAction.label}
            </button>
          </p>
        )}
      </footer>
    </div>
  );
}
