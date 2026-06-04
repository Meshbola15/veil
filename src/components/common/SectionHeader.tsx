interface SectionHeaderProps {
  title: string;
  image?: string;
  rightComponent?: React.ReactNode;
  icon?: React.ReactNode;
}

export function SectionHeader({
  title,
  image,
  icon,
  rightComponent,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 mb-2">
      <div className="flex items-center gap-2">
        {icon || (
          <img
            src={image}
            alt=""
            aria-hidden
            className="size-5 shrink-0 object-contain"
          />
        )}
        <h4 className="font-fraunces text-lg font-bold text-text-primary">
          {title}
        </h4>
      </div>

      {rightComponent && rightComponent}
    </div>
  );
}
