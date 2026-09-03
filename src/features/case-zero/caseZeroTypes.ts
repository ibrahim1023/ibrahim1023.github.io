export const CASE_ZERO_STATES = [
  "casezero-established",
  "public-docket",
  "evidence-typed",
  "finding-sealed",
  "blind-by-construction",
  "lock-ready",
  "vault-handoff",
] as const;

export type CaseZeroState = (typeof CASE_ZERO_STATES)[number];
