import { memo } from "react";
import { images } from "@/assets/images";
import { FavoritesIcon, FavoritesSolidIcon, ShareIcon } from "@/lib/icons";
import { cn, getScoreTextAndColor } from "@/lib/utils";
import type { ScanResultView } from "@/types";

type Props = {
  item: ScanResultView;
  onClick?: () => void;
  showFavourites?: boolean;
  showShare?: boolean;
  isFavourite?: boolean;
};

const ProductDetails = ({
  item,
  onClick,
  showFavourites = true,
  showShare = true,
  isFavourite = false,
}: Props) => {
  const score = getScoreTextAndColor(item.score);
  const interactive = Boolean(onClick);

  return (
    <div
      className={cn(
        "section-container flex flex-row items-center gap-4",
        interactive && "pressable cursor-pointer",
      )}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <div className="size-20 shrink-0">
        <img
          src={images.emptyBottle}
          alt=""
          width={80}
          height={80}
          decoding="async"
          className="size-full object-contain"
        />
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2">
        <div className="min-w-0">
          <h5 className="line-clamp-2 font-bricolage text-lg font-bold text-text-primary">
            {item.name}
          </h5>
          <p className="truncate text-sm font-semibold text-neutral-400">
            {item.brand}
          </p>
        </div>
        <div className="mt-3 flex w-full items-end justify-between">
          <div className="flex items-center gap-2">
            <span
              className={cn("size-3 shrink-0 rounded-full", score.color)}
              aria-hidden
            />
            <div>
              <p className="font-bricolage text-lg font-bold leading-tight">
                {item.score}
                <span className="text-text-secondary">/100</span>
              </p>
              <p className="font-inter text-sm font-bold text-text-secondary">
                {score.text}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-text-primary">
            {showFavourites &&
              (isFavourite ? (
                <FavoritesSolidIcon
                  size={24}
                  className="text-score-avoid"
                  aria-label="Favourite"
                />
              ) : (
                <FavoritesIcon size={24} aria-hidden />
              ))}
            {showShare && <ShareIcon size={22} aria-hidden />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetails);
