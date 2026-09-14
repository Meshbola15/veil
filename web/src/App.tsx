import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MobileShell } from "./components/navigation/MobileShell";
import { AddProductPage } from "./screens/AddProductPage";
import { HistoryPage } from "./screens/HistoryPage";
import { HomePage } from "./screens/HomePage";
import { HouseholdPage } from "./screens/HouseholdPage";
import { LandingPage } from "./screens/LandingPage";
import { OnboardingPage } from "./screens/OnboardingPage";
import { ProductResultPage } from "./screens/ProductResultPage";
import { ProfilePage } from "./screens/ProfilePage";
import { ScanPage } from "./screens/ScanPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/app" element={<MobileShell />}>
          <Route index element={<HomePage />} />
          <Route path="scan" element={<ScanPage />} />
          <Route path="result/:barcode" element={<ProductResultPage />} />
          <Route path="add/:barcode" element={<AddProductPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="household" element={<HouseholdPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
