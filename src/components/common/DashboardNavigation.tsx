import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HistoryIcon,
  HomeIcon,
  ProfileIcon,
  ScanIcon,
  SearchIcon,
  SettingsIcon,
  SettingsIconOutline,
  OverviewIcon,
} from "@/lib/icons";
import Button from "./button";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

const DashboardNavigation = (props: Props) => {
  const [currentTab] = useState("home");
  const pathname = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();
  const bottombarItems = [
    {
      icon: <HistoryIcon size={24} />,
      label: "History",
      link: "/history",
    },
    {
      icon: <SearchIcon size={24} />,
      label: "Search",
      link: "/search",
    },
    {
      label: "Scan",
      icon: <ScanIcon size={24} />,
      link: "/scan",
    },

    {
      icon: <OverviewIcon size={24} />,
      label: "Overview",
      link: "/overview",
    },

    {
      icon: <ProfileIcon size={24} />,
      label: "Me",
      link: "/profile",
    },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
      <div className="relative">
        <div className="flex items-center justify-between">
          {bottombarItems.map((item) => (
            <div className="flex items-center justify-center flex-col gap-1">
              <button
                key={item.label}
                onClick={() => navigate(item.link ?? "")}
                className={cn(
                  "text-4xl p-0 flex items-center justify-center rounded-full bg-none border-none",
                  pathname === item.link?.split("/")[1]
                    ? "text-accent"
                    : "text-neutral-500",
                )}
              >
                {item.icon}
              </button>
              <p
                className={cn(
                  "text-[12px] font-semibold",
                  pathname === item.link?.split("/")[1]
                    ? "text-accent"
                    : "text-neutral-500",
                )}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigation;
