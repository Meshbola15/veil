import { useOnboardingStore } from "@/stores/useOnboardingStore";

import DashboardNavigation from "@/components/common/DashboardNavigation";

export default function Home() {
  const name = useOnboardingStore((s) => s.data.name);

  return (
    <div className="mobile-screen h-[100dvh] overflow-hidden bg-background">
      <div className="safe-top safe-bottom h-full overflow-y-auto px-5 py-8">
        <h1 className="font-bricolage text-2xl font-semibold text-text-primary">
          {name ? `Welcome, ${name}` : "Welcome"}
        </h1>
        <p className="mt-2 font-inter text-sm text-text-secondary">
          Your scanner is ready. Tap scan to look up a product.
        </p>
      </div>

      {/* bottom bar */}
      <DashboardNavigation />
    </div>
  );
}
