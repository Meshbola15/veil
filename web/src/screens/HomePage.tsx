import { HiArrowRight, HiOutlineClock, HiOutlineQrCode, HiOutlineSquares2X2, HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { ProductBubble } from "../components/common/ProductBubble";
import { ScoreBadge } from "../components/common/ScoreBadge";
import { ScreenCard } from "../components/common/ScreenCard";
import { findProduct, scoreFor, tierFor } from "../lib/products";
import { useProductStore } from "../stores/useProductStore";
import { useProfileStore } from "../stores/useProfileStore";
import { useScanStore } from "../stores/useScanStore";

export function HomePage() {
  const name = useProfileStore((state) => state.name);
  const primaryMember = useProfileStore((state) => state.members[0]);
  const history = useScanStore((state) => state.history);
  const customProducts = useProductStore((state) => state.customProducts);
  const recent = history.map((scan) => ({ scan, product: findProduct(scan.barcode, customProducts) })).filter((item) => item.product).slice(0, 3);

  return (
    <div className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between py-2">
        <span className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineSquares2X2 size={18} /></span>
        <Link to="/app/profile" aria-label="Profile" className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineUserCircle size={18} /></Link>
      </header>

      <div className="mt-5">
        <p className="text-sm text-[#6B6B6B]">Good to see you,</p>
        <h1 className="font-fraunces text-4xl font-bold tracking-[-.035em]">{name}</h1>
      </div>

      <ScreenCard className="mt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-[#6B6B6B]">Ready when you are</p>
            <h2 className="mt-1 text-lg font-semibold">What would you like to check?</h2>
            <p className="mt-2 max-w-[230px] text-sm leading-6 text-[#6B6B6B]">Use your phone camera or enter the barcode printed on the product.</p>
          </div>
          <Link to="/app/scan" aria-label="Scan a product" className="grid size-14 shrink-0 place-items-center rounded-full bg-[#1A1A1A] text-white shadow-fab active:scale-[.93]"><HiOutlineQrCode size={24} /></Link>
        </div>
      </ScreenCard>

      <section className="mt-7">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-semibold">Recent scans</h2>
          <Link to="/app/history" className="flex items-center gap-1 text-sm font-medium text-[#6B6B6B]">View all <HiArrowRight size={15} /></Link>
        </div>
        <ScreenCard className="mt-3">
          {recent.length ? recent.map(({ scan, product }, index) => {
            if (!product) return null;
            const score = scoreFor(product, primaryMember);
            return (
              <Link key={scan.barcode} to={`/app/result/${scan.barcode}`} className={`flex min-h-[72px] items-center gap-3 ${index ? "border-t border-[#F0F0F0]" : ""}`}>
                <ProductBubble emoji={product.imageEmoji} />
                <span className="min-w-0 flex-1"><span className="block truncate text-base font-semibold">{product.name}</span><span className="mt-1 flex items-center gap-1 text-xs text-[#6B6B6B]"><HiOutlineClock size={14} /> {new Date(scan.scannedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span></span>
                <ScoreBadge score={score} tier={tierFor(score)} compact />
              </Link>
            );
          }) : <div className="py-8 text-center"><HiOutlineClock size={42} className="mx-auto text-[#D0D0D0]" /><p className="mt-3 font-semibold">No scans yet</p><p className="mt-1 text-sm text-[#6B6B6B]">Your checked products will appear here.</p></div>}
        </ScreenCard>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4">
        <ScreenCard><p className="font-fraunces text-4xl font-bold">{history.length}</p><p className="mt-1 text-xs text-[#6B6B6B]">products checked</p></ScreenCard>
        <ScreenCard><p className="font-fraunces text-4xl font-bold">{useProfileStore.getState().members.length}</p><p className="mt-1 text-xs text-[#6B6B6B]">household profiles</p></ScreenCard>
      </section>
    </div>
  );
}
