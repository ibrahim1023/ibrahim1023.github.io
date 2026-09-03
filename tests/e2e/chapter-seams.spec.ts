import { expect, test } from "@playwright/test";
import { RUNWAY_MULTIPLIER, activeNarrativeLocator, expectMostlyVisible } from "./helpers/narrative";

for (const layout of ["desktop", "mobile"] as const) {
test(`${layout} chapter seams have no excess runway or duplicate project introduction`, async ({ page }) => {
  await page.setViewportSize(layout === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();

  const geometry = await page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector)!;
      const box = node.getBoundingClientRect();
      return { top: box.top + scrollY, bottom: box.bottom + scrollY, height: box.height };
    };
    return {
      settlediff: rect('[data-narrative="settlediff"]'),
      casezero: rect('[data-narrative="casezero"]'),
      vault: rect('[data-stable-vault]'),
      viewport: innerHeight,
    };
  });

  const settleEnd = geometry.settlediff.top + geometry.viewport * RUNWAY_MULTIPLIER.settlediff[layout];
  expect(geometry.casezero.top - settleEnd).toBeLessThanOrEqual(geometry.viewport + 2);
  if (layout === "desktop") {
    expect(geometry.settlediff.height).toBeLessThanOrEqual(geometry.viewport + 2);
    expect(geometry.casezero.height).toBeLessThanOrEqual(geometry.viewport + 2);
  }
  await expectMostlyVisible(activeNarrativeLocator(page, layout, "[data-casezero-question]", "casezero"), { requireViewport: false });
  for (const offset of [0, 0.25, 0.5, 0.75, 0.98]) {
    await page.evaluate((y) => scrollTo(0, y), settleEnd + geometry.viewport * offset);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const centerSurface = await page.evaluate(() => {
      const node = document.elementFromPoint(innerWidth / 2, innerHeight / 2) as HTMLElement | null;
      return node?.closest('[data-narrative], [data-stable-vault]')?.getAttribute("data-narrative")
        ?? node?.closest('[data-stable-vault]')?.getAttribute("data-project-root")
        ?? null;
    });
    expect(centerSurface, `empty viewport at ${offset} viewport(s) after the SettleDiff pin`).not.toBeNull();
  }

  const caseEnd = geometry.casezero.top + geometry.viewport * RUNWAY_MULTIPLIER.casezero[layout];
  expect(geometry.vault.top - caseEnd).toBeLessThanOrEqual(geometry.viewport + 2);
  await page.evaluate((y) => scrollTo(0, y), caseEnd - 20);
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect(page.locator('[data-narrative="casezero"] [data-vault-transition-title]:visible')).toHaveCount(0);
  await expect(page.locator('[data-stable-vault] [data-vault-arrival] h2')).not.toBeInViewport();
  await expectMostlyVisible(activeNarrativeLocator(page, layout, "[data-lock-packet]", "casezero"));
  await page.screenshot({ path: test.info().outputPath("casezero-closing.png") });
  await page.evaluate((y) => scrollTo(0, y), geometry.vault.top);
  await expect(page.locator('[data-stable-vault] [data-vault-arrival] h2')).toBeInViewport();
  await page.screenshot({ path: test.info().outputPath("vault-arrival.png") });
});
}
