import { expect, test } from "@playwright/test";

import { scrollNarrativeTo } from "./helpers/narrative";

test("exported site loads under the repository subpath without errors", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("response", (response) => {
    if (!response.ok()) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/portfolio/");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("region", { name: "SettleDiff" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeAttached();
  await expect(page.locator("[data-state]")).toHaveCount(0);
  expect(await page.evaluate(() => "__portfolioE2ELifecycle__" in window)).toBe(false);
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
  await scrollNarrativeTo(page, "desktop", 0.6);
  await expect(page.locator("[data-state]")).toHaveCount(0);

  expect(failedResponses).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
