import { CASE_ZERO_STATES, type CaseZeroState } from "./caseZeroTypes";

export const CASE_ZERO_STATE_RANGES: Record<CaseZeroState, readonly [number, number]> = {
  "casezero-established": [0, 0.12],
  "public-docket": [0.12, 0.29],
  "evidence-typed": [0.29, 0.5],
  "finding-sealed": [0.5, 0.68],
  "blind-by-construction": [0.68, 0.84],
  "lock-ready": [0.84, 0.96],
  "vault-handoff": [0.96, 1],
};

export function progressToCaseZeroState(progress: number): CaseZeroState {
  if (!Number.isFinite(progress) || progress <= 0) return "casezero-established";
  if (progress >= 1) return "vault-handoff";

  return CASE_ZERO_STATES.find((state) => {
    const [start, end] = CASE_ZERO_STATE_RANGES[state];
    return progress >= start && progress < end;
  }) ?? "vault-handoff";
}
