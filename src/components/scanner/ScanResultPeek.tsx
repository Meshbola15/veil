import {
  SCAN_PEEK_TIER_LABELS,
  SCORE_TIER_COLORS,
} from "@/lib/scanner/scoreDisplay";
import type { ScanResult } from "@/types";
import { TbBottle } from "react-icons/tb";

interface ScanResultPeekProps {
  scanResult: ScanResult;
}

export function ScanResultPeek({ scanResult }: ScanResultPeekProps) {
  const { product, score, tier } = scanResult;

  return (
    <div className="flex gap-3 px-5 pb-5 pt-0.5">
      <div className="flex h-[72px] w-[56px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EFEFEF]">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt=""
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <TbBottle size={26} className="text-[#B8B8B8]" strokeWidth={1.5} />
        )}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <h2 className="line-clamp-2 font-inter text-[15px] font-semibold leading-snug text-text-primary">
          {product.name}
        </h2>
        <p className="mt-0.5 truncate font-inter text-sm text-text-secondary">
          {product.brand}
        </p>

        <div className="mt-2.5 flex items-start gap-2">
          <span
            className="mt-2 size-2 shrink-0 rounded-full"
            style={{ backgroundColor: SCORE_TIER_COLORS[tier] }}
            aria-hidden
          />
          <div>
            <p className="font-inter text-base font-semibold leading-none text-text-primary">
              {score}
              <span className="font-normal text-text-secondary">/100</span>
            </p>
            <p className="mt-1 font-inter text-sm text-text-secondary">
              {SCAN_PEEK_TIER_LABELS[tier]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
