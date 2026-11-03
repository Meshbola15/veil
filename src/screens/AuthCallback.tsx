import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { getSupabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function AuthCallback() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const onboardingComplete = useOnboardingStore((s) => s.isComplete);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const finish = async () => {
      const supabase = await getSupabase().catch(() => null);
      if (cancelled) return;
      if (!supabase) {
        setError("Sign-in is not configured.");
        return;
      }

      const hash = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : window.location.hash;
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionError) {
          setError(sessionError.message);
          return;
        }
        setSession(data.session);
      } else {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          setError(sessionError.message);
          return;
        }
        setSession(data.session);
      }

      if (Capacitor.isNativePlatform()) {
        const { Browser } = await import("@capacitor/browser");
        await Browser.close().catch(() => undefined);
      }

      if (cancelled) return;
      navigate(onboardingComplete ? "/home" : "/onboarding", { replace: true });
    };

    void finish();
    return () => {
      cancelled = true;
    };
  }, [navigate, onboardingComplete, setSession]);

  return (
    <div className="mobile-screen flex h-dvh items-center justify-center bg-background px-6">
      {error ? (
        <div className="text-center">
          <p className="font-inter text-sm text-score-avoid">{error}</p>
          <button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
            className="mt-4 font-inter text-sm font-semibold text-text-primary underline"
          >
            Back to sign in
          </button>
        </div>
      ) : (
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-border border-t-text-primary"
          aria-label="Completing sign in"
        />
      )}
    </div>
  );
}
