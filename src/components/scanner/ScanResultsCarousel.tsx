import { useCallback, useEffect, useRef, useState } from "react";
import MainProductDetails from "@/components/common/MainProductDetails";
import { ScanAddProductSlide } from "@/components/scanner/ScanAddProductSlide";
import { scanResultToView } from "@/lib/scanner/scanResultView";
import type { ScanResult } from "@/types";

type Props = {
  scanResults: ScanResult[];
  expanded: boolean;
  onAddProduct?: () => void;
};

function CarouselDots({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center gap-1.5 bg-white px-4 pt-0.5"
      role="tablist"
      aria-label="Product matches"
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={
            index < count - 1
              ? `Product ${index + 1} of ${count - 1}`
              : "Add new product"
          }
          className={`h-1.5 rounded-full transition-all duration-200 ${
            index === activeIndex
              ? "w-5 bg-text-primary"
              : "w-1.5 bg-text-disabled"
          }`}
        />
      ))}
    </div>
  );
}

export function ScanResultsCarousel({
  scanResults,
  expanded,
  onAddProduct,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = scanResults.length + 1;
  const isAddSlide = activeIndex >= scanResults.length;

  const updateIndexFromScroll = useCallback(() => {
    if (expanded) return;
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(Math.max(index, 0), slideCount - 1));
  }, [expanded, slideCount]);

  useEffect(() => {
    setActiveIndex(0);
    scrollRef.current?.scrollTo({ left: 0, behavior: "instant" });
  }, [scanResults]);

  useEffect(() => {
    if (expanded) return;
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    el.scrollLeft = activeIndex * el.clientWidth;
  }, [expanded, activeIndex]);

  if (expanded) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 [-webkit-overflow-scrolling:touch]"
          style={{ touchAction: "pan-y" }}
        >
          {isAddSlide ? (
            <ScanAddProductSlide onAdd={onAddProduct} />
          ) : (
            <MainProductDetails
              showBody
              item={scanResultToView(scanResults[activeIndex]!)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scrollRef}
        onScroll={updateIndexFromScroll}
        className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: "pan-x" }}
        aria-roledescription="carousel"
      >
        {scanResults.map((result) => (
          <div
            key={result.product.id}
            className="flex h-full min-h-0 w-full shrink-0 snap-start snap-always items-stretch overflow-hidden px-4"
          >
            <div className="flex w-full min-h-0 flex-col justify-center">
              <MainProductDetails
                showBody={false}
                item={scanResultToView(result)}
              />
            </div>
          </div>
        ))}

        <div className="flex h-full min-h-0 w-full shrink-0 snap-start snap-always items-center px-4 py-1">
          <ScanAddProductSlide onAdd={onAddProduct} />
        </div>
      </div>

      <CarouselDots count={slideCount} activeIndex={activeIndex} />
    </div>
  );
}
