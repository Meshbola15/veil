import { memo, useMemo, useState, type ReactNode } from "react";
import type { FlaggedIngredient, ScanResultView } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { images } from "@/assets/images";
import { FlaggedIngredientList } from "@/components/history/FlaggedIngredientList";
import { PetSafetyList } from "@/components/history/PetSafetyList";
import { FavoritesIcon, InfoIcon, ShareIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { getFlaggedIngredient, mockScan } from "@/data/mock";
import ProductDetails from "@/components/common/ProductDetails";

type Props = {
  item?: ScanResultView;
  showBody?: boolean;
};

const TIER_BAR = [
  { key: "high", color: "bg-score-avoid", label: "high concern" },
  { key: "moderate", color: "bg-score-caution", label: "moderate" },
  { key: "low", color: "bg-score-safe", label: "low" },
] as const;

function DotSeparator() {
  return <span className="size-1 rounded-full bg-text-secondary" aria-hidden />;
}

function IngredientsCount({ text }: { text: string }) {
  return (
    <p className="font-inter text-sm font-semibold text-nowrap text-text-neutral">
      {text}
    </p>
  );
}

function ActionCard({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pressable flex w-full items-center gap-2 rounded-2xl bg-white p-4 text-left shadow-card"
    >
      {icon}
      <span className="font-inter text-sm font-semibold text-text-primary">
        {title}
      </span>
    </button>
  );
}

const MainProductDetails = ({ item: itemProp, showBody = true }: Props) => {
  const item = itemProp ?? mockScan;
  const [ingredientsListExpanded, setIngredientsListExpanded] = useState(false);

  const flaggedIngredients = useMemo(
    () =>
      item.flaggedIngredients
        .map((ref) => getFlaggedIngredient({ id: ref.id, name: ref.name }))
        .filter(
          (ingredient): ingredient is FlaggedIngredient =>
            ingredient !== undefined,
        ),
    [item.flaggedIngredients],
  );

  const tierCounts = useMemo(() => {
    const counts = { high: 0, moderate: 0, low: 0 };
    for (const ingredient of flaggedIngredients) {
      counts[ingredient.concernLevel] += 1;
    }
    return counts;
  }, [flaggedIngredients]);

  const flaggedTotal = tierCounts.high + tierCounts.moderate + tierCounts.low;

  return (
    <main className="flex flex-col gap-4">
      <ProductDetails
        item={item}
        showFavourites={false}
        showShare={false}
        isFavourite={false}
      />

      {showBody && (
        <div className="animate-fade-up flex flex-col gap-4">
          <section className="section-container">
            <SectionHeader title="Ingredients" image={images.IngredientsIcon} />

            <div className="flex flex-wrap items-center gap-1">
              <IngredientsCount text={`${flaggedTotal} flagged`} />
              {TIER_BAR.map((tier) => (
                <span key={tier.key} className="flex items-center gap-1">
                  <DotSeparator />
                  <IngredientsCount
                    text={`${tierCounts[tier.key]} ${tier.label}`}
                  />
                </span>
              ))}
            </div>

            {flaggedTotal > 0 && (
              <div
                className="my-4 flex items-center gap-0.5"
                role="img"
                aria-label={`${tierCounts.high} high, ${tierCounts.moderate} moderate, ${tierCounts.low} low concern ingredients`}
              >
                {TIER_BAR.map((tier) =>
                  tierCounts[tier.key] > 0 ? (
                    <div
                      key={tier.key}
                      style={{
                        width: `${(tierCounts[tier.key] / flaggedTotal) * 100}%`,
                      }}
                      className={cn("h-2 rounded-full", tier.color)}
                    />
                  ) : null,
                )}
              </div>
            )}

            <FlaggedIngredientList ingredients={flaggedIngredients} />
          </section>

          <section className="section-container">
            <button
              type="button"
              className="w-full text-left"
              onClick={() => setIngredientsListExpanded((open) => !open)}
              aria-expanded={ingredientsListExpanded}
            >
              <SectionHeader
                title="Ingredients list"
                image={images.IngredientsIcon}
                rightComponent={
                  <span className="font-inter text-xs font-semibold text-text-secondary">
                    {item.ingredients.length}
                  </span>
                }
              />
            </button>
            <p
              className={cn(
                "font-inter text-sm leading-relaxed text-text-secondary",
                !ingredientsListExpanded && "line-clamp-3",
              )}
            >
              {item.ingredients.join(", ")}
            </p>
          </section>

          <section className="section-container gap-2">
            <SectionHeader title="Pet Safety" image={images.PetSafetyIcon} />
            <PetSafetyList petFlags={item.petFlags} />
          </section>

          <div className="flex flex-col gap-2">
            <ActionCard
              title="Add to favourites"
              icon={<FavoritesIcon className="size-5" aria-hidden />}
            />
            <ActionCard
              title="Share"
              icon={<ShareIcon className="size-5" aria-hidden />}
              onClick={
                typeof navigator.share === "function"
                  ? () =>
                      void navigator
                        .share({ title: item.name, text: `${item.name} — ${item.brand}` })
                        .catch(() => undefined)
                  : undefined
              }
            />
            <ActionCard
              title="Report"
              icon={<InfoIcon className="size-5" aria-hidden />}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default memo(MainProductDetails);
