import { expect, test } from "@playwright/test";

const LATE_STATES = [
  "mismatch-isolated",
  "unverifiable",
  "reasoning-chain",
  "vault-steward-arrival",
] as const;

test("scroll drives the SettleDiff state machine forward and back", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await page.waitForSelector('[data-animated="ready"]');

  const stage = page.locator("[data-stage]");
  await expect(stage).toHaveAttribute("data-state", "project-established");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);

  const final = await stage.getAttribute("data-state");
  expect(LATE_STATES).toContain(final);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await expect(stage).toHaveAttribute("data-state", "project-established");
});

test("scroll reveals the Vault Steward arrival", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await page.waitForSelector('[data-animated="ready"]');

  const vault = page.locator("[data-vault-arrival]");
  await expect(vault).not.toBeInViewport();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);

  await expect(vault).toBeInViewport();
});
