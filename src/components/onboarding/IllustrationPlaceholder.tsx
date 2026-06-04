interface IllustrationPlaceholderProps {
  variant?: "empty" | "box";
  className?: string;
}

/** Reserved media area — empty space or dashed placeholder until assets are added. */
export function IllustrationPlaceholder({
  variant = "empty",
  className = "",
}: IllustrationPlaceholderProps) {
  if (variant === "empty") {
    return <div className={`h-6 w-full shrink-0 ${className}`} aria-hidden />;
  }

  return (
    <div
      className={`flex h-28 w-full items-center justify-center rounded-2xl border border-dashed border-border bg-surface/60 ${className}`}
      aria-hidden
    >
      <span className="font-inter text-xs text-text-disabled">Image</span>
    </div>
  );
}
