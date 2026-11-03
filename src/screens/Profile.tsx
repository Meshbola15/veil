import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button";
import DashboardHeader from "@/components/common/DashboardHeader";
import DashboardNavigation from "@/components/common/DashboardNavigation";
import { ProfileChipSelect } from "@/components/profile/ProfileChipSelect";
import { TagInput } from "@/components/onboarding/TagInput";
import { ArrowForwardIcon } from "@/lib/icons";
import { onboardingToHealthProfile } from "@/lib/profile/syncHealthProfile";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { useHealthProfileStore } from "@/stores/useHealthProfileStore";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { DIETARY_OPTIONS } from "@/types/onboarding";

// The edit sheet pulls in `vaul`; only download it when a sheet is opened.
const ProfileEditSheet = lazy(() =>
  import("@/components/profile/ProfileEditSheet").then((m) => ({
    default: m.ProfileEditSheet,
  })),
);

const APP_VERSION = "1.0.0";

type ListField = "dietaryPreferences" | "allergies" | "medications" | "conditions";

const SHEETS: Record<
  ListField,
  { title: string; subtitle: string; placeholder?: string }
> = {
  dietaryPreferences: {
    title: "Dietary preferences",
    subtitle: "We'll flag products that don't fit how you eat.",
  },
  allergies: {
    title: "Allergies",
    subtitle: "Ingredients we should always flag for you.",
    placeholder: "e.g. Peanuts, Latex",
  },
  medications: {
    title: "Medications",
    subtitle: "Used to spot possible ingredient interactions.",
    placeholder: "e.g. Ibuprofen",
  },
  conditions: {
    title: "Health conditions",
    subtitle: "Helps personalise your scores.",
    placeholder: "e.g. Eczema, Asthma",
  },
};

function summarise(values: string[] | undefined): string {
  const list = values ?? [];
  if (list.length === 0) return "None";
  if (list.length <= 2) return list.join(", ");
  return `${list.length} added`;
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="px-1 font-inter text-xs font-semibold uppercase tracking-wide text-text-secondary">
        {title}
      </h2>
      <div className="section-container gap-0 py-0">{children}</div>
    </section>
  );
}

function SettingsRow({
  title,
  value,
  onClick,
  isLast,
  showChevron = true,
  destructive = false,
}: {
  title: string;
  value?: string;
  onClick?: () => void;
  isLast?: boolean;
  showChevron?: boolean;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "flex min-h-14 w-full items-center justify-between gap-3 py-4 text-left transition-opacity active:opacity-60 disabled:active:opacity-100",
        !isLast && "border-b border-[#F0F0F0]",
      )}
    >
      <span
        className={cn(
          "font-inter text-sm font-semibold",
          destructive ? "text-score-avoid" : "text-text-primary",
        )}
      >
        {title}
      </span>
      <span className="flex min-w-0 items-center gap-2">
        {value && (
          <span className="truncate font-inter text-sm text-text-secondary">
            {value}
          </span>
        )}
        {showChevron && (
          <ArrowForwardIcon
            className="size-4 shrink-0 text-text-disabled"
            aria-hidden
          />
        )}
      </span>
    </button>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const setHealthProfile = useHealthProfileStore((s) => s.setProfile);

  const data = useOnboardingStore((s) => s.data);
  const setData = useOnboardingStore((s) => s.setData);
  const resetOnboarding = useOnboardingStore((s) => s.reset);

  const [activeSheet, setActiveSheet] = useState<ListField | null>(null);
  const [draft, setDraft] = useState<string[]>([]);
  const [signingOut, setSigningOut] = useState(false);

  const userId = user?.id ?? "local";
  const pets = data.pets ?? [];

  // Keep the derived health profile in sync with edits.
  useEffect(() => {
    setHealthProfile(onboardingToHealthProfile(userId, data));
  }, [data, setHealthProfile, userId]);

  const openSheet = (field: ListField) => {
    setDraft(data[field] ?? []);
    setActiveSheet(field);
  };

  const closeSheet = () => setActiveSheet(null);

  const saveSheet = () => {
    if (activeSheet) setData({ [activeSheet]: draft });
    closeSheet();
  };

  const handleSignOut = () => {
    if (signingOut) return;
    setSigningOut(true);
    void signOut()
      .catch(() => undefined)
      .finally(() => navigate("/login", { replace: true }));
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
    handleSignOut();
  };

  const preferenceRows = Object.keys(SHEETS) as ListField[];
  const sheet = activeSheet ? SHEETS[activeSheet] : null;

  return (
    <div className="mobile-screen safe-top relative h-dvh overflow-y-auto overscroll-contain bg-background px-4">
      <DashboardHeader headerTitle="Settings" />

      <main className="flex flex-col gap-6 pb-6">
        <SettingsSection title="Preferences">
          {preferenceRows.map((field, index) => (
            <SettingsRow
              key={field}
              title={SHEETS[field].title}
              value={summarise(data[field])}
              onClick={() => openSheet(field)}
              isLast={index === preferenceRows.length - 1}
            />
          ))}
        </SettingsSection>

        <SettingsSection title="Household">
          <SettingsRow
            title="Pets"
            value={
              pets.length === 0
                ? "None"
                : pets.length === 1
                  ? "1 pet"
                  : `${pets.length} pets`
            }
            onClick={() => navigate("/settings/pets")}
            isLast
          />
        </SettingsSection>

        <SettingsSection title="Help and support">
          <SettingsRow title="Privacy policy" />
          <SettingsRow title="Terms of service" />
          <SettingsRow title="Request a feature" />
          <SettingsRow title="Report a bug" />
          <SettingsRow title="App version" value={APP_VERSION} showChevron={false} />
          <SettingsRow
            title="Delete account"
            onClick={handleDeleteAccount}
            showChevron={false}
            destructive
            isLast
          />
        </SettingsSection>

        {user?.id && (
          <p className="text-center font-inter text-xs font-semibold uppercase text-text-secondary">
            ID: {user.id}
          </p>
        )}

        <Button
          className="mx-auto w-fit px-8 py-4 disabled:opacity-50"
          onClick={handleSignOut}
          disabled={signingOut}
        >
          <span className="text-base font-bold">
            {signingOut ? "Logging out…" : "Log out"}
          </span>
        </Button>
      </main>

      <DashboardNavigation />

      {sheet && activeSheet && (
        <Suspense fallback={null}>
          <ProfileEditSheet
            open
            onOpenChange={(open) => !open && closeSheet()}
            title={sheet.title}
            subtitle={sheet.subtitle}
            footer={
              <Button onClick={saveSheet} className="w-full rounded-[9999px] py-4">
                Save changes
              </Button>
            }
          >
            {activeSheet === "dietaryPreferences" ? (
              <ProfileChipSelect
                options={DIETARY_OPTIONS}
                selected={draft}
                onToggle={(option) =>
                  setDraft((prev) =>
                    prev.includes(option)
                      ? prev.filter((value) => value !== option)
                      : [...prev, option],
                  )
                }
              />
            ) : (
              <TagInput
                label={sheet.title}
                placeholder={sheet.placeholder ?? ""}
                tags={draft}
                onChange={setDraft}
              />
            )}
          </ProfileEditSheet>
        </Suspense>
      )}
    </div>
  );
}
