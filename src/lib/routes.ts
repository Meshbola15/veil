import { lazy, type ComponentType } from "react";

type Loader = () => Promise<{ default: ComponentType }>;

/**
 * Route chunk loaders. Each screen is split into its own chunk so the first
 * paint only downloads the code for the screen being shown.
 *
 * Kept in one map so the same loader can be used both by `React.lazy` and by
 * `prefetchRoute` (e.g. warming the bottom-nav tabs while the app is idle).
 */
export const routeLoaders = {
  login: () => import("@/screens/signup"),
  authCallback: () => import("@/screens/AuthCallback"),
  onboarding: () => import("@/screens/OnboardingScreen"),
  home: () => import("@/screens/Home"),
  scan: () => import("@/screens/Scan"),
  rating: () => import("@/screens/onboarding/rating"),
  history: () => import("@/screens/history/History"),
  historyDetails: () => import("@/screens/history/HistoryDetails"),
  search: () => import("@/screens/Search"),
  overview: () => import("@/screens/Overview"),
  profile: () => import("@/screens/Profile"),
  settings: () => import("@/screens/Settings"),
  settingsLayout: () => import("@/screens/settings/SettingsLayout"),
  petsSettings: () => import("@/screens/settings/PetsSettings"),
  addPet: () => import("@/screens/settings/AddPet"),
  ingredientDetails: () => import("@/screens/ingredient/IngredientDetails"),
} satisfies Record<string, Loader>;

export type RouteKey = keyof typeof routeLoaders;

const prefetched = new Set<RouteKey>();

/** Start downloading a route chunk ahead of navigation. Safe to call often. */
export function prefetchRoute(key: RouteKey): void {
  if (prefetched.has(key)) return;
  prefetched.add(key);
  routeLoaders[key]().catch(() => {
    // Network hiccup: allow a later retry.
    prefetched.delete(key);
  });
}

/** Maps a pathname's first segment to its route chunk. */
export const ROUTE_KEY_BY_PATH: Record<string, RouteKey> = {
  "/history": "history",
  "/search": "search",
  "/scan": "scan",
  "/overview": "overview",
  "/profile": "profile",
  "/home": "home",
};

export function lazyRoute(key: RouteKey) {
  return lazy(routeLoaders[key]);
}

/** Run work when the main thread is idle (falls back to a short timeout). */
export function whenIdle(callback: () => void, timeout = 1500): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(callback, 200);
  return () => window.clearTimeout(id);
}
