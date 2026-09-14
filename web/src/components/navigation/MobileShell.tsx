import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function MobileShell() {
  return (
    <div className="min-h-dvh bg-[#D7D7D7] md:p-5">
      <div className="relative mx-auto min-h-dvh max-w-md overflow-hidden bg-background md:min-h-[calc(100dvh-2.5rem)] md:rounded-[34px] md:shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
        <main className="min-h-dvh pb-[calc(82px+env(safe-area-inset-bottom))]"><Outlet /></main>
        <BottomNav />
      </div>
    </div>
  );
}
