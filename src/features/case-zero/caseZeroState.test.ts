import { describe, expect, test } from "vitest";
import { CASE_ZERO_STATES } from "./caseZeroTypes";
import { progressToCaseZeroState } from "./caseZeroState";

describe("CaseZero narrative state", () => {
  test("keeps the approved state order", () => {
    expect(CASE_ZERO_STATES).toEqual([
      "casezero-established", "public-docket", "evidence-typed",
      "finding-sealed", "blind-by-construction", "lock-ready", "vault-handoff",
    ]);
  });

  test("maps boundaries and clamps invalid progress", () => {
    expect(progressToCaseZeroState(0.13)).toBe("public-docket");
    expect(progressToCaseZeroState(0.72)).toBe("blind-by-construction");
    expect(progressToCaseZeroState(Number.NaN)).toBe("casezero-established");
    expect(progressToCaseZeroState(Number.POSITIVE_INFINITY)).toBe("casezero-established");
    expect(progressToCaseZeroState(2)).toBe("vault-handoff");
  });
});
