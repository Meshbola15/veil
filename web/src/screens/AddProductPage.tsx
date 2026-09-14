import { FormEvent, useState } from "react";
import { HiOutlineChevronLeft, HiOutlinePlusCircle } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ScreenCard } from "../components/common/ScreenCard";
import { useProductStore } from "../stores/useProductStore";
import { useScanStore } from "../stores/useScanStore";
import type { ProductCategory } from "../types";

export function AddProductPage() {
  const { barcode = "" } = useParams();
  const navigate = useNavigate();
  const addProduct = useProductStore((state) => state.addProduct);
  const addScan = useScanStore((state) => state.addScan);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<ProductCategory>("food");
  const [ingredients, setIngredients] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !ingredients.trim()) return;
    addProduct({
      id: crypto.randomUUID(),
      barcode,
      name: name.trim(),
      brand: brand.trim() || "Unknown brand",
      category,
      imageEmoji: category === "food" ? "📦" : category === "household" ? "🧴" : category === "cosmetic" ? "🧼" : "💊",
      ingredients: ingredients.split(",").map((item) => item.trim()).filter(Boolean),
      baseScore: 70,
      flags: [],
      metadata: { source: "Added on this device" },
    });
    addScan(barcode);
    navigate(`/app/result/${barcode}`);
  };

  return (
    <div className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between"><Link to={`/app/result/${barcode}`} aria-label="Back" className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineChevronLeft size={18} /></Link><span className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlinePlusCircle size={18} /></span></header>
      <h1 className="mt-6 font-fraunces text-4xl font-bold tracking-[-.035em]">Add this product</h1>
      <p className="mt-1 text-sm text-[#6B6B6B]">Barcode {barcode}. Details remain on this device.</p>

      <ScreenCard className="mt-5">
        <form onSubmit={submit} className="space-y-4">
          <label className="block"><span className="text-sm font-medium">Product name</span><input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl bg-[#F0F0F0] px-4 outline-none focus:ring-2 focus:ring-[#1A1A1A]" /></label>
          <label className="block"><span className="text-sm font-medium">Brand</span><input value={brand} onChange={(event) => setBrand(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl bg-[#F0F0F0] px-4 outline-none focus:ring-2 focus:ring-[#1A1A1A]" /></label>
          <label className="block"><span className="text-sm font-medium">Category</span><select value={category} onChange={(event) => setCategory(event.target.value as ProductCategory)} className="mt-2 min-h-12 w-full rounded-2xl bg-[#F0F0F0] px-4 outline-none"><option value="food">Food</option><option value="cosmetic">Cosmetic</option><option value="drug">Drug</option><option value="supplement">Supplement</option><option value="household">Household</option></select></label>
          <label className="block"><span className="text-sm font-medium">Ingredients</span><textarea required rows={5} value={ingredients} onChange={(event) => setIngredients(event.target.value)} placeholder="Separate ingredients with commas" className="mt-2 w-full resize-none rounded-2xl bg-[#F0F0F0] p-4 outline-none focus:ring-2 focus:ring-[#1A1A1A]" /></label>
          <p className="text-xs leading-5 text-[#6B6B6B]">Custom products receive a neutral demo score because this frontend does not perform medical or ingredient analysis.</p>
          <button className="min-h-12 w-full rounded-full bg-[#1A1A1A] font-semibold text-white">Save and view product</button>
        </form>
      </ScreenCard>
    </div>
  );
}
