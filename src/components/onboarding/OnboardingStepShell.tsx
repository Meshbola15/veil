import type { ReactNode } from "react";
import { IllustrationPlaceholder } from "@/components/onboarding/IllustrationPlaceholder";

interface OnboardingStepShellProps {
  title: string;
  titleLine2?: string;
  body?: ReactNode;
  children?: ReactNode;
  /** none = no gap, empty = small spacer, box = dashed placeholder */
  media?: "none" | "empty" | "box";
}

export function OnboardingStepShell({
  title,
  titleLine2,
  body,
  children,
  media = "empty",
}: OnboardingStepShellProps) {
  return (
    <div className="flex w-full flex-col text-left">
      <h1 className="onboarding-title text-text-primary">
        {titleLine2 ? (
          <>
            <span className="block">{title}</span>
            <span className="block">{titleLine2}</span>
          </>
        ) : (
          <span className="block">{title}</span>
        )}
      </h1>

      {media !== "none" && (
        <div className="my-5">
          <IllustrationPlaceholder variant={media === "box" ? "box" : "empty"} />
        </div>
      )}

      {body && <div className="onboarding-body">{body}</div>}

      {children && <div className="mt-5 w-full">{children}</div>}
    </div>
  );
}
