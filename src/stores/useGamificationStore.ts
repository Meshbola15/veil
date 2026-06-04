import { create } from "zustand";

interface GamificationState {
  points: number;
  streak: number;
  badges: string[];
  setGamification: (data: { points: number; streak: number; badges: string[] }) => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  points: 0,
  streak: 0,
  badges: [],
  setGamification: ({ points, streak, badges }) => set({ points, streak, badges }),
}));
