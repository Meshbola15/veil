import { cn } from "@/lib/utils";

type Props = {
  options: readonly string[];
  selected: string[];
  onToggle: (option: string) => void;
};

export function ProfileChipSelect({ options, selected, onToggle }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={cn(
              "rounded-full px-4 py-2.5 font-inter text-sm font-medium transition-colors",
              isSelected
                ? "bg-accent text-white"
                : "bg-background text-text-primary",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
