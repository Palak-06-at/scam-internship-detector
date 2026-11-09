import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { WarningIndicator } from "@/types/analysis";
import { SEVERITY_STYLES } from "@/utils/riskStyles";
import { CATEGORY_ICONS } from "./categoryIcons";

/** One detected warning, with an expandable explanation. */
export function WarningCard({ warning }: { warning: WarningIndicator }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const severity = SEVERITY_STYLES[warning.severity];
  const Icon = CATEGORY_ICONS[warning.category];

  return (
    <div className="rounded-2xl border bg-background/50 transition-colors hover:border-primary-glow/40">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${severity.bg} ${severity.border}`}>
          <Icon className={`h-5 w-5 ${severity.text}`} />
        </span>
        <span className="flex-1">
          <span className="block font-semibold">{warning.title}</span>
          <span className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            <span className={`rounded-full border px-2 py-0.5 font-medium ${severity.bg} ${severity.border} ${severity.text}`}>
              {severity.label} severity
            </span>
            <span className="font-mono text-muted-foreground">+{warning.points} pts</span>
          </span>
        </span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      {isExpanded && (
        <div className="animate-fade-up space-y-3 border-t px-4 py-4 text-sm">
          <p className="text-muted-foreground">{warning.explanation}</p>
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Detected phrases</p>
            <div className="flex flex-wrap gap-2">
              {warning.matchedPhrases.map((phrase) => (
                <code key={phrase} className="rounded-md border bg-secondary/60 px-2 py-1 font-mono text-xs text-primary-glow">
                  “{phrase}”
                </code>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
