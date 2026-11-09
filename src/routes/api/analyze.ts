import { createFileRoute } from "@tanstack/react-router";

import { analyzeText } from "@/lib/detection/analyzer";
import { MAX_CONTENT_LENGTH, validateAnalyzeRequest } from "@/lib/detection/validate";

function jsonError(status: number, error: string): Response {
  return Response.json({ error }, { status });
}

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return jsonError(400, "Request body must be valid JSON.");
        }

        const validation = validateAnalyzeRequest(body);
        if (!validation.ok) {
          return jsonError(validation.status, validation.error);
        }

        const result = analyzeText(validation.content, MAX_CONTENT_LENGTH);
        return Response.json(result);
      },
    },
  },
});
