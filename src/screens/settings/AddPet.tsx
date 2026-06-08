import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbPaw } from "react-icons/tb";
import DashboardHeader from "@/components/common/DashboardHeader";
import Button from "@/components/common/button";
import { TagInput } from "@/components/onboarding/TagInput";
import { cn } from "@/lib/utils";
import { PET_SPECIES_OPTIONS } from "@/types/pet";
import type { PetSpecies } from "@/types/pet";
import { PET_NAME_ICONS } from "@/data/constants";

const BREEDS_BY_SPECIES: Record<PetSpecies, string[]> = {
  dog: [
    "Labrador",
    "Golden Retriever",
    "German Shepherd",
    "Poodle",
    "Bulldog",
    "Beagle",
    "Pug",
    "Siberian Husky",
    "Rottweiler",
    "Chihuahua",
  ],
  cat: [
    "Persian",
    "Siamese",
    "Maine Coon",
    "British Shorthair",
    "Scottish Fold",
    "Ragdoll",
    "Bengal",
    "Sphynx",
  ],
  bird: ["Parrot", "Cockatiel", "Canary", "Finch", "Budgie", "Lovebird"],
  rabbit: ["Holland Lop", "Netherland Dwarf", "Lionhead", "Rex", "Flemish Giant"],
  small_mammal: ["Hamster", "Guinea Pig", "Rat", "Mouse", "Ferret", "Gerbil"],
  reptile: ["Bearded Dragon", "Leopard Gecko", "Corn Snake", "Ball Python", "Turtle"],
  other: [],
};

const SPECIES_IMAGE_KEY: Record<PetSpecies, string> = {
  dog: "dog",
  cat: "cat",
  bird: "bird",
  rabbit: "rabbit",
  small_mammal: "rat",
  reptile: "snake",
  other: "dog",
};

export default function AddPet() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [species, setSpecies] = useState<PetSpecies | "">("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [healthConditions, setHealthConditions] = useState<string[]>([]);

  const breedOptions = useMemo(
    () => (species ? BREEDS_BY_SPECIES[species] : []),
    [species],
  );

  const avatarImage = species ? PET_NAME_ICONS[SPECIES_IMAGE_KEY[species]] : undefined;
  const canSave = name.trim().length > 0 && species !== "";

  const handleSpeciesChange = (next: PetSpecies) => {
    setSpecies(next);
    setBreed("");
  };

  const handleSave = () => {
    if (!canSave) return;
    // TODO: persist to pet store once available.
    navigate("/settings/pets");
  };

  return (
    <div className="mobile-screen relative h-dvh overflow-y-scroll safe-top bg-background p-4 pb-40">
      <DashboardHeader headerTitle="Add a pet" showBackButton onBack={() => navigate(-1)} />

      <main className="flex flex-col gap-6">
        <div className="flex justify-center pt-2">
          <div className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-card">
            {avatarImage ? (
              <img
                src={avatarImage}
                alt=""
                aria-hidden
                className="size-full object-contain p-3"
              />
            ) : (
              <TbPaw size={32} className="text-text-disabled" aria-hidden />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pet-name" className="font-inter text-sm font-semibold text-text-secondary">
            Name
          </label>
          <input
            id="pet-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your pet's name"
            className="w-full rounded-input border border-neutral-200 bg-white p-4 font-inter text-sm text-text-primary outline-none placeholder:text-text-disabled"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-inter text-sm font-semibold text-text-secondary">
            Species
          </label>
          <div className="flex flex-wrap gap-2">
            {PET_SPECIES_OPTIONS.map((option) => {
              const selected = species === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSpeciesChange(option.value)}
                  className={cn(
                    "h-12 rounded-input px-4 font-inter text-sm font-semibold transition-colors",
                    selected
                      ? "bg-accent text-white"
                      : "border border-neutral-200 bg-white text-text-secondary",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pet-breed" className="font-inter text-sm font-semibold text-text-secondary">
            Breed
          </label>
          <select
            id="pet-breed"
            value={breed}
            disabled={!species}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full rounded-input border border-neutral-200 bg-white p-4 font-inter text-sm text-text-primary outline-none disabled:opacity-50"
          >
            <option value="">
              {species ? "Select a breed" : "Select a species first"}
            </option>
            {breedOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pet-age" className="font-inter text-sm font-semibold text-text-secondary">
            Age
          </label>
          <input
            id="pet-age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 3 years"
            className="w-full rounded-input border border-neutral-200 bg-white p-4 font-inter text-sm text-text-primary outline-none placeholder:text-text-disabled"
          />
        </div>

        <TagInput
          label="Health conditions"
          placeholder="e.g. Asthma, Arthritis"
          tags={healthConditions}
          onChange={setHealthConditions}
        />

        <Button onClick={handleSave} disabled={!canSave} className="mt-2 disabled:opacity-40">
          <span className="font-inter text-sm font-semibold text-white">Save pet</span>
        </Button>
      </main>
    </div>
  );
}
