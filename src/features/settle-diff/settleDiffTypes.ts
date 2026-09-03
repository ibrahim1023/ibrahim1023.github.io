export const SETTLE_DIFF_STATES = [
  "project-established", "purchase-in-flight", "outcome-uncertain",
  "evidence-reconstructed", "origin-incident", "system-evolved",
  "independent-proof", "checks-complete", "verified", "casezero-handoff",
] as const;

export type SettleDiffState = (typeof SETTLE_DIFF_STATES)[number];
