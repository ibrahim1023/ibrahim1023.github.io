import { describe, expect, test } from "vitest";

import { progressToSettleDiffState, STATE_RANGES } from "./settleDiffState";
import { SETTLE_DIFF_STATES } from "./settleDiffTypes";

describe("progressToSettleDiffState", () => {
  test("maps range starts to the required states in narrative order", () => {
    const starts: Array<[number, string]> = [
      [0, "project-established"],
      [0.1, "request-in-flight"],
      [0.22, "attempt-recorded"],
      [0.36, "evidence-expanded"],
      [0.5, "comparison-visible"],
      [0.63, "mismatch-isolated"],
      [0.76, "unverifiable"],
      [0.86, "reasoning-chain"],
      [0.92, "vault-steward-arrival"],
    ];

    for (const [progress, state] of starts) {
      expect(progressToSettleDiffState(progress)).toBe(state);
    }
  });

  test("keeps mid-range progress inside its state", () => {
    expect(progressToSettleDiffState(0.17)).toBe("request-in-flight");
    expect(progressToSettleDiffState(0.43)).toBe("evidence-expanded");
    expect(progressToSettleDiffState(0.8)).toBe("unverifiable");
    expect(progressToSettleDiffState(0.999)).toBe("vault-steward-arrival");
  });

  test("clamps out-of-range progress to the boundary states", () => {
    expect(progressToSettleDiffState(-0.5)).toBe("project-established");
    expect(progressToSettleDiffState(1.5)).toBe("vault-steward-arrival");
    expect(progressToSettleDiffState(Number.NaN)).toBe("project-established");
  });

  test("declares exactly one range per state, in order, without gaps", () => {
    expect(Object.keys(STATE_RANGES)).toHaveLength(SETTLE_DIFF_STATES.length);

    let previousEnd = 0;
    for (const state of SETTLE_DIFF_STATES) {
      const range = STATE_RANGES[state];
      expect(range[0]).toBe(previousEnd);
      expect(range[1]).toBeGreaterThanOrEqual(range[0]);
      previousEnd = range[1];
    }
    expect(previousEnd).toBe(1);
  });
});
