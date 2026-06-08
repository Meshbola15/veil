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
  InfoIcon,
  MessageCircleIcon,
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

  const IngredientsCount = ({ text }: { text: string }) => (
    <p className="text-sm capitalize text-nowrap font-inter font-[600] text-text-neutral">
      {text}
    </p>
  );

  const ActionCards = ({
    title,
    icon,
    onClick,
    rightComponent,
  }: {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    rightComponent?: React.ReactNode;
  }) => {
    return (
      <div className="p-4 bg-white rounded-2xl shadow-card flex flex-row gap">
        <div className="flex flex-row gap-2">
          {icon}
          <p className="text-sm font-inter font-[600] text-text-primary">
            {title}
          </p>
        </div>
        {rightComponent && rightComponent}
      </div>
    );
  };

  const [isIngredientsListExpanded, setIsIngredientsListExpanded] =
    useState(false);
  return (
    <main className="flex flex-col gap-4">
      <ProductDetails
        item={item}
        showFavourites={false}
        showShare={false}
        isFavourite={false}
      />

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

              <div className="flex items-center gap-1 flex-wrap">
                <IngredientsCount
                  text={`${ingredientsTeir.high + ingredientsTeir.moderate + ingredientsTeir.low} ingredients`}
                />

                <DotSeperator />
                <IngredientsCount
                  text={`${ingredientsTeir.high} high concern`}
                />

                <DotSeperator />
                <IngredientsCount
                  text={`${ingredientsTeir.moderate} moderate`}
                />

                <DotSeperator />
                <IngredientsCount text={`${ingredientsTeir.low} low`} />
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
              />
              <div className="flex flex-wrap gap-0.5">
                {item.ingredients.map((ingredient, index) => (
                  <div key={ingredient} className="flex items-center">
                    <p className=" text-sm font-inter text-text-secondary">
                      {ingredient}
                    </p>
                    {index < item.ingredients.length - 1 && (
                      <span className="text-sm text-text-secondary">,</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
              <SectionHeader title="Pet Safety" image={images.PetSafetyIcon} />
              <PetSafetyList petFlags={item.petFlags} />
            </div>
            <div className="flex flex-col gap-2">
              <ActionCards
                title="Add to favourites"
                icon={<FavoritesIcon className="size-5" />}
                onClick={() => {}}
              />
              {/* <ActionCards
                title="Ask Veil AI"
                icon={<MessageCircleIcon className="size-5" />}
                onClick={() => {}}
              /> */}
              <ActionCards
                title="Share"
                icon={<ShareIcon className="size-5" />}
                onClick={() => {}}
              />
              <ActionCards
                title="Report"
                icon={<InfoIcon className="size-5" />}
                onClick={() => {}}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MainProductDetails;
