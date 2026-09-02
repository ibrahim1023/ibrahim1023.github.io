import { SETTLE_DIFF_STATES, type SettleDiffState } from "./settleDiffTypes";

export const STATE_RANGES: Record<SettleDiffState, readonly [number, number]> = {
  "project-established": [0, 0.08], "purchase-in-flight": [0.08, 0.18],
  "outcome-uncertain": [0.18, 0.29], "evidence-reconstructed": [0.29, 0.42],
  "origin-incident": [0.42, 0.54], "system-evolved": [0.54, 0.65],
  "independent-proof": [0.65, 0.77], "checks-complete": [0.77, 0.88],
  verified: [0.88, 0.96], "vault-handoff": [0.96, 1],
};

export function progressToSettleDiffState(progress: number): SettleDiffState {
  if (Number.isNaN(progress) || progress < 0) return "project-established";
  if (progress >= 1) return "vault-handoff";
  return SETTLE_DIFF_STATES.find((state) => {
    const [start, end] = STATE_RANGES[state];
    return progress >= start && progress < end;
  }) ?? "vault-handoff";
}
