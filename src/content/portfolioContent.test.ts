import { describe, expect, test } from "vitest";
import { originIncident, projectLinks, publicVerification, settleDiff, verificationChecks, verificationSystem, vaultSteward } from "./portfolioContent";

describe("portfolio factual contract", () => {
  test("keeps the failed incident as the factual origin example", () => {
    expect(originIncident).toMatchObject({ amount: "0.01 USDC", maxBudget: "0.02 USDC", verdict: "UNVERIFIABLE" });
    expect(originIncident.technical).toEqual(["base → tempo", "HTTP 402", "broadcast_failed", "transaction hash absent"]);
  });
  test("presents the public success as bounded independent testnet proof", () => {
    expect(publicVerification).toMatchObject({ amount: "0.001 USDC", verdict: "VERIFIED", checkSummary: "12 / 12 deterministic checks" });
    expect(publicVerification.scope).toContain("Base Sepolia testnet");
    expect(publicVerification.provider.provenance).toBe("provider PAYMENT-RESPONSE");
    expect(publicVerification.independent.provenance).toBe("Base Sepolia USDC Transfer");
    expect(publicVerification.modelSummary).toContain("0 model requests");
    expect(verificationChecks).toHaveLength(12);
  });
  test("keeps plain foreground copy and implemented rail names", () => {
    expect(settleDiff.closingThesis).toBe("Don’t trust the receipt. Verify the settlement.");
    expect(verificationSystem.rails).toEqual(["Perflo", "x402"]);
    expect(projectLinks.settleDiff).toBe("https://github.com/ibrahim1023/SettleDiff");
    expect(vaultSteward.rail).toEqual(["FIND", "PREVIEW", "APPROVE", "VERIFY"]);
  });
});
