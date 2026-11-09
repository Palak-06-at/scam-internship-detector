// Compatibility layer: the detection logic now lives in the server-side
// engine under src/lib/detection/. These re-exports keep existing imports
// (and tests) working without changes.

import type { AnalysisResult } from "@/types/analysis";
import { analyzeText } from "@/lib/detection/analyzer";

export { EXAMPLE_SUSPICIOUS_LISTING } from "@/lib/detection/analyzer";
export { getRiskLevel } from "@/lib/detection/scoring";

/** Maximum characters accepted by the scanner textarea in the UI. */
export const MAX_INPUT_LENGTH = 5000;

/** Client-side convenience wrapper around the shared detection engine. */
export function analyzeInternship(rawText: string): AnalysisResult {
  return analyzeText(rawText, MAX_INPUT_LENGTH);
}
