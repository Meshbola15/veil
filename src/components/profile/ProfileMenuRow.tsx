import type { ReactNode } from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

type Props = {
  icon: ReactNode;
  label: string;
  value?: string;
  destructive?: boolean;
  onClick?: () => void;
};

export function ProfileMenuRow({
  icon,
  label,
  value,
  destructive = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "flex min-h-[56px] w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left last:border-b-0",
        onClick && "active:bg-background",
        !onClick && "cursor-default",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-text-secondary">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block font-inter text-sm font-semibold",
            destructive ? "text-score-avoid" : "text-text-primary",
          )}
        >
          {label}
        </span>
        {value ? (
          <span className="mt-0.5 block truncate font-inter text-xs text-text-secondary">
            {value}
          </span>
        ) : null}
      </span>
      {onClick ? (
        <HiOutlineChevronRight
          size={18}
          className="shrink-0 text-text-disabled"
          aria-hidden
        />
      ) : null}
    </button>
  );
}
