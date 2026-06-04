import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OnboardingData } from "@/types/onboarding";
import { defaultOnboardingData } from "@/types/onboarding";

interface OnboardingStore {
  isComplete: boolean;
  data: Partial<OnboardingData>;
  setData: (partial: Partial<OnboardingData>) => void;
  complete: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      isComplete: false,
      data: {},
      setData: (partial) =>
        set((state) => ({
          data: { ...state.data, ...partial },
        })),
      complete: () =>
        set((state) => ({
          isComplete: true,
          data: { ...defaultOnboardingData, ...state.data },
        })),
      reset: () => set({ isComplete: false, data: {} }),
    }),
    {
      name: "veil-onboarding",
    },
  ),
);
