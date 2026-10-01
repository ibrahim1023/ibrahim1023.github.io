import { describe, expect, test } from "vitest";
import { caseZero, caseZeroMetrics, contextDevUsage, currentPerfloValidation, externalLinks, laterValidation, originIncident, paidDeliveryFailure, projectLinks, publicVerification, settleDiff, verificationChecks, verificationSystem, vaultSteward } from "./portfolioContent";

describe("portfolio factual contract", () => {
  test("keeps the failed incident as the factual origin example", () => {
    expect(originIncident).toMatchObject({ amount: "0.01 USDC", maxBudget: "0.02 USDC", verdict: "UNVERIFIABLE" });
    expect(originIncident.technical).toEqual(["base → tempo", "HTTP 402", "broadcast_failed", "transaction hash absent"]);
  });
  test("labels the September 8 result as historical provider correlation", () => {
    expect(laterValidation).toMatchObject({ title: "Historical provider correlation", verdict: "VERIFIED_WITH_WARNINGS" });
    expect(laterValidation.eyebrow).toContain("HISTORICAL SCHEMA-2 RESULT");
    expect(laterValidation.warning).toContain("does not meet today’s independent-settlement standard");
    expect(externalLinks.settleDiffLiveReport).toBe("https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/live-run-report-2026-08-21.md");
  });
  test("keeps current Perflo provider evidence conservative", () => {
    expect(currentPerfloValidation).toMatchObject({ title: "Provider records aligned", verdict: "UNVERIFIABLE" });
    expect(currentPerfloValidation.warning).toContain("vendor-side Base receipt");
    expect(externalLinks.settleDiffCurrentValidation).toContain("pr2-live-validation-2026-09-28.md");
  });
  test("presents the public success as bounded independent testnet proof", () => {
    expect(publicVerification).toMatchObject({ amount: "0.001 test USDC", verdict: "VERIFIED", checkSummary: "13 / 13 checks passed · September 28, 2026" });
    expect(publicVerification.scope).toContain("Base Sepolia testnet");
    expect(publicVerification.provider.provenance).toBe("x402 facilitator response");
    expect(publicVerification.independent.provenance).toBe("Base Sepolia receipt + Transfer log");
    expect(publicVerification.independent.detail).toContain("payer, recipient, token, 0.001 test USDC, and Base Sepolia network matched");
    expect(publicVerification.modelSummary).toContain("0 model requests");
    expect(verificationChecks).toEqual(["payer", "recipient", "token", "amount", "network"]);
  });
  test("keeps the confirmed paid-delivery failure separate from the unresolved HTTP-500 request", () => {
    expect(paidDeliveryFailure).toMatchObject({ verdict: "PAID_FAILURE", retry: "DO_NOT_RETRY" });
    expect(paidDeliveryFailure.delivery).toContain("HTTP 200 text/plain");
    expect(paidDeliveryFailure.caveat).toContain("HTTP-500 request still has unresolved settlement");
    expect(externalLinks.settleDiffAssuranceReport).toContain("assurance-real-world-validation-2026-09-22.md");
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
