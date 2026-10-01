export const identity = {
  name: "Ibrahim Arshad",
  role: "AI Systems Engineer",
  framing: "I build and evaluate reliable agentic systems.",
  selectedWorkCue: "Selected work",
} as const;

export const projectLinks = {
  settleDiff: "https://github.com/ibrahim1023/SettleDiff",
  caseZero: "https://github.com/ibrahim1023/CaseZero",
  vaultSteward: "https://github.com/ibrahim1023/vault-steward",
} as const;

export const externalLinks = {
  contextDev: "https://context.dev/",
  settleDiffLiveReport: "https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/live-run-report-2026-08-21.md",
  settleDiffCurrentValidation: "https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/pr2-live-validation-2026-09-28.md",
  settleDiffAssuranceReport: "https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/assurance-real-world-validation-2026-09-22.md",
} as const;

export const contextDevUsage = {
  settleDiff: "Context.dev · conditional public status-page evidence",
  caseZero: "Context.dev · schema-constrained docket discovery",
} as const;

export const settleDiff = {
  title: "SettleDiff",
  descriptor: "Transaction forensics for agent purchases.",
  agentLabel: "AGENT",
  serviceLabel: "SERVICE",
  openingAmount: "0.001 test USDC",
  openingPrompt: "A service returns a payment receipt.",
  uncertainty: "But a receipt is not proof that money moved.",
  closingThesis: "Don’t trust the receipt. Verify the settlement.",
} as const;

export const reconstructionLayers = [
  { id: "promised", label: "PROMISED", title: "Rail-specific terms", detail: "SettleDiff binds the exact terms each rail exposes. x402 also binds payer, recipient, asset, amount, and network for independent checks." },
  { id: "executed", label: "EXECUTED", title: "One authorized attempt", detail: "Any term drift requires fresh authorization. Ambiguous failures are never retried blindly." },
  { id: "recorded", label: "RECORDED", title: "Evidence roles", detail: "Provider claims stay separate from external settlement observations when the rail exposes enough information." },
] as const;

export const originIncident = {
  eyebrow: "ORIGIN INCIDENT · SANITIZED REGRESSION",
  headline: "Different execution path.",
  decisiveFinding: "No confirmed settlement.",
  technical: ["base → tempo", "HTTP 402", "broadcast_failed", "transaction hash absent"],
  verdict: "UNVERIFIABLE",
  amount: "0.01 USDC",
  maxBudget: "0.02 USDC",
} as const;

export const laterValidation = {
  eyebrow: "SEPTEMBER 8 · HISTORICAL SCHEMA-2 RESULT",
  title: "Historical provider correlation",
  route: "tempo → tempo",
  evidence: "Perflo contract, execution, and Activity aligned.",
  verdict: "VERIFIED_WITH_WARNINGS",
  warning: "Earlier schema-2 rules let provider Activity fill the settlement role. The same provider-only evidence does not meet today’s independent-settlement standard.",
} as const;

export const currentPerfloValidation = {
  eyebrow: "PERFLO V8 · SEPTEMBER 28",
  title: "Provider records aligned",
  evidence: "Contract, execution, charge, Activity, and provider settlement agreed.",
  verdict: "UNVERIFIABLE",
  warning: "The customer debit remained provider-ledger evidence. A successful vendor-side Base receipt did not establish the customer’s debit.",
} as const;

export const verificationSystem = {
  eyebrow: "ONE CANONICAL EVIDENCE MODEL",
  headline: "The investigation became a verification system.",
  detail: "Different payment rails enter through the same deterministic boundary.",
  rails: ["Perflo", "x402"],
} as const;

export const publicVerification = {
  eyebrow: "X402 · BASE SEPOLIA TESTNET",
  headline: "One purchase. Two trust domains.",
  amount: "0.001 test USDC",
  provider: { label: "PROVIDER RECEIPT", title: "Settlement reported", detail: "HTTP 200 · transaction reference returned", provenance: "x402 facilitator response" },
  independent: { label: "READ-ONLY RPC OBSERVATION", title: "Exact transfer confirmed", detail: "Authorized payer, recipient, token, 0.001 test USDC, and Base Sepolia network matched", provenance: "Base Sepolia receipt + Transfer log" },
  verdict: "VERIFIED",
  checkSummary: "13 / 13 checks passed · September 28, 2026",
  modelSummary: "0 model requests for the fallback explanation",
  scope: "x402 v2 · exact · Base Sepolia testnet · EIP-3009",
} as const;

export const verificationChecks = [
  "payer", "recipient", "token", "amount", "network",
] as const;

export const paidDeliveryFailure = {
  eyebrow: "SEPARATE AUTHORIZED X402 REQUEST · SEPTEMBER 28",
  headline: "Payment confirmed · delivery failed",
  settlement: "Exact 0.001 test-USDC transfer independently confirmed.",
  delivery: "Advertised application/json · returned HTTP 200 text/plain",
  verdict: "PAID_FAILURE",
  retry: "DO_NOT_RETRY",
  caveat: "The earlier HTTP-500 request still has unresolved settlement and remains UNVERIFIABLE. It was not retried.",
} as const;

export const caseZero = {
  title: "CaseZero",
  descriptor: "Evidence-first AI investigations, blind to the official answer.",
  qualifier: "Independent experimental project · not affiliated with the NTSB",
  openingQuestion: "Can an investigation reason without seeing the answer?",
  acquisition: "Public evidence in. Official finding held back.",
  evidence: "Every claim stays attached to its source.",
  blindness: "The answer is outside the room.",
  climax: "BLIND BY CONSTRUCTION",
  lock: "Lock the assessment before reveal.",
  transition:
    "Trustworthy conclusions resist hindsight. Trustworthy changes wait for approval.",
} as const;

export const caseZeroMetrics = {
  caseId: "CEN22FA375",
  measuredOn: "2026-09-01",
  reviewedDocketItems: 15,
  processedSources: 3,
  evidenceItems: 951,
  pdfLocated: 200,
  tableLocated: 751,
  provisionalCandidates: 171,
  finalRunFailures: 0,
} as const;

export const vaultSteward = {
  title: "Vault Steward",
  headline: "Keep your vault trustworthy",
  descriptor: "Local-first, evidence-backed vault maintenance with explicit approval before every edit.",
  rail: ["FIND", "PREVIEW", "APPROVE", "VERIFY"],
  preview: {
    current: "[[Guides/Partner Onboard Checklist]]",
    after: "[[Guides/Partner Onboarding Checklist]]",
    expectedResult: "1 issue resolved · 1 note edited · vault checked again",
  },
} as const;
