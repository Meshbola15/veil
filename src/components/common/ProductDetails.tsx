import { images } from "@/assets/images";
import { FavoritesIcon, FavoritesSolidIcon, ShareIcon } from "@/lib/icons";
import { cn, getScoreTextAndColor } from "@/lib/utils";
import type { ScanResultView } from "@/types";
import React from "react";

const ProductDetails = ({
  item,
  onClick,
  showFavourites = true,
  showShare = true,
  isFavourite = false,
}: {
  item: ScanResultView;
  onClick?: () => void;
  showFavourites?: boolean;
  showShare?: boolean;
  isFavourite?: boolean;
}) => {
  return (
    <div
      key={item.id}
      className="section-container flex flex-row items-center gap-4"
      onClick={onClick}
    >
      <div className="w-20 h-20">
        <img
          src={images.emptyBottle}
          alt={item.name}
          className="w-full h-full object-contain aspect-auto"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div>
          <h5 className="font-fraunces text-lg text-text-primary font-bold">
            {item.name}
          </h5>

          <p className="text-sm text-neutral-400 font-semibold">{item.brand}</p>
        </div>
        <div className="flex items-end justify-between w-full mt-5">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-3 rounded-full",
                getScoreTextAndColor(item.score).color,
              )}
            />

            <div>
              <p className="text-lg font-bold font-fraunces">
                {item.score}/100
              </p>
              <p className="text-sm font-bold text-text-secondary font-inter">
                {getScoreTextAndColor(item.score).text}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
           {showFavourites && isFavourite ? <FavoritesSolidIcon size={24} className="text-red-500" /> : <FavoritesIcon size={24} />}
            {showShare && <ShareIcon size={24} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
