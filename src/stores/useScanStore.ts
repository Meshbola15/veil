import { create } from "zustand";
import type { ScanResult } from "../types";

interface ScanState {
  currentResult: ScanResult | null;
  history: ScanResult[];
  setCurrentResult: (result: ScanResult | null) => void;
  addToHistory: (result: ScanResult) => void;
}

export const useScanStore = create<ScanState>((set) => ({
  currentResult: null,
  history: [],
  setCurrentResult: (currentResult) => set({ currentResult }),
  addToHistory: (result) =>
    set((state) => ({ history: [result, ...state.history] })),
}));
