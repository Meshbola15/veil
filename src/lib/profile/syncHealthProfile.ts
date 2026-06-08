import type { HealthProfile } from "@/types";
import type { OnboardingData } from "@/types/onboarding";

export function onboardingToHealthProfile(
  userId: string,
  data: Partial<OnboardingData>,
): HealthProfile {
  return {
    userId,
    name: data.name ?? "",
    ageGroup: data.ageGroup ?? "",
    gender: data.gender ?? "",
    allergies: data.allergies ?? [],
    medications: data.medications ?? [],
    conditions: data.conditions ?? [],
    dietaryPreferences: data.dietaryPreferences ?? [],
    pets: data.pets ?? [],
    updatedAt: new Date().toISOString(),
  };
}
