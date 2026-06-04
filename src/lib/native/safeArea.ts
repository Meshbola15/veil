import { SafeArea } from "capacitor-plugin-safe-area";

type SafeAreaInsetsMap = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

function applySafeAreaInsets(insets: SafeAreaInsetsMap): void {
  for (const [key, value] of Object.entries(insets) as [
    keyof SafeAreaInsetsMap,
    number,
  ][]) {
    document.documentElement.style.setProperty(
      `--safe-area-inset-${key}`,
      `${value}px`,
    );
  }
}

/** Sync native safe-area insets to CSS variables on :root (see index.css). */
export async function initSafeAreaInsets(): Promise<() => void> {
  try {
    const { insets } = await SafeArea.getSafeAreaInsets();
    applySafeAreaInsets(insets);
  } catch {
    // Web fallback: :root defaults use env(safe-area-inset-*)
  }

  let listener: { remove: () => Promise<void> } | undefined;
  try {
    listener = await SafeArea.addListener("safeAreaChanged", (data) => {
      applySafeAreaInsets(data.insets);
    });
  } catch {
    // Listener not available on web
  }

  return () => {
    void listener?.remove();
  };
}
