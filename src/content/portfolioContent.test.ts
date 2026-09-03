import { describe, expect, test } from "vitest";
import { caseZero, caseZeroMetrics, contextDevUsage, externalLinks, originIncident, projectLinks, publicVerification, settleDiff, verificationChecks, verificationSystem, vaultSteward } from "./portfolioContent";

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
  test("bounds CaseZero and Context.dev claims to implemented behavior", () => {
    expect(projectLinks.caseZero).toBe("https://github.com/ibrahim1023/CaseZero");
    expect(externalLinks.contextDev).toBe("https://context.dev/");
    expect(caseZero.qualifier).toBe("Independent experimental project · not affiliated with the NTSB");
    expect(contextDevUsage).toEqual({
      settleDiff: "Context.dev · conditional public status-page evidence",
      caseZero: "Context.dev · schema-constrained docket discovery",
    });
    expect(caseZeroMetrics).toMatchObject({
      caseId: "CEN22FA375", measuredOn: "2026-09-01", evidenceItems: 951,
      pdfLocated: 200, tableLocated: 751, provisionalCandidates: 171,
    });
    expect(JSON.stringify(caseZero)).not.toMatch(/completed autonomous investigation|official cause|NTSB-approved|powered by Context\.dev/i);
  });
});
