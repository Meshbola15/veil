import { type KeyboardEvent, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ label, placeholder, tags, onChange }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value || tags.includes(value)) return;
    onChange([...tags, value]);
    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(input);
    }
    if (event.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter text-sm font-medium text-text-primary">{label}</label>
      <div className="flex min-h-[52px] flex-wrap gap-2 rounded-input bg-surface p-3 shadow-sm">
        {tags.map((tag) => (
          <span key={tag} className="chip gap-1 bg-background text-text-primary">
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="text-text-secondary hover:text-text-primary"
            >
              <HiOutlineXMark size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="min-w-[120px] flex-1 bg-transparent font-inter text-sm text-text-primary outline-none placeholder:text-text-disabled"
        />
      </div>
    </div>
  );
}
