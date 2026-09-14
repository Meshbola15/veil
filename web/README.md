# Veil Web

A mobile-first React and Tailwind CSS web edition of Veil. It is intentionally frontend-only and can be installed to a phone home screen.

## Included

- Responsive landing page at `/`
- Three-step local onboarding
- Mobile browser camera barcode scanner with photo and manual-entry fallbacks
- Personalized product scores for people and pets
- Ingredient flags and product details
- Searchable, filterable scan history
- Household profile management
- Custom product entry for unknown barcodes
- Local persistence with Zustand
- PWA manifest

## Run locally

```bash
cd web
npm install
npm run dev
```

Open the displayed URL on a phone connected to the same network. Camera access requires HTTPS in production (localhost is allowed during development).

## Build

```bash
npm run build
npm run preview
```

## Demo barcodes

- `0078742118405` — mixed vegetables
- `044000032221` — sandwich cookies
- `051500255162` — peanut butter
- `5000159461122` — yoghurt
- `5011417565207` — surface cleaner

No API keys or backend are required.
