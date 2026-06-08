import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineBeaker,
  HiOutlineCamera,
  HiOutlineCreditCard,
  HiOutlineEnvelope,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import Button from "@/components/common/button";
import DashboardNavigation from "@/components/common/DashboardNavigation";
import { ProfileChipSelect } from "@/components/profile/ProfileChipSelect";
import { ProfileEditSheet } from "@/components/profile/ProfileEditSheet";
import { ProfileMenuGroup } from "@/components/profile/ProfileMenuGroup";
import { ProfileMenuRow } from "@/components/profile/ProfileMenuRow";
import { ProfilePetsEditor } from "@/components/profile/ProfilePetsEditor";
import { TagInput } from "@/components/onboarding/TagInput";
import { onboardingToHealthProfile } from "@/lib/profile/syncHealthProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import { useHealthProfileStore } from "@/stores/useHealthProfileStore";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { DIETARY_OPTIONS } from "@/types/onboarding";
import DashboardHeader from "@/components/common/DashboardHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ArrowForwardIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type ProfileSheet =
  | "name"
  | "dietary"
  | "allergies"
  | "medications"
  | "conditions"
  | "pets"
  | "email"
  | "subscription"
  | null;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
}

function summaryTags(tags: string[], empty = "None added"): string {
  if (tags.length === 0) return empty;
  if (tags.length === 1) return tags[0]!;
  return `${tags.length} added`;
}

function summaryDietary(prefs: string[]): string {
  if (prefs.length === 0) return "None selected";
  if (prefs.length <= 2) return prefs.join(", ");
  return `${prefs.length} selected`;
}

function summaryPets(hasPets: boolean, count: number): string {
  if (!hasPets || count === 0) return "No pets";
  return count === 1 ? "1 pet" : `${count} pets`;
}

