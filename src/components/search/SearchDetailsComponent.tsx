import { memo } from "react";
import type { SearchResult } from "@/types";
import { images } from "@/assets/images";
import { getScoreTextAndColor, cn } from "@/lib/utils";

type Props = {
  results: SearchResult[];
};

const SearchDetailsComponent = ({ results }: Props) => {
  return (
    <ul className="section-container gap-0 py-1">
      {results.map((result, index) => {
        const score = getScoreTextAndColor(result.score);
        return (
          <li
            key={result.id}
            className={cn(
              "flex min-h-[72px] items-center gap-3 py-3",
              index < results.length - 1 && "border-b border-[#F0F0F0]",
            )}
          >
            <div className="size-14 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <img
                src={result.imageUrl}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  // Offline / dead image URL: show the neutral product art.
                  const img = event.currentTarget;
                  if (img.src !== images.emptyBottle) img.src = images.emptyBottle;
                }}
                className="size-full object-contain p-2"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-inter text-base font-semibold text-text-primary">
                {result.name}
              </h2>
              <p className="truncate font-inter text-xs text-text-secondary">
                {result.brand}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <span className={cn("size-2 rounded-full", score.color)} aria-hidden />
              <p className="font-bricolage text-sm font-semibold text-text-primary">
                {result.score}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(SearchDetailsComponent);
