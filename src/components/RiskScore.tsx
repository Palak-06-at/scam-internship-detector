import { useEffect, useState } from "react";
import type { RiskLevel } from "@/types/analysis";
import { RISK_LEVEL_STYLES } from "@/utils/riskStyles";

const SIZE = 200;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Animated circular gauge showing the 0–100 risk score. */
export function RiskScore({ score, riskLevel }: { score: number; riskLevel: RiskLevel }) {
  const [displayedScore, setDisplayedScore] = useState(0);
  const styles = RISK_LEVEL_STYLES[riskLevel];

  // Count up from 0 to the real score
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedScore(Math.round(score * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const offset = CIRCUMFERENCE * (1 - displayedScore / 100);

  return (
    <div className="relative grid place-items-center" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90" aria-hidden>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} strokeWidth={STROKE} fill="none" className="stroke-secondary" />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className={styles.stroke}
          style={{ filter: "drop-shadow(0 0 8px currentColor)" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className={`font-display text-6xl font-extrabold ${styles.text}`} aria-label={`Risk score ${score} out of 100`}>
          {displayedScore}
        </div>
        <div className="font-mono text-xs text-muted-foreground">/ 100</div>
      </div>
    </div>
  );
}
