// Scoring: turn the triggered rules into a 0–100 score, a risk level,
// a one-line verdict and a short summary.

import type { RiskLevel, WarningIndicator } from "@/types/analysis";

/** Add up the rule points and cap the total at 100. */
export function computeScore(warnings: WarningIndicator[]): number {
  const rawScore = warnings.reduce((sum, w) => sum + w.points, 0);
  return Math.min(100, Math.max(0, rawScore));
}

/** Convert a score into a risk bucket: 0–29 low, 30–59 medium, 60–100 high. */
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 60) return "High Risk";
  if (score >= 30) return "Medium Risk";
  return "Low Risk";
}

/** One-line verdict shown by API consumers. */
export function getVerdict(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case "High Risk":
      return "Likely a scam";
    case "Medium Risk":
      return "Potentially suspicious";
    default:
      return "No obvious warning signs";
  }
}

/** Short plain-language summary of the result. */
export function buildSummary(riskLevel: RiskLevel, warningCount: number): string {
  switch (riskLevel) {
    case "High Risk":
      return `This internship listing contains ${warningCount} serious warning signs. Do not pay anything or share personal details, and verify the company through official channels before responding.`;
    case "Medium Risk":
      return "This internship listing contains some warning signs that should be verified before applying.";
    default:
      return "No common scam indicators were found. This does not guarantee the listing is genuine — always verify the company before applying.";
  }
}
