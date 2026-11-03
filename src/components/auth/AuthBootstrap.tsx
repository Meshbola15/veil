import { useEffect } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";

/** Restores Supabase session and listens for auth changes app-wide. */
export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const { hydrateFromSupabase, setSession } = useAuthStore.getState();
    void hydrateFromSupabase();

    void getSupabase()
      .then((client) => {
        if (!client || cancelled) return;
        const {
          data: { subscription },
        } = client.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          useUserStore.getState().setUserId(session?.user.id ?? null);
        });
        unsubscribe = () => subscription.unsubscribe();
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return children;
}
