import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

async function expectOnlyLayout(page: Page, layout: "mobile" | "desktop") {
  await expect(page.locator(`[data-animated-layout="${layout}"]`)).toBeVisible();
  await expect(page.locator(`[data-animated-layout="${layout === "mobile" ? "desktop" : "mobile"}"]`)).toBeHidden();
  await expect(page.locator("[data-stage]:visible")).toHaveCount(1);
}

async function expectRuntimeLayout(page: Page, layout: "mobile" | "desktop") {
  await expect(page.locator("[data-portfolio-experience]")).toHaveAttribute("data-animated", "ready");
  await expectOnlyLayout(page, layout);
  await expect(page.locator(".pin-spacer")).toHaveCount(layout === "desktop" ? 1 : 0);
}

test("mobile uses the vertical narrative without horizontal overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expectRuntimeLayout(page, "mobile");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.locator("[data-mobile-evidence]")).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile remains exclusive and overflow-free at 360 pixels", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expectRuntimeLayout(page, "mobile");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});

test("orientation changes rebuild one visible layout without page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expectRuntimeLayout(page, "mobile");
  await page.setViewportSize({ width: 844, height: 390 });
  await expectRuntimeLayout(page, "desktop");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectRuntimeLayout(page, "mobile");

  const evidence = page.locator("[data-mobile-evidence]");
  await evidence.scrollIntoViewIfNeeded();
  await expect(evidence).toBeInViewport();
  const evidenceTops = await page.locator("[data-mobile-evidence-item]").evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().top),
  );
  expect(evidenceTops.every((top, index) => index === 0 || top > evidenceTops[index - 1]!)).toBe(true);

  expect(errors).toEqual([]);
});

test("320px mobile keeps the source link focus outline within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await expectRuntimeLayout(page, "mobile");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const source = page.getByRole("link", { name: "View SettleDiff source on GitHub" });
  await expect(source).toBeFocused();

  const focusBounds = await source.evaluate((link) => {
    const bounds = link.getBoundingClientRect();
    const style = window.getComputedStyle(link);
    const outline = Number.parseFloat(style.outlineWidth) + Math.abs(Number.parseFloat(style.outlineOffset));
    return {
      left: bounds.left - outline,
      right: bounds.right + outline,
      viewportWidth: window.innerWidth,
    };
  });

  expect(focusBounds.left).toBeGreaterThanOrEqual(0);
  expect(focusBounds.right).toBeLessThanOrEqual(focusBounds.viewportWidth);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
