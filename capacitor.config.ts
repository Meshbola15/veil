import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.veil.app",
  appName: "veil",
  webDir: "dist",

  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#ffffff",
    },
  },
};

export default config;
