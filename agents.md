# Cursor AI Rules — Veil

You are an expert React and TypeScript engineer helping me build **Veil** — a health and safety scanner that lifts the veil on what's really in the products around you. Users scan or search for food, cosmetics, household products, drugs, and supplements to get personalized safety scores, ingredient breakdowns, better alternatives, AI-powered guidance, and pet safety checks — all based on their unique health and household profile.

Read this file before every task. Follow it without exception.

---

## Project Overview

We are building **Veil** — a mobile-first universal product scanner using React, TypeScript, and TailwindCSS, packaged for iOS and Android with Capacitor.js.

### Core Features

- **Barcode Scanner** — scan any product (food, cosmetics, drugs, supplements, household products)
- **Ingredient Breakdown** — plain-language explanation of every ingredient in a product
- **Personalized Score** — red / yellow / green score based on the user's health profile, not a universal rating
- **Alternative Suggestions** — smarter alternatives ranked by personalized score delta
- **Health Profile** — allergies, medications, medical conditions, dietary preferences
- **Community Inventory** — users log products they own or find; earn points and badges for contributing
- **Gamification** — points, streaks, badges for scanning, contributing, and completing profile
- **AI Chat** — contextual AI assistant aware of the user's scan history and health profile
- **Search** — text search across the global product catalog when scanning isn't possible
- **Scan History** — full log of every product the user has scanned
- **Pet Safety** — flag household products, cosmetics, and cleaning products that are unsafe for the user's pets based on species

Keep implementations simple and readable. Build the smallest useful version first.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 |
| Language | TypeScript (strict) |
| Styling | TailwindCSS |
| State | Zustand |
| Icons | React Icons |
| Mobile packaging | Capacitor.js |
| Barcode scanning | `@capacitor-community/barcode-scanner` |
| Routing | React Router v6 |
| Animation | GSAP |

**Do not introduce new major libraries without a strong reason. Ask before installing anything new.**

---

## Design System

### Inspiration

Veil follows a clean, minimal, editorial aesthetic — light background, white cards, generous whitespace, and strong typographic hierarchy. Every screen should feel calm and trustworthy, not clinical or alarming. The design communicates safety, clarity, and the feeling of finally seeing the truth about what's around you.

### Typography

- **Fraunces** — scores, large display numbers, product names, hero headings
- **Inter** — body text, labels, UI copy, captions, ingredient names

Apply these consistently. Never swap them arbitrarily.

```css
font-fraunces  /* Fraunces serif */
font-inter     /* Inter sans-serif */
```

### Color Palette

```
Background:      Light gray   #E5E5E5
Card surface:    White        #FFFFFF
Primary text:    Near-black   #1A1A1A
Secondary text:  Muted gray   #6B6B6B

Score — Safe:    Green        #4CAF50
Score — Caution: Amber        #F5A623
Score — Avoid:   Red          #E53935

Accent neutral:  Slate        #64748B
```

**Rules:**
- Background is always `#E5E5E5`, never pure white
- Score colors (green / amber / red) appear only on score badges, progress arcs, and data indicators — never as backgrounds or card fills
- No gradients on backgrounds or cards
- No dark mode (light-mode only for now)
- Never use score colors to label a product "bad" — always frame as "may not suit your profile"

### Spacing and Layout

- Generous whitespace — the design breathes
- Cards: `p-5` or `p-6` padding
- Section gaps: `gap-4` between cards, `gap-6` between sections
- Max content width: `max-w-md mx-auto` (mobile-first, centered)
- All cards: `rounded-2xl` + subtle shadow `shadow-sm`

### Card Rule

Every card shares the same base component:

```tsx
type Props = {
  children: React.ReactNode;
  className?: string;
  headerContent?: React.ReactNode;
  headerContentClassName?: string;
  onClick?: () => void;
};

const ScreenCard = ({ children, className, headerContent, headerContentClassName, onClick }: Props) => {
  return (
    <div onClick={onClick} className={cn("rounded-[30px] bg-white w-full shadow-sm", className)}>
      {headerContent && <div className={cn("p-2", headerContentClassName)}>{headerContent}</div>}
      <div className="p-[20px]">{children}</div>
    </div>
  );
};
```

No card should have a border, heavy shadow, or background color other than white. No exceptions without explicit approval.

### Score Badge

The personalized score is always displayed as a circular arc with a color-coded ring and a Fraunces number at the center. Never show a score as a plain text label or a bar. The arc is SVG-based with GSAP entrance animation.

