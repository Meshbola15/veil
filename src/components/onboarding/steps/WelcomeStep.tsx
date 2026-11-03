export function WelcomeStep() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-8 flex size-28 items-center justify-center rounded-[28px] border border-white/40 bg-white/25 shadow-sm backdrop-blur-md">
        <span className="font-bricolage text-4xl font-semibold tracking-tight text-white">
          Veil
        </span>
      </div>
      <p className="max-w-[280px] font-inter text-lg font-medium leading-snug text-white">
        Science-backed ingredient intelligence you can trust
      </p>
    </div>
  );
}
