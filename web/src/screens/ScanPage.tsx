import { FormEvent, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineClock, HiOutlineKeyboard } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { CameraScanner } from "../components/scanner/CameraScanner";
import { demoProducts } from "../lib/products";
import { useScanStore } from "../stores/useScanStore";

export function ScanPage() {
  const navigate = useNavigate();
  const addScan = useScanStore((state) => state.addScan);
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");

  const openResult = (value: string) => {
    const clean = value.replace(/\D/g, "");
    if (clean.length < 8 || clean.length > 14) {
      setError("Enter the 8–14 digits printed below the barcode.");
      return;
    }
    addScan(clean);
    navigate(`/app/result/${clean}`);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    openResult(barcode);
  };

  return (
    <div className="min-h-dvh bg-[#1A1A1A] px-4 pb-28 text-white">
      <header className="flex items-center justify-between pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
        <Link to="/app" aria-label="Back" className="grid size-9 place-items-center rounded-full bg-white text-[#1A1A1A] shadow-card"><HiOutlineChevronLeft size={18} /></Link>
        <Link to="/app/history" aria-label="Scan history" className="grid size-9 place-items-center rounded-full bg-white text-[#1A1A1A] shadow-card"><HiOutlineClock size={18} /></Link>
      </header>

      <CameraScanner onDetected={openResult} />
      <form onSubmit={submit} className="mt-4 rounded-[30px] bg-white p-5 text-[#1A1A1A] shadow-card">
        <label htmlFor="manual-barcode" className="flex items-center gap-2 text-sm font-semibold"><HiOutlineKeyboard size={18} /> Enter barcode manually</label>
        <div className="mt-3 flex gap-2">
          <input id="manual-barcode" inputMode="numeric" value={barcode} onChange={(event) => { setBarcode(event.target.value); setError(""); }} placeholder="e.g. 051500255162" className="min-w-0 flex-1 rounded-full bg-[#F0F0F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#1A1A1A]" />
          <button className="min-h-12 rounded-full bg-[#1A1A1A] px-5 text-sm font-semibold text-white">Check</button>
        </div>
        {error ? <p role="alert" className="mt-2 text-xs text-[#E53935]">{error}</p> : null}
      </form>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-[.15em] text-white/50">Try a demo product</p>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {demoProducts.map((product) => <button key={product.barcode} onClick={() => openResult(product.barcode)} className="flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#1A1A1A]"><span>{product.imageEmoji}</span>{product.brand}</button>)}
        </div>
      </div>
    </div>
  );
}
