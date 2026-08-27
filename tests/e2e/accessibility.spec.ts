import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { scrollNarrativeTo } from "./helpers/narrative";

const AXE_MODES = [
  { name: "desktop", reducedMotion: "no-preference", viewport: { width: 1440, height: 900 } },
  { name: "mobile", reducedMotion: "no-preference", viewport: { width: 390, height: 844 } },
  { name: "reduced motion", reducedMotion: "reduce", viewport: { width: 1440, height: 900 } },
] as const;

for (const mode of AXE_MODES) {
  test(`no serious axe violations (${mode.name})`, async ({ page }) => {
    await page.setViewportSize(mode.viewport);
    await page.emulateMedia({ reducedMotion: mode.reducedMotion });
    await page.goto("/portfolio/");
    const axe = () =>
      new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]);
    const results = mode.name === "mobile"
      ? await (async () => {
        const introResults = await axe().include(["[data-intro]"]).analyze();
        await scrollNarrativeTo(page, "mobile", 0.17);
        const narrativeResults = await axe()
          .include(['[data-animated-layout="mobile"]', "[data-vault-arrival]"])
          .analyze();
        return {
          violations: [...introResults.violations, ...narrativeResults.violations],
        };
      })()
      : await axe().include(["body"]).analyze();

    const blocking = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );

    expect(
      blocking.map((violation) => violation.id),
    ).toEqual([]);

    const visibleProjectLinks = page.locator('a[aria-label^="View "]:visible');
    await expect(visibleProjectLinks).toHaveCount(mode.name === "reduced motion" ? 3 : 2);
    await expect(visibleProjectLinks.nth(0)).toHaveAttribute(
      "aria-label",
      "View SettleDiff source on GitHub",
    );
    await expect(visibleProjectLinks.nth(1)).toHaveAttribute(
      "aria-label",
      "View Vault Steward source on GitHub",
    );

    const bounds = await visibleProjectLinks.evaluateAll((links) =>
      links.map((link) => {
        const rect = link.getBoundingClientRect();
        return { height: rect.height, width: rect.width };
      }),
    );
    expect(bounds.every(({ width, height }) => width >= 44 && height >= 44)).toBe(true);

    const visibleLinks = await page.locator("a:visible").evaluateAll((links) =>
      links.map((link) => link.getAttribute("aria-label") ?? link.textContent?.trim()),
    );
    expect(visibleLinks.slice(0, 3)).toEqual([
      "Skip to content",
      "View SettleDiff source on GitHub",
      "View Vault Steward source on GitHub",
    ]);
  });
}
