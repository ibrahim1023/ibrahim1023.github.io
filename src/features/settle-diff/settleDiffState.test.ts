import { describe, expect, test } from "vitest";
import { progressToSettleDiffState, STATE_RANGES } from "./settleDiffState";
import { SETTLE_DIFF_STATES } from "./settleDiffTypes";

describe("SettleDiff state contract", () => {
  test("uses the approved ten contiguous states", () => {
    expect(Object.keys(STATE_RANGES)).toEqual([...SETTLE_DIFF_STATES]);
    let end = 0;
    for (const state of SETTLE_DIFF_STATES) { expect(STATE_RANGES[state][0]).toBe(end); end = STATE_RANGES[state][1]; }
    expect(end).toBe(1);
  });
  test.each([
    [0, "project-established"], [0.08, "purchase-in-flight"], [0.18, "outcome-uncertain"],
    [0.29, "evidence-reconstructed"], [0.42, "origin-incident"], [0.54, "system-evolved"],
    [0.65, "independent-proof"], [0.77, "checks-complete"], [0.88, "verified"], [0.96, "vault-handoff"],
  ])("maps %s to %s", (progress, state) => expect(progressToSettleDiffState(progress as number)).toBe(state));
  test("clamps invalid progress", () => {
    expect(progressToSettleDiffState(-1)).toBe("project-established");
    expect(progressToSettleDiffState(Number.NaN)).toBe("project-established");
    expect(progressToSettleDiffState(2)).toBe("vault-handoff");
  });
});
