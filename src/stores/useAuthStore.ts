import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { signOut as oauthSignOut } from "@/lib/auth/oauth";
import { getSupabase } from "@/lib/supabase/client";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
  hydrateFromSupabase: () => Promise<void>;
}

/** Shared in-flight hydration so concurrent callers don't hit storage twice. */
let hydration: Promise<void> | null = null;

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
    try {
      await oauthSignOut();
    } finally {
      // Always clear local state, even if the network sign-out failed.
      set({ session: null, user: null, isLoading: false });
    }
  },

  hydrateFromSupabase: () => {
    hydration ??= (async () => {
      try {
        const client = await getSupabase();
        if (!client) {
          set({ isLoading: false });
          return;
        }
        const { data } = await client.auth.getSession();
        set({
          session: data.session,
          user: data.session?.user ?? null,
          isLoading: false,
        });
      } catch {
        set({ isLoading: false });
      } finally {
        hydration = null;
      }
    })();
    return hydration;
  },
}));

export function useIsAuthenticated(): boolean {
  return useAuthStore((s) => Boolean(s.session));
}
