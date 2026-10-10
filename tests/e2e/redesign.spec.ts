import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage has two concise projects and accessible evidence controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Résumé ↗" })).toHaveAttribute("href", "/ibrahim-arshad-resume.pdf");
  await expect(page.locator("[data-project-root]")).toHaveCount(2);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  const settle = page.locator("[data-settlediff-preview]");
  await settle.scrollIntoViewIfNeeded();
  await expect(settle.locator("[data-preview-result]")).toContainText("VERIFIED");
  await settle.getByRole("button", { name: /Provider records/ }).click();
  await expect(settle.locator("[data-preview-result]")).toContainText("UNVERIFIABLE");
  await settle.getByRole("button", { name: /Paid delivery/ }).click();
  await expect(settle.locator("[data-preview-result]")).toContainText("PAID_FAILURE");
  const vault = page.locator("[data-vault-preview]");
  await vault.locator("[data-phase]").scrollIntoViewIfNeeded();
  await vault.getByRole("button", { name: /Replay Vault Steward/ }).click();
  await expect(vault.locator("[data-phase]")).toHaveAttribute("data-phase", "4");
  await expect(vault.locator("[data-vault-approval]")).toHaveCSS("opacity", "1");
  await expect(vault.locator("[data-vault-status]")).toContainText("awaiting approval");
  await expect(page.locator("a[href^='mailto:']")).toHaveCount(1);
  expect((await new AxeBuilder({ page }).analyze()).violations.filter(v => ["serious", "critical"].includes(v.impact ?? ""))).toEqual([]);
});

test("SettleDiff plays the flowchart before resolving into the receipts", async ({ page }) => {
  await page.goto("/");
  const settle = page.locator("[data-settlediff-preview]");
  await settle.scrollIntoViewIfNeeded();
  await settle.getByRole("button", { name: /Replay SettleDiff/ }).click();
  const stage = settle.locator("[data-phase]");
  await expect(stage).toHaveAttribute("data-phase", "0");
  await expect(stage.locator("[data-preview-flow]")).toHaveCSS("opacity", "1");
  await expect(stage).toHaveAttribute("data-phase", "2");
  await expect(stage).toHaveAttribute("data-phase", "5");
  await expect(stage.locator("[data-preview-papers]")).toHaveCSS("opacity", "1");
  await expect(stage.locator("[data-preview-result]")).toContainText("VERIFIED");
});

test("SettleDiff first paint shows the flowchart before hydration", async ({ page }) => {
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>(resolve => { releaseScripts = resolve; });
  await page.route("**/_next/**/*.js", async route => { await scriptsReady; await route.continue(); });
  try {
    await page.goto("/#work", { waitUntil: "commit" });
    const stage = page.locator("[data-settlediff-preview] [data-phase]");
    await stage.scrollIntoViewIfNeeded();
    await expect(stage.locator("[data-preview-flow]")).toHaveCSS("opacity", "1");
    await expect(stage.locator("[data-preview-papers]")).toHaveCSS("opacity", "0");
    releaseScripts();
    await expect(stage).toHaveAttribute("data-phase", "2");
    await expect(stage).toHaveAttribute("data-phase", "5");
    await expect(stage.locator("[data-preview-papers]")).toHaveCSS("opacity", "1");
  } finally {
    releaseScripts();
  }
});

test("SettleDiff without JavaScript shows the finished receipts with normal motion settings", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "no-preference" });
  const page = await context.newPage();
  await page.goto("/#work");
  await expect(page.locator("[data-preview-flow]")).toHaveCSS("display", "none");
  await expect(page.locator("[data-preview-papers]")).toHaveCSS("opacity", "1");
  await expect(page.locator("[data-preview-result]")).toContainText("VERIFIED");
  await context.close();
});

test("phone-sized SettleDiff receipts do not cover one another", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  const settle = page.locator("[data-settlediff-preview]");
  await settle.scrollIntoViewIfNeeded();
  await expect(settle.locator("[data-phase]")).toHaveAttribute("data-phase", "5", { timeout: 7000 });
  const first = await settle.locator("[data-preview-claim]").boundingBox();
  const second = await settle.locator("[data-preview-observation]").boundingBox();
  expect(first && second && first.y + first.height < second.y).toBe(true);
});

