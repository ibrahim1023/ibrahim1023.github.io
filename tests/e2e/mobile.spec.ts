import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

async function expectOnlyLayout(page: Page, layout: "mobile" | "desktop") {
  await expect(page.locator(`[data-animated-layout="${layout}"]`)).toBeVisible();
  await expect(page.locator(`[data-animated-layout="${layout === "mobile" ? "desktop" : "mobile"}"]`)).toBeHidden();
  await expect(page.locator("[data-stage]:visible")).toHaveCount(1);
}

test("mobile uses the vertical narrative without horizontal overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expectOnlyLayout(page, "mobile");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.locator("[data-mobile-evidence]")).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile remains exclusive and overflow-free at 360 pixels", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expectOnlyLayout(page, "mobile");
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

  await expectOnlyLayout(page, "mobile");
  await page.setViewportSize({ width: 844, height: 390 });
  await expectOnlyLayout(page, "desktop");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectOnlyLayout(page, "mobile");

  expect(errors).toEqual([]);
});
