/**
 * Shown while a route chunk downloads. Matches the app background so a fast
 * load is invisible; the spinner only fades in if loading takes noticeably long.
 */
export default function RouteFallback() {
  return (
    <div
      className="flex h-dvh w-full items-center justify-center bg-background"
      role="status"
      aria-label="Loading"
    >
      <div
        className="size-8 animate-spin rounded-full border-2 border-border border-t-text-primary opacity-0 [animation:spin_1s_linear_infinite,fade-in_200ms_ease_400ms_forwards]"
        aria-hidden
      />
    </div>
  );
}
