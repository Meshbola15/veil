import type { FlaggedIngredient } from "@/types";
import {
  cn,
  formatIngredientName,
  getConcernLevelDotClass,
  getConcernLevelLabel,
} from "@/lib/utils";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface FlaggedIngredientListProps {
  ingredients: FlaggedIngredient[];
  onIngredientInfo?: (ingredient: FlaggedIngredient) => void;
}

export function FlaggedIngredientList({
  ingredients,
  onIngredientInfo,
}: FlaggedIngredientListProps) {
  const navigate = useNavigate();
  const openIngredientDetail = (ingredient: FlaggedIngredient) => {
    onIngredientInfo?.(ingredient);
    navigate(
      `/ingredient-detail?name=${encodeURIComponent(String(ingredient.name))}`,
      { replace: true },
    );
  };

  if (ingredients.length === 0) {
    return (
      <p className="font-inter text-sm text-text-secondary">
        No flagged ingredients for your profile.
      </p>
    );
  }

  return (
    <ul className="-mx-1">
      {ingredients.map((ingredient, index) => (
        <li
          key={ingredient.id}
          className={cn(
            "flex items-center justify-between gap-3 px-1 py-3.5",
            index < ingredients.length - 1 && "border-b border-[#F0F0F0]",
          )}
          onClick={() => openIngredientDetail(ingredient)}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "size-3 rounded-full ",
                getConcernLevelDotClass(ingredient.concernLevel),
              )}
            />

            <div className="min-w-0 flex-1">
              <p className="font-inter text-sm font-semibold leading-snug text-text-primary">
                {formatIngredientName(ingredient.name)}
              </p>
              <p className="mt-0.5 font-inter text-xs leading-snug text-text-secondary">
                {getConcernLevelLabel(ingredient.concernLevel)} ·{" "}
                {ingredient.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openIngredientDetail(ingredient);
            }}
            aria-label={`More about ${formatIngredientName(ingredient.name)}`}
            className="touch-target shrink-0 text-[#C8C8C8] active:text-text-secondary"
          >
            <HiOutlineInformationCircle size={22} strokeWidth={1.75} />
          </button>
        </li>
      ))}
    </ul>
  );
}
