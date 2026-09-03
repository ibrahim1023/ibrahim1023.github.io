import { expect, test } from "@playwright/test";
import { activeLayout, activeNarrativeLocator, capturePageDiagnostics, expectMostlyVisible, scrollNarrativeTo } from "./helpers/narrative";

const VIEWPORTS = [
  [320, 800, "mobile"], [360, 800, "mobile"], [390, 844, "mobile"], [768, 1024, "mobile"],
  [1024, 768, "desktop"], [1280, 720, "desktop"], [1440, 900, "desktop"], [1920, 1080, "desktop"],
] as const;

for (const [width, height, layout] of VIEWPORTS) {
  test(`${width}×${height} keeps proof readable and overflow-free`, async ({ page }) => {
    const diagnostics = capturePageDiagnostics(page); await page.setViewportSize({ width, height }); await page.goto("/");
    await expect(activeLayout(page, layout)).toBeVisible(); await expect(page.locator("[data-stage]:visible")).toHaveCount(1);
    for (const [progress, selector] of [[.38, "[data-reconstruction]"], [.73, "[data-proof]"], [.93, "[data-verified]"], [.99, "[data-settle-case-transition]"]] as const) {
      await scrollNarrativeTo(page, layout, progress); await expectMostlyVisible(activeNarrativeLocator(page, layout, selector), { viewportRatio: .01 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    expect(diagnostics.pageErrors).toEqual([]); expect(diagnostics.consoleErrors).toEqual([]);
  });
}
