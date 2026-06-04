import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export type OAuthProvider = "google" | "apple";

function getRedirectUrl(): string {
  return `${window.location.origin}/auth/callback`;
}

function assertSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Sign-in is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.",
    );
  }
  return supabase;
}

export async function signInWithProvider(provider: OAuthProvider): Promise<void> {
  const client = assertSupabase();

  const { data, error } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getRedirectUrl(),
      skipBrowserRedirect: Capacitor.isNativePlatform(),
    },
  });

  if (error) throw error;

  if (Capacitor.isNativePlatform() && data.url) {
    await Browser.open({ url: data.url });
  }
}

export function signInWithGoogle(): Promise<void> {
  return signInWithProvider("google");
}

export function signInWithApple(): Promise<void> {
  return signInWithProvider("apple");
}

export async function signOut(): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
