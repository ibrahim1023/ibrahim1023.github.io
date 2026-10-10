import { expect, test } from "@playwright/test";
import { capturePageDiagnostics, waitForAnimationFrames } from "./helpers/narrative";

test.use({ viewport: { width: 390, height: 844 } });

test("iPhone composition is exclusive and overflow-free", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page); await page.goto("/");
  await expect(page.locator('[data-animated-layout="mobile"]:visible')).toHaveCount(1);
  await expect(page.locator('[data-animated-layout="desktop"]:visible')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(diagnostics.pageErrors).toEqual([]); expect(diagnostics.consoleErrors).toEqual([]);
});

test("iPhone stacks SettleDiff proof records and keeps them inside the usable viewport", async ({ page }) => {
  await page.goto("/");
  const preview = page.locator("[data-settlediff-preview]");
  await preview.scrollIntoViewIfNeeded();
  const records = preview.locator("[data-preview-claim], [data-preview-observation]");
  await expect(records).toHaveCount(2);
  const boxes = await records.evaluateAll((items) => items.map((item) => item.getBoundingClientRect().toJSON()));
  expect(boxes[1]!.top).toBeGreaterThan(boxes[0]!.bottom);
  expect(boxes.every((box) => box.left >= 0 && box.right <= 390)).toBe(true);
});

test("orientation changes rebuild one active layout", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page); await page.goto("/");
  await expect(page.locator('[data-animated-layout="mobile"]:visible')).toHaveCount(1);
  await page.setViewportSize({ width: 844, height: 390 }); await expect(page.locator('[data-animated-layout="desktop"]:visible')).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 }); await expect(page.locator('[data-animated-layout="mobile"]:visible')).toHaveCount(1);
  expect(diagnostics.pageErrors).toEqual([]); expect(diagnostics.consoleErrors).toEqual([]);
});

test("320px keeps the source focus ring and evidence packet in bounds", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 }); await page.goto("/");
  const source = page.getByRole("link", { name: "View SettleDiff source on GitHub" });
  for (let index = 0; index < 10 && !(await source.evaluate(node => node === document.activeElement)); index += 1) await page.keyboard.press("Tab");
  await expect(source).toBeFocused();
  const box = await source.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(3); expect(box!.x + box!.width).toBeLessThanOrEqual(317);
  const preview = page.locator("[data-settlediff-preview]");
  await preview.scrollIntoViewIfNeeded();
  await expect(preview.locator("[data-preview-result]")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("mobile fast scroll reaches the stable Vault section", async ({ page }) => {
  await page.goto("/"); await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await waitForAnimationFrames(page);
  await expect(page.getByRole("heading", { name: "Stack & tools" })).toBeVisible();
  await page.locator("[data-vault-arrival]").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-vault-arrival]")).toBeInViewport();
});
