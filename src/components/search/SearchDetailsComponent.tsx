import React from "react";
import type { SearchResult } from "@/types";

type Props = {
  results: SearchResult[];
};

const SearchDetailsComponent = ({ results }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {results.map((result) => (
        <div key={result.id} className="section-container flex gap-3">
          <img
            src={result.imageUrl}
            alt=""
            className="size-14 shrink-0 rounded-full object-contain p-2"
          />
          <div className="min-w-0">
            <h2 className="font-inter text-base font-semibold text-text-primary">
              {result.name}
            </h2>
            <p className="font-inter text-sm text-text-secondary">
              {result.brand}
            </p>
            <p className="font-fraunces text-sm font-semibold text-text-primary">
              {result.score}/100
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchDetailsComponent;
