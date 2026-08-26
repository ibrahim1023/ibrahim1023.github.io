import { describe, expect, test } from "vitest";

import {
  comparisonRows,
  evidenceObjects,
  projectLinks,
  settleDiff,
  vaultSteward,
} from "./portfolioContent";

describe("portfolio factual contract", () => {
  test("uses only the approved failed-broadcast evidence", () => {
    const serialized = JSON.stringify({ settleDiff, evidenceObjects, comparisonRows });

    expect(settleDiff.requestAmount).toBe("0.01 USDC");
    expect(settleDiff.maxBudget).toBe("0.02 USDC");
    expect(settleDiff.returnLabel).toBe("HTTP 402");
    expect(settleDiff.activityStatus).toBe("broadcast_failed");
    expect(serialized).not.toContain("$0.04");
    expect(serialized).not.toContain('"PAID"');
    expect(serialized).not.toContain("acknowledged");
  });

  test("separates DIFF, FAIL, PASS, and UNKNOWN", () => {
    expect(Object.fromEntries(comparisonRows.map((row) => [row.id, row.classification])))
      .toEqual({
        chain: "DIFF",
        charge: "UNKNOWN",
        protocol: "PASS",
        vendor: "PASS",
        service: "FAIL",
        transactionHash: "UNKNOWN",
      });
  });

  test("pins project sources and the Vault mapping", () => {
    expect(projectLinks.settleDiff).toBe("https://github.com/ibrahim1023/SettleDiff");
    expect(projectLinks.vaultSteward).toBe("https://github.com/ibrahim1023/vault-steward");
    expect(vaultSteward.rail).toEqual(["FIND", "PREVIEW", "APPROVE", "VERIFY"]);
    expect(evidenceObjects.map(({ id, vaultRole }) => [id, vaultRole])).toEqual([
      ["request", "NOTE"],
      ["payment", "PROPOSED CHANGE"],
      ["vendor", "EVIDENCE SOURCE"],
      ["chain", "POLICY"],
      ["response", "CURRENT / AFTER"],
      ["activity", "AUDIT / RECHECK"],
    ]);
  });
});
