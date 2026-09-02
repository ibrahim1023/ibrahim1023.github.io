import { expect, test } from "@playwright/test";

const HEADINGS = ["Purchase", "Promised, executed, recorded", "Original incident", "One verification system", "Provider receipt and independent record", "Deterministic checks", "VERIFIED", "Vault Steward arrival"];

test("default motion exposes only one animated branch", async ({ page }) => {
  await page.goto("/portfolio/"); await expect(page.locator('[data-animated-layout="desktop"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeHidden(); await expect(page.locator('[data-branch="reduced"]')).toBeHidden();
});

test("reduced motion exposes the complete static evolution", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/portfolio/");
  const reduced = page.locator('[data-branch="reduced"]'); await expect(reduced).toBeVisible(); await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for (const heading of HEADINGS) await expect(reduced.getByRole("heading", { name: heading })).toBeVisible();
  await expect(reduced).toContainText("Base Sepolia testnet"); await expect(reduced).toContainText("Don’t trust the receipt. Verify the settlement.");
});
