import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types/general";

const Button = ({ className, children, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-accent text-white px-4 py-4 rounded-chip flex items-center justify-center gap-2",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
