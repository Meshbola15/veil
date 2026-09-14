import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ScanRecord } from "../types";

interface ScanState {
  history: ScanRecord[];
  addScan: (barcode: string) => void;
  clearHistory: () => void;
}

const demoHistory: ScanRecord[] = [
  { barcode: "0078742118405", scannedAt: new Date(Date.now() - 18 * 60_000).toISOString() },
  { barcode: "044000032221", scannedAt: new Date(Date.now() - 4 * 3_600_000).toISOString() },
  { barcode: "051500255162", scannedAt: new Date(Date.now() - 25 * 3_600_000).toISOString() },
];

export const useScanStore = create<ScanState>()(persist((set) => ({
  history: demoHistory,
  addScan: (barcode) => set((state) => ({
    history: [{ barcode, scannedAt: new Date().toISOString() }, ...state.history.filter((item) => item.barcode !== barcode)].slice(0, 50),
  })),
  clearHistory: () => set({ history: [] }),
}), { name: "veil-web-scans" }));
