import { images } from "@/assets/images";
import Button from "@/components/common/button";
import DashboardHeader from "@/components/common/DashboardHeader";
import DashboardNavigation from "@/components/common/DashboardNavigation";
import DrawerComponent from "@/components/common/Drawer";
import ProductDetails from "@/components/common/ProductDetails";
import { mockScan } from "@/data/mock";
import {
  ArrowDownIcon,
  CloseIcon,
  FavoritesIcon,
  ShareIcon,
} from "@/lib/icons";
import { categories, cn, getScoreTextAndColor } from "@/lib/utils";
import type { ScanResultView } from "@/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {};

const History = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavouritesModalOpen, setIsFavouritesModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // const HistoryDetails = ({ item }: { item: ScanResultView }) => {
  //   return (
  //     <div
  //       key={item.id}
  //       className="flex items-center gap-4 py-4 bg-white rounded-2xl p-4"
  //       onClick={() => navigate(`/history/${item.id}`)}
  //     >
  //       <div className="w-20 h-full">
  //         <img
  //           src={images.emptyBottle}
  //           alt={item.name}
  //           className="w-full h-full object-contain aspect-auto"
  //         />
  //       </div>
  //       <div className="flex flex-col gap-2 w-full">
  //         <h5 className="font-fraunces text-lg text-text-primary font-bold">
  //           {item.name}
  //         </h5>

  //         <div className="flex items-end justify-between w-full mt-5">
  //           <div className="flex items-center gap-2">
  //             <div
  //               className={cn(
  //                 "size-3 rounded-full",
  //                 getScoreTextAndColor(item.score).color,
  //               )}
  //             />

  //             <div>
  //               <p className="text-lg font-bold font-fraunces">
  //                 {item.score}/100
  //               </p>
  //               <p className="text-sm font-bold text-text-secondary font-inter">
  //                 {getScoreTextAndColor(item.score).text}
  //               </p>
  //             </div>
  //           </div>
  //           <div className="flex items-center gap-4">
  //             <FavoritesIcon size={24} />
  //             <ShareIcon size={24} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  function FavouritesModal() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className="absolute top-20 left-2 right-2 bottom-0 safe-top safe-bottom bg-background rounded-t-2xl p-4 shadow-2xl"
      >
        <DashboardHeader
          headerTitle="Favourites"
          showBackButton={false}
          rightComponents={
            <button onClick={() => setIsFavouritesModalOpen(false)}>
              <CloseIcon size={24} />
            </button>
          }
        />
        <div className="flex flex-col gap-4">
          <ProductDetails
            item={mockScan}
            onClick={() => navigate(`/history/${mockScan.id}`)}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mobile-screen h-dvh overflow-scroll safe-top safe-bottom bg-background p-4 relative">
      <DashboardHeader
        customHeader={
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-fraunces text-wrap">
              History
            </h1>
            {/* <button onClick={openFavoutitesModal}>
              <FavoritesIcon size={24} />
            </button> */}
          </div>
        }
        rightComponents={
          <div>
            <button onClick={() => setIsFavouritesModalOpen(true)}>
              <FavoritesIcon size={24} />
            </button>
          </div>
        }
      />

      <div className="flex flex-col gap-4">
        <ProductDetails
          item={mockScan}
          onClick={() => navigate(`/history/${mockScan.id}`)}
          isFavourite={true}
        />
      </div>

      <DashboardNavigation />

      {isFavouritesModalOpen && <FavouritesModal />}
    </div>
  );
};

export default History;