Score ranges:
- 75–100 → Green `#4CAF50` → "Great match for you"
- 40–74 → Amber `#F5A623` → "Some things to consider"
- 0–39 → Red `#E53935` → "May not suit your profile"

### Progress Components

SVG-based — built with `stroke-dasharray` and `stroke-dashoffset`. Do not use third-party progress libraries.

- Circular arcs for the personalized score
- Segmented rings for ingredient category breakdowns
- Animate with GSAP on mount

---

## Visual Patterns

This section defines the exact visual language of the app. Every component built must follow these patterns precisely. Do not deviate, approximate, or substitute with generic UI patterns.

### Reference Aesthetic

The app follows a specific design language: light warm-gray background, floating white cards, strong typographic weight contrast, minimal chrome, and zero decoration. It should feel like a calm, premium tool — not a dashboard, not a health app template, not a generic SaaS UI.

---

### Background

- Always `#E5E5E5` — a warm light gray, never pure white, never off-white
- No texture, no pattern, no gradient
- The background is the breathing room between cards — never fill it

---

### Cards

- Background: `#FFFFFF`
- Border radius: `30px` — noticeably rounded, not subtly rounded
- Shadow: `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` — barely visible, just enough to lift the card off the background
- No border, no outline, no colored fill
- Padding: `20px` on all sides
- Cards never touch the screen edges — always `px-4` or `px-5` horizontal margin on the screen container

---

### Typography Hierarchy

The design uses extreme weight contrast between headline and supporting text:

| Role | Font | Weight | Size | Color |
|---|---|---|---|---|
| Hero headline | Fraunces | 700 | `2rem`+ | `#1A1A1A` |
| Section headline | Inter | 700 | `1.125rem` | `#1A1A1A` |
| Card title | Inter | 600 | `1rem` | `#1A1A1A` |
| Supporting subtitle | Inter | 400 | `0.875rem` | `#6B6B6B` |
| Label / caption | Inter | 400 | `0.75rem` | `#6B6B6B` |
| Score / data number | Fraunces | 600–700 | contextual | `#1A1A1A` or score color |

- Headlines are heavy and left-aligned — they anchor the screen
- Subtitles sit directly below headlines with no gap (`mt-1` at most), visually attached
- Never center-align body text. Center-align only single-line hero headlines on empty states.

---

### Product Image Bubbles

When displaying a product image (scan history, alternatives, inventory lists):

- Circular container: `w-14 h-14` or `w-16 h-16`
- Background: `#FFFFFF`
- Border radius: `9999px` (full circle)
- Shadow: `0 2px 8px rgba(0,0,0,0.08)`
- Image fills the circle, `object-fit: contain`, with `p-2` padding inside so the image does not touch the edge
- Multiple product bubbles in a row overlap slightly: `ml-[-8px]` on each after the first
- Never use a square thumbnail. Never use a colored background inside the bubble.

---

### Chips and Tags

Used for categories, filter tabs, metadata labels:

- Background: `#F0F0F0`
- Border radius: `9999px` (full pill)
- Padding: `px-3 py-1`
- Font: Inter, `0.75rem`, weight `500`
- Color: `#6B6B6B`
- No border, no shadow
- Selected state: background `#1A1A1A`, color `#FFFFFF`
- Chips are always inline — never stacked or full-width unless inside a form

---

### Navigation Bar (Bottom)

- Background: `#FFFFFF`
- No border on top — subtle upward shadow: `0 -1px 0 rgba(0,0,0,0.04)`
- Height: `64px` + safe area inset
- 4–5 items evenly spaced
- Active icon: `#1A1A1A`, filled variant
- Inactive icon: `#ADADAD`, outline variant
- No labels under icons — icons only
- Center item is the scan FAB (see FAB below)

---

### FAB — Scan Button

The primary scan action is a floating action button centered in the bottom nav:

- Shape: circle, `w-14 h-14`
- Background: `#1A1A1A`
- Icon: white, `size={24}`
- Shadow: `0 4px 16px rgba(0,0,0,0.18)`
- Elevated above the nav bar — `mt-[-20px]` to break out of the nav strip
- On press: scale to `0.93` instantly, spring back — GSAP `elastic.out(1, 0.5)`
- Never use a colored FAB. Never use a gradient FAB.

---

### Screen Header

Each screen has a minimal two-icon header — no title text in the header:

- Left: contextual icon (back chevron, grid) — inside white circle `w-9 h-9 shadow-sm`
- Right: contextual icon (history, settings, refresh) — same white circle
- Both icons: `#1A1A1A`, `size={18}`
- Positioned `pt-4 px-4` above the first card
- No app name, no logo, no breadcrumb in the header

