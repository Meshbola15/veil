import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo, useRef, useState } from "react";
import { HiArrowRight, HiOutlineChevronLeft, HiOutlineInformationCircle, HiOutlineQrCode, HiOutlineUser } from "react-icons/hi2";
import { PiPawPrint } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { ProductBubble } from "../components/common/ProductBubble";
import { ScoreBadge } from "../components/common/ScoreBadge";
import { ScreenCard } from "../components/common/ScreenCard";
import { demoProducts, findProduct, memberFlags, scoreFor, tierCopy, tierFor } from "../lib/products";
import { useProductStore } from "../stores/useProductStore";
import { useProfileStore } from "../stores/useProfileStore";

export function ProductResultPage() {
  const { barcode = "" } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const customProducts = useProductStore((state) => state.customProducts);
  const members = useProfileStore((state) => state.members);
  const product = findProduct(barcode, customProducts);
  const [memberId, setMemberId] = useState(() => members[0]?.id ?? "");
  const selectedMember = members.find((member) => member.id === memberId);
  const score = product ? scoreFor(product, selectedMember) : 0;
  const tier = tierFor(score);
  const flags = product ? memberFlags(product, selectedMember) : [];
  const alternative = useMemo(() => {
    if (!product) return undefined;
    return demoProducts
      .filter((item) => item.id !== product.id)
      .sort((a, b) => scoreFor(b, selectedMember) - scoreFor(a, selectedMember))[0];
  }, [product, selectedMember]);

  useGSAP(() => {
    gsap.from("[data-result-section]", { y: 20, opacity: 0, duration: 0.48, stagger: 0.08, ease: "power2.out" });
  }, { scope: containerRef, dependencies: [barcode] });

  if (!product) {
    return (
      <div className="px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex justify-between"><Link to="/app/scan" aria-label="Back" className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineChevronLeft size={18} /></Link><span className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineQrCode size={18} /></span></header>
        <ScreenCard className="mt-16">
          <HiOutlineInformationCircle size={48} className="text-[#D0D0D0]" />
          <h1 className="mt-5 font-fraunces text-3xl font-bold">This product is not in the demo yet.</h1>
          <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">Barcode {barcode}. Add the label details to keep using the complete frontend flow.</p>
          <Link to={`/app/add/${barcode}`} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1A1A1A] px-5 text-sm font-semibold text-white">Add product details <HiArrowRight size={17} /></Link>
        </ScreenCard>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between">
        <Link to="/app/scan" aria-label="Back to scanner" className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineChevronLeft size={18} /></Link>
        <Link to="/app/history" aria-label="History" className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineQrCode size={18} /></Link>
      </header>

      <ScreenCard className="mt-5" data-result-section="">
        <div data-result-section className="flex items-start justify-between gap-4">
          <ProductBubble emoji={product.imageEmoji} size="large" />
          <ScoreBadge score={score} tier={tier} />
        </div>
        <h1 className="mt-6 font-fraunces text-3xl font-bold leading-tight">{product.name}</h1>
        <p className="mt-1 text-sm text-[#6B6B6B]">{product.brand} · {product.category}</p>
      </ScreenCard>

      <section data-result-section className="mt-4">
        <p className="px-1 text-xs font-medium uppercase tracking-[.14em] text-[#6B6B6B]">Personalized for</p>
        <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {members.map((member) => (
            <button key={member.id} onClick={() => setMemberId(member.id)} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium ${member.id === memberId ? "bg-[#1A1A1A] text-white" : "bg-[#F0F0F0] text-[#6B6B6B]"}`}>
              {member.kind === "person" ? <HiOutlineUser size={16} /> : <PiPawPrint size={16} />}{member.name}
            </button>
          ))}
        </div>
      </section>

      <ScreenCard className="mt-4">
        <div data-result-section>
          <h2 className="text-lg font-semibold">{tierCopy(tier)}</h2>
          <p className="mt-1 text-sm text-[#6B6B6B]">Based on {selectedMember?.name ?? "your"} selected profile.</p>
          <div className="mt-5">
            {flags.length ? flags.map((flag, index) => (
              <div key={`${flag.key}-${index}`} className={`py-4 ${index ? "border-t border-[#F0F0F0]" : ""}`}>
                <div className="flex items-center justify-between gap-3"><p className="font-semibold">{flag.ingredient}</p><span className={`text-xs font-semibold ${flag.tier === "avoid" ? "text-[#E53935]" : "text-[#F5A623]"}`}>{flag.tier === "avoid" ? "Review" : "Consider"}</span></div>
                <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">{flag.reason}</p>
              </div>
            )) : <p className="text-sm leading-6 text-[#6B6B6B]">No selected concerns match the listed ingredients for {selectedMember?.name ?? "this profile"}.</p>}
          </div>
        </div>
      </ScreenCard>

      <ScreenCard className="mt-4">
        <div data-result-section>
          <h2 className="text-lg font-semibold">Ingredients</h2>
          <p className="mt-1 text-sm text-[#6B6B6B]">Shown as listed on the product label.</p>
          <div className="mt-4 flex flex-wrap gap-2">{product.ingredients.map((ingredient) => <span key={ingredient} className="rounded-full bg-[#F0F0F0] px-3 py-1.5 text-xs font-medium text-[#6B6B6B]">{ingredient}</span>)}</div>
        </div>
      </ScreenCard>

      <ScreenCard className="mt-4">
        <div data-result-section>
          <h2 className="text-lg font-semibold">Product details</h2>
          <dl className="mt-3">{Object.entries(product.metadata).map(([label, value]) => <div key={label} className="flex items-center justify-between border-t border-[#F0F0F0] py-3 first:border-0"><dt className="text-sm capitalize text-[#6B6B6B]">{label}</dt><dd className="text-sm font-semibold">{value}</dd></div>)}</dl>
        </div>
      </ScreenCard>

      {alternative ? (
        <ScreenCard className="mt-4">
          <div data-result-section className="flex items-center gap-3">
            <ProductBubble emoji={alternative.imageEmoji} />
            <div className="min-w-0 flex-1"><p className="text-xs text-[#6B6B6B]">A stronger profile match</p><p className="truncate font-semibold">{alternative.name}</p><p className="mt-1 text-xs text-[#6B6B6B]">{alternative.brand}</p></div>
            <Link to={`/app/result/${alternative.barcode}`} aria-label={`View ${alternative.name}`} className="grid size-10 place-items-center rounded-full bg-[#F0F0F0]"><HiArrowRight size={17} /></Link>
          </div>
        </ScreenCard>
      ) : null}
    </div>
  );
}
