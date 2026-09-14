import { useMemo, useState } from "react";
import { HiOutlineClock, HiOutlineMagnifyingGlass, HiOutlineQrCode, HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { ProductBubble } from "../components/common/ProductBubble";
import { ScoreBadge } from "../components/common/ScoreBadge";
import { ScreenCard } from "../components/common/ScreenCard";
import { findProduct, scoreFor, tierFor } from "../lib/products";
import { useProductStore } from "../stores/useProductStore";
import { useProfileStore } from "../stores/useProfileStore";
import { useScanStore } from "../stores/useScanStore";
import type { Tier } from "../types";

const filters: Array<"all" | Tier> = ["all", "safe", "caution", "avoid"];

export function HistoryPage() {
  const history = useScanStore((state) => state.history);
  const clearHistory = useScanStore((state) => state.clearHistory);
  const member = useProfileStore((state) => state.members[0]);
  const customProducts = useProductStore((state) => state.customProducts);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Tier>("all");

  const rows = useMemo(() => history.map((scan) => {
    const product = findProduct(scan.barcode, customProducts);
    if (!product) return undefined;
    const score = scoreFor(product, member);
    return { scan, product, score, tier: tierFor(score) };
  }).filter((row): row is NonNullable<typeof row> => Boolean(row))
    .filter((row) => filter === "all" || row.tier === filter)
    .filter((row) => `${row.product.name} ${row.product.brand}`.toLowerCase().includes(query.toLowerCase())), [history, customProducts, member, filter, query]);

  return (
    <div className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineClock size={18} /></span><button onClick={clearHistory} aria-label="Clear history" className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineTrash size={18} /></button></header>
      <h1 className="mt-6 font-fraunces text-4xl font-bold tracking-[-.035em]">Scan history</h1>
      <p className="mt-1 text-sm text-[#6B6B6B]">Everything checked on this device.</p>

      <div className="mt-5 flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-card">
        <HiOutlineMagnifyingGlass size={18} className="text-[#6B6B6B]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none" />
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize ${filter === item ? "bg-[#1A1A1A] text-white" : "bg-[#F0F0F0] text-[#6B6B6B]"}`}>{item}</button>)}
      </div>

      <ScreenCard className="mt-4">
        {rows.length ? rows.map(({ scan, product, score, tier }, index) => (
          <Link key={scan.barcode} to={`/app/result/${scan.barcode}`} className={`flex min-h-[76px] items-center gap-3 ${index ? "border-t border-[#F0F0F0]" : ""}`}>
            <ProductBubble emoji={product.imageEmoji} />
            <span className="min-w-0 flex-1"><span className="block truncate font-semibold">{product.name}</span><span className="mt-1 block truncate text-xs text-[#6B6B6B]">{product.brand} · {new Date(scan.scannedAt).toLocaleDateString()}</span></span>
            <ScoreBadge score={score} tier={tier} compact />
          </Link>
        )) : (
          <div className="py-10 text-center">
            <HiOutlineQrCode size={48} className="mx-auto text-[#D0D0D0]" />
            <p className="mt-4 font-semibold">No matching scans</p>
            <p className="mt-1 text-sm text-[#6B6B6B]">Try another filter or scan a product.</p>
            <Link to="/app/scan" className="mt-5 inline-flex rounded-full bg-[#F0F0F0] px-4 py-2 text-sm font-medium">Open scanner</Link>
          </div>
        )}
      </ScreenCard>
    </div>
  );
}
