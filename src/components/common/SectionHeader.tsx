import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  image?: string;
  rightComponent?: ReactNode;
  icon?: ReactNode;
}

export function SectionHeader({
  title,
  image,
  icon,
  rightComponent,
}: SectionHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {icon ??
          (image ? (
            <img
              src={image}
              alt=""
              aria-hidden
              width={20}
              height={20}
              decoding="async"
              className="size-5 shrink-0 object-contain"
            />
          ) : null)}
        <h4 className="font-bricolage text-lg font-bold text-text-primary">
          {title}
        </h4>
      </div>

      {rightComponent}
    </div>
  );
}
