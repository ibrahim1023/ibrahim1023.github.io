import { expect, test } from "@playwright/test";

test("the complete evolution remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage(); await page.goto("/portfolio/");
  const fallback = page.locator("[data-no-js-narrative]"); await expect(fallback).toBeVisible();
  for (const heading of ["Purchase", "Original incident", "Provider receipt and independent record", "Deterministic checks", "VERIFIED", "Vault Steward arrival"]) await expect(fallback.getByRole("heading", { name: heading })).toBeVisible();
  await expect(fallback).toContainText("Don’t trust the receipt. Verify the settlement."); await context.close();
});
