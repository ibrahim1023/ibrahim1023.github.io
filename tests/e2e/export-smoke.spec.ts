import { expect, test } from "@playwright/test";


test("exported site loads under the site root without errors", async ({
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

  await page.goto("/");

  await expect(page).toHaveTitle("Ibrahim Arshad — AI Systems Engineer");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/ibrahim1023\.github\.io\/?$/,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    /^https:\/\/ibrahim1023\.github\.io\/?$/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary",
  );
  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("region", { name: "SettleDiff" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeAttached();
  await expect(page.locator("[data-state]")).toHaveCount(0);
  expect(await page.evaluate(() => "__portfolioE2ELifecycle__" in window)).toBe(false);
  await expect(page.locator('[data-portfolio-experience]')).toHaveAttribute("data-animated", "ready");
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator("[data-state]")).toHaveCount(0);

  expect(failedResponses).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
