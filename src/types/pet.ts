export type PetSpecies =
  | "dog"
  | "cat"
  | "bird"
  | "rabbit"
  | "small_mammal"
  | "reptile"
  | "other";

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string;
}

export const PET_SPECIES_OPTIONS: { value: PetSpecies; label: string }[] = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "rabbit", label: "Rabbit" },
  { value: "small_mammal", label: "Small mammal" },
  { value: "reptile", label: "Reptile" },
  { value: "other", label: "Other" },
];
