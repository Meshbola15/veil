import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  HistoryIcon,
  OverviewIcon,
  ProfileIcon,
  ScanIcon,
  SearchIcon,
} from "@/lib/icons";
import { prefetchRoute, ROUTE_KEY_BY_PATH } from "@/lib/routes";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  link: string;
  icon: IconType;
  primary?: boolean;
};

const NAV_ITEMS: readonly NavItem[] = [
  { label: "History", link: "/history", icon: HistoryIcon },
  { label: "Search", link: "/search", icon: SearchIcon },
  { label: "Scan", link: "/scan", icon: ScanIcon, primary: true },
  { label: "Overview", link: "/overview", icon: OverviewIcon },
  { label: "Me", link: "/profile", icon: ProfileIcon },
];

/** Height of the bar content, excluding the safe-area inset. */
const NAV_HEIGHT = "h-16";

function warm(link: string) {
  const key = ROUTE_KEY_BY_PATH[link];
  if (key) prefetchRoute(key);
}

const DashboardNavigation = () => {
  const section = `/${useLocation().pathname.split("/")[1] ?? ""}`;
  const navigate = useNavigate();

  const go = (link: string) => {
    if (link === section) return;
    navigate(link);
  };

  return (
    <>
      {/* In-flow spacer so scrollable screens never hide content under the bar. */}
      <div aria-hidden className={cn(NAV_HEIGHT, "pb-safe shrink-0 box-content")} />

      <nav
        aria-label="Main"
        className="pb-safe fixed inset-x-0 bottom-0 z-40 bg-surface shadow-[0_-1px_0_rgba(0,0,0,0.04),0_-8px_24px_rgba(0,0,0,0.04)]"
      >
        <ul
          className={cn(
            NAV_HEIGHT,
            "mx-auto flex max-w-md items-center justify-between px-3",
          )}
        >
          {NAV_ITEMS.map(({ label, link, icon: Icon, primary }) => {
            const active = section === link;

            if (primary) {
              return (
                <li key={link} className="flex flex-1 justify-center">
                  <button
                    type="button"
                    onClick={() => go(link)}
                    onPointerDown={() => warm(link)}
                    aria-label={label}
                    aria-current={active ? "page" : undefined}
                    className="-mt-7 flex size-14 items-center justify-center rounded-full bg-text-primary text-white shadow-fab transition-transform duration-150 ease-[var(--ease-spring)] active:scale-[0.93]"
                  >
                    <Icon size={24} aria-hidden />
                  </button>
                </li>
              );
            }

            return (
              <li key={link} className="flex flex-1 justify-center">
                <button
                  type="button"
                  onClick={() => go(link)}
                  onPointerDown={() => warm(link)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "touch-target flex flex-col items-center justify-center gap-1 rounded-2xl px-2 transition-colors duration-150 active:scale-95",
                    active ? "text-text-primary" : "text-text-disabled",
                  )}
                >
                  <Icon size={22} aria-hidden />
                  <span className="font-inter text-[11px] font-semibold leading-none">
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default memo(DashboardNavigation);
