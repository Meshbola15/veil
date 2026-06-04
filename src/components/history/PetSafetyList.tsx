import type { PetSafetyFlag } from "@/types";
import {
  cn,
  getPetSpeciesLabel,
  getPetTierBadgeClass,
  getPetTierBadgeLabel,
} from "@/lib/utils";
import { IoPawOutline } from "react-icons/io5";
import { PET_NAME_ICONS } from "@/data/constants";

interface PetSafetyListProps {
  petFlags: PetSafetyFlag[];
}

export function PetSafetyList({ petFlags }: PetSafetyListProps) {
  if (petFlags.length === 0) {
    return (
      <p className="font-inter text-sm leading-relaxed text-text-secondary">
        Add pets in your profile to see how this product may affect them.
      </p>
    );
  }

  return (
    <ul>
      {petFlags.map((flag, index) => (
        <li
          key={flag.petId}
          className={cn(
            "flex gap-3 py-4 first:pt-1",
            index < petFlags.length - 1 && "border-b border-[#F0F0F0]",
          )}
        >
          {/* <IoPawOutline
            className="mt-0.5 size-5 shrink-0 text-[#B8B8B8]"
            aria-hidden
          /> */}

          <img
            src={PET_NAME_ICONS[flag.species as keyof typeof PET_NAME_ICONS]}
            alt={flag.species}
            className="size-5"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
              <p className="font-inter text-sm leading-snug">
                <span className="font-semibold text-text-primary">
                  {flag.petName}
                </span>
                <span className="text-text-secondary" aria-hidden>
                  {" "}
                  ·{" "}
                </span>
                <span className="text-text-primary">
                  {getPetSpeciesLabel(flag.species)}
                </span>
              </p>

              <span
                className={cn(
                  "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 font-inter text-xs font-medium leading-none",
                  getPetTierBadgeClass(flag.tier),
                )}
              >
                {getPetTierBadgeLabel(flag.tier)}
              </span>
            </div>

            <p className="mt-2 font-inter text-sm leading-relaxed text-text-secondary">
              {flag.reason}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
