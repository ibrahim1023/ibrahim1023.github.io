import { expect, test } from "@playwright/test";
import { activeNarrativeLocator, expectMostlyVisible, scrollNarrativeTo } from "./helpers/narrative";

for (const viewport of [{ width: 1440, height: 900 }, { width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
  test(`CaseZero question is centered at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const layout = viewport.width < 768 ? "mobile" : "desktop";
    await scrollNarrativeTo(page, "casezero", layout, .05);
    const question = activeNarrativeLocator(page, layout, "[data-casezero-question]", "casezero");
    await expectMostlyVisible(question);
    const box = await question.boundingBox();
    expect(Math.abs(box!.x + box!.width / 2 - viewport.width / 2)).toBeLessThan(2);
    const header = activeNarrativeLocator(page, layout, "[data-casezero-header]", "casezero");
    await expect(header).toBeVisible();
    const stage = activeNarrativeLocator(page, layout, "[data-casezero-stage]", "casezero");
    expect(Math.abs((await header.boundingBox())!.x - (await stage.boundingBox())!.x)).toBeLessThanOrEqual(40);
    await page.screenshot({ path: test.info().outputPath("casezero-centered.png") });
  });
}
