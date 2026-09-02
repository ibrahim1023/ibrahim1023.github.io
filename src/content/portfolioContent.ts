export const identity = {
  name: "Ibrahim Arshad",
  role: "AI Systems Engineer",
  framing: "I build and evaluate reliable agentic systems.",
  selectedWorkCue: "Selected work",
} as const;

export const projectLinks = {
  settleDiff: "https://github.com/ibrahim1023/SettleDiff",
  vaultSteward: "https://github.com/ibrahim1023/vault-steward",
} as const;

export const settleDiff = {
  title: "SettleDiff",
  descriptor: "Transaction forensics for agent purchases.",
  agentLabel: "AGENT",
  serviceLabel: "SERVICE",
  openingAmount: "0.001 USDC",
  openingPrompt: "A service returns a payment receipt.",
  uncertainty: "But a receipt is not proof that money moved.",
  closingThesis: "Don’t trust the receipt. Verify the settlement.",
} as const;

export const reconstructionLayers = [
  { id: "promised", label: "PROMISED", title: "Exact terms", detail: "Price, recipient, asset, network, method, and resource are bound before execution." },
  { id: "executed", label: "EXECUTED", title: "One authorized attempt", detail: "Any term drift requires fresh authorization. Ambiguous failures are never retried blindly." },
  { id: "recorded", label: "RECORDED", title: "Independent evidence", detail: "Provider claims remain separate from independently observed settlement." },
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

export const verificationSystem = {
  eyebrow: "ONE CANONICAL EVIDENCE MODEL",
  headline: "The investigation became a verification system.",
  detail: "Different payment rails enter through the same deterministic boundary.",
  rails: ["Perflo", "x402"],
} as const;

export const publicVerification = {
  eyebrow: "PUBLIC TESTNET VALIDATION",
  headline: "One purchase. Two records.",
  amount: "0.001 USDC",
  provider: { label: "PROVIDER RECEIPT", title: "Settlement reported", detail: "HTTP 200 · transaction reference returned", provenance: "provider PAYMENT-RESPONSE" },
  independent: { label: "INDEPENDENT RECORD", title: "Exact transfer confirmed", detail: "payer · recipient · token · amount matched", provenance: "Base Sepolia USDC Transfer" },
  verdict: "VERIFIED",
  checkSummary: "12 / 12 deterministic checks",
  modelSummary: "0 model requests for the fallback explanation",
  scope: "x402 v2 · exact · Base Sepolia testnet · EIP-3009",
} as const;

export const verificationChecks = [
  "budget", "price", "asset", "asset identity", "protocol", "network",
  "recipient", "settlement", "service execution", "paid failure",
  "ledger outcome", "activity persistence",
] as const;

export const vaultSteward = {
  title: "Vault Steward",
  headline: "Keep your vault trustworthy",
  descriptor: "Local-first, evidence-backed vault maintenance with explicit approval before every edit.",
  rail: ["FIND", "PREVIEW", "APPROVE", "VERIFY"],
  continuationCue: "Case study continues",
  preview: {
    current: "[[Guides/Partner Onboard Checklist]]",
    after: "[[Guides/Partner Onboarding Checklist]]",
    expectedResult: "1 issue resolved · 1 note edited · vault checked again",
  },
} as const;
