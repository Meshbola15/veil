# Prompt: Build the Onboarding Flow

## Overview

Build a complete multi-step onboarding flow for the app. The onboarding runs once on first launch and is skipped on all subsequent launches (persisted via Capacitor Preferences). The tone is clean and minimal — every screen gets out of the user's way fast. No walls of text. No unnecessary steps.

---

## Flow Structure

The onboarding is a single full-screen flow with 8 steps. Use a shared `OnboardingLayout` wrapper that handles the progress indicator, step transitions, and navigation. Each step is its own component.

```
Step 1 — Welcome
Step 2 — What the app can do
Step 3 — Name + basic info
Step 4 — Health profile
Step 5 — Dietary preferences
Step 6 — Gamification intro
Step 7 — Camera permission
Step 8 — Notification permission
         → Done → navigate to Home
```

---

## File Structure

```
src/
  screens/
    OnboardingScreen.tsx        ← orchestrator, owns current step state
  components/
    onboarding/
      OnboardingLayout.tsx      ← shared wrapper (progress bar, next button, skip)
      steps/
        WelcomeStep.tsx
        AppFeaturesStep.tsx
        BasicInfoStep.tsx
        HealthProfileStep.tsx
        DietaryPrefsStep.tsx
        GamificationStep.tsx
        CameraPermissionStep.tsx
        NotificationPermissionStep.tsx
  stores/
    useOnboardingStore.ts       ← stores collected data, isComplete flag
  types/
    onboarding.ts               ← OnboardingData type
```

---

## Types

Define in `src/types/onboarding.ts`:

```ts
export interface OnboardingData {
  name: string;
  dateOfBirth: string;       // ISO date string
  allergies: string[];
  medications: string[];
  conditions: string[];
  dietaryPreferences: string[];
  notificationsEnabled: boolean;
  cameraPermissionGranted: boolean;
}
```

---

## Store

`src/stores/useOnboardingStore.ts`

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OnboardingData } from "@/types/onboarding";

interface OnboardingStore {
  isComplete: boolean;
  data: Partial<OnboardingData>;
  setData: (partial: Partial<OnboardingData>) => void;
  complete: () => void;
}
```

Persist `isComplete` and `data` to localStorage (Capacitor Preferences on native). On app launch, if `isComplete === true`, skip onboarding entirely and go straight to Home.

---

## OnboardingScreen.tsx

- Owns `currentStep` state (0-indexed)
- Renders the active step component
- Passes `onNext` callback to each step
- Wraps each step in `OnboardingLayout`
- On final step completion: calls `complete()` from store, navigates to `/home`
- Animate step transitions: slide left on advance, slide right on back — use GSAP

---

## OnboardingLayout.tsx

Props:
```ts
interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;         // default: "Continue"
  nextDisabled?: boolean;
  hideProgress?: boolean;     // true for Welcome step
  hideNext?: boolean;         // true for permission steps (they handle their own CTA)
}
```

Layout structure (top to bottom):
1. Progress bar — thin segmented bar, one segment per step, filled segments in `#1A1A1A`, unfilled in `#E0E0E0`. Hide on Welcome step.
2. Back chevron — top left, hidden on step 0
3. Skip link — top right, shown only on Health Profile and Dietary Prefs steps. Small, muted text, not a button.
4. `children` — the step content, vertically centered in the remaining space
5. Continue button — full width, `bg-accent text-white`, `rounded-chip`, pinned near bottom. Label controlled by `nextLabel` prop.

Background: always `bg-background` (`#E5E5E5`).

---

## Step Specs

### Step 1 — WelcomeStep

- Full screen, no progress bar, no back button
- Large Fraunces headline: **"Know what's in everything."**
- One-line Inter subtext: **"Scan any product. Get answers built for you."**
- Single CTA button: "Get started"
- Small app icon or wordmark centered above the headline

### Step 2 — AppFeaturesStep

