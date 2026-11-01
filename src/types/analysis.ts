// Shared TypeScript types for the internship analysis.
// These shapes are kept simple (plain JSON) so a future FastAPI backend
// can return exactly the same structure.

/** How serious a single warning sign is. */
export type Severity = "low" | "medium" | "high";

/** Overall risk bucket derived from the 0–100 score. */
export type RiskLevel = "Low Risk" | "Medium Risk" | "High Risk";

/** The categories of scam indicators InternShield looks for. */
export type IndicatorCategory =
  | "registration-fee"
  | "payment-request"
  | "unrealistic-salary"
  | "urgency"
  | "sensitive-info"
  | "guaranteed-selection";

/** One warning sign found in the listing. */
export interface WarningIndicator {
  category: IndicatorCategory;
  title: string;
  severity: Severity;
  /** Points this indicator added to the risk score. */
  points: number;
  /** Plain-language reason this is a concern. */
  explanation: string;
  /** The exact phrases from the listing that triggered the rule. */
  matchedPhrases: string[];
}

/** The full result returned by analyzeInternship(). */
export interface AnalysisResult {
  score: number; // 0–100
  riskLevel: RiskLevel;
  warnings: WarningIndicator[];
  recommendations: string[];
  characterCount: number;
  analyzedAt: string; // ISO date string
}
