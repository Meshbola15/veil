import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/common/DashboardHeader";
import DashboardNavigation from "@/components/common/DashboardNavigation";
import ProductDetails from "@/components/common/ProductDetails";
import { mockScan } from "@/data/mockProducts";
import { CloseIcon, FavoritesIcon } from "@/lib/icons";

function FavouritesSheet({
  onClose,
  onOpenItem,
}: {
  onClose: () => void;
  onOpenItem: (id: string) => void;
}) {
  return (
    <>
      <div
        className="animate-fade-in fixed inset-0 z-50 bg-text-primary/30"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Favourites"
        className="animate-sheet-up safe-bottom fixed inset-x-2 bottom-0 top-20 z-50 mx-auto max-w-md overflow-y-auto rounded-t-3xl bg-background p-4 shadow-modal"
      >
        <DashboardHeader
          headerTitle="Favourites"
          rightComponents={
            <button
              type="button"
              onClick={onClose}
              aria-label="Close favourites"
              className="pressable flex size-10 items-center justify-center rounded-full bg-surface shadow-card"
            >
              <CloseIcon size={20} aria-hidden />
            </button>
          }
        />
        <div className="flex flex-col gap-4">
          <ProductDetails
            item={mockScan}
            isFavourite
            onClick={() => onOpenItem(mockScan.id)}
          />
        </div>
      </div>
    </>
  );
}

const History = () => {
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);
  const navigate = useNavigate();
  const openItem = (id: string) => navigate(`/history/${id}`);

  return (
    <div className="mobile-screen safe-top relative h-dvh overflow-y-auto overscroll-contain bg-background px-4">
      <DashboardHeader
        headerTitle="History"
        rightComponents={
          <button
            type="button"
            onClick={() => setIsFavouritesOpen(true)}
            aria-label="Open favourites"
            className="pressable flex size-10 items-center justify-center rounded-full bg-surface shadow-card"
          >
            <FavoritesIcon size={20} aria-hidden />
          </button>
        }
      />

      <div className="flex flex-col gap-4 pb-4">
        <ProductDetails
          item={mockScan}
          onClick={() => openItem(mockScan.id)}
          isFavourite
        />
      </div>

      <DashboardNavigation />

      {isFavouritesOpen && (
        <FavouritesSheet
          onClose={() => setIsFavouritesOpen(false)}
          onOpenItem={openItem}
        />
      )}
    </div>
  );
};

export default History;
