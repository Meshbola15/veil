import { Capacitor } from "@capacitor/core";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

export type OAuthProvider = "google" | "apple";

function getRedirectUrl(): string {
  return `${window.location.origin}/auth/callback`;
}

async function requireSupabase() {
  const client = isSupabaseConfigured ? await getSupabase() : null;
  if (!client) {
    throw new Error(
      "Sign-in is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.",
    );
  }
  return client;
}

export async function signInWithProvider(provider: OAuthProvider): Promise<void> {
  const client = await requireSupabase();
  const isNative = Capacitor.isNativePlatform();

  const { data, error } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getRedirectUrl(),
      skipBrowserRedirect: isNative,
    },
  });

  if (error) throw error;

  if (isNative && data.url) {
    const { Browser } = await import("@capacitor/browser");
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
  const client = await getSupabase();
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) throw error;
}
