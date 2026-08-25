import type { SettleDiffState } from "./settleDiffTypes";

export const STATE_RANGES: Record<SettleDiffState, readonly [number, number]> = {
  "project-established": [0, 0.1],
  "request-in-flight": [0.1, 0.24],
  "attempt-recorded": [0.24, 0.34],
  "evidence-expanded": [0.34, 0.52],
  "comparison-visible": [0.52, 0.68],
  "mismatch-isolated": [0.68, 0.8],
  unverifiable: [0.8, 0.9],
  "reasoning-chain": [0.9, 1],
  "vault-steward-arrival": [1, 1],
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
