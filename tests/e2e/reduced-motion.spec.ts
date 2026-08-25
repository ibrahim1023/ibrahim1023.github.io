import { expect, test } from "@playwright/test";

const STORY_HEADINGS = [
  "Request",
  "Activity recorded",
  "Evidence",
  "Expected vs observed",
  "Chain mismatch",
  "UNVERIFIABLE",
  "Reasoning",
  "Vault Steward transformation",
] as const;

test("default motion exposes only the animated branch", async ({ page }) => {
  await page.goto("/portfolio/");

  await expect(page.locator('[data-branch="animated"]')).toBeVisible();
  await expect(page.locator('[data-branch="reduced"]')).toBeHidden();
});

test("reduced motion exposes only the complete static narrative", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/portfolio/");

  await expect(page.locator('[data-branch="animated"]')).toBeHidden();

  const reduced = page.locator('[data-branch="reduced"]');
  await expect(reduced).toBeVisible();

  for (const heading of STORY_HEADINGS) {
    await expect(
      reduced.getByRole("heading", { name: heading }),
    ).toBeVisible();
  }
});
