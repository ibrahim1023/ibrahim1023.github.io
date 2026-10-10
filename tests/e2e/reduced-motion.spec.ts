import { expect, test } from "@playwright/test";

const HEADINGS = ["CaseZero", "Public docket", "Lock record", "Vault Steward"];

test("default motion exposes only one animated branch", async ({ page }) => {
  await page.goto("/"); await expect(page.locator('[data-animated-layout="desktop"]:visible')).toHaveCount(1);
  await expect(page.locator('[data-animated-layout="mobile"]:visible')).toHaveCount(0); await expect(page.locator('[data-branch="reduced"]')).toBeHidden();
});

test("reduced motion exposes the complete static evolution", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/");
  const reduced = page.locator('[data-branch="reduced"]'); await expect(reduced).toBeVisible(); await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for (const heading of HEADINGS) await expect(reduced.getByRole("heading", { name: heading })).toBeVisible();
  const preview = page.locator("[data-settlediff-preview]");
  await expect(preview).toBeVisible();
  await expect(preview).toContainText("Base Sepolia testnet");
  await expect(preview).toContainText("PAID_FAILURE");
  await expect(preview.locator("[data-outcome='verified']")).toHaveAttribute("data-phase", "3");
  await expect(reduced).toContainText("BLIND BY CONSTRUCTION"); await expect(reduced).toContainText("Independent experimental project · not affiliated with the NTSB");
});
