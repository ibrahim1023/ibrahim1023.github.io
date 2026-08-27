import { expect, test } from "@playwright/test";

test("the complete story remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/portfolio/");

  const fallback = page.locator("[data-no-js-narrative]");
  await expect(fallback).toBeVisible();
  await expect(fallback.getByText("ACTIVITY RECORDED", { exact: true }).first()).toBeVisible();
  await expect(fallback.getByRole("heading", { name: "UNVERIFIABLE" })).toBeVisible();
  await expect(fallback.getByText("CURRENT / AFTER", { exact: true }).first()).toBeVisible();
  await expect(fallback.getByText("FIND → PREVIEW → APPROVE → VERIFY", { exact: true })).toBeVisible();

  await context.close();
});
