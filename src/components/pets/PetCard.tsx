import type { Pet } from "@/types/pet";
import { PET_SPECIES_OPTIONS } from "@/types/pet";
import { PET_NAME_ICONS } from "@/data/constants";

type Props = {
  pet: Pet;
  onClick?: () => void;
};

function getSpeciesLabel(species: Pet["species"]) {
  return (
    PET_SPECIES_OPTIONS.find((option) => option.value === species)?.label ??
    species
  );
}

function getPetSummary(pet: Pet) {
  const speciesLabel = getSpeciesLabel(pet.species);
  const details = [speciesLabel, pet.breed, pet.age].filter(Boolean);
  return details.join(" · ");
}

export function PetCard({ pet, onClick }: Props) {
  const conditions = pet.healthConditions ?? [];
  const summary = getPetSummary(pet);

  const content = (
    <>
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full">
          {/* <TbPaw size={22} className="text-text-secondary" aria-hidden /> */}

          <img
            src={pet.image ?? PET_NAME_ICONS[pet.species.toLocaleLowerCase()]}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-bricolage text-xl font-bold text-text-primary">
            {pet.name}
          </h2>
          <p className="mt-0.5 font-inter text-sm text-text-secondary">
            {summary}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-[#F0F0F0] pt-4">
        <p className="font-inter text-xs text-text-secondary">
          Health conditions
        </p>
        {conditions.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {conditions.map((condition) => (
              <span
                key={condition}
                className="rounded-full bg-[#F0F0F0] px-3 py-1 font-inter text-xs text-text-secondary"
              >
                {condition}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-1 font-inter text-sm text-text-secondary">
            None noted
          </p>
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-card bg-white p-5 text-left shadow-sm active:opacity-90"
      >
        {content}
      </button>
    );
  }

  return <div className="rounded-card bg-white p-5 shadow-sm">{content}</div>;
}
