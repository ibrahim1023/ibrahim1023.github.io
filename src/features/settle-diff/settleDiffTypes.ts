export const EVIDENCE_CLASSIFICATIONS = ["PASS", "DIFF", "FAIL", "UNKNOWN"] as const;
export type EvidenceClassification = (typeof EVIDENCE_CLASSIFICATIONS)[number];

export const EVIDENCE_OBJECT_IDS = [
  "request",
  "payment",
  "vendor",
  "chain",
  "response",
  "activity",
] as const;
export type EvidenceObjectId = (typeof EVIDENCE_OBJECT_IDS)[number];

export const SETTLE_DIFF_STATES = [
  "project-established",
  "request-in-flight",
  "attempt-recorded",
  "evidence-expanded",
  "comparison-visible",
  "mismatch-isolated",
  "unverifiable",
  "reasoning-chain",
  "vault-steward-arrival",
] as const;

export type SettleDiffState = (typeof SETTLE_DIFF_STATES)[number];
