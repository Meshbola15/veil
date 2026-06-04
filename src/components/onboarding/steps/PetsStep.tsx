import { useState } from "react";
import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";
import { OnboardingQuestionCard } from "@/components/onboarding/OnboardingQuestionCard";
import type { Pet, PetSpecies } from "@/types/pet";
import { PET_SPECIES_OPTIONS } from "@/types/pet";
import { cn } from "@/lib/utils";

interface PetsStepProps {
  hasPets: boolean;
  pets: Pet[];
  onHasPetsChange: (hasPets: boolean) => void;
  onPetsChange: (pets: Pet[]) => void;
}

export function PetsStep({
  hasPets,
  pets,
  onHasPetsChange,
  onPetsChange,
}: PetsStepProps) {
  const [draftSpecies, setDraftSpecies] = useState<PetSpecies | "">("");
  const [draftName, setDraftName] = useState("");

  const addPet = () => {
    if (!draftSpecies) return;
    const pet: Pet = {
      id: crypto.randomUUID(),
      name:
        draftName.trim() ||
        (PET_SPECIES_OPTIONS.find((o) => o.value === draftSpecies)?.label ?? "Pet"),
      species: draftSpecies,
    };
    onPetsChange([...pets, pet]);
    setDraftSpecies("");
    setDraftName("");
  };

  const removePet = (id: string) => {
    onPetsChange(pets.filter((p) => p.id !== id));
  };

  return (
    <>
      <OnboardingQuestionCard
        title="Any pets at home?"
        subtitle="We'll flag household products that may not be safe for your pets."
      />

      <div className="mt-6 flex w-full justify-center gap-2">
        <button
          type="button"
          onClick={() => onHasPetsChange(false)}
          className={cn(
            "touch-target flex-1 rounded-full py-3 font-inter text-sm font-medium shadow-sm",
            !hasPets
              ? "border-2 border-accent bg-surface"
              : "border-2 border-transparent bg-surface text-text-secondary",
          )}
        >
          No pets
        </button>
        <button
          type="button"
          onClick={() => onHasPetsChange(true)}
          className={cn(
            "touch-target flex-1 rounded-full py-3 font-inter text-sm font-medium shadow-sm",
            hasPets
              ? "border-2 border-accent bg-surface"
              : "border-2 border-transparent bg-surface text-text-secondary",
          )}
        >
          I have pets
        </button>
      </div>

      {hasPets && (
        <div className="mt-6 w-full space-y-3 text-left">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="flex items-center justify-between rounded-full bg-surface px-4 py-3 shadow-sm"
            >
              <span className="font-inter text-sm text-text-primary">
                {pet.name} ({PET_SPECIES_OPTIONS.find((o) => o.value === pet.species)?.label})
              </span>
              <button
                type="button"
                onClick={() => removePet(pet.id)}
                aria-label={`Remove ${pet.name}`}
                className="text-text-secondary"
              >
                <HiOutlineXMark className="size-5" />
              </button>
            </div>
          ))}

          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={draftSpecies}
              onChange={(e) => setDraftSpecies(e.target.value as PetSpecies | "")}
              className="flex-1 rounded-full bg-surface px-4 py-3 font-inter text-sm shadow-sm outline-none"
            >
              <option value="">Species</option>
              {PET_SPECIES_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Name (optional)"
              className="flex-1 rounded-full bg-surface px-4 py-3 text-center font-inter text-sm shadow-sm outline-none focus:border-2 focus:border-accent"
            />
          </div>
          <button
            type="button"
            onClick={addPet}
            disabled={!draftSpecies}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-white/40 bg-white/10 py-3 font-inter text-sm font-medium text-white/90 disabled:opacity-50"
          >
            <HiOutlinePlus className="size-4" />
            Add pet
          </button>
        </div>
      )}
    </>
  );
}
