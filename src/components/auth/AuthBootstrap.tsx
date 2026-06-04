import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";

/** Restores Supabase session and listens for auth changes app-wide. */
export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const hydrateFromSupabase = useAuthStore((s) => s.hydrateFromSupabase);
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    void hydrateFromSupabase();

    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      useUserStore.getState().setUserId(session?.user.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, [hydrateFromSupabase, setSession]);

  return children;
}
