import { ChevronBackIcon } from "@/lib/icons";
import React from "react";

type Props = {
  headerTitle?: string;
  rightComponents?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  customHeader?: React.ReactNode;
};

const DashboardHeader = ({
  headerTitle,
  rightComponents,
  showBackButton = false,
  onBack,
  customHeader,
}: Props) => {
  return (
    <div className="p-4 px-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button onClick={onBack}>
              <ChevronBackIcon size={24} />
            </button>
          )}
          {customHeader || <h1 className="text-xl font-bold font-fraunces text-wrap">{headerTitle}</h1>}
        </div>
        <div className="flex items-center gap-2">{rightComponents}</div>
      </div>
    </div>
  );
};

export default DashboardHeader;
