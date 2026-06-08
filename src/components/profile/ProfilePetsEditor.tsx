import { useState } from "react";
import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";
import { TagInput } from "@/components/onboarding/TagInput";
import type { Pet, PetSpecies } from "@/types/pet";
import { PET_SPECIES_OPTIONS } from "@/types/pet";
import { cn } from "@/lib/utils";

type Props = {
  hasPets: boolean;
  pets: Pet[];
  onHasPetsChange: (hasPets: boolean) => void;
  onPetsChange: (pets: Pet[]) => void;
};

export function ProfilePetsEditor({
  hasPets,
  pets,
  onHasPetsChange,
  onPetsChange,
}: Props) {
  const [draftSpecies, setDraftSpecies] = useState<PetSpecies | "">("");
  const [draftName, setDraftName] = useState("");
  const [draftBreed, setDraftBreed] = useState("");
  const [draftAge, setDraftAge] = useState("");
  const [draftConditions, setDraftConditions] = useState<string[]>([]);

  const resetDraft = () => {
    setDraftSpecies("");
    setDraftName("");
    setDraftBreed("");
    setDraftAge("");
    setDraftConditions([]);
  };

  const addPet = () => {
    if (!draftSpecies) return;
    const pet: Pet = {
      id: crypto.randomUUID(),
      name:
        draftName.trim() ||
        (PET_SPECIES_OPTIONS.find((o) => o.value === draftSpecies)?.label ??
          "Pet"),
      species: draftSpecies,
      breed: draftBreed.trim() || undefined,
      age: draftAge.trim() || undefined,
      healthConditions:
        draftConditions.length > 0 ? draftConditions : undefined,
    };
    onPetsChange([...pets, pet]);
    onHasPetsChange(true);
    resetDraft();
  };

  const removePet = (id: string) => {
    const next = pets.filter((p) => p.id !== id);
    onPetsChange(next);
    if (next.length === 0) onHasPetsChange(false);
  };

  const updatePet = (id: string, patch: Partial<Pet>) => {
    onPetsChange(pets.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            onHasPetsChange(false);
            onPetsChange([]);
            resetDraft();
          }}
          className={cn(
            "flex-1 rounded-full py-2.5 font-inter text-sm font-medium",
            !hasPets
              ? "bg-accent text-white"
              : "bg-background text-text-secondary",
          )}
        >
          No pets
        </button>
        <button
          type="button"
          onClick={() => onHasPetsChange(true)}
          className={cn(
            "flex-1 rounded-full py-2.5 font-inter text-sm font-medium",
            hasPets
              ? "bg-accent text-white"
              : "bg-background text-text-secondary",
          )}
        >
          I have pets
        </button>
      </div>

      {hasPets && (
        <>
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="flex flex-col gap-3 rounded-2xl bg-background p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-inter text-sm font-semibold text-text-primary">
                    {pet.name}
                  </p>
                  <p className="font-inter text-xs text-text-secondary">
                    {PET_SPECIES_OPTIONS.find((o) => o.value === pet.species)
                      ?.label ?? pet.species}
                    {pet.breed ? ` · ${pet.breed}` : ""}
                    {pet.age ? ` · ${pet.age}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removePet(pet.id)}
                  aria-label={`Remove ${pet.name}`}
                  className="flex size-8 items-center justify-center rounded-full bg-surface text-text-secondary"
                >
                  <HiOutlineXMark size={16} />
                </button>
              </div>
              <TagInput
                label="Health conditions"
                placeholder="e.g. Asthma"
                tags={pet.healthConditions ?? []}
                onChange={(tags) =>
                  updatePet(pet.id, {
                    healthConditions: tags.length > 0 ? tags : undefined,
                  })
                }
              />
            </div>
          ))}

          <div className="flex flex-col gap-3 rounded-2xl border border-border p-4">
            <p className="font-inter text-sm font-semibold text-text-primary">
              Add a pet
            </p>
            <div className="flex flex-wrap gap-2">
              {PET_SPECIES_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDraftSpecies(value)}
                  className={cn(
                    "rounded-full px-3 py-1.5 font-inter text-xs font-medium",
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
              placeholder="Name"
              className="w-full rounded-2xl bg-background px-4 py-3 font-inter text-sm text-text-primary outline-none placeholder:text-text-disabled"
            />
            <input
              type="text"
              value={draftBreed}
              onChange={(e) => setDraftBreed(e.target.value)}
              placeholder="Breed (optional)"
              className="w-full rounded-2xl bg-background px-4 py-3 font-inter text-sm text-text-primary outline-none placeholder:text-text-disabled"
            />
            <input
              type="text"
              value={draftAge}
              onChange={(e) => setDraftAge(e.target.value)}
              placeholder="Age (optional)"
              className="w-full rounded-2xl bg-background px-4 py-3 font-inter text-sm text-text-primary outline-none placeholder:text-text-disabled"
            />
            <TagInput
              label="Health conditions"
              placeholder="e.g. Asthma"
              tags={draftConditions}
              onChange={setDraftConditions}
            />
            <button
              type="button"
              onClick={addPet}
              disabled={!draftSpecies}
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 font-inter text-sm font-medium text-text-primary disabled:opacity-40"
            >
              <HiOutlinePlus size={18} />
              Add pet
            </button>
          </div>
        </>
      )}
    </div>
  );
}