---

### Input Bar (Search / Chat)

The bottom-pinned input bar pattern:

- Outer container: white pill, `rounded-[9999px]`, `shadow-card`, `px-4 py-3`
- Placeholder: Inter `0.875rem`, `#ADADAD`
- Left slot: secondary icon action (upload, attach) — `#6B6B6B`
- Right slot: submit — black filled circle `w-10 h-10`, white icon inside
- Pinned above bottom nav with `pb-4` clearance
- No border on the input — shadow provides the lift

---

### List Rows (History, Alternatives, Inventory)

Each list row inside a card follows this layout:

```
[Product bubble]  [Name + subtitle]        [Metadata]
```

- Product bubble: left, `w-14 h-14` circle
- Name: Inter 600, `1rem`, `#1A1A1A`
- Subtitle: Inter 400, `0.75rem`, `#6B6B6B`, one line, truncated
- Metadata (time, count): Inter 400, `0.75rem`, `#6B6B6B`, right-aligned
- Min row height: `72px`
- Divider between rows: `1px solid #F0F0F0` — never separate list items into individual cards

---

### Empty States

- Centered in available space
- Large muted icon from React Icons: `text-[#D0D0D0]`, `size={48}`
- Short headline: Inter 600, `1rem`, `#1A1A1A`
- Short supporting line: Inter 400, `0.875rem`, `#6B6B6B`
- Optional outline CTA below — never filled
- Never use stock illustrations

---

### What to Never Do

- No purple, blue, or teal anywhere in the UI
- No gradient backgrounds, gradient buttons, or gradient text
- No card borders or outlines
- No colored card backgrounds — score colors are for badges and arcs only
- No centered body text blocks
- No full-width filled buttons except the primary onboarding CTA
- No shadows heavier than `shadow-sm` on cards
- No more than two font weights visible on a single screen
- No emoji in UI chrome — only inside product image bubbles as product representations

---

## App Copy Rules

- Never label a product "bad", "dangerous", "toxic", or "unhealthy" in absolute terms
- Always frame scores relative to the user: "may not suit your profile", "flagged for your allergies", "fine for most people, but check your meds"
- Ingredient flags are informational, not verdicts
- The app is a tool for informed decisions, not a gatekeeper
- AI chat responses must be calm, factual, and non-alarmist — no fearmongering about ingredients

---

## Development Philosophy

Build feature by feature.

For every feature:
1. Read this file first.
2. Identify the exact files to change.
3. Keep changes focused — do not rewrite unrelated code.
4. Keep the implementation simple. Prefer readable over clever.
5. Build the smallest useful version first.
6. Refactor only when repetition actually appears.
7. Fix all lint and TypeScript errors before finishing.

---

## Styling Rules

**Use TailwindCSS utility classes everywhere.** Do not write custom CSS unless a style is impossible with Tailwind.

### When Inline Styles Are Allowed

Use inline styles **only** for:
- SVG `stroke-dasharray` and `stroke-dashoffset` values calculated at runtime
- GSAP animation targets (values set by GSAP, not CSS)
- Dynamic color values derived from score data (e.g. score-based color interpolation)
- `style={{ width: `${percent}%` }}` for programmatic bar fills

Everywhere else: Tailwind classes only.

---

## Component Architecture

### File Structure

```
src/
  components/
    common/          ← Reusable primitives (ScreenCard, ScoreBadge, IngredientTag, Badge, etc.)
    scanner/         ← Barcode scanner UI, scan result overlay
    product/         ← Product card, ingredient list, alternatives panel
    profile/         ← Health profile form, allergy chips, medication list
    inventory/       ← Community inventory list, add-item flow
    gamification/    ← Points display, badge grid, streak counter
    chat/            ← AI chat interface, message bubbles, context pill
    history/         ← Scan history list and filters
    pets/            ← Pet profile form, pet flag display, species selector
  screens/           ← Route-level page components
  stores/            ← Zustand stores (one file per domain)
  types/             ← Shared TypeScript types
  lib/               ← Utilities, helpers, API client, constants
  assets/
    images.ts        ← Centralized image imports
```

### Component Rules

- One component per file
- Props interfaces defined at the top of the file, above the component
- No default exports from store files — named exports only
- Page components are thin — they compose feature components, they don't contain logic
- Extract any block of JSX longer than ~30 lines into its own component

---

## State Management

