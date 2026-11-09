// Types for the server-side detection engine and the /api/analyze endpoint.
// The response builds on the shared AnalysisResult shape so the existing
// frontend can consume it without any UI changes.

import type { AnalysisResult, IndicatorCategory, Severity } from "@/types/analysis";

/** One detection rule: a category of scam indicator and how it is matched. */
export interface DetectionRule {
  category: IndicatorCategory;
  title: string;
  severity: Severity;
  points: number;
  explanation: string;
  recommendation: string;
  /** Any single match here triggers the rule. */
  strongPatterns: RegExp[];
  /** Optional: these only count if a supporting pattern also matches. */
  weakPatterns?: RegExp[];
  supportingPatterns?: RegExp[];
}

/** Body accepted by POST /api/analyze. */
export interface AnalyzeRequest {
  inputType: "text";
  content: string;
}

/** JSON returned by POST /api/analyze on success. */
export interface AnalyzeResponse extends AnalysisResult {
  /** One-line verdict derived from the risk level. */
  verdict: string;
  /** Short plain-language summary of the result. */
  summary: string;
}

/** JSON returned by POST /api/analyze on a bad request. */
export interface AnalyzeErrorResponse {
  error: string;
}
