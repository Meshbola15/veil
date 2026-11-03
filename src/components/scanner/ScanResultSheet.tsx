/**
 * Bottom sheet shown after a barcode scan.
 *
 * Renders via portal on document.body (avoids clipping from parent overflow:hidden).
 * Uses translateY from the bottom edge:
 *   - peek  → small card (~200px visible), camera still visible above
 *   - full  → sheet fills ~92% of the screen
 *   - dismiss → swipe down past threshold calls onDismiss()
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Hammer from "hammerjs";
import { useLatest } from "@/hooks/useLatest";
import { ScanDetailsContent } from "@/components/scanner/ScanDetailsContent";
import type { BarcodeDetection } from "@/lib/scanner/barcode";
import type { ScanResult } from "@/types";
import {
  SCAN_SHEET_PEEK_CONTENT_PX,
  SCAN_SHEET_PEEK_HEIGHT_PX,
} from "@/lib/scanner/scanSheetLayout";

const PEEK_HEIGHT_PX = SCAN_SHEET_PEEK_HEIGHT_PX;
/** Drag down this many px past peek before we dismiss */
const DISMISS_DRAG_PX = 56;
/** Fling speed (px/ms) needed to snap without dragging far */
const SNAP_VELOCITY_PX_MS = 0.35;

type Snap = "peek" | "full";

interface ScanResultSheetProps {
  open: boolean;
  detection: BarcodeDetection;
  scanResults: ScanResult[];
  onDismiss: () => void;
  onScanAgain: () => void;
  onAddProduct?: () => void;
}

export function ScanResultSheet({
  open,
  detection,
  scanResults,
  onDismiss,
  onScanAgain,
  onAddProduct,
}: ScanResultSheetProps) {
  const [snap, setSnap] = useState<Snap>("peek");
  const [dragPx, setDragPx] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [entered, setEntered] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef({
    startTranslatePx: 0,
    velocityY: 0,
  });

  const snapRef = useLatest(snap);
  const dragPxRef = useLatest(dragPx);

  const getMetrics = useCallback(() => {
    const height = sheetRef.current?.getBoundingClientRect().height ?? 0;
    const peekPx = Math.max(0, height - PEEK_HEIGHT_PX);
    return { height, peekPx };
  }, []);

  const getTranslatePx = useCallback(() => {
    if (dragPxRef.current !== null) return dragPxRef.current;
    const { peekPx } = getMetrics();
    return snapRef.current === "full" ? 0 : peekPx;
  }, [getMetrics, snapRef, dragPxRef]);

  // The sheet mounts fresh for every result (see Scan.tsx), so it always
  // starts at "peek"; slide in on the next frame.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(frame);
      setEntered(false);
    };
  }, [open]);

  const finishDrag = useCallback(() => {
    const { peekPx } = getMetrics();
    const y =
      dragPxRef.current ?? (snapRef.current === "full" ? 0 : peekPx);
    const { velocityY } = dragRef.current;
    const flingUp = velocityY < -SNAP_VELOCITY_PX_MS;
    const flingDown = velocityY > SNAP_VELOCITY_PX_MS;

    setDragPx(null);

    if (y > peekPx + DISMISS_DRAG_PX || (flingDown && y > peekPx * 0.45)) {
      onDismiss();
      return;
    }

    if (y < peekPx * 0.5 || flingUp) {
      setSnap("full");
      return;
    }

    setSnap("peek");
  }, [getMetrics, onDismiss, snapRef, dragPxRef]);

  const isExpanded = snap === "full";

  useEffect(() => {
    if (!open) return;

    // Vertical drag on the handle only so horizontal carousel swipes are not blocked.
    const targets: HTMLElement[] = [];
    if (handleRef.current) targets.push(handleRef.current);

    const managers = targets.map((element) => {
      const manager = new Hammer.Manager(element);
      const pan = new Hammer.Pan({
        direction: Hammer.DIRECTION_VERTICAL,
        threshold: 0,
      });
      manager.add(pan);

      manager.on("panstart", () => {
        setIsDragging(true);
        const startPx = getTranslatePx();
        dragRef.current = {
          startTranslatePx: startPx,
          velocityY: 0,
        };
        setDragPx(startPx);
      });

      manager.on("panmove", (event) => {
        const { height } = getMetrics();
        const nextPx = Math.min(
          Math.max(dragRef.current.startTranslatePx + event.deltaY, 0),
          height,
        );
        setDragPx(nextPx);
      });

      manager.on("panend pancancel", (event) => {
        dragRef.current.velocityY = event.velocityY;
        setIsDragging(false);
        finishDrag();
      });

      return manager;
    });

    return () => {
      managers.forEach((manager) => manager.destroy());
    };
  }, [open, isExpanded, finishDrag, getMetrics, getTranslatePx]);

  if (!open) return null;

  const transform = entered
    ? dragPx !== null
      ? `translateY(${dragPx}px)`
      : snap === "full"
        ? "translateY(0)"
        : `translateY(calc(100% - ${PEEK_HEIGHT_PX}px))`
    : "translateY(100%)";

  const sheet = (
    <div className="pointer-events-none fixed inset-0 z-[200]">
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Scan result"
        className="pointer-events-auto fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-md flex-col rounded-t-[20px] bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.18)]"
        style={{
          height: "92dvh",
          transform,
          transformOrigin: "bottom center",
          transition: isDragging
            ? "none"
            : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
          paddingBottom: "max(0.5rem, var(--safe-area-inset-bottom))",
          touchAction: "none",
          willChange: "transform",
        }}
      >
        <div
          ref={handleRef}
          className="shrink-0 cursor-grab touch-none active:cursor-grabbing"
        >
          <div
            className="mx-auto mt-2.5 h-[5px] w-9 rounded-full bg-[#D4D4D4]"
            aria-hidden
          />
        </div>

        <div
          ref={contentRef}
          className={
            isExpanded
              ? "flex min-h-0 flex-1 flex-col overflow-hidden"
              : "flex shrink-0 flex-col overflow-hidden"
          }
          style={
            isExpanded
              ? undefined
              : { height: SCAN_SHEET_PEEK_CONTENT_PX }
          }
        >
          <ScanDetailsContent
            detection={detection}
            scanResults={scanResults}
            expanded={isExpanded}
            onScanAgain={onScanAgain}
            onAddProduct={onAddProduct}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(sheet, document.body);
}
