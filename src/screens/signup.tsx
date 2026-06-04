import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiApple, SiGoogle } from "react-icons/si";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { signInWithApple, signInWithGoogle } from "@/lib/auth/oauth";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthStore, useIsAuthenticated } from "@/stores/useAuthStore";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const onboardingComplete = useOnboardingStore((s) => s.isComplete);
  const hydrateFromSupabase = useAuthStore((s) => s.hydrateFromSupabase);
  const authLoading = useAuthStore((s) => s.isLoading);

  const [pendingProvider, setPendingProvider] = useState<
    "google" | "apple" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void hydrateFromSupabase();
  }, [hydrateFromSupabase]);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) return;
    navigate(onboardingComplete ? "/home" : "/onboarding", { replace: true });
  }, [authLoading, isAuthenticated, onboardingComplete, navigate]);

  const handleSignIn = async (provider: "google" | "apple") => {
    setError(null);
    setPendingProvider(provider);
    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithApple();
      }
      // Web: browser redirects. Native: returns after Browser.open; session lands on callback.
      if (!isSupabaseConfigured) return;
      const session = useAuthStore.getState().session;
      if (session) {
        navigate(onboardingComplete ? "/home" : "/onboarding", {
          replace: true,
        });
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setPendingProvider(null);
    }
  };

  const isBusy = pendingProvider !== null;

  return (
    <div className="mobile-screen flex h-dvh flex-col overflow-hidden bg-linear-to-b from-[#E2F7F8] via-[#FAF5F3] to-[#FAE3F7]">
      <main className="safe-top safe-bottom flex min-h-0 flex-1 flex-col justify-between px-5 py-8">
        <div className="flex flex-1 flex-col justify-center">
          {/* {!isSupabaseConfigured && (
            <p className="mt-6 rounded-input bg-surface px-4 py-3 font-inter text-sm text-text-secondary shadow-sm">
              Auth is not configured. Add{" "}
              <code className="text-text-primary">VITE_SUPABASE_URL</code> and{" "}
              <code className="text-text-primary">VITE_SUPABASE_ANON_KEY</code> to enable
              sign-in.
            </p>
          )} */}

          {error && (
            <p
              className="mt-4 rounded-input bg-score-avoid-light px-4 py-3 font-inter text-sm text-score-avoid"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center max-w-[80%] mx-auto text-center mb-6">
          <h1 className="font-fraunces text-[1.875rem] leading-[1.1] font-semibold tracking-tight text-text-primary">
            Sign in to continue
          </h1>
          <p className="mt-4 max-w-[320px] font-inter text-[15px] leading-relaxed text-text-secondary">
            Use your Google or Apple account to save your scans and health
            profile.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <SocialAuthButton
            variant="google"
            label={
              pendingProvider === "google"
                ? "Connecting…"
                : "Continue with Google"
            }
            icon={<SiGoogle size={20} />}
            onClick={() => void handleSignIn("google")}
            disabled={isBusy || !isSupabaseConfigured}
          />
          <SocialAuthButton
            variant="apple"
            label={
              pendingProvider === "apple"
                ? "Connecting…"
                : "Continue with Apple"
            }
            icon={<SiApple size={20} />}
            onClick={() => void handleSignIn("apple")}
            disabled={isBusy || !isSupabaseConfigured}
          />

          <p className="pt-2 text-center font-inter text-xs leading-relaxed text-text-secondary">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
