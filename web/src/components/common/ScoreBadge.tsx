import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import type { Tier } from "../../types";
import { tierCopy } from "../../lib/products";

interface ScoreBadgeProps {
  score: number;
  tier: Tier;
  compact?: boolean;
}

const colors: Record<Tier, string> = { safe: "#4CAF50", caution: "#F5A623", avoid: "#E53935" };

export function ScoreBadge({ score, tier, compact = false }: ScoreBadgeProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = compact ? 25 : 42;
  const circumference = 2 * Math.PI * radius;
  const finalOffset = circumference - (score / 100) * circumference;

  useGSAP(() => {
    gsap.fromTo(circleRef.current, { strokeDashoffset: circumference }, { strokeDashoffset: finalOffset, duration: 1, ease: "power2.out" });
  }, { dependencies: [score] });

  const size = compact ? 64 : 108;
  const center = size / 2;

  return (
    <div className={compact ? "relative size-16" : "flex flex-col items-center"}>
      <div className={`relative ${compact ? "size-16" : "size-[108px]"}`}>
        <svg className="-rotate-90" width={size} height={size} aria-hidden="true">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="#F0F0F0" strokeWidth={compact ? 6 : 8} />
          <circle ref={circleRef} cx={center} cy={center} r={radius} fill="none" stroke={colors[tier]} strokeWidth={compact ? 6 : 8} strokeLinecap="round" style={{ strokeDasharray: circumference, strokeDashoffset: finalOffset }} />
        </svg>
        <span className={`absolute inset-0 grid place-items-center font-fraunces font-bold ${compact ? "text-xl" : "text-4xl"}`}>{score}</span>
      </div>
      {!compact ? <p className="mt-3 text-sm font-semibold" style={{ color: colors[tier] }}>{tierCopy(tier)}</p> : null}
    </div>
  );
}
