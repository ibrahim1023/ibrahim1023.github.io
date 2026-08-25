import type { SettleDiffState } from "./settleDiffTypes";

export const STATE_RANGES: Record<SettleDiffState, readonly [number, number]> = {
  "project-established": [0, 0.1],
  "request-in-flight": [0.1, 0.22],
  "attempt-recorded": [0.22, 0.36],
  "evidence-expanded": [0.36, 0.5],
  "comparison-visible": [0.5, 0.63],
  "mismatch-isolated": [0.63, 0.76],
  unverifiable: [0.76, 0.86],
  "reasoning-chain": [0.86, 0.92],
  "vault-steward-arrival": [0.92, 1],
} as const;

const ORDERED_STATES = Object.keys(STATE_RANGES) as SettleDiffState[];

export function progressToSettleDiffState(progress: number): SettleDiffState {
  if (Number.isNaN(progress) || progress < 0) {
    return "project-established";
  }
  if (progress >= 1) {
    return "vault-steward-arrival";
  }
  for (const state of ORDERED_STATES) {
    const [start, end] = STATE_RANGES[state];
    if (progress >= start && progress < end) {
      return state;
    }
  }
  return "vault-steward-arrival";
}
