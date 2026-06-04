export function isNativePlatform(): boolean {
  const capacitor = (
    window as Window & {
      Capacitor?: { isNativePlatform?: () => boolean };
    }
  ).Capacitor;

  return capacitor?.isNativePlatform?.() ?? false;
}
