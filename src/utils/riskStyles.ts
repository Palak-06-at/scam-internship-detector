import type { RiskLevel, Severity } from "@/types/analysis";

/** Maps risk levels / severities to design-system color classes. */
export const RISK_LEVEL_STYLES: Record<RiskLevel, { text: string; bg: string; border: string; stroke: string }> = {
  "Low Risk": { text: "text-success", bg: "bg-success/10", border: "border-success/30", stroke: "stroke-success" },
  "Medium Risk": { text: "text-warning", bg: "bg-warning/10", border: "border-warning/30", stroke: "stroke-warning" },
  "High Risk": { text: "text-danger", bg: "bg-danger/10", border: "border-danger/30", stroke: "stroke-danger" },
};

export const SEVERITY_STYLES: Record<Severity, { label: string; text: string; bg: string; border: string }> = {
  low: { label: "Low", text: "text-info", bg: "bg-info/10", border: "border-info/30" },
  medium: { label: "Medium", text: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  high: { label: "High", text: "text-danger", bg: "bg-danger/10", border: "border-danger/30" },
};
