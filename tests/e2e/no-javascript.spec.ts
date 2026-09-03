import { expect, test } from "@playwright/test";

test("the complete evolution remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage(); await page.goto("/");
  const fallback = page.locator("[data-no-js-narrative]"); await expect(fallback).toBeVisible();
  for (const heading of ["Purchase", "Original incident", "Provider receipt and independent record", "Deterministic checks", "VERIFIED", "CaseZero", "Public docket", "Lock record", "Vault Steward"]) await expect(fallback.getByRole("heading", { name: heading })).toBeVisible();
  await expect(fallback).toContainText("Don’t trust the receipt. Verify the settlement."); await expect(fallback).toContainText("BLIND BY CONSTRUCTION"); await context.close();
});
