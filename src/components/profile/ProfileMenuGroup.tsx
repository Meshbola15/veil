import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function ProfileMenuGroup({ title, children }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="px-1 font-inter text-xs font-bold uppercase tracking-wide text-text-secondary">
        {title}
      </h2>
      <div className="overflow-hidden rounded-[30px] bg-surface shadow-sm">
        {children}
      </div>
    </section>
  );
}
