import { useLayoutEffect, useRef } from "react";

/**
 * Ref that always holds the latest value, for reading inside long-lived
 * callbacks (camera frames, gesture handlers) without re-subscribing them.
 * Updated in a layout effect, so it is current before any event fires.
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
