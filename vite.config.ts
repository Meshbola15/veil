import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Long-lived vendor chunks: these change far less often than app code, so
// they stay cached across app updates. Heavy, route-specific libraries
// (html5-qrcode, vaul, supabase) are deliberately left out so they ride
// along with the lazy route chunk that actually needs them.
const VENDOR_GROUPS: Record<string, RegExp> = {
  react: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
  router: /node_modules[\\/](react-router|react-router-dom)[\\/]/,
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Capacitor WebViews (iOS 15+/Android Chrome) and modern browsers only:
    // skips legacy syntax transforms for smaller, faster bundles.
    target: "es2022",
    cssCodeSplit: true,
    // Small images are inlined; keep it tight so the entry stays lean.
    assetsInlineLimit: 2048,
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: Object.entries(VENDOR_GROUPS).map(([name, test]) => ({
            name: `vendor-${name}`,
            test,
          })),
        },
      },
    },
  },
});
