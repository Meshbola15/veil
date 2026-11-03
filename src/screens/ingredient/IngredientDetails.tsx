import { images } from "@/assets/images";
import DashboardHeader from "@/components/common/DashboardHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getFlaggedIngredient } from "@/data/mock";
import { cn, formatIngredientName } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SupportingLinkList } from "@/components/ingredient/SupportingLinkList";
import { PET_NAME_ICONS, RiskIcon } from "@/data/constants";
import { InfoIcon } from "@/lib/icons";

const IngredientDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const ingredient = getFlaggedIngredient({
    name,
  });

  return (
    <div className="mobile-screen h-[100dvh] overflow-scroll safe-top safe-bottom bg-background py-4 px-2">
      <DashboardHeader
        headerTitle={
          ingredient
            ? formatIngredientName(ingredient.name)
            : "Ingredient Details"
        }
        showBackButton={true}
        onBack={() => navigate(-1)}
      />

      {!ingredient ? (
        <div className="flex flex-col items-center py-16 text-center">
          <InfoIcon size={48} className="text-[#D0D0D0]" aria-hidden />
          <p className="mt-4 font-inter text-base font-semibold text-text-primary">
            Ingredient not found
          </p>
          <p className="mt-1 font-inter text-sm text-text-secondary">
            We don't have details for this ingredient yet.
          </p>
        </div>
      ) : (
      <main className="flex flex-col gap-4">
        <div className="section-container">
          <SectionHeader title="Associated risks" image={images.caution} />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {ingredient?.tags.map((tag) => (
              <div key={tag.iconTag} className="flex flex-col items-center w-full gap-2">
                <RiskIcon iconTag={tag.iconTag} size={22} className="mt-0.5" />

                <p className="font-inter text-xs text-text-primary text-center">
                  {tag.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-container">
          <SectionHeader title="What is it?" icon={<InfoIcon className="size-5" />} />
          <div className="flex flex-col gap-4">
            {ingredient?.whatIsIt.map((paragraph, index) => (
              <p key={index} className="text-sm text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="section-container">
          <SectionHeader title="Risk to pets" image={images.PetSafetyIcon} />
          <div className="flex flex-col gap-4">
            {ingredient?.riskToPets.map((risk, index) => (
              <div key={risk.species} className={cn("gap-2 pb-4", index < ingredient?.riskToPets.length - 1 && "border-b border-[#F0F0F0]")}>
                <div className="flex items-center gap-2 mb-1">
                  <img src={PET_NAME_ICONS[risk.species]} alt="" aria-hidden width={20} height={20} decoding="async" className="size-5" />
                  <h2 className="font-inter text-sm  capitalize font-bold text-text-primary">
                    {risk.species}
                  </h2>
                </div>
                <p className="font-inter text-sm text-text-secondary">
                  {risk.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {ingredient && ingredient.supportingLinks.length > 0 && (
          <div className="section-container">
            <SectionHeader
              title="Supporting links"
              icon={<InfoIcon className="size-5" />}
            />
            <SupportingLinkList links={ingredient.supportingLinks} />
          </div>
        )}
      </main>
      )}
    </div>
  );
};

export default IngredientDetails;
