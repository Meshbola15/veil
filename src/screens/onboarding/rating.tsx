import { useNavigate } from "react-router-dom";
import { HiStar } from "react-icons/hi2";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import {
  RatingTestimonialCard,
  type Testimonial,
} from "@/components/onboarding/RatingTestimonialCard";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Emma Klein",
    handle: "@emmaklein",
    initials: "EK",
    avatarColor: "#7C9EB2",
    quote:
      "Veil has been a lifesaver for me and my family. I finally saw which baby products were flagged for our allergies — that alone makes it my favorite app.",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    handle: "@sarahmitch",
    initials: "SM",
    avatarColor: "#9B8B7A",
    quote:
      "Veil is a no-brainer if you want cleaner choices at the store. The alternatives it suggests have already replaced four products we use every day.",
  },
  {
    id: "3",
    name: "John Park",
    handle: "@johnpark",
    initials: "JP",
    avatarColor: "#6B8F71",
    quote:
      "I scan everything before it goes in our cart. Knowing what's in it — and whether it fits our profile — takes thirty seconds.",
  },
];

function LaurelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 4C18 14 8 22 6 36C4 50 12 62 24 76C36 62 44 50 42 36C40 22 30 14 24 4Z"
        stroke="#C9A227"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 12C20 20 14 26 13 36C12 44 16 52 24 64"
        stroke="#E8B923"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="18" cy="28" rx="4" ry="7" fill="#E8B923" opacity="0.85" />
      <ellipse cx="30" cy="32" rx="4" ry="7" fill="#E8B923" opacity="0.85" />
      <ellipse cx="14" cy="42" rx="3.5" ry="6" fill="#D4AF37" opacity="0.7" />
      <ellipse cx="34" cy="44" rx="3.5" ry="6" fill="#D4AF37" opacity="0.7" />
    </svg>
  );
}

function RatingHero() {
  return (
    <div className="flex flex-col items-center px-2 pt-2 text-center">
      <h1 className="font-inter text-[1.65rem] font-bold leading-tight text-text-primary">
        Give us a rating
      </h1>

      <div className="mt-6 flex items-center justify-center gap-3">
        <LaurelIcon className="h-16 w-10 -scale-x-100 opacity-90" />
        <div className="flex gap-1.5" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <HiStar key={i} className="fill-[#E8B923] text-[#E8B923]" size={36} />
          ))}
        </div>
        <LaurelIcon className="h-16 w-10 opacity-90" />
      </div>

      <p className="mt-5 font-inter text-base font-medium text-text-primary">
        Veil was designed for people like you
      </p>

      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="flex items-center">
          {[
            { bg: "#B8A99A", initials: "AM" },
            { bg: "#8FA89B", initials: "JR" },
            { bg: "#A89BB8", initials: "LS" },
          ].map((avatar, index) => (
            <div
              key={avatar.initials}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F0EFEC] font-inter text-[10px] font-semibold text-white"
              style={{
                backgroundColor: avatar.bg,
                marginLeft: index === 0 ? 0 : -10,
                zIndex: 3 - index,
              }}
            >
              {avatar.initials}
            </div>
          ))}
        </div>
        <span className="font-inter text-sm text-text-secondary">+ 70,000 downloads</span>
      </div>
    </div>
  );
}

export default function RatingPage() {
  const navigate = useNavigate();
  const isComplete = useOnboardingStore((s) => s.isComplete);

  const handleNext = () => {
    if (!isComplete) {
      navigate("/onboarding", { replace: true });
      return;
    }
    navigate("/home", { replace: true });
  };

  return (
    <div className="mobile-screen flex h-dvh flex-col overflow-hidden bg-[#F0EFEC]">
      <div className="safe-top min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 [-webkit-overflow-scrolling:touch]">
        <RatingHero />
        <div className="mt-6 flex flex-col gap-4 pb-4">
          {TESTIMONIALS.map((testimonial) => (
            <RatingTestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <footer className="safe-bottom shrink-0 border-t border-border/40 bg-[#F0EFEC] px-5 pb-3 pt-4">
        <button
          type="button"
          onClick={handleNext}
          className="touch-target w-full rounded-[20px] bg-accent py-4 font-inter text-lg font-semibold text-white transition-transform active:scale-[0.98]"
        >
          Next
        </button>
      </footer>
    </div>
  );
}
