interface ProductBubbleProps {
  emoji: string;
  size?: "small" | "large";
}

export function ProductBubble({ emoji, size = "small" }: ProductBubbleProps) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${size === "large" ? "size-24 text-5xl" : "size-14 text-3xl"}`}>
      {emoji}
    </span>
  );
}
