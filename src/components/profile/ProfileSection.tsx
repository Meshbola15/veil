import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function ProfileSection({ title, subtitle, children }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="font-inter text-base font-bold text-text-primary">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 font-inter text-sm text-text-secondary">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="rounded-[30px] bg-white p-5 shadow-sm">{children}</div>
    </section>
  );
}
