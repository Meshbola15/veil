interface ProfileStepHeaderProps {
  title: string;
  subtitle: string;
}

export function ProfileStepHeader({ title, subtitle }: ProfileStepHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="font-bricolage text-[1.75rem] leading-tight font-semibold text-text-primary">
        {title}
      </h1>
      <p className="mt-2 font-inter text-[15px] leading-relaxed text-text-secondary">
        {subtitle}
      </p>
    </div>
  );
}
