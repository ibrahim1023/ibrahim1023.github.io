import { expect, test } from "@playwright/test";
import { activeNarrativeLocator, capturePageDiagnostics, expectMostlyVisible, scrollNarrativeTo, waitForAnimationFrames } from "./helpers/narrative";

test("fast forward and reverse returns to one readable SettleDiff stage", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page); await page.setViewportSize({ width: 1440, height: 900 }); await page.goto("/portfolio/");
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await waitForAnimationFrames(page);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await waitForAnimationFrames(page);
  await expect(page.locator("[data-vault-arrival]")).toBeInViewport();
  await scrollNarrativeTo(page, "desktop", .14); await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-artifact-scene]"), { viewportRatio: .02 });
  await expect(page.locator("[data-stage]:visible")).toHaveCount(1);
  expect(diagnostics.pageErrors).toEqual([]); expect(diagnostics.consoleErrors).toEqual([]);
});

test("mid-story refresh restores independent proof", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto("/portfolio/"); await scrollNarrativeTo(page, "desktop", .73);
  const before = await page.evaluate(() => window.scrollY); await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-proof]"), { viewportRatio: .02 });
  await page.reload({ waitUntil: "load" });
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
  await expect.poll(() => page.evaluate((value) => Math.abs(window.scrollY - value), before)).toBeLessThanOrEqual(8);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-proof]"), { viewportRatio: .02 });
});

test("back-forward navigation rebuilds a single lifecycle", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto("/portfolio/?e2eLifecycle=1");
  await scrollNarrativeTo(page, "desktop", .61); await page.goto("about:blank"); await page.goBack();
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toHaveCount(1);
  await expect(page.locator(".pin-spacer")).toHaveCount(1); await expect(page.locator("[data-stage]:visible")).toHaveCount(1);
});

test("all timeline targets remain readable when animation styles are cleared", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto("/portfolio/");
  await page.evaluate(() => { const root = document.querySelector<HTMLElement>("[data-portfolio-experience]")!; root.removeAttribute("data-animated"); document.querySelectorAll<HTMLElement>("[data-animatable]").forEach((node) => node.removeAttribute("style")); });
  const desktop = page.locator('[data-animated-layout="desktop"]');
  await expect(desktop.getByRole("heading", { name: "SettleDiff" })).toBeVisible();
  await expect(desktop).toContainText("UNVERIFIABLE"); await expect(desktop).toContainText("VERIFIED"); await expect(desktop).toContainText("Vault Steward");
});
