import { describe, expect, it } from "vitest";
import { analyzeInternship, EXAMPLE_SUSPICIOUS_LISTING, getRiskLevel } from "./analyzeInternship";

const ORDINARY = `Software Engineering Intern – Acme Corp (Bengaluru)
We are looking for a computer science student for a 6-month internship starting in January.
Responsibilities: build features in React and TypeScript, write tests, join code reviews.
Stipend: ₹25,000 per month. Selection is based on a technical interview and a short assignment.
There is no registration fee. Apply through our careers page by 30 November.`;

describe("analyzeInternship", () => {
  it("rates the suspicious example as high risk with fee, salary and guarantee warnings", () => {
    const result = analyzeInternship(EXAMPLE_SUSPICIOUS_LISTING);
    const categories = result.warnings.map((w) => w.category);
    expect(categories).toContain("registration-fee");
    expect(categories).toContain("unrealistic-salary");
    expect(categories).toContain("guaranteed-selection");
    expect(result.riskLevel).toBe("High Risk");
    expect(result.score).toBe(100);
  });

  it("finds no warnings in an ordinary listing", () => {
    const result = analyzeInternship(ORDINARY);
    expect(result.warnings).toHaveLength(0);
    expect(result.score).toBe(0);
    expect(result.riskLevel).toBe("Low Risk");
  });

  it("scores a repeated warning only once", () => {
    const result = analyzeInternship("Pay the registration fee. Registration fee is mandatory. Application fee too.");
    expect(result.warnings).toHaveLength(1);
    expect(result.score).toBe(30);
  });

  it("uses 0–29 low, 30–59 medium, 60–100 high", () => {
    expect(getRiskLevel(29)).toBe("Low Risk");
    expect(getRiskLevel(30)).toBe("Medium Risk");
    expect(getRiskLevel(59)).toBe("Medium Risk");
    expect(getRiskLevel(60)).toBe("High Risk");
  });
});
