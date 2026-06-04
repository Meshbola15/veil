import { create } from "zustand";
import type { Product } from "../types";

interface InventoryState {
  items: Product[];
  setItems: (items: Product[]) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
