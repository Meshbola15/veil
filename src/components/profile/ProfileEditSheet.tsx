import type { ReactNode } from "react";
import { Drawer } from "vaul";
import { HiOutlineXMark } from "react-icons/hi2";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function ProfileEditSheet({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
  footer,
}: Props) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-text-primary/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-[60] mx-auto flex max-h-[88dvh] w-full max-w-md flex-col rounded-t-[20px] bg-surface pb-safe outline-none">
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <Drawer.Handle className="mx-auto mt-2.5 h-[5px] w-9 shrink-0 rounded-full bg-border" />

          <div className="flex items-start justify-between gap-3 px-5 pb-2 pt-3">
            <div className="min-w-0 flex-1">
              <p className="font-inter text-lg font-bold text-text-primary">
                {title}
              </p>
              {subtitle ? (
                <p className="mt-1 font-inter text-sm text-text-secondary">
                  {subtitle}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-text-secondary"
            >
              <HiOutlineXMark size={20} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 [-webkit-overflow-scrolling:touch]">
            {children}
          </div>

          {footer ? (
            <div className="shrink-0 border-t border-border px-5 py-4">
              {footer}
            </div>
          ) : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
