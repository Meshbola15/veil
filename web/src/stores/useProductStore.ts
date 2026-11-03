import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

interface ProductState {
  customProducts: Product[];
  addProduct: (product: Product) => void;
  clearProducts: () => void;
}

export const useProductStore = create<ProductState>()(persist((set) => ({
  customProducts: [],
  addProduct: (product) => set((state) => ({
    customProducts: [product, ...state.customProducts.filter((item) => item.barcode !== product.barcode)],
  })),
  clearProducts: () => set({ customProducts: [] }),
}), { name: "veil-web-products" }));