| State type | Tool |
|---|---|
| Global app state | Zustand |
| Server/async data | Local fetch with useState / useEffect |
| Temporary UI state | `useState` local to the component |
| Persisted state | Zustand + Capacitor Preferences |

### Zustand Store Map

| Store | Domain |
|---|---|
| `useUserStore` | Auth state, user session |
| `useHealthProfileStore` | Allergies, meds, conditions, dietary prefs |
| `useScanStore` | Current scan result, scan history |
| `useProductStore` | Product cache, alternatives |
| `useInventoryStore` | Community inventory items |
| `useGamificationStore` | Points, badges, streaks |
| `useChatStore` | AI chat message history |
| `usePetStore` | Pet profiles, pet safety flags per scan |

### Zustand Rules

- One store per domain
- Keep store actions simple — no async logic inside the store definition unless it's a simple setter
- Never access a store inside another store — pass values as arguments instead

---

## TypeScript Rules

- Strict mode always on
- No `any` — ever. Use `unknown` + type narrowing if needed
- Keep types simple, flat, and readable — avoid deep nesting
- Prefer flat interfaces over nested object hierarchies
- Type all component props explicitly
- Type all Zustand store state and actions

```ts
// Prefer flat
interface ProductScore {
  productId: string;
  score: number;
  tier: "safe" | "caution" | "avoid";
  flags: string[];
  personalizedFor: string; // userId
}

// Avoid unnecessary nesting
interface ProductScore {
  meta: {
    product: { id: string };
    user: { id: string };
  };
  result: {
    score: number;
  };
}
```

### Key Shared Types

```ts
type ProductCategory = "food" | "cosmetic" | "drug" | "supplement" | "household";\n\ntype PetSpecies = "dog" | "cat" | "bird" | "rabbit" | "small_mammal" | "reptile" | "other";

interface Product {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  ingredients: string[];
  metadata: Record<string, unknown>; // category-specific fields
  sourceDb: string; // e.g. "open_food_facts", "openfda"
  createdAt: string;
}

interface HealthProfile {
  userId: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  dietaryPreferences: string[];
  pets: Pet[];
  updatedAt: string;
}

interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string;
}

interface PetSafetyFlag {
  petId: string;
  petName: string;
  species: PetSpecies;
  tier: "safe" | "caution" | "avoid";
  reason: string;
}

interface ScanResult {
  product: Product;
  score: number;
  tier: "safe" | "caution" | "avoid";
  flags: string[];
  flaggedIngredients: string[];
  alternatives: Product[];
  petFlags: PetSafetyFlag[];
}
```

---

## Pet Safety Rules

- Pet profiles are stored in `HealthProfile.pets` — a flat array of `Pet` objects
- Support multiple pets per user — a household may have a dog and a cat with different danger lists
- Species is required. Breed and age are optional.
- The pet safety check runs server-side on every scan — the frontend receives `petFlags[]` in `ScanResult` and displays them
- Each flag shows: pet name, species, tier (safe / caution / avoid), and a plain-language reason
- Never show a single combined "pet score" — show one flag per pet so mixed households (cat + dog) are handled correctly
- Pet flags appear as a dedicated section on the product result card, below the user's personal score
- Flag display pattern:
  ```
  🐱 Luna — Caution
     Contains eucalyptus oil, which can be toxic to cats.
  🐶 Max — Safe
     No flagged ingredients for dogs.
  ```
- Use the actual pet name, not "your pet" — it's more personal and more useful in multi-pet households
- The avoid tier for pets always shows a vet recommendation line: "If exposed, contact your vet."
- Pet safety covers: household cleaners, cosmetics, air fresheners, personal care products, and any product used in or around the home. It does not score food products for pets — that is out of scope.

### Key danger lists by species (for frontend display logic)

These are display hints only — actual safety logic runs server-side:
- **Cats** — most sensitive. Flag: essential oils, phenols, pine-based cleaners, certain surfactants
- **Dogs** — Flag: xylitol, certain essential oils, bleach-based products
- **Birds** — most restrictive. Flag: aerosols, scented products, Teflon/PTFE, air fresheners
- **Rabbits / small mammals** — Flag: airborne chemicals, strong cleaning agents

---

## Scanner Rules

- Use `@capacitor-community/barcode-scanner` for native barcode scanning
- Guard all scanner calls with `Capacitor.isNativePlatform()`
- On web/desktop, fall back to a manual barcode entry input
- Scanner opens full-screen with a transparent viewfinder overlay
- On successful scan: close scanner → show product result sheet
- On scan failure: show a friendly retry prompt, never an error code

