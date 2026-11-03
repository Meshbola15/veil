import { memo, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronBackIcon } from "@/lib/icons";

type Props = {
  headerTitle?: string;
  rightComponents?: ReactNode;
  showBackButton?: boolean;
  /** Defaults to going back one entry in history. */
  onBack?: () => void;
  customHeader?: ReactNode;
};

const DashboardHeader = ({
  headerTitle,
  rightComponents,
  showBackButton = false,
  onBack,
  customHeader,
}: Props) => {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate(-1));

  return (
    <header className="py-5">
      <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3">
        <div className="flex items-center">
          {showBackButton && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="pressable flex size-10 items-center justify-center rounded-full bg-surface text-text-primary shadow-card"
            >
              <ChevronBackIcon size={20} aria-hidden />
            </button>
          )}
        </div>

        {customHeader || (
          <h1 className="truncate text-center font-bricolage text-xl font-bold text-text-primary">
            {headerTitle}
          </h1>
        )}

        <div className="flex min-w-10 items-center justify-end gap-2">
          {rightComponents}
        </div>
      </div>
    </header>
  );
};

export default memo(DashboardHeader);
