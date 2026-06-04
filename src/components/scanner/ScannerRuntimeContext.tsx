import { createContext, useContext } from "react";

export type ScannerRuntimeValue = {
  ready: boolean;
  error: string | null;
  retry: () => void;
};

export const ScannerRuntimeContext = createContext<ScannerRuntimeValue>({
  ready: false,
  error: null,
  retry: () => undefined,
});

export function useScannerRuntime(): ScannerRuntimeValue {
  return useContext(ScannerRuntimeContext);
}
