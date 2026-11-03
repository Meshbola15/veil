import { useDeferredValue, useMemo, useState } from "react";
import DashboardNavigation from "@/components/common/DashboardNavigation";
import DashboardHeader from "@/components/common/DashboardHeader";
import SearchDetailsComponent from "@/components/search/SearchDetailsComponent";
import { filterMockSearchResults } from "@/data/mockProducts";
import { CloseIcon, SearchIconOutline } from "@/lib/icons";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "food", name: "Food", bgColor: "bg-pink-300/40" },
  { id: "drink", name: "Drink", bgColor: "bg-blue-300/40" },
  { id: "household", name: "Cleaning", bgColor: "bg-green-300/40" },
  { id: "cosmetic", name: "Personal Care", bgColor: "bg-yellow-300/40" },
] as const;

/**
 * Must live outside `Search`: a component declared inside render is a new type
 * on every keystroke, which remounted the <input> and dropped focus.
 */
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex w-full items-center gap-2 rounded-full bg-surface px-4 py-3 shadow-card">
      <SearchIconOutline className="size-5 shrink-0 text-text-secondary" aria-hidden />
      <input
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        aria-label="Search products"
        placeholder="Product name, brand or barcode"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 bg-transparent font-inter text-sm font-medium text-text-primary outline-none placeholder:text-text-disabled [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background text-text-secondary"
        >
          <CloseIcon size={14} aria-hidden />
        </button>
      )}
    </div>
  );
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Keeps typing responsive: filtering renders at lower priority.
  const deferredQuery = useDeferredValue(searchQuery);
  const results = useMemo(
    () => filterMockSearchResults(deferredQuery),
    [deferredQuery],
  );
  const hasQuery = deferredQuery.trim().length > 0;

  return (
    <div className="mobile-screen safe-top h-dvh overflow-y-auto overscroll-contain bg-background px-4">
      <DashboardHeader headerTitle="Search" />
      <main className="flex flex-col gap-4 pb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        {hasQuery ? (
          results.length > 0 ? (
            <SearchDetailsComponent results={results} />
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <SearchIconOutline size={48} className="text-[#D0D0D0]" aria-hidden />
              <p className="mt-4 font-inter text-base font-semibold text-text-primary">
                No matches
              </p>
              <p className="mt-1 font-inter text-sm text-text-secondary">
                Try a different name, brand, or category.
              </p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSearchQuery(category.id)}
                className={cn(
                  "pressable flex aspect-square flex-col gap-2 rounded-2xl p-4 text-left",
                  category.bgColor,
                )}
              >
                <h2 className="font-bricolage text-lg font-bold text-text-primary">
                  {category.name}
                </h2>
              </button>
            ))}
          </div>
        )}
      </main>
      <DashboardNavigation />
    </div>
  );
};

export default Search;
