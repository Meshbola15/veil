import { HiOutlineChevronRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value?: string;
  hint?: string;
  destructive?: boolean;
  showChevron?: boolean;
  onClick?: () => void;
};

export function ProfileSettingsRow({
  label,
  value,
  hint,
  destructive = false,
  showChevron = true,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "flex min-h-[52px] w-full items-center justify-between gap-3 border-b border-[#F0F0F0] py-3 text-left last:border-b-0 disabled:cursor-default",
        onClick && "active:opacity-70",
      )}
    >
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-inter text-sm font-semibold",
            destructive ? "text-score-avoid" : "text-text-primary",
          )}
        >
          {label}
        </p>
        {hint ? (
          <p className="mt-0.5 font-inter text-xs text-text-secondary">{hint}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {value ? (
          <span className="max-w-[140px] truncate font-inter text-xs text-text-secondary">
            {value}
          </span>
        ) : null}
        {showChevron && onClick ? (
          <HiOutlineChevronRight
            size={18}
            className="text-text-disabled"
            aria-hidden
          />
        ) : null}
      </div>
    </button>
  );
}
