import { Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthBootstrap } from "@/components/auth/AuthBootstrap";
import RouteFallback from "@/components/common/RouteFallback";
import { initSafeAreaInsets } from "@/lib/native/safeArea";
import {
  lazyRoute,
  prefetchRoute,
  whenIdle,
  type RouteKey,
} from "@/lib/routes";

// Route-level code splitting: each screen is its own chunk.
const LoginPage = lazyRoute("login");
const AuthCallback = lazyRoute("authCallback");
const OnboardingScreen = lazyRoute("onboarding");
const Home = lazyRoute("home");
const ScanPage = lazyRoute("scan");
const RatingPage = lazyRoute("rating");
const History = lazyRoute("history");
const HistoryDetailsPage = lazyRoute("historyDetails");
const Search = lazyRoute("search");
const Overview = lazyRoute("overview");
const Profile = lazyRoute("profile");
const SettingsPage = lazyRoute("settings");
const SettingsLayout = lazyRoute("settingsLayout");
const PetsSettings = lazyRoute("petsSettings");
const AddPet = lazyRoute("addPet");
const IngredientDetails = lazyRoute("ingredientDetails");

/** Bottom-nav tabs, warmed in idle time so tab switches feel instant. */
const IDLE_PREFETCH: RouteKey[] = [
  "history",
  "search",
  "profile",
  "overview",
  "historyDetails",
  "scan",
];

function App() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let disposed = false;
    void initSafeAreaInsets().then((dispose) => {
      if (disposed) dispose();
      else cleanup = dispose;
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    // Stagger prefetches so they never compete with the first screen.
    const cancels: Array<() => void> = [];
    IDLE_PREFETCH.forEach((key, index) => {
      cancels.push(whenIdle(() => prefetchRoute(key), 1500 + index * 300));
    });
    return () => cancels.forEach((cancel) => cancel());
  }, []);

  return (
    <div className="h-full w-full">
      <AuthBootstrap>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Navigate to="/history" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/onboarding" element={<OnboardingScreen />} />
              <Route path="/home" element={<Home />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/rating" element={<RatingPage />} />
              <Route path="/history" element={<History />} />
              <Route path="/history/:id" element={<HistoryDetailsPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<SettingsLayout />}>
                <Route index element={<SettingsPage />} />
                <Route path="pets" element={<PetsSettings />} />
                <Route path="pets/add" element={<AddPet />} />
              </Route>
              <Route
                path="/ingredient-detail"
                element={<IngredientDetails />}
              />
              <Route path="*" element={<Navigate to="/history" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthBootstrap>
    </div>
  );
}

export default App;
