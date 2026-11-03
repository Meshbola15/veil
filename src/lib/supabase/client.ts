import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let clientPromise: Promise<SupabaseClient | null> | null = null;

/**
 * Lazily loads and creates the Supabase client.
 *
 * `@supabase/supabase-js` is one of the heaviest dependencies in the app, so it
 * is kept out of the initial bundle and only fetched the first time auth is
 * needed. The promise is memoised, so every caller shares one client.
 * Resolves to `null` when Supabase env vars are not configured.
 */
export function getSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null);

  clientPromise ??= import("@supabase/supabase-js")
    .then(({ createClient }) => createClient(supabaseUrl!, supabaseAnonKey!))
    .catch((error: unknown) => {
      // Allow a retry on the next call (e.g. chunk failed on a flaky network).
      clientPromise = null;
      throw error;
    });

  return clientPromise;
}