test("Vault Steward scans, reveals a repair, and stops for approval", async ({ page }) => {
  await page.goto("/");
  const vault = page.locator("[data-vault-preview]");
  const workspace = vault.locator("[data-phase]");
  await workspace.scrollIntoViewIfNeeded();
  await vault.getByRole("button", { name: /Replay Vault Steward/ }).click();
  await expect(workspace.locator("[data-vault-repair]")).toHaveCSS("visibility", "hidden");
  await expect(workspace.locator("[data-vault-scan]")).toHaveCSS("opacity", "1");
  await expect(workspace.locator("[data-vault-status]")).toContainText("Broken link found");
  await expect(workspace.locator("[data-vault-repair]")).toHaveCSS("visibility", "visible");
  await expect(workspace.locator("[data-vault-status]")).toContainText("awaiting approval");
  await expect(workspace.locator("[data-vault-approval]")).toHaveCSS("opacity", "1");
  await expect(workspace.locator("[data-vault-broken]")).toContainText("[[missing-target]]");
});

test("changing to reduced motion completes an active demonstration", async ({ page }) => {
  await page.goto("/");
  const vault = page.locator("[data-vault-preview]");
  await vault.locator("[data-phase]").scrollIntoViewIfNeeded();
  await vault.getByRole("button", { name: /Replay Vault Steward/ }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(vault.locator("[data-phase]")).toHaveAttribute("data-phase", "4");
  await expect(vault.locator("[data-vault-repair]")).toBeVisible();
  await expect(vault.locator("[data-vault-status]")).toContainText("No note has been changed");
});

for (const width of [320, 390, 1440]) {
  test(`project previews fit at ${width}px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    await page.goto("/");
    for (const selector of ["[data-settlediff-preview]", "[data-vault-preview]"]) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (selector === "[data-settlediff-preview]") {
        const connectionErrors = await section.locator("[data-preview-flow]").evaluate(flow => {
          const node = flow.querySelector("[data-flow-node]")!.getBoundingClientRect();
          return ["provider", "independent"].map(source => {
            const rail = flow.querySelector(`[data-flow-rail="${source}"]`)!.getBoundingClientRect();
            const path = flow.querySelector<SVGPathElement>(`[data-flow-connector="${source}"]`)!;
            const matrix = path.getScreenCTM()!;
            const start = path.getPointAtLength(0).matrixTransform(matrix);
            const end = path.getPointAtLength(path.getTotalLength()).matrixTransform(matrix);
            return [Math.abs(start.x - rail.right), Math.abs(start.y - rail.y - rail.height / 2), Math.abs(end.x - node.x), Math.abs(end.y - node.y - node.height / 2)];
          }).flat();
        });
        expect(Math.max(...connectionErrors)).toBeLessThan(1);
      }
    }
  });
}

test("automatic theme follows a live color-scheme change", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const light = await page.locator("body").evaluate(node => getComputedStyle(node).backgroundColor);
  await page.emulateMedia({ colorScheme: "dark" });
  const dark = await page.locator("body").evaluate(node => getComputedStyle(node).backgroundColor);
  expect(light).not.toBe(dark);
  await expect(page.locator("[data-vault-preview]")).toBeVisible();
});

test("reduced motion and no JavaScript retain the final evidence", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("[data-preview-result]")).toContainText("VERIFIED");
  await expect(page.locator("[data-vault-status]")).toContainText("awaiting approval");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await context.close();
});

test("both case studies are direct-entry pages and CaseZero route is absent", async ({ page }) => {
  for (const [slug, name] of [["settlediff", "SettleDiff"], ["vault-steward", "Vault Steward"]] as const) {
    await page.goto(`/projects/${slug}/`);
    await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
    await expect(page.getByRole("link", { name: "Résumé ↗" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Back to projects/ })).toHaveAttribute("href", "/#work");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  const removed = await page.goto("/projects/casezero/");
  expect(removed?.status()).toBe(404);
});
