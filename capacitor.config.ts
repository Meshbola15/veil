import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.veil.app",
  appName: "veil",
  webDir: "dist",

  plugins: {
    StatusBar: {
      style: "DARK",
    },
  },
};

export default config;
