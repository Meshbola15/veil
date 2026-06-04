import { HiStar } from "react-icons/hi2";

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  quote: string;
  avatarColor: string;
  initials: string;
}

interface RatingTestimonialCardProps {
  testimonial: Testimonial;
}

function MiniStars() {
  return (
    <div className="flex shrink-0 gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar key={i} className="fill-[#E8B923] text-[#E8B923]" size={14} />
      ))}
    </div>
  );
}

export function RatingTestimonialCard({ testimonial }: RatingTestimonialCardProps) {
  return (
    <article className="card flex flex-col gap-3 !p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-inter text-sm font-semibold text-white"
            style={{ backgroundColor: testimonial.avatarColor }}
          >
            {testimonial.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-inter text-sm font-bold text-text-primary">
              {testimonial.name}
            </p>
            <p className="truncate font-inter text-xs text-text-secondary">
              {testimonial.handle}
            </p>
          </div>
        </div>
        <MiniStars />
      </div>
      <p className="font-inter text-[15px] leading-relaxed text-text-primary">
        {testimonial.quote}
      </p>
    </article>
  );
}
