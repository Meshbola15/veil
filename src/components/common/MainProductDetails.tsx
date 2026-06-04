import React from "react";
import type { ScanResultView } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { images } from "@/assets/images";
import DashboardHeader from "@/components/common/DashboardHeader";
import { FlaggedIngredientList } from "@/components/history/FlaggedIngredientList";
import { PetSafetyList } from "@/components/history/PetSafetyList";
import {
  ChevronDownIcon,
  FavoritesIcon,
  ShareIcon,
  ThreeDotsIcon,
} from "@/lib/icons";
import { cn, getScoreTextAndColor } from "@/lib/utils";
import { getFlaggedIngredient, mockScan } from "@/data/mock";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FlaggedIngredient } from "@/types";
import ProductDetails from "@/components/common/ProductDetails";

type Props = {
  item?: ScanResultView;
  showBody?: boolean;
};

const MainProductDetails = ({ item: itemProp, showBody = true }: Props) => {
  const item = itemProp ?? mockScan;
  const navigate = useNavigate();

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

  const highConcernIngredients = flaggedIngredients.filter(
    (ingredient) => ingredient.concernLevel === "high",
  );
  const moderateConcernIngredients = flaggedIngredients.filter(
    (ingredient) => ingredient.concernLevel === "moderate",
  );
  const lowConcernIngredients = flaggedIngredients.filter(
    (ingredient) => ingredient.concernLevel === "low",
  );

  const ingredientsTeir = {
    high: highConcernIngredients.length,
    moderate: moderateConcernIngredients.length,
    low: lowConcernIngredients.length,
  };

  const DotSeperator = () => {
    return <div className="size-1 rounded-full bg-text-secondary" />;
  };

  const IngredientsTeirBar = {
    high: {
      color: "bg-red-500",
      width: `${(ingredientsTeir.high / (ingredientsTeir.high + ingredientsTeir.moderate + ingredientsTeir.low)) * 100}%`,
    },
    moderate: {
      color: "bg-yellow-500",
      width: `${(ingredientsTeir.moderate / (ingredientsTeir.high + ingredientsTeir.moderate + ingredientsTeir.low)) * 100}%`,
    },
    low: {
      color: "bg-green-500",
      width: `${(ingredientsTeir.low / (ingredientsTeir.high + ingredientsTeir.moderate + ingredientsTeir.low)) * 100}%`,
    },
  };
  const [isMoreOptionsModalOpen, setIsMoreOptionsModalOpen] = useState(false);

  const MoreOptionsModal = () => {
    return (
      <div className="absolute top-0 right-0 bg-white shadow-card rounded-2xl p-4">
        <p>More Options</p>
      </div>
    );
  };

  const [isIngredientsListExpanded, setIsIngredientsListExpanded] =
    useState(false);
  return (
    <main className="flex flex-col gap-4">
      <ProductDetails item={item} />

      <AnimatePresence mode="wait">
        {showBody && (
          <motion.div
            key="product-details-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="gap-4 flex flex-col"
          >
            <div className="section-container">
              <SectionHeader
                title="Ingredients"
                image={images.IngredientsIcon}
              />

              <div className="flex items-center gap-2">
                <p className="text-sm text-text-secondary capitalize">
                  {ingredientsTeir.high +
                    ingredientsTeir.moderate +
                    ingredientsTeir.low}{" "}
                  ingredients
                </p>

                <DotSeperator />
                <p className="text-sm text-text-secondary capitalize">
                  {ingredientsTeir.high} high concern
                </p>
                <DotSeperator />
                <p className="text-sm text-text-secondary capitalize">
                  {ingredientsTeir.moderate} moderate
                </p>
                <DotSeperator />
                <p className="text-sm text-text-secondary capitalize">
                  {ingredientsTeir.low} low
                </p>
              </div>

              <div className="flex items-center gap-0.5 my-4">
                {/* high concern ingredients */}
                <div
                  style={{ width: IngredientsTeirBar.high.width }}
                  className={cn(
                    "h-2 rounded-full",
                    IngredientsTeirBar.high.color,
                  )}
                />
                {/* high concern ingredients */}
                <div
                  style={{ width: IngredientsTeirBar.moderate.width }}
                  className={cn(
                    "h-2 rounded-full",
                    IngredientsTeirBar.moderate.color,
                  )}
                />
                {/* low concern ingredients */}
                <div
                  style={{ width: IngredientsTeirBar.low.width }}
                  className={cn(
                    "h-2 rounded-full",
                    IngredientsTeirBar.low.color,
                  )}
                />
              </div>

              <FlaggedIngredientList
                ingredients={flaggedIngredients}
                onIngredientInfo={(ingredient) => {
                  console.log("ingredient detail", ingredient.id);
                }}
              />
            </div>

            <div
              className="section-container"
              onClick={() =>
                setIsIngredientsListExpanded(!isIngredientsListExpanded)
              }
            >
              <SectionHeader
                title="Ingredients list"
                image={images.IngredientsIcon}
                // rightComponent={
                //   <motion.div
                //     initial={false}
                //     animate={
                //       isIngredientsListExpanded ? "expanded" : "collapsed"
                //     }
                //     variants={{
                //       expanded: { rotate: 180 },
                //       collapsed: { rotate: 0 },
                //     }}
                //   >
                //     <ChevronDownIcon size={24} />
                //   </motion.div>
                // }
              />
              <div className="flex flex-wrap gap-0.5">
                {item.ingredients.map((ingredient, index) => (
                  <div key={ingredient} className="flex items-center">
                    <p className=" text-sm font-inter text-text-primary">
                      {ingredient}
                    </p>
                    {index < item.ingredients.length - 1 && (
                      <span className="text-sm text-text-secondary font-semibold font-inter">
                        ,
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
              <SectionHeader title="Pet Safety" image={images.PetSafetyIcon} />
              <PetSafetyList petFlags={item.petFlags} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MainProductDetails;
