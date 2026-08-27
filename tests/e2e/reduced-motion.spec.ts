import { expect, test } from "@playwright/test";

const STORY_HEADINGS = [
  "Request",
  "Activity recorded",
  "Evidence",
  "Expected vs observed",
  "Chain conflict",
  "UNVERIFIABLE",
  "Reasoning",
  "Vault Steward transformation",
] as const;

test("default motion exposes only the animated branch", async ({ page }) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("response", (response) => {
    if (!response.ok()) failedResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.goto("/portfolio/");

  await expect(page.locator('[data-animated-layout="desktop"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeHidden();
  await expect(page.locator('[data-branch="reduced"]')).toBeHidden();
  await expect(page.locator("[data-state]")).toHaveCount(0);
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});

test("reduced motion exposes only the complete static narrative", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("response", (response) => {
    if (!response.ok()) failedResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/portfolio/");

  await expect(page.locator('[data-animated-layout="desktop"]')).toBeHidden();
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeHidden();

  const reduced = page.locator('[data-branch="reduced"]');
  await expect(reduced).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);

  for (const heading of STORY_HEADINGS) {
    await expect(
      reduced.getByRole("heading", { name: heading }),
    ).toBeVisible();
  }

  await expect(page.locator("[data-state]")).toHaveCount(0);
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
