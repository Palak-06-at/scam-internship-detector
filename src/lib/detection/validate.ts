// Request validation for POST /api/analyze.
// Kept as a pure function so it is easy to test and reuse.

/** Maximum number of characters the API will analyze. */
export const MAX_CONTENT_LENGTH = 10_000;

export type ValidationResult =
  | { ok: true; content: string }
  | { ok: false; status: number; error: string };

/** Check the parsed request body and return the content or an error. */
export function validateAnalyzeRequest(body: unknown): ValidationResult {
  if (body == null || typeof body !== "object") {
    return { ok: false, status: 400, error: "Request body must be a JSON object." };
  }

  const { content } = body as Record<string, unknown>;

  if (content === undefined || content === null) {
    return { ok: false, status: 400, error: "Missing required field: content." };
  }
  if (typeof content !== "string") {
    return { ok: false, status: 400, error: "Field 'content' must be a string." };
  }
  if (content.trim().length === 0) {
    return { ok: false, status: 400, error: "Field 'content' must not be empty." };
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return {
      ok: false,
      status: 413,
      error: `Field 'content' is too long. Maximum is ${MAX_CONTENT_LENGTH.toLocaleString()} characters.`,
    };
  }

  return { ok: true, content };
}
