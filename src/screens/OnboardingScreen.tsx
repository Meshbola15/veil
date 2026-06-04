import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OnboardingNextButton } from "@/components/onboarding/OnboardingNextButton";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { AgeStep } from "@/components/onboarding/steps/AgeStep";
import { GenderStep } from "@/components/onboarding/steps/GenderStep";
import { HealthStep } from "@/components/onboarding/steps/HealthStep";
import { IntroStep } from "@/components/onboarding/steps/IntroStep";
import { NameStep } from "@/components/onboarding/steps/NameStep";
import { PetsStep } from "@/components/onboarding/steps/PetsStep";
import { WelcomeStep } from "@/components/onboarding/steps/WelcomeStep";
import { useAuthStore } from "@/stores/useAuthStore";
import { useHealthProfileStore } from "@/stores/useHealthProfileStore";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import type { AgeGroup, Gender } from "@/types/onboarding";
import type { Pet } from "@/types/pet";

type ProfileFormState = {
  name: string;
  ageGroup: AgeGroup | "";
  gender: Gender | "";
  allergies: string[];
  medications: string[];
  conditions: string[];
  hasPets: boolean;
  pets: Pet[];
};

const initialProfileForm: ProfileFormState = {
  name: "",
  ageGroup: "",
  gender: "",
  allergies: [],
  medications: [],
  conditions: [],
  hasPets: false,
  pets: [],
};

const STEP_WELCOME = 0;
const STEP_INTRO = 1;
const STEP_AGE = 2;
const STEP_GENDER = 3;
const STEP_NAME = 4;
const STEP_HEALTH = 5;
const STEP_PETS = 6;

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.session?.user.id ?? "");
  const setData = useOnboardingStore((s) => s.setData);
  const complete = useOnboardingStore((s) => s.complete);
  const setProfile = useHealthProfileStore((s) => s.setProfile);

  const [step, setStep] = useState(STEP_WELCOME);
  const [form, setForm] = useState<ProfileFormState>(initialProfileForm);

  const goNext = useCallback(() => setStep((s) => s + 1), []);
  const goBack = useCallback(() => setStep((s) => Math.max(STEP_WELCOME, s - 1)), []);

  const patchForm = useCallback((partial: Partial<ProfileFormState>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  }, []);

  const persistAndFinish = useCallback(() => {
    const payload = {
      name: form.name.trim(),
      ageGroup: form.ageGroup,
      gender: form.gender,
      allergies: form.allergies,
      medications: form.medications,
      conditions: form.conditions,
      dietaryPreferences: [] as string[],
      hasPets: form.hasPets,
      pets: form.hasPets ? form.pets : [],
    };

    setData(payload);
    complete();

    if (userId) {
      setProfile({
        userId,
        name: payload.name,
        ageGroup: payload.ageGroup,
        gender: payload.gender,
        allergies: payload.allergies,
        medications: payload.medications,
        conditions: payload.conditions,
        dietaryPreferences: payload.dietaryPreferences,
        pets: payload.pets,
        updatedAt: new Date().toISOString(),
      });
    }

    navigate("/rating", { replace: true });
  }, [form, setData, complete, userId, setProfile, navigate]);

  const footer = useMemo(() => {
    if (step === STEP_WELCOME) {
      return (
        <div className="w-full max-w-sm mx-auto space-y-3">
          <button
            type="button"
            onClick={goNext}
            className="touch-target w-full rounded-full bg-surface py-4 font-inter text-base font-semibold text-text-primary shadow-sm"
          >
            Get started
          </button>
          <Link
            to="/login"
            className="touch-target flex w-full items-center justify-center rounded-full border border-white/35 bg-white/15 py-4 font-inter text-base font-medium text-white backdrop-blur-sm"
          >
            I already have an account
          </Link>
          <p className="pt-2 text-center font-inter text-[11px] leading-relaxed text-white/80">
            By using Veil, you agree to our terms of use and acknowledge our privacy policy.
          </p>
        </div>
      );
    }

    if (step === STEP_AGE) {
      return (
        <OnboardingNextButton
          onNext={goNext}
          disabled={!form.ageGroup}
          variant="surface"
        />
      );
    }

    if (step === STEP_GENDER) {
      return (
        <OnboardingNextButton
          onNext={goNext}
          disabled={!form.gender}
          variant="surface"
        />
      );
    }

    if (step === STEP_INTRO) {
      return <OnboardingNextButton onNext={goNext} variant="surface" />;
    }

    if (step === STEP_NAME) {
      return (
        <OnboardingNextButton
          onNext={goNext}
          disabled={!form.name.trim()}
          variant="surface"
        />
      );
    }

    if (step === STEP_HEALTH) {
      return (
        <div className="space-y-3">
          <OnboardingNextButton onNext={goNext} variant="surface" />
          <button
            type="button"
            onClick={goNext}
            className="w-full py-2 text-center font-inter text-sm font-medium text-white/85"
          >
            Skip for now
          </button>
        </div>
      );
    }

    if (step === STEP_PETS) {
      return (
        <OnboardingNextButton
          onNext={persistAndFinish}
          label="Finish"
          variant="surface"
        />
      );
    }

    return null;
  }, [step, form, goNext, persistAndFinish]);

  const showBack = step > STEP_WELCOME;
  const scrollable =
    step === STEP_AGE ||
    step === STEP_GENDER ||
    step === STEP_HEALTH ||
    step === STEP_PETS;

  return (
    <OnboardingShell
      onBack={showBack ? goBack : undefined}
      footer={footer}
      scrollable={scrollable}
    >
      {step === STEP_WELCOME && <WelcomeStep />}

      {step === STEP_INTRO && <IntroStep />}

      {step === STEP_AGE && (
        <AgeStep
          value={form.ageGroup}
          onSelect={(ageGroup) => patchForm({ ageGroup })}
        />
      )}

      {step === STEP_GENDER && (
        <GenderStep
          value={form.gender}
          onSelect={(gender) => patchForm({ gender })}
        />
      )}

      {step === STEP_NAME && (
        <NameStep
          value={form.name}
          onChange={(name) => patchForm({ name })}
        />
      )}

      {step === STEP_HEALTH && (
        <HealthStep
          allergies={form.allergies}
          medications={form.medications}
          conditions={form.conditions}
          onAllergiesChange={(allergies) => patchForm({ allergies })}
          onMedicationsChange={(medications) => patchForm({ medications })}
          onConditionsChange={(conditions) => patchForm({ conditions })}
        />
      )}

      {step === STEP_PETS && (
        <PetsStep
          hasPets={form.hasPets}
          pets={form.pets}
          onHasPetsChange={(hasPets) => patchForm({ hasPets })}
          onPetsChange={(pets) => patchForm({ pets })}
        />
      )}
    </OnboardingShell>
  );
}
