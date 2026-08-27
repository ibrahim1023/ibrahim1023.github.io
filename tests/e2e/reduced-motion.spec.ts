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
  await page.goto("/portfolio/");

  await expect(page.locator('[data-animated-layout="desktop"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeHidden();
  await expect(page.locator('[data-branch="reduced"]')).toBeHidden();
});

test("reduced motion exposes only the complete static narrative", async ({
  page,
}) => {
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
});