export default function Profile() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const setHealthProfile = useHealthProfileStore((s) => s.setProfile);

  const data = useOnboardingStore((s) => s.data);
  const setData = useOnboardingStore((s) => s.setData);
  const resetOnboarding = useOnboardingStore((s) => s.reset);

  const [activeSheet, setActiveSheet] = useState<ProfileSheet>(null);
  const [draftName, setDraftName] = useState("");
  const [draftDietary, setDraftDietary] = useState<string[]>([]);
  const [draftAllergies, setDraftAllergies] = useState<string[]>([]);
  const [draftMedications, setDraftMedications] = useState<string[]>([]);
  const [draftConditions, setDraftConditions] = useState<string[]>([]);

  const email = user?.email ?? "Not signed in";
  const name = data.name ?? "Guest";
  const hasPets = data.hasPets ?? (data.pets?.length ?? 0) > 0;
  const pets = data.pets ?? [];

  const persistProfile = useCallback(() => {
    const userId = user?.id ?? "local";
    setHealthProfile(onboardingToHealthProfile(userId, data));
  }, [data, setHealthProfile, user?.id]);

  useEffect(() => {
    persistProfile();
  }, [persistProfile]);

  const openSheet = (sheet: ProfileSheet) => {
    if (sheet === "name") setDraftName(data.name ?? "");
    if (sheet === "dietary") setDraftDietary(data.dietaryPreferences ?? []);
    if (sheet === "allergies") setDraftAllergies(data.allergies ?? []);
    if (sheet === "medications") setDraftMedications(data.medications ?? []);
    if (sheet === "conditions") setDraftConditions(data.conditions ?? []);
    setActiveSheet(sheet);
  };

  const closeSheet = () => setActiveSheet(null);

  const handleProfileImage = (file: File | undefined) => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setData({ profileImageUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChangeEmail = () => {
    const next = window.prompt(
      "Enter your new email address. We'll send a confirmation link.",
      user?.email ?? "",
    );
    if (!next?.trim() || next.trim() === user?.email) return;
    window.alert(
      `A confirmation link would be sent to ${next.trim()}. (Demo — connect to your auth provider.)`,
    );
  };

  const handleManageSubscription = () => {
    window.alert(
      "Subscription management opens here. (Demo — connect to your billing provider.)",
    );
  };

  const handleDeleteAccount = () => {
    if (
      !window.confirm(
        "Delete your account and all profile data? This cannot be undone.",
      )
    ) {
      return;
    }
    resetOnboarding();
    setHealthProfile(null);
    void signOut().then(() => navigate("/login", { replace: true }));
  };

  const handleSignOut = () => {
    void signOut().then(() => navigate("/login", { replace: true }));
  };

  const saveFooter = (onSave: () => void) => (
    <Button onClick={onSave} className="w-full rounded-[9999px] py-4">
      Save changes
    </Button>
  );

  const ProfileSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className="section-container">
        <SectionHeader title={title} />
        <div>{children}</div>
      </div>
    );
  };
  const ProfileCardSection = ({
    title,
    data,
    onclick,
    isLast,
    showChevron = true,
    textColor,
  }: {
    title: string;
    data?: any;
    onclick: () => void;
    isLast: boolean;
    showChevron?: boolean;
    textColor?: string;
  }) => {
    return (
      <div
        onClick={onclick}
        className={cn(
          "py-4 border-b border-border flex items-center justify-between",
          isLast && "border-b-0",
        )}
      >
        <div className="flex items-center gap-2">
          <h6
            className={cn("text-sm font-semibold text-text-primary", textColor)}
          >
            {title}
          </h6>
        </div>
        <div>
          {data && (
            <p className="text-sm font-bold text-text-secondary font-bricolage">
              {data}
            </p>
          )}
          {showChevron && <ArrowForwardIcon className="w-4 h-4" aria-hidden />}
        </div>
      </div>
    );
  };

  const ProfileData = {
    preference: [
      {
        title: "Dietary preferences",
        onclick: () => openSheet("dietary"),
      },
      {
        title: "Allergies",
        onclick: () => openSheet("allergies"),
      },
      {
        title: "Medications",
        onclick: () => openSheet("medications"),
      },
      {
        title: "Health conditions",
        onclick: () => openSheet("conditions"),
      },
      // {
      //   title: "Pets",
      //   onclick: () => navigate("/settings/pets"),
      //   showChevron: true,
      // },
    ],

    helpAndSupport: [
      {
        title: "Privacy policy",
        onclick: () => null,
      },
      {
        title: "Terms of service",
        onclick: () => null,
      },
      {
        title: "Request a feature",
        onclick: () => null,
      },
      {
        title: "Report a bug",
        onclick: () => null,
      },
      {
        title: "App version",
        data: "1.0.0",
        onclick: () => null,
        showChevron: false,
      },
      {
        title: "Delete account",
        onclick: () => handleDeleteAccount(),
        showChevron: false,
        textColor: "text-red-400",
      },
    ],
  };

  const SettingsSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-xs text-text-secondary uppercase font-inter font-semibold">
            {title}
          </p>
        </div>
        <div className="section-container py-0">{children}</div>
      </div>
    );
  };

  const userId = "229239232hbd34";

  return (
    <div className="mobile-screen relative h-dvh overflow-y-scroll safe-top  bg-background p-4 pb-40">
      <DashboardHeader headerTitle="Settings" />
      {/* Overlapping settings sheet */}
      <main className="flex flex-col gap-4">
        <SettingsSection title="Preferences">
          <div>
            {ProfileData.preference.map((item, index) => (
              <ProfileCardSection
                key={item.title}
                title={item.title}
                onclick={item.onclick}
                isLast={index === ProfileData.preference.length - 1}
                showChevron={true}
              />
            ))}
          </div>
        </SettingsSection>

        <SettingsSection title="Pets">
          <div></div>
        </SettingsSection>

        <SettingsSection title="Help and Support">
          {ProfileData.helpAndSupport.map((item, index) => (
            <ProfileCardSection
              key={item.title}
              title={item.title}
              onclick={item.onclick}
              isLast={index === ProfileData.helpAndSupport.length - 1}
              data={item.data}
              showChevron={item.showChevron ?? true}
              textColor={item.textColor}
            />
          ))}
        </SettingsSection>

        <p className="text-sm text-text-secondary uppercase font-inter font-semibold text-center mt-5">
          ID: {userId}
        </p>

        <Button className="w-fit mx-auto py-4 px-8 mt-5" onClick={() => null}>
          <span className="text-base font-bold ">Log out</span>
        </Button>
      </main>

      <DashboardNavigation />
    </div>
  );
}
