// The analyzer: runs every rule over the text and builds the final result.
// Pure function — same input always gives the same output.
//
// These are heuristic indicators, not statistically validated probabilities.

import type { WarningIndicator } from "@/types/analysis";
import { matchAny, RULES } from "./rules";
import { buildSummary, computeScore, getRiskLevel, getVerdict } from "./scoring";
import type { AnalyzeResponse } from "./types";

const GENERAL_RECOMMENDATIONS = [
  "Verify the company on its official website and LinkedIn page.",
  "Check that the recruiter uses an official company email address, not a free email account.",
  "Search the company name with words like 'scam' or 'review' before applying.",
];

/**
 * Analyze an internship description and return the full result.
 * `maxLength` lets the caller decide how much text to consider.
 */
export function analyzeText(rawText: string, maxLength: number): AnalyzeResponse {
  const text = rawText.slice(0, maxLength);
  const warnings: WarningIndicator[] = [];
  const recommendations: string[] = [];

  for (const rule of RULES) {
    const strongMatches = matchAny(text, rule.strongPatterns);
    let matches = strongMatches;

    // Weak patterns only count when a supporting pattern also appears
    if (matches.length === 0 && rule.weakPatterns) {
      const weakMatches = matchAny(text, rule.weakPatterns);
      const supportMatches = matchAny(text, rule.supportingPatterns);
      if (weakMatches.length > 0 && supportMatches.length > 0) {
        matches = [...weakMatches, ...supportMatches];
      }
    }

    if (matches.length > 0) {
      // Each rule scores once; duplicate phrases are removed for display
      const uniquePhrases = [...new Set(matches.map((m) => m.toLowerCase()))].slice(0, 5);
      warnings.push({
        category: rule.category,
        title: rule.title,
        severity: rule.severity,
        points: rule.points,
        explanation: rule.explanation,
        matchedPhrases: uniquePhrases,
      });
      recommendations.push(rule.recommendation);
    }
  }

  const score = computeScore(warnings);
  const riskLevel = getRiskLevel(score);

  return {
    score,
    riskLevel,
    verdict: getVerdict(riskLevel),
    summary: buildSummary(riskLevel, warnings.length),
    warnings,
    recommendations: [...recommendations, ...GENERAL_RECOMMENDATIONS],
    characterCount: text.length,
    analyzedAt: new Date().toISOString(),
  };
}

/** A fictional suspicious listing used by the "Try Example" button. */
export const EXAMPLE_SUSPICIOUS_LISTING = `🚀 URGENT HIRING – Remote Marketing Intern at GlobalTech Solutions

Earn up to ₹50,000 per week working just 2 hours a day from home! No experience required.

100% guaranteed selection for all applicants — no interview required. Only 5 seats left, so apply immediately!

To confirm your seat, pay a one-time registration fee of ₹1,999 via UPI. A refundable security deposit of ₹3,000 is also required for your training kit.

After payment, send your bank account details, Aadhaar card and the OTP you receive on WhatsApp to our HR team for verification.

Offer expires today. Don't miss this opportunity!`;
