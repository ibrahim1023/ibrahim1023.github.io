import { expect, test } from "@playwright/test";

import {
  activeLayout,
  activeNarrativeLocator,
  capturePageDiagnostics,
  expectMostlyVisible,
  scrollNarrativeTo,
} from "./helpers/narrative";

const VIEWPORTS = [
  { label: "320px overflow safety", width: 320, height: 800, layout: "mobile" },
  { label: "360×800", width: 360, height: 800, layout: "mobile" },
  { label: "390×844", width: 390, height: 844, layout: "mobile" },
  { label: "768×1024 portrait", width: 768, height: 1024, layout: "mobile" },
  { label: "1024×768 landscape", width: 1024, height: 768, layout: "desktop" },
  { label: "1280×720", width: 1280, height: 720, layout: "desktop" },
  { label: "1440×900", width: 1440, height: 900, layout: "desktop" },
  { label: "1920×1080", width: 1920, height: 1080, layout: "desktop" },
] as const;

const DESKTOP_CHECKPOINTS = [
  [0.5, "[data-evidence]"],
  [0.67, "[data-comparison]"],
  [0.795, "[data-mismatch]"],
  [0.895, "[data-verdict]"],
  [0.955, "[data-chain]"],
  [0.997, "[data-vault-transition]"],
] as const;

const MOBILE_CHECKPOINTS = [
  [0.5, "[data-evidence]"],
  [0.65, "[data-comparison]"],
  [0.78, "[data-mismatch]"],
  [0.88, "[data-verdict]"],
  [0.95, "[data-chain]"],
  [0.997, "[data-vault-transition]"],
] as const;

const TABLET_PORTRAIT_CHECKPOINTS = MOBILE_CHECKPOINTS.map(([progress, selector]) =>
  [selector === "[data-mismatch]" ? 0.74 : progress, selector] as const,
);

for (const viewport of VIEWPORTS) {
  test(`${viewport.label} keeps one readable, overflow-free narrative`, async ({ page }) => {
    const diagnostics = capturePageDiagnostics(page);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/portfolio/");

    await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
    await expect(activeLayout(page, viewport.layout)).toBeVisible();
    await expect(activeLayout(page, viewport.layout === "desktop" ? "mobile" : "desktop")).toBeHidden();
    await expect(page.locator("[data-stage]:visible")).toHaveCount(1);

    const checkpoints = viewport.layout === "desktop"
      ? DESKTOP_CHECKPOINTS
      : viewport.width === 768
        ? TABLET_PORTRAIT_CHECKPOINTS
        : MOBILE_CHECKPOINTS;
    for (const [progress, selector] of checkpoints) {
      await scrollNarrativeTo(page, viewport.layout, progress);
      await expectMostlyVisible(activeNarrativeLocator(page, viewport.layout, selector), {
        viewportRatio: 0.02,
      });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }

    expect(diagnostics.pageErrors).toEqual([]);
    expect(diagnostics.consoleErrors).toEqual([]);
    expect(diagnostics.failedResponses).toEqual([]);
  });
}
