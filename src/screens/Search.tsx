import React, { useState } from "react";
import DashboardNavigation from "@/components/common/DashboardNavigation";
import DashboardHeader from "@/components/common/DashboardHeader";
import { images } from "@/assets/images";
import { cn } from "@/lib/utils";
import SearchDetailsComponent from "@/components/search/SearchDetailsComponent";
import { filterMockSearchResults } from "@/data/mock";

type Props = {};

const Search = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "1",
      name: "Food",
      // image: images.food,
      bgColor: "bg-pink-300/40",
    },
    {
      id: "2",
      name: "Drink",
      bgColor: "bg-blue-300/40",
    },
    {
      id: "3",
      name: "Cleaning",
      bgColor: "bg-green-300/40",
    },
    {
      id: "4",
      name: "Personal Care",
      bgColor: "bg-yellow-300/40",
    },
    {
      id: "5",
      name: "Home",
      bgColor: "bg-purple-300/40",
    },
    {
      id: "6",
      name: "Other",
      bgColor: "bg-orange-300/40",
    },
  ];

  const SearchBar = () => {
    return (
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Product name, brand or barcode"
          className="w-full p-3 rounded-2xl border border-gray-300"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    );
  };
  return (
    <div className="mobile-screen h-dvh overflow-scroll safe-top safe-bottom bg-background p-4">
      <DashboardHeader headerTitle="Search" showBackButton={false} />
      <main className="flex flex-col gap-4">
        <SearchBar />
        {searchQuery.length > 0 ? (
          <SearchDetailsComponent
            results={filterMockSearchResults(searchQuery)}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={cn(
                  "flex flex-col gap-2 aspect-square rounded-2xl p-4",
                  category.bgColor,
                )}
              >
                <h2 className="text-lg font-bold font-fraunces text-text-primary">
                  {category.name}
                </h2>
              </div>
            ))}
          </div>
        )}
      </main>
      <DashboardNavigation />
    </div>
  );
};

export default Search;
