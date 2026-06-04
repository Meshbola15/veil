import { useState } from "react";
import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";
import { ProfileStepHeader } from "@/components/onboarding/profile/ProfileStepHeader";
import type { Pet, PetSpecies } from "@/types/pet";
import { PET_SPECIES_OPTIONS } from "@/types/pet";
import { cn } from "@/lib/utils";

interface ProfilePetsStepProps {
  hasPets: boolean;
  pets: Pet[];
  onHasPetsChange: (hasPets: boolean) => void;
  onPetsChange: (pets: Pet[]) => void;
}

export function ProfilePetsStep({
  hasPets,
  pets,
  onHasPetsChange,
  onPetsChange,
}: ProfilePetsStepProps) {
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
    <div>
      <ProfileStepHeader
        title="Any pets at home?"
        subtitle="We'll flag household products that may not be safe for your pets."
      />

      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => {
            onHasPetsChange(false);
            onPetsChange([]);
          }}
          className={cn(
            "chip flex-1 py-3 text-sm font-medium",
            !hasPets ? "bg-accent text-white" : "bg-surface text-text-secondary shadow-sm",
          )}
        >
          No pets
        </button>
        <button
          type="button"
          onClick={() => onHasPetsChange(true)}
          className={cn(
            "chip flex-1 py-3 text-sm font-medium",
            hasPets ? "bg-accent text-white" : "bg-surface text-text-secondary shadow-sm",
          )}
        >
          I have pets
        </button>
      </div>

      {hasPets && (
        <div className="flex flex-col gap-4">
          {pets.length > 0 && (
            <ul className="flex flex-col gap-2">
              {pets.map((pet) => (
                <li
                  key={pet.id}
                  className="card flex items-center justify-between !p-4"
                >
                  <div>
                    <p className="font-inter text-sm font-semibold text-text-primary">
                      {pet.name}
                    </p>
                    <p className="font-inter text-xs text-text-secondary capitalize">
                      {PET_SPECIES_OPTIONS.find((o) => o.value === pet.species)?.label ??
                        pet.species}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePet(pet.id)}
                    aria-label={`Remove ${pet.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-text-secondary"
                  >
                    <HiOutlineXMark size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="card flex flex-col gap-3 !p-4">
            <p className="font-inter text-sm font-medium text-text-primary">Add a pet</p>
            <div className="flex flex-wrap gap-2">
              {PET_SPECIES_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDraftSpecies(value)}
                  className={cn(
                    "chip px-3 py-2 text-sm",
                    draftSpecies === value
                      ? "bg-accent text-white"
                      : "bg-background text-text-secondary",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Name (optional)"
              className="w-full rounded-input bg-background p-3 font-inter text-sm text-text-primary outline-none placeholder:text-text-disabled"
            />
            <button
              type="button"
              onClick={addPet}
              disabled={!draftSpecies}
              className="flex items-center justify-center gap-2 rounded-chip border border-border bg-background py-3 font-inter text-sm font-medium text-text-primary disabled:opacity-40"
            >
              <HiOutlinePlus size={18} />
              Add pet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
