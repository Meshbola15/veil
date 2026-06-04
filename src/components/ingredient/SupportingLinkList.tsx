import { cn } from "@/lib/utils";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineDocumentText,
} from "react-icons/hi2";

export interface SupportingLink {
  name: string;
  title: string;
  url: string;
}

interface SupportingLinkListProps {
  links: SupportingLink[];
}

function formatSourceLabel(name: string): string {
  return name.replace(/\s+-\s+/g, " — ");
}

export function SupportingLinkList({ links }: SupportingLinkListProps) {
  if (links.length === 0) {
    return (
      <p className="font-inter text-sm text-text-secondary">
        No sources listed for this ingredient yet.
      </p>
    );
  }

  return (
    <ul className="-mx-1" role="list">
      {links.map((link, index) => (
        <li key={`${link.url}-${index}`}>
          <a
            href={link.url.trim()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 rounded-lg px-1 py-3.5",
              "transition-colors active:bg-background",
              index < links.length - 1 && "border-b border-[#F0F0F0]",
            )}
          >
            <HiOutlineDocumentText
              className="mt-0.5 size-[22px] shrink-0 self-start text-[#B8B8B8]"
              strokeWidth={1.5}
              aria-hidden
            />

            <div className="min-w-0 flex-1">
              <p className="font-inter text-sm font-semibold leading-snug text-text-primary">
                {formatSourceLabel(link.name)}
              </p>
              <p className="mt-0.5 font-inter text-xs leading-snug text-text-secondary">
                {link.title}
              </p>
            </div>

            <HiOutlineArrowTopRightOnSquare
              className="size-[18px] shrink-0 text-[#C8C8C8]"
              strokeWidth={1.75}
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
