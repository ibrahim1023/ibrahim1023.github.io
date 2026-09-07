import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("intro stays uncluttered, skills static, and contact not duplicated", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-intro] a[href*="/projects/"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "View résumé" })).toHaveAttribute("href", "/ibrahim-arshad-resume.pdf");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
  await expect(page.locator('[data-stack-reel]')).toHaveCount(0);
  await expect(page.locator('[data-path-origin]')).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Stack & tools" })).toContainText("Claude Code · Codex · Devin");
  await expect(page.getByRole("region", { name: "Vault Steward", exact: true })).toContainText("Broken link: target missing");
});

for (const width of [390, 1440]) {
  test(`original visual stages retain three compact beats at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator('[data-portfolio-experience]')).toHaveAttribute("data-animated", "ready");
    await expect(page.locator('[data-scroll-ready="true"]')).toBeVisible();
    await expect(page.locator('[data-intro] a[href*="/projects/"]')).toHaveCount(0);
    const layout = width < 768 ? "mobile" : "desktop";
    for (const [chapter, selectors] of [["settlediff", ["[data-artifact-scene]", "[data-proof]", "[data-verified]"]], ["casezero", ["[data-case-file]", "[data-blind-scene]", "[data-lock-record]"]]] as const) {
      const scope = page.locator(`[data-narrative="${chapter}"] [data-animated-layout="${layout}"]`);
      await page.locator(`[data-narrative="${chapter}"]`).evaluate(node => {
        const anchor = node.parentElement?.classList.contains("pin-spacer") ? node.parentElement : node;
        scrollTo(0, scrollY + anchor.getBoundingClientRect().top);
      });
      await expect(scope.getByRole("heading", { level: 2, name: chapter === "casezero" ? "CaseZero" : "SettleDiff" })).toBeVisible();
      if (width < 768) {
        const headingBox = await scope.getByRole("heading", { level: 2, name: chapter === "casezero" ? "CaseZero" : "SettleDiff" }).boundingBox();
        const detailsBox = await scope.getByRole("link", { name: "Case study ↗" }).boundingBox();
        expect(headingBox).not.toBeNull();
        expect(detailsBox).not.toBeNull();
        expect(detailsBox!.y).toBeGreaterThanOrEqual(headingBox!.y + headingBox!.height - 2);
      }
      await page.screenshot({ path: test.info().outputPath(`${chapter}-opening.png`) });
      for (const index of [0, 1, 2, 1, 0, 2]) {
        await page.locator(`[data-narrative="${chapter}"]`).evaluate((node, args) => {
          const anchor = node.parentElement?.classList.contains("pin-spacer") ? node.parentElement : node;
          scrollTo(0, scrollY + anchor.getBoundingClientRect().top + innerHeight * args.runway * args.progress);
        }, { runway: width < 768 ? 1.6 : 1.8, progress: [.25, .57, .95][index] });
        const active = scope.locator(selectors[index]);
        await expect(active).toBeVisible();
        await expect.poll(() => active.evaluate(node => Number(getComputedStyle(node).opacity))).toBeGreaterThan(.95);
        if (width < 768 && chapter === "casezero" && index === 0) {
          const caseBox = await active.boundingBox();
          expect(caseBox).not.toBeNull();
          expect(caseBox!.y).toBeGreaterThanOrEqual(0);
          expect(caseBox!.y + caseBox!.height).toBeLessThanOrEqual(900);
        }
        for (const [other, selector] of selectors.entries()) if (other !== index) await expect(scope.locator(selector)).toBeHidden();
      }
      await expect(scope.getByRole("link", { name: /Explore project/ })).toBeInViewport();
      await page.screenshot({ path: test.info().outputPath(`${chapter}-final.png`) });
    }
    if (width < 768) {
      const vault = page.getByRole("region", { name: "Vault Steward", exact: true });
      const workflow = vault.locator("[data-vault-workflow]");
      await workflow.evaluate(node => scrollTo(0, scrollY + node.getBoundingClientRect().top + 220));
      const workbenchBox = await vault.locator("[data-vault-workbench]").boundingBox();
      expect(workbenchBox).not.toBeNull();
      expect(workbenchBox!.y).toBeGreaterThanOrEqual(0);
      expect(workbenchBox!.y + workbenchBox!.height).toBeLessThanOrEqual(900);
      await expect(vault.getByRole("link", { name: /Explore project/ })).toBeInViewport();
      await page.screenshot({ path: test.info().outputPath("vault-mobile.png") });
      const skillColumns = await page.locator("dl").filter({ has: page.getByText("Languages", { exact: true }) }).evaluate(node => getComputedStyle(node).gridTemplateColumns.split(" ").length);
      expect(skillColumns).toBe(2);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await expect.poll(() => page.locator('[data-intro-name]').evaluate(node => Number(getComputedStyle(node).opacity))).toBe(1);
    await expect.poll(() => page.locator(`[data-animated-layout="${layout}"] [data-opening-prompt]`).evaluate(node => Number(getComputedStyle(node).opacity))).toBe(0);
    const audit = await new AxeBuilder({ page }).analyze();
    expect(audit.violations.filter(v => ["serious", "critical"].includes(v.impact ?? ""))).toEqual([]);
  });
}

for (const [slug, name] of [["settlediff", "SettleDiff"], ["casezero", "CaseZero"], ["vault-steward", "Vault Steward"]]) {
  test(`static ${name} page supports direct entry and return`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`/projects/${slug}/`);
    await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
    await expect(page.getByRole("heading", { name: "My implementation" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View on GitHub ↗" })).toHaveAttribute("href", /github.com/);
    await expect(page.locator("[data-scroll-flow], .pin-spacer")).toHaveCount(0);
    await page.getByRole("link", { name: /← Ibrahim/ }).click();
    await expect(page).toHaveURL(/\/$/);
    await context.close();
  });
}
