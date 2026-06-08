import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthBootstrap } from "@/components/auth/AuthBootstrap";
import { useAuthStore } from "@/stores/useAuthStore";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import AuthCallback from "@/screens/AuthCallback";
import Home from "@/screens/Home";
import LoginPage from "@/screens/signup";
import OnboardingScreen from "@/screens/OnboardingScreen";
import ScanPage from "@/screens/Scan";
import SettingsPage from "@/screens/Settings";
import RatingPage from "./screens/onboarding/rating";
import History from "./screens/history/History";
import Search from "./screens/Search";
import Overview from "./screens/Overview";
import Profile from "./screens/Profile";
import HistoryDetailsPage from "./screens/history/HistoryDetails";
import IngredientDetails from "./screens/ingredient/IngredientDetails";
import { useEffect } from "react";
import { initSafeAreaInsets } from "@/lib/native/safeArea";
import { StatusBar } from "@capacitor/status-bar";
import PetsSettings from "./screens/settings/PetsSettings";
import SettingsLayout from "./screens/settings/SettingsLayout";
import AddPet from "./screens/settings/AddPet";

// function RootRedirect() {
//   const authLoading = useAuthStore((s) => s.isLoading);
//   const isAuthenticated = useAuthStore((s) => Boolean(s.session));
//   const onboardingComplete = useOnboardingStore((s) => s.isComplete);

//   if (authLoading) {
//     return (
//       <div className="mobile-screen flex h-dvh items-center justify-center bg-background">
//         <div
//           className="h-9 w-9 animate-spin rounded-full border-2 border-border border-t-text-primary"
//           aria-label="Loading"
//         />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!onboardingComplete) {
//     return <Navigate to="/onboarding" replace />;
//   }

//   return <Navigate to="/home" replace />;
// }

function App() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    void initSafeAreaInsets().then((dispose) => {
      cleanup = dispose;
    });
    return () => {
      void cleanup?.();
    };
  }, []);

  // useEffect(() => {
  //   void StatusBar.setOverlaysWebView({ overlay: true });
  // }, []);

  return (
    <div className="h-full w-full">
      <AuthBootstrap>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/history" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/scan" element={<ScanPage />} />

            <Route path="/rating" element={<RatingPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/search" element={<Search />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<SettingsPage />} />
              <Route path="pets" element={<PetsSettings />} />
              <Route path="pets/add" element={<AddPet />} />
            </Route>
            <Route path="/history/:id" element={<HistoryDetailsPage />} />
            <Route path="/ingredient-detail" element={<IngredientDetails />} />
          </Routes>
        </BrowserRouter>
      </AuthBootstrap>
    </div>
  );
}

export default App;
