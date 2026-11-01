import type {
  AnalysisResult,
  IndicatorCategory,
  RiskLevel,
  Severity,
  WarningIndicator,
} from "@/types/analysis";

/**
 * InternShield rule-based analyzer.
 *
 * How it works:
 * 1. Each RULE below describes one category of scam indicator.
 * 2. A rule has "strong" patterns (enough on their own) and optionally
 *    "weak" patterns that only count when combined with a supporting pattern.
 * 3. Phrases preceded by a negation ("no registration fee") are ignored.
 * 4. Each rule can only score ONCE, no matter how many times it matches,
 *    so repeated wording doesn't inflate the score.
 * 5. The points of all triggered rules are added and capped at 100.
 *
 * These are heuristic indicators, not statistically validated probabilities.
 */

export const MAX_INPUT_LENGTH = 5000;

interface DetectionRule {
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

// Small reusable regex pieces
const MONEY = String.raw`(?:rs\.?|inr|₹|\$|usd|€|£)\s?\d[\d,]*(?:\.\d+)?\s?(?:k|lakh|lakhs)?|\d[\d,]*\s?(?:rs|rupees|inr|dollars|usd|lakh|lakhs)`;
const PAY_VERB = String.raw`(?:pay|deposit|transfer|send|submit)`;

const RULES: DetectionRule[] = [
  {
    category: "registration-fee",
    title: "Upfront registration or application fee",
    severity: "high",
    points: 30,
    explanation:
      "The listing asks candidates to pay a fee to apply, register or join. Genuine employers pay interns — they don't charge them to be considered.",
    recommendation:
      "Never pay a registration, application or joining fee. Ask the company to confirm in writing that the process is free.",
    strongPatterns: [
      /\b(?:registration|application|enrol(?:l)?ment|processing|joining|onboarding|admission|form)\s+(?:fee|fees|charge|charges)\b/i,
      new RegExp(String.raw`\b${PAY_VERB}\s+(?:a\s+)?(?:small\s+|one[- ]time\s+|nominal\s+)?(?:fee|fees|charge)\b`, "i"),
      /\bfee\s+(?:of\s+)?(?:rs\.?|inr|₹|\$)\s?\d/i,
    ],
  },
  {
    category: "payment-request",
    title: "Suspicious payment or deposit request",
    severity: "high",
    points: 25,
    explanation:
      "The listing mentions a security deposit, training cost, kit purchase or money transfer. Asking candidates to send money is one of the most common internship scam tactics.",
    recommendation:
      "Do not transfer money, buy 'starter kits' or pay for 'mandatory training'. Legitimate internships don't require payments from you.",
    strongPatterns: [
      /\b(?:security|refundable|caution)\s+(?:deposit|amount|money)\b/i,
      /\b(?:training|certification|kit|material|laptop|uniform|id card)\s+(?:fee|fees|cost|charges?|payment)\b/i,
      new RegExp(String.raw`\b${PAY_VERB}\s+(?:${MONEY})`, "i"),
      /\b(?:via|through|using)\s+(?:upi|paytm|phonepe|google pay|gpay|gift cards?|crypto|bitcoin)\b/i,
      /\b(?:upi|paytm|phonepe|gpay)\s+(?:id|number|payment)\b/i,
    ],
    weakPatterns: [/\brefundable\b/i, /\bdeposit\b/i],
    supportingPatterns: [new RegExp(MONEY, "i"), /\b(?:pay|payment|transfer)\b/i],
  },
  {
    category: "unrealistic-salary",
    title: "Unrealistic salary promise",
    severity: "medium",
    points: 20,
    explanation:
      "The listing promises unusually high or fast earnings, especially with little work or no experience required. Offers that sound too good to be true often are.",
    recommendation:
      "Compare the stipend with similar roles on trusted platforms. Be cautious of high pay for minimal work or no required skills.",
    strongPatterns: [
      /\bearn\s+(?:up\s+to|upto|as much as|over)\b/i,
      new RegExp(String.raw`(?:${MONEY})\s*(?:/|per|a|every)\s*(?:day|daily|hour|week|weekly)\b`, "i"),
      new RegExp(String.raw`\b(?:earn|make|get)\s+(?:${MONEY})\s+(?:daily|weekly|every day|in a week|from home)`, "i"),
      /\b(?:unlimited|guaranteed)\s+(?:income|earnings|stipend|salary|pay)\b/i,
      /\b(?:quick|easy|fast)\s+(?:money|cash|income)\b/i,
    ],
    weakPatterns: [new RegExp(MONEY, "i")],
    supportingPatterns: [
      /\bno\s+(?:experience|skills|qualification|interview)s?\s+(?:required|needed)\b/i,
      /\b(?:just|only)\s+\d+\s*(?:hours?|hrs?|minutes?)\b/i,
    ],
  },
  {
    category: "urgency",
    title: "Urgency and pressure tactics",
    severity: "medium",
    points: 15,
    explanation:
      "The listing pushes you to act immediately or risk losing the opportunity. Scammers create pressure so you don't stop to verify the offer.",
    recommendation:
      "Take your time. A genuine employer will allow reasonable time to research the company and ask questions.",
    strongPatterns: [
      /\b(?:apply|register|pay|respond|join|reply)\s+(?:immediately|right now|now|today|asap|within\s+\d+\s*(?:hours?|hrs?|minutes?))\b/i,
      /\b(?:limited|only\s+\d+|few)\s+(?:seats|slots|spots|positions)\s*(?:left|remaining|available)?\b/i,
      /\b(?:offer|opportunity|link|seat)\s+(?:expires?|valid only|closes?)\s+(?:today|tonight|in\s+\d+|within)/i,
      /\b(?:hurry|act fast|don'?t miss|last chance|urgent(?:ly)? (?:hiring|requirement))\b/i,
    ],
  },
  {
    category: "sensitive-info",
    title: "Request for sensitive personal or banking information",
    severity: "high",
    points: 30,
    explanation:
      "The listing asks for information like OTPs, bank details, card numbers or ID documents before any verified hiring step. This data can be used for identity theft or financial fraud.",
    recommendation:
      "Never share OTPs, passwords, CVV or banking credentials. Only share ID documents after verifying the company through official channels.",
    strongPatterns: [
      /\b(?:otp|one[- ]time password|cvv|atm pin|upi pin|net ?banking password)\b/i,
      /\b(?:bank|account)\s+(?:details|number|password|login|credentials)\b/i,
      /\b(?:debit|credit)\s+card\s+(?:details|number)\b/i,
    ],
    weakPatterns: [/\b(?:aadhaar|aadhar|pan card|passport|ssn|social security)\b/i],
    supportingPatterns: [/\b(?:send|share|provide|whatsapp|submit|upload)\b/i],
  },
  {
    category: "guaranteed-selection",
    title: "Guaranteed selection claim",
    severity: "medium",
    points: 25,
    explanation:
      "The listing guarantees an internship, job or placement without a real selection process. Genuine programs evaluate candidates before making offers.",
    recommendation:
      "Be skeptical of guaranteed offers. Ask about the interview process and who you would report to.",
    strongPatterns: [
      /\b(?:100%|guaranteed|assured|confirmed|sure[- ]?shot)\s+(?:selection|placement|job|internship|offer|joining|hiring)\b/i,
      /\b(?:selection|placement|job|internship|offer)\s+(?:is\s+)?(?:guaranteed|assured)\b/i,
      /\bno\s+interview\s+(?:required|needed)\b/i,
      /\b(?:everyone|all applicants|all candidates)\s+(?:will be|gets?|are)\s+(?:selected|hired)\b/i,
    ],
  },
];

/** Words that, right before a match, mean the phrase is negated ("no registration fee"). */
const NEGATION_WINDOW = /\b(?:no|not|never|without|zero|free of|don'?t|doesn'?t|won'?t)\b[\w\s-]{0,12}$/i;

/** Find all non-negated matches of a pattern in the text. */
function findMatches(text: string, pattern: RegExp): string[] {
  const globalPattern = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
  const found: string[] = [];
  for (const match of text.matchAll(globalPattern)) {
    const before = text.slice(Math.max(0, (match.index ?? 0) - 25), match.index);
    if (NEGATION_WINDOW.test(before)) continue; // e.g. "There is no registration fee"
    found.push(match[0].trim());
  }
  return found;
}

function matchAny(text: string, patterns: RegExp[] = []): string[] {
  return patterns.flatMap((p) => findMatches(text, p));
}

/** Convert a score into a risk bucket. */
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 60) return "High Risk";
  if (score >= 30) return "Medium Risk";
  return "Low Risk";
}

const GENERAL_RECOMMENDATIONS = [
  "Verify the company on its official website and LinkedIn page.",
  "Check that the recruiter uses an official company email address, not a free email account.",
  "Search the company name with words like 'scam' or 'review' before applying.",
];

/**
 * Main entry point: analyze an internship description and return a result.
 * Pure function — same input always gives the same output.
 */
export function analyzeInternship(rawText: string): AnalysisResult {
  const text = rawText.slice(0, MAX_INPUT_LENGTH);
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

  const rawScore = warnings.reduce((sum, w) => sum + w.points, 0);
  const score = Math.min(100, Math.max(0, rawScore));

  return {
    score,
    riskLevel: getRiskLevel(score),
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