```ts
// src/lib/native/scanner.ts
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Capacitor } from "@capacitor/core";

export async function scanBarcode(): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) return null;
  await BarcodeScanner.checkPermission({ force: true });
  BarcodeScanner.hideBackground();
  const result = await BarcodeScanner.startScan();
  BarcodeScanner.showBackground();
  return result.hasContent ? result.content : null;
}
```

---

## AI Chat Rules

- The chat panel always receives a context object injected server-side: user health profile + last 10 scanned products + current product (if open)
- The frontend sends the user message + a `contextRef` ID to the backend — the backend assembles the full prompt
- Never assemble the AI prompt on the frontend
- Chat messages are stored in `useChatStore` for the session; they do not persist across sessions unless the backend saves them
- Chat UI: user bubbles right-aligned, AI bubbles left-aligned, full-width input pinned to the bottom
- Show a typing indicator while awaiting AI response
- AI responses are streamed where the backend supports it

---

## Gamification Rules

- Never calculate or mutate points on the frontend — read current points, badges, and streak from the API and display them
- Badge unlock animations use GSAP — `gsap.fromTo` scale `0.5 → 1` + opacity `0 → 1`, `elastic.out(1, 0.5)` ease
- Streak counter displays the value returned by the API — the frontend never computes it
- Badge grid, point totals, and streak counter live in `useGamificationStore` and are refreshed on app focus and after every scan

---

## Icons

Use **React Icons** exclusively. Do not use emoji as icons in UI elements. Do not add other icon libraries.

Import only what you use:

```tsx
import { HiOutlineQrCode } from "react-icons/hi2";
import { TbShieldCheck } from "react-icons/tb";
```

Icon sizes:
- Nav icons: `size={22}`
- Card action icons: `size={18}`
- Inline/label icons: `size={16}`

---

## Animation Rules (GSAP)

- Use `useGSAP()` hook for all GSAP animations — never raw `useEffect` for GSAP
- Animate score arc on product result mount: tween from 0 to the final score value
- Use `gsap.timeline()` for sequenced entrance animations on the product result sheet
- Badge unlock: `gsap.fromTo` scale `0.5 → 1` + opacity `0 → 1`, `elastic.out(1, 0.5)` ease
- Standard UI motion: `power2.out`, duration `0.4`–`0.6`

```tsx
useGSAP(() => {
  gsap.from(arcRef.current, {
    strokeDashoffset: circumference,
    duration: 1,
    ease: "power2.out",
  });
}, [score]);
```

---

## Image Rule

All image assets are imported through a single centralized file.

```ts
// src/assets/images.ts
import emptyHistory from "./empty-history.png";
import emptyInventory from "./empty-inventory.png";
import scanPrompt from "./scan-prompt.png";

export const images = {
  emptyHistory,
  emptyInventory,
  scanPrompt,
};
```

Always consume images through this object. Never import image assets directly inside screens or components.

---

## API Client Rule

All backend calls go through a single centralized client at `src/lib/api.ts`. Never use raw `fetch` directly in components or stores — always call through the shared API client. The client handles auth headers, base URL, and error normalization.

Use `import.meta.env.VITE_API_URL` for the base URL. Never hardcode URLs.

---

## Secrets and API Keys

- Never expose API keys or secrets in client-side code
- All AI calls, scoring requests, and product lookups go through the backend
- Use environment variables (`import.meta.env.VITE_*`) only for non-secret config (e.g. `VITE_API_URL`)

---

## UI and Design Rules

For any UI task:

- Replicate the provided design or described layout **exactly**
- Match spacing, padding, font hierarchy, colors, border radius, shadows, and proportions precisely
- Do not approximate. Do not simplify unless explicitly asked.
- Every score number displayed in the app uses **Fraunces**. This is non-negotiable.
- The app never labels products as bad or dangerous in absolute terms — always frame relative to the user's profile

---

## Decision Making

- If something is unclear, ask before assuming
- If a better approach exists, suggest it with a brief explanation
- If a new library would genuinely help, recommend it, explain why, and wait for approval before adding it
- If a design or architectural decision conflicts with this file, flag it — do not silently override it

---

## Communication

Be concise. For every completed task, explain:
1. What files were changed
2. What was built or fixed
3. How to test it

No lengthy explanations unless the change is architecturally significant.

---

## Final Reminder

Read this file before every task. Follow the design system. Keep code simple, flat, and readable. Build feature by feature. Veil is a calm, trustworthy scanner that lifts the veil on what's really in the products around you — every design and copy decision should reinforce that feeling. Ask before deviating.