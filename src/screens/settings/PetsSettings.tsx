import Button from "@/components/common/button";
import DashboardHeader from "@/components/common/DashboardHeader";
import DrawerComponent from "@/components/common/Drawer";
import { PetCard } from "@/components/pets/PetCard";
import type { Pet } from "@/types/pet";
import { HiOutlinePlus } from "react-icons/hi2";
import { TbPaw } from "react-icons/tb";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MOCK_PETS: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    species: "dog",
    breed: "Labrador",
    age: "3 years",
    healthConditions: ["Asthma", "Arthritis"],
  },
  {
    id: "2",
    name: "Lisa",
    species: "cat",
    breed: "Siamese",
    age: "2 years",
    healthConditions: ["Asthma"],
  },
];

export default function PetsSettings() {
  const pets = MOCK_PETS;
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="mobile-screen relative h-dvh overflow-y-scroll safe-top bg-background p-4 pb-40">
      <DashboardHeader headerTitle="Pets" showBackButton />

      <p className="mb-4 font-inter text-sm text-text-secondary">
        Household pets used for product safety checks around your home.
      </p>

      <div className="flex flex-col gap-4">
        {pets.length > 0 ? (
          pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
        ) : (
          <div className="flex flex-col items-center rounded-card bg-white px-5 py-10 text-center shadow-sm">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#F0F0F0] text-[#D0D0D0]"></span>
            <p className="mt-4 font-inter text-base font-semibold text-text-primary">
              No pets added yet
            </p>
            <p className="mt-1 font-inter text-sm text-text-secondary">
              Add a pet to personalize household product safety checks.
            </p>
          </div>
        )}

        <Button onClick={() => navigate("/settings/pets/add")} className="">
          <span className="text-sm font-bold text-white">Add pet</span>
        </Button>

        {/* {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h4>Add a pet</h4>
            </div>
          </motion.div>
        )} */}

        {/* <DrawerComponent open={open} onOpenChange={setOpen}>
          <div></div>
        </DrawerComponent> */}
      </div>
    </div>
  );
}
