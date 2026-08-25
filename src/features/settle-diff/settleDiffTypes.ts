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
