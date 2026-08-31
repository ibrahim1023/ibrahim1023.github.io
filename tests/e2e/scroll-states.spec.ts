import { expect, test, type Page } from "@playwright/test";

import {
  activeLayout,
  activeNarrativeLocator,
  capturePageDiagnostics,
  expectMostlyVisible,
  scrollNarrativeTo,
} from "./helpers/narrative";

const DESKTOP_STATES = [
  [0.05, "[data-stage-header]"],
  [0.17, "[data-token]"],
  [0.28, "[data-attempt]"],
  [0.43, "[data-evidence]"],
  [0.6, "[data-comparison]"],
  [0.74, "[data-mismatch]"],
  [0.85, "[data-verdict]"],
  [0.93, "[data-chain]"],
  [0.985, "[data-vault-transition]"],
] as const;

const EVIDENCE = [
  ["request", "REQUEST", "0.01 USDC", "0.02 USDC max"],
  ["payment", "PAYMENT", "charge unknown", "settlement not established"],
  ["vendor", "VENDOR", "synthetic-search", "sanitized fixture identity"],
  ["chain", "CHAIN", "base → tempo", "advertised vs executed"],
  ["response", "RESPONSE", "HTTP 402", "Payment Required"],
  ["activity", "ACTIVITY", "broadcast_failed", "no transaction hash"],
] as const;

const CLASSIFICATIONS = [
  ["chain", "DIFF"],
  ["charge", "UNKNOWN"],
  ["protocol", "PASS"],
  ["vendor", "PASS"],
  ["service", "FAIL"],
  ["transactionHash", "UNKNOWN"],
] as const;

const VAULT_ROLES = [
  "NOTE",
  "PROPOSED CHANGE",
  "EVIDENCE SOURCE",
  "POLICY",
  "CURRENT / AFTER",
  "AUDIT / RECHECK",
] as const;

const REASONING_LABELS = ["CLAIM", "EVIDENCE", "FINDING", "VERDICT"] as const;

async function waitForAnimationReady(page: Page) {
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="desktop"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeHidden();
}

test("desktop exposes every semantic state forward and in reverse", async ({ page }) => {
  page.setDefaultTimeout(10_000);
  const diagnostics = capturePageDiagnostics(page);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await waitForAnimationReady(page);

  const desktop = activeLayout(page, "desktop");
  await expect(desktop.locator("[data-stage]")).toHaveCount(1);

  for (const [progress, selector] of DESKTOP_STATES) {
    await scrollNarrativeTo(page, "desktop", progress);
    const state = activeNarrativeLocator(page, "desktop", selector);
    await expectMostlyVisible(state);
    if (selector === "[data-evidence]") {
      await expect(state.locator("[data-evidence-item]")).toHaveCount(6);
      for (const [id, label, primary, detail] of EVIDENCE) {
        const item = state.locator(`[data-evidence-item="${id}"]`);
        await expect(item.locator('[data-object-label="settle"]')).toHaveText(label);
        await expect(item).toContainText(primary);
        await expect(item).toContainText(detail);
      }
    }
    if (selector === "[data-comparison]") {
      await expect(state.locator("tbody tr")).toHaveCount(6);
      for (const [id, classification] of CLASSIFICATIONS) {
        await expect(state.locator(`[data-comparison-row="${id}"] [data-classification]`)).toHaveText(classification);
      }
    }
    if (selector === "[data-mismatch]") {
      await expect(state.getByRole("heading", { name: "Chain conflict" })).toBeVisible();
      await expect(state).toContainText("base");
      await expect(state).toContainText("tempo");
      await expect(state).toContainText("Missing settlement proof remains visible");
    }
    if (selector === "[data-verdict]") {
      await expect(state).toContainText("UNVERIFIABLE");
      await expect(state).toContainText("no confirmed charge, no transaction hash");
    }
    if (selector === "[data-chain]") {
      await expect(state.locator("[data-chain-item]")).toHaveCount(4);
      for (const label of REASONING_LABELS) {
        await expect(state).toContainText(label);
      }
    }
  }

  for (const [progress, selector] of [...DESKTOP_STATES].reverse()) {
    await scrollNarrativeTo(page, "desktop", progress);
    await expectMostlyVisible(activeNarrativeLocator(page, "desktop", selector));
  }

  await scrollNarrativeTo(page, "desktop", 0.997);
  const transition = activeNarrativeLocator(page, "desktop", "[data-vault-transition]");
  await expectMostlyVisible(transition);
  await expect(transition.locator("[data-vault-transition-title]")).toHaveText("Vault Steward");
  await expect(transition.locator("[data-vault-transition-step]")).toHaveCount(4);
  await expect(transition.locator("[data-vault-transition-step]")).toHaveText([
    "FIND",
    "PREVIEW",
    "APPROVE",
    "VERIFY",
  ]);
  for (const [index, role] of VAULT_ROLES.entries()) {
    await expect(
      desktop.locator(`[data-evidence-item="${EVIDENCE[index]![0]}"] [data-object-label="vault"]`),
    ).toHaveText(role);
  }

  await scrollNarrativeTo(page, "desktop", 0.05);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-stage-header]"));
  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});

test("the persistent Vault arrival releases from the pinned scene", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await waitForAnimationReady(page);

  const transition = activeNarrativeLocator(page, "desktop", "[data-vault-transition]");
  const arrival = page.locator("[data-vault-arrival]");
  const stage = activeNarrativeLocator(page, "desktop", "[data-stage]");
  await scrollNarrativeTo(page, "desktop", 0.985);
  await expectMostlyVisible(transition);
  await expect(arrival).not.toBeInViewport();
  expect(await arrival.evaluate((node) => node.closest(".pin-spacer"))).toBeNull();
  expect(await arrival.evaluate((node) => node.closest("[data-narrative]"))).toBeNull();
  const before = await transition.evaluate((node) => node.getBoundingClientRect().toJSON());
  const stageBefore = await stage.evaluate((node) => node.getBoundingClientRect().toJSON());

  await scrollNarrativeTo(page, "desktop", 0.99);
  await expectMostlyVisible(transition);
  await expect(arrival).not.toBeInViewport();
  const middle = await transition.evaluate((node) => node.getBoundingClientRect().toJSON());
  const stageMiddle = await stage.evaluate((node) => node.getBoundingClientRect().toJSON());
  expect(Math.abs(middle.top - before.top)).toBeLessThan(page.viewportSize()!.height);
  expect(Math.abs(stageMiddle.top - stageBefore.top)).toBeLessThan(8);

  await scrollNarrativeTo(page, "desktop", 0.995);
  await expectMostlyVisible(transition);
  await expect(arrival).not.toBeInViewport();
  const after = await transition.evaluate((node) => node.getBoundingClientRect().toJSON());
  const stageAfter = await stage.evaluate((node) => node.getBoundingClientRect().toJSON());
  expect(Math.abs(after.top - middle.top)).toBeLessThan(page.viewportSize()!.height);
  expect(Math.abs(stageAfter.top - stageMiddle.top)).toBeLessThan(8);

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        window.scrollTo(0, document.body.scrollHeight);
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  await expect(arrival).toBeInViewport();
  await expect(arrival.getByText("Keep your vault trustworthy")).toBeVisible();
  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});
