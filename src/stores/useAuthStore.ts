import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { signOut as oauthSignOut } from "@/lib/auth/oauth";
import { supabase } from "@/lib/supabase/client";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
  hydrateFromSupabase: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isLoading: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  signOut: async () => {
    await oauthSignOut();
    set({ session: null, user: null, isLoading: false });
  },

  hydrateFromSupabase: async () => {
    if (!supabase) {
      set({ isLoading: false });
      return;
    }

    const { data } = await supabase.auth.getSession();
    set({
      session: data.session,
      user: data.session?.user ?? null,
      isLoading: false,
    });
  },
}));

export function useIsAuthenticated(): boolean {
  return useAuthStore((s) => Boolean(s.session));
}
