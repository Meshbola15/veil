import { create } from "zustand";
import type { HealthProfile } from "../types";

interface HealthProfileState {
  profile: HealthProfile | null;
  setProfile: (profile: HealthProfile | null) => void;
}

export const useHealthProfileStore = create<HealthProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
