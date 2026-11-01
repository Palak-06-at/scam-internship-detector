import { useRef, useState } from "react";
import { AlertCircle, FileText, Loader2, ScanSearch, Sparkles, Trash2 } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { analyzeInternship, EXAMPLE_SUSPICIOUS_LISTING, MAX_INPUT_LENGTH } from "@/utils/analyzeInternship";
import { AnalysisResults } from "./AnalysisResults";

/** "idle" = waiting, "scanning" = loading animation, "done" = showing results */
type ScanStatus = "idle" | "scanning" | "done";

const SCAN_DURATION_MS = 1600; // short delay so the scanning animation is visible

export function InternshipScanner() {
  // ----- State -----
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const isScanning = status === "scanning";

  // ----- Handlers -----
  function handleTextChange(value: string) {
    setDescription(value.slice(0, MAX_INPUT_LENGTH));
    if (errorMessage) setErrorMessage(null);
  }

  function handleScan() {
    if (isScanning) return; // prevent double clicks
    if (description.trim().length === 0) {
      setErrorMessage("Please paste an internship description before scanning.");
      textareaRef.current?.focus();
      return;
    }
    setErrorMessage(null);
    setResult(null);
    setStatus("scanning");

    window.setTimeout(() => {
      try {
        const analysis = analyzeInternship(description);
        setResult(analysis);
        setStatus("done");
        // Scroll the results into view after they render
        window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      } catch {
        setStatus("idle");
        setErrorMessage("Something went wrong while analyzing. Please try again.");
      }
    }, SCAN_DURATION_MS);
  }

  function handleTryExample() {
    setDescription(EXAMPLE_SUSPICIOUS_LISTING);
    setErrorMessage(null);
    setResult(null);
    setStatus("idle");
  }

  function handleClear() {
    setDescription("");
    setResult(null);
    setErrorMessage(null);
    setStatus("idle");
    textareaRef.current?.focus();
  }

  function handleScanAnother() {
    handleClear();
    document.getElementById("scanner")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const characterCount = description.length;
  const isNearLimit = characterCount > MAX_INPUT_LENGTH * 0.9;

  return (
    <div className="space-y-8">
      <div id="scanner" className="glass glow relative overflow-hidden rounded-3xl p-1.5">
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-primary-glow" /> Internship Scanner
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full ${isScanning ? "bg-warning animate-pulse-ring" : "bg-success"}`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isScanning ? "bg-warning" : "bg-success"}`} />
            </span>
            {isScanning ? "SCANNING" : "READY"}
          </div>
        </div>

        {/* Text area */}
        <div className="relative rounded-2xl border bg-background/60">
          <label htmlFor="internship-description" className="sr-only">Internship description</label>
          <textarea
            id="internship-description"
            ref={textareaRef}
            value={description}
            onChange={(e) => handleTextChange(e.target.value)}
            maxLength={MAX_INPUT_LENGTH}
            disabled={isScanning}
            placeholder="Paste your internship description here..."
            aria-invalid={Boolean(errorMessage)}
            aria-describedby="scanner-error"
            className="block h-64 w-full resize-none rounded-2xl bg-transparent p-5 text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/50 disabled:opacity-60"
          />

          {/* Scanning overlay */}
          {isScanning && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl bg-primary/5">
              <div className="animate-scan absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary-glow/25 to-transparent">
                <div className="absolute bottom-0 h-px w-full bg-primary-glow shadow-[0_0_12px_var(--primary-glow)]" />
              </div>
            </div>
          )}

          <div className={`absolute right-4 bottom-3 font-mono text-xs ${isNearLimit ? "text-warning" : "text-muted-foreground"}`}>
            {characterCount.toLocaleString()} / {MAX_INPUT_LENGTH.toLocaleString()}
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <p id="scanner-error" role="alert" className="mx-3 mt-3 flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" /> {errorMessage}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button type="button" onClick={handleTryExample} disabled={isScanning} className="btn-ghost flex-1 text-sm sm:flex-none">
              <Sparkles className="h-4 w-4 text-primary-glow" /> Try Example
            </button>
            <button type="button" onClick={handleClear} disabled={isScanning} className="btn-ghost flex-1 text-sm sm:flex-none">
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          </div>
          <button type="button" onClick={handleScan} disabled={isScanning} className="btn-primary">
            {isScanning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Scanning…
              </>
            ) : (
              <>
                <ScanSearch className="h-4 w-4" /> Scan Internship
              </>
            )}
          </button>
        </div>
      </div>

      <div ref={resultsRef} className="scroll-mt-24">
        {status === "done" && result && <AnalysisResults result={result} onScanAnother={handleScanAnother} />}
      </div>
    </div>
  );
}
