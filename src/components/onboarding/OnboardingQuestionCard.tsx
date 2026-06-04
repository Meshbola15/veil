interface OnboardingQuestionCardProps {
  title: string;
  subtitle: string;
}

export function OnboardingQuestionCard({ title, subtitle }: OnboardingQuestionCardProps) {
  return (
    <div className="w-full px-2 text-center">
      <h2 className="font-inter text-xl font-bold leading-snug text-white">{title}</h2>
      <p className="mt-3 font-inter text-sm leading-relaxed text-white/85">{subtitle}</p>
    </div>
  );
}
