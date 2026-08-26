import type {
  EvidenceClassification,
  EvidenceObjectId,
} from "@/features/settle-diff/settleDiffTypes";

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
  requestAmount: "0.01 USDC",
  maxBudget: "0.02 USDC",
  returnLabel: "HTTP 402",
  returnDetail: "Payment Required",
  attemptLabel: "ACTIVITY RECORDED",
  activityStatus: "broadcast_failed",
  attemptQualifier: "attempt found — settlement not established",
  verdict: "UNVERIFIABLE",
  verdictReason:
    "Settlement could not be established: no confirmed charge, no transaction hash.",
} as const;

export const evidenceObjects = [
  {
    id: "request",
    label: "REQUEST",
    primary: "0.01 USDC",
    detail: "0.02 USDC max",
    vaultRole: "NOTE",
  },
  {
    id: "payment",
    label: "PAYMENT",
    primary: "charge unknown",
    detail: "settlement not established",
    vaultRole: "PROPOSED CHANGE",
  },
  {
    id: "vendor",
    label: "VENDOR",
    primary: "synthetic-search",
    detail: "sanitized fixture identity",
    vaultRole: "EVIDENCE SOURCE",
  },
  {
    id: "chain",
    label: "CHAIN",
    primary: "base → tempo",
    detail: "advertised vs executed",
    vaultRole: "POLICY",
  },
  {
    id: "response",
    label: "RESPONSE",
    primary: "HTTP 402",
    detail: "Payment Required",
    vaultRole: "CURRENT / AFTER",
  },
  {
    id: "activity",
    label: "ACTIVITY",
    primary: "broadcast_failed",
    detail: "no transaction hash",
    vaultRole: "AUDIT / RECHECK",
  },
] as const satisfies readonly {
  id: EvidenceObjectId;
  label: string;
  primary: string;
  detail: string;
  vaultRole: string;
}[];

export const comparisonRows = [
  {
    id: "chain",
    aspect: "Chain",
    expected: "base",
    observed: "tempo",
    classification: "DIFF",
    matches: false,
  },
  {
    id: "charge",
    aspect: "Charge",
    expected: "confirmed evidence",
    observed: "unknown",
    classification: "UNKNOWN",
    matches: false,
  },
  {
    id: "protocol",
    aspect: "Protocol",
    expected: "mpp",
    observed: "mpp",
    classification: "PASS",
    matches: true,
  },
  {
    id: "vendor",
    aspect: "Vendor",
    expected: "synthetic-search",
    observed: "synthetic-search",
    classification: "PASS",
    matches: true,
  },
  {
    id: "service",
    aspect: "Service",
    expected: "successful response",
    observed: "HTTP 402",
    classification: "FAIL",
    matches: false,
  },
  {
    id: "transactionHash",
    aspect: "Transaction hash",
    expected: "present",
    observed: "absent",
    classification: "UNKNOWN",
    matches: false,
  },
] as const satisfies readonly {
  id: string;
  aspect: string;
  expected: string;
  observed: string;
  classification: EvidenceClassification;
  matches: boolean;
}[];

export const mismatch = {
  expected: "base",
  observed: "tempo",
  explanation: "Advertised chain differs from executed chain.",
} as const;

export const reasoningChain = [
  { id: "claim", label: "CLAIM", text: "A paid request was attempted and recorded." },
  { id: "evidence", label: "EVIDENCE", text: "Contract, execution, activity, and response artifacts." },
  {
    id: "finding",
    label: "FINDING",
    text: "Chain drifted base → tempo; vendor returned HTTP 402; settlement proof is absent.",
  },
  { id: "verdict", label: "VERDICT", text: "UNVERIFIABLE" },
] as const;

export const vaultSteward = {
  title: "Vault Steward",
  headline: "Keep your vault trustworthy",
  descriptor:
    "Local-first, evidence-backed vault maintenance with explicit approval before every edit.",
  rail: ["FIND", "PREVIEW", "APPROVE", "VERIFY"],
  continuationCue: "Case study continues",
  preview: {
    current: "[[Guides/Partner Onboard Checklist]]",
    after: "[[Guides/Partner Onboarding Checklist]]",
    expectedResult: "1 issue resolved · 1 note edited · vault checked again",
  },
  objectMapping: evidenceObjects.map(({ label, vaultRole }) => ({
    from: label,
    to: vaultRole,
  })),
} as const;
