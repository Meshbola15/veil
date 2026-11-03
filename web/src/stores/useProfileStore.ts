import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HouseholdMember } from "../types";

interface ProfileState {
  name: string;
  members: HouseholdMember[];
  setName: (name: string) => void;
  addMember: (member: Omit<HouseholdMember, "id">) => void;
  removeMember: (id: string) => void;
  resetProfile: () => void;
}

const defaultMembers: HouseholdMember[] = [
  { id: "lisa", name: "Lisa", kind: "person", concerns: ["peanut", "gluten"] },
  { id: "luna", name: "Luna", kind: "dog", concerns: [] },
  { id: "miso", name: "Miso", kind: "cat", concerns: ["dairy"] },
];

export const useProfileStore = create<ProfileState>()(persist((set) => ({
  name: "Olumide",
  members: defaultMembers,
  setName: (name) => set({ name }),
  addMember: (member) => set((state) => ({ members: [...state.members, { ...member, id: crypto.randomUUID() }] })),
  removeMember: (id) => set((state) => ({ members: state.members.filter((member) => member.id !== id) })),
  resetProfile: () => set({ name: "Olumide", members: defaultMembers }),
}), { name: "veil-web-profile" }));
