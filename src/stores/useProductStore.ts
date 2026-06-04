import { create } from "zustand";
import type { Product } from "../types";

interface ProductState {
  cache: Record<string, Product>;
  setProduct: (product: Product) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  cache: {},
  setProduct: (product) =>
    set((state) => ({
      cache: { ...state.cache, [product.id]: product },
    })),
}));
