import type { ReactNode } from "react";
import { Drawer } from "vaul";

/** Peek height: handle + product row (matches Yuka-style collapsed sheet) */
export const SCAN_DRAWER_SNAP_PEEK = "200px";
export const SCAN_DRAWER_SNAP_FULL = 1;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snapPoints?: (number | string)[];
  activeSnapPoint?: number | string | null;
  setActiveSnapPoint?: (snap: number | string | null) => void;
  /** Accessible name for screen readers (visually hidden) */
  title?: string;
  children: ReactNode;
};

export default function DrawerComponent({
  open,
  onOpenChange,
  snapPoints = [SCAN_DRAWER_SNAP_PEEK, SCAN_DRAWER_SNAP_FULL],
  activeSnapPoint,
  setActiveSnapPoint,
  title = "Panel",
  children,
}: Props) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
      fadeFromIndex={1}
      modal={false}
      dismissible
    >
      <Drawer.Portal>
        <Drawer.Content className="pointer-events-auto fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-md flex-col rounded-t-[20px] bg-surface pb-safe shadow-[0_-2px_16px_rgba(0,0,0,0.12)] outline-none focus:outline-none">
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <Drawer.Handle className="mx-auto mt-2.5 h-[5px] w-9 shrink-0 rounded-full bg-[#D4D4D4]" />
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
