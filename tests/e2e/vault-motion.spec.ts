import { expect, test } from "@playwright/test";
import { activeNarrativeLocator, expectMostlyHidden, expectMostlyVisible, scrollNarrativeTo } from "./helpers/narrative";

for (const layout of ["desktop", "mobile"] as const) {
  test(`${layout} shares paper backgrounds and animates Vault without another pin`, async ({ page }) => {
    await page.setViewportSize(layout === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator('[data-animated="ready"]')).toBeVisible();
    await scrollNarrativeTo(page, layout, .99);
    await expectMostlyVisible(activeNarrativeLocator(page, layout, "[data-settle-case-transition]"));
    await expect.poll(() => page.locator('[data-narrative="settlediff"]').evaluate(node => getComputedStyle(node).backgroundColor)).toBe("rgb(233, 231, 225)");
    expect(await page.locator('[data-stable-vault]').evaluate(node => getComputedStyle(node).backgroundColor)).toBe("rgb(233, 231, 225)");
    const vault = page.locator('[data-stable-vault] [data-vault-arrival]');
    const geometry = await vault.locator('[data-vault-workflow]').evaluate(node => {
      const r = node.getBoundingClientRect();
      return { top: r.top + scrollY, height: r.height, viewport: innerHeight };
    });
    const start = geometry.top - .08 * geometry.viewport;
    const end = start + 320;
    const seek = async (progress: number) => {
      await page.evaluate(y => scrollTo(0, y), start + (end - start) * progress);
    };
    await seek(.05);
    await expectMostlyHidden(vault.locator('[data-vault-approved]'));
    const initialTop = await vault.locator('[data-vault-workbench]').evaluate(node => node.getBoundingClientRect().top);
    await seek(.68);
    await expectMostlyVisible(vault.locator('[data-vault-approved]'));
    const heldTop = await vault.locator('[data-vault-workbench]').evaluate(node => node.getBoundingClientRect().top);
    expect(Math.abs(heldTop - initialTop)).toBeLessThan(2);
    await expectMostlyHidden(vault.locator('[data-vault-result]'));
    await seek(1);
    await expectMostlyVisible(vault.locator('[data-vault-result]'));
    await page.screenshot({ path: test.info().outputPath('vault-verified.png') });
    await seek(.05);
    await expectMostlyHidden(vault.locator('[data-vault-approved]'));
    await expect(page.locator('.pin-spacer')).toHaveCount(layout === "desktop" ? 2 : 0);
    await page.getByRole('navigation', { name: 'Social profiles' }).scrollIntoViewIfNeeded();
    await expect(page.getByRole('navigation', { name: 'Social profiles' }).getByRole('link')).toHaveCount(4);
  });
}
