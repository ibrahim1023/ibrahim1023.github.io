import { expect, test, type Page } from "@playwright/test";
import { activeNarrativeLocator, capturePageDiagnostics, expectMostlyHidden, expectMostlyVisible, scrollNarrativeTo, waitForAnimationFrames } from "./helpers/narrative";

const STATES = [
  [0.03, "[data-stage-header]"], [0.14, "[data-artifact-scene]"], [0.25, "[data-uncertainty]"],
  [0.38, "[data-reconstruction]"], [0.50, "[data-origin-incident]"], [0.61, "[data-system-boundary]"],
  [0.73, "[data-proof]"], [0.84, "[data-checks]"], [0.93, "[data-verified]"], [0.99, "[data-settle-case-transition]"],
] as const;

const CASE_ZERO_STATES = [
  [0.05, "[data-casezero-question]"], [0.20, "[data-case-file]"],
  [0.40, "[data-case-file]"], [0.59, "[data-blind-scene]"],
  [0.75, "[data-blind-climax]"], [0.90, "[data-lock-record]"],
  [0.99, "[data-vault-transition]"],
] as const;

async function ready(page: Page, layout: "desktop" | "mobile") {
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
  await expect(page.locator(`[data-narrative="settlediff"] [data-animated-layout="${layout}"]`)).toBeVisible();
}

for (const layout of ["desktop", "mobile"] as const) {
  test(`${layout} CaseZero chapter stays legible forward and reverse`, async ({ page }) => {
    await page.setViewportSize(layout === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 });
    await page.goto("/portfolio/"); await ready(page, layout);
    for (const [progress, selector] of CASE_ZERO_STATES) await test.step(`forward ${progress} ${selector}`, async () => { await scrollNarrativeTo(page, "casezero", layout, progress); await expectMostlyVisible(activeNarrativeLocator(page, layout, selector, "casezero"), { viewportRatio: .02 }); });
    for (const [progress, selector] of [...CASE_ZERO_STATES].reverse()) await test.step(`reverse ${progress} ${selector}`, async () => { await scrollNarrativeTo(page, "casezero", layout, progress); await expectMostlyVisible(activeNarrativeLocator(page, layout, selector, "casezero"), { viewportRatio: .02 }); });
  });
}

for (const layout of ["desktop", "mobile"] as const) {
  test(`${layout} exposes the approved story forward and in reverse`, async ({ page }) => {
    await page.setViewportSize(layout === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 });
    await page.goto("/portfolio/"); await ready(page, layout);
    for (const [progress, selector] of STATES) { await scrollNarrativeTo(page, layout, progress); await expectMostlyVisible(activeNarrativeLocator(page, layout, selector), { viewportRatio: .02 }); }
    for (const [progress, selector] of [...STATES].reverse()) { await scrollNarrativeTo(page, layout, progress); await expectMostlyVisible(activeNarrativeLocator(page, layout, selector), { viewportRatio: .02 }); }
  });
}

test("each settled desktop state clears the previous foreground", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto("/portfolio/"); await ready(page, "desktop");
  const pairs = [
    [0.38, "[data-reconstruction]", "[data-uncertainty]"], [0.50, "[data-origin-incident]", "[data-reconstruction]"],
    [0.61, "[data-system-boundary]", "[data-origin-incident]"], [0.73, "[data-proof]", "[data-system-boundary]"],
    [0.84, "[data-checks]", "[data-proof]"], [0.93, "[data-verified]", "[data-checks]"], [0.99, "[data-settle-case-transition]", "[data-verified]"],
  ] as const;
  for (const [progress, current, previous] of pairs) {
    await scrollNarrativeTo(page, "desktop", progress);
    await expectMostlyVisible(activeNarrativeLocator(page, "desktop", current), { viewportRatio: .02 });
    await expectMostlyHidden(activeNarrativeLocator(page, "desktop", previous));
  }
});

test("provider and independent evidence never intersect at the proof hold", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto("/portfolio/"); await ready(page, "desktop");
  await scrollNarrativeTo(page, "desktop", .75);
  const [provider, independent] = await Promise.all([
    activeNarrativeLocator(page, "desktop", "[data-provider-record]").boundingBox(),
    activeNarrativeLocator(page, "desktop", "[data-independent-record]").boundingBox(),
  ]);
  expect(provider).not.toBeNull(); expect(independent).not.toBeNull();
  expect(provider!.x + provider!.width).toBeLessThan(independent!.x);
});

test("the lock packet releases into the stable Vault arrival", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page);
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto("/portfolio/"); await ready(page, "desktop");
  await scrollNarrativeTo(page, "casezero", "desktop", .99);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-lock-packet]", "casezero"), { viewportRatio: .02 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await waitForAnimationFrames(page);
  await expect(page.locator("[data-vault-arrival]")).toBeInViewport();
  await expect(page.locator("[data-vault-arrival] h2")).toHaveText("Vault Steward");
  expect(diagnostics.pageErrors).toEqual([]); expect(diagnostics.consoleErrors).toEqual([]); expect(diagnostics.failedResponses).toEqual([]);
});
