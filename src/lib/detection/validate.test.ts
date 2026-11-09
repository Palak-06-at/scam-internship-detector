import { describe, expect, it } from "vitest";
import { MAX_CONTENT_LENGTH, validateAnalyzeRequest } from "./validate";

describe("validateAnalyzeRequest", () => {
  it("accepts a valid text payload", () => {
    const result = validateAnalyzeRequest({ inputType: "text", content: "Some internship post" });
    expect(result).toEqual({ ok: true, content: "Some internship post" });
  });

  it("rejects a missing content field", () => {
    const result = validateAnalyzeRequest({ inputType: "text" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(400);
  });

  it("rejects non-string content", () => {
    const result = validateAnalyzeRequest({ content: 42 });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(400);
  });

  it("rejects empty or whitespace-only content", () => {
    expect(validateAnalyzeRequest({ content: "" }).ok).toBe(false);
    expect(validateAnalyzeRequest({ content: "   \n  " }).ok).toBe(false);
  });

  it("rejects content over the maximum length with 413", () => {
    const result = validateAnalyzeRequest({ content: "a".repeat(MAX_CONTENT_LENGTH + 1) });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(413);
  });

  it("rejects a non-object body", () => {
    expect(validateAnalyzeRequest(null).ok).toBe(false);
    expect(validateAnalyzeRequest("text").ok).toBe(false);
  });
});
