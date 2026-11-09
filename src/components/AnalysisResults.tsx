import { AlertTriangle, CheckCircle2, Info, Lightbulb, RotateCcw, ShieldCheck } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { RISK_LEVEL_STYLES } from "@/utils/riskStyles";
import { RiskScore } from "./RiskScore";
import { WarningCard } from "./WarningCard";

interface AnalysisResultsProps {
  result: AnalysisResult;
  onScanAnother: () => void;
}

/** Results dashboard — everything shown here comes from analyzeInternship(). */
export function AnalysisResults({ result, onScanAnother }: AnalysisResultsProps) {
  const styles = RISK_LEVEL_STYLES[result.riskLevel];
  const hasWarnings = result.warnings.length > 0;

  return (
    <div className="glass animate-fade-up rounded-3xl p-6 sm:p-8" aria-live="polite">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Scan Results</h2>
        <span className="font-mono text-xs text-muted-foreground">{result.characterCount.toLocaleString()} chars analyzed</span>
      </div>

      {/* Score summary */}
      <div className="mt-6 grid items-center gap-8 md:grid-cols-[auto_1fr]">
        <div className="mx-auto">
          <RiskScore score={result.score} riskLevel={result.riskLevel} />
        </div>
        <div className="space-y-4">
          <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${styles.bg} ${styles.border} ${styles.text}`}>
            {hasWarnings ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
            {result.riskLevel}
          </span>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Warning indicators" value={result.warnings.length} />
            <Stat label="Risk score" value={`${result.score}/100`} />
          </div>
          <p className="flex gap-2 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-info" />
            Score bands (0–29 low, 30–59 medium, 60–100 high) are preliminary heuristics, not validated fraud probabilities.
          </p>
        </div>
      </div>

      {/* Warnings or "all clear" */}
      <div className="mt-8">
        {hasWarnings ? (
          <>
            <h3 className="mb-3 text-lg font-semibold">Warning signs found</h3>
            <div className="space-y-3">
              {result.warnings.map((warning) => (
                <WarningCard key={warning.category} warning={warning} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex gap-4 rounded-2xl border border-success/30 bg-success/10 p-5">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
            <div>
              <p className="font-semibold text-success">No obvious warning signs detected.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This does not establish that the internship is legitimate. InternShield only checks for common text patterns —
                always verify the company independently before sharing personal information.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="mt-8 rounded-2xl border border-info/25 bg-info/5 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <Lightbulb className="h-5 w-5 text-info" /> Safety recommendations
        </h3>
        <ul className="mt-3 space-y-2">
          {result.recommendations.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-info" /> {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <button type="button" onClick={onScanAnother} className="btn-primary">
          <RotateCcw className="h-4 w-4" /> Scan Another Internship
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border bg-background/50 p-4">
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