- Headline: **"Here's what you can do"**
- 4 feature rows, each with an icon, bold label, and one-line description:
  - 🔍 **Scan anything** — Food, cosmetics, drugs, supplements, household products
  - 🧬 **Your personal score** — Rated for your allergies, meds, and conditions
  - 🔄 **Better alternatives** — Find safer options instantly
  - 💬 **Ask the AI** — Get answers based on what you've scanned
- No interaction needed — just "Continue"

### Step 3 — BasicInfoStep

- Headline: **"Let's personalise your experience"**
- Subtext: **"Your name and age help us tailor your scores."**
- Two inputs:
  - First name (text input)
  - Date of birth (date picker or text input formatted DD/MM/YYYY)
- Continue disabled until name is filled (DOB optional)
- Inputs styled: `bg-surface rounded-input p-4 w-full font-inter`

### Step 4 — HealthProfileStep

- Headline: **"Any allergies, meds, or conditions?"**
- Subtext: **"This is how we make your score personal. You can update this anytime."**
- Three tag-input sections, each with a label and a chip-style tag input:
  - Allergies (e.g. "Peanuts", "Gluten", "Latex")
  - Medications (e.g. "Metformin", "Warfarin")
  - Medical conditions (e.g. "Diabetes", "Hypertension")
- Each section: type to add, press enter or comma to confirm, tap chip × to remove
- Skip link top right — skips this step only, does not skip the whole onboarding
- Tags styled with `.chip` utility class

### Step 5 — DietaryPrefsStep

- Headline: **"Any dietary preferences?"**
- Subtext: **"We'll factor these into your scores."**
- Grid of selectable pill chips — tap to toggle on/off:
  - Vegan, Vegetarian, Pescatarian, Gluten-free, Dairy-free, Halal, Kosher, Keto, Low-sugar, Low-sodium
- Selected chips: `bg-accent text-white`
- Unselected chips: `.chip` default
- Skip link top right

### Step 6 — GamificationStep

- Headline: **"Scan. Learn. Earn."**
- Subtext: **"You earn points for every scan, every product you add, and every streak you keep."**
- 3 stat-style cards in a row (same `.card` class, smaller padding):
  - 🏅 Points — "Earn for every scan"
  - 🔥 Streaks — "Scan daily to keep yours"
  - 🏆 Badges — "Unlock as you go"
- No interaction needed — just "Continue"

### Step 7 — CameraPermissionStep

- Headline: **"Allow camera access"**
- Subtext: **"The scanner needs your camera to read barcodes."**
- Single large CTA: "Allow camera" — triggers `BarcodeScanner.checkPermission({ force: true })`
- If already granted, auto-advance to next step
- If denied: show a small muted note — "You can enable this in Settings later" — and show a "Continue anyway" link
- Use `Capacitor.isNativePlatform()` guard; on web skip this step entirely

### Step 8 — NotificationPermissionStep

- Headline: **"Stay in the loop"**
- Subtext: **"Get reminders to keep your streak and alerts when we add new products you've searched for."**
- Two CTAs stacked:
  - Primary: "Turn on notifications" — triggers native notification permission request
  - Secondary (text link below): "Not now"
- Both advance to the next step regardless of outcome — store the result in `notificationsEnabled`
- On web: skip this step entirely

---

## Transitions

Use GSAP for step transitions. On advance:
```ts
gsap.fromTo(stepRef.current,
  { x: 40, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
);
```
On back:
```ts
gsap.fromTo(stepRef.current,
  { x: -40, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
);
```

---

## Routing

Add `/onboarding` route to your router. On app entry (`App.tsx` or root component), check `useOnboardingStore().isComplete`:
- `false` → redirect to `/onboarding`
- `true` → proceed to `/home`

---

## Rules

- All inputs are controlled components with local state, synced to the store on "Continue"
- No input is required except first name on Step 3
- Health profile and dietary prefs steps both have a visible skip link — do not hide it
- The Continue button is never hidden mid-flow (except on permission steps which have their own CTAs) — it is disabled when input is required and not yet filled
- Every screen uses `max-w-md mx-auto` and `px-6` horizontal padding
- No step should have more than one primary action
- Fix all TypeScript errors before finishing