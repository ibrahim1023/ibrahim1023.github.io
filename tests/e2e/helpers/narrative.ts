import { expect, type Locator, type Page } from "@playwright/test";

export const RUNWAY_MULTIPLIER = {
  settlediff: { desktop: 6.8, mobile: 5.2 },
  casezero: { desktop: 3.6, mobile: 3.4 },
} as const;

export type NarrativeChapter = keyof typeof RUNWAY_MULTIPLIER;
export type NarrativeLayout = keyof (typeof RUNWAY_MULTIPLIER)[NarrativeChapter];

export function activeLayout(page: Page, layout: NarrativeLayout, chapter: NarrativeChapter = "settlediff"): Locator {
  // The visible branch is part of this helper's contract. A caller that asks
  // for the inactive branch must fail its first assertion instead of silently
  // inspecting hidden duplicate markup.
  return page.locator(`[data-narrative="${chapter}"] [data-animated-layout="${layout}"]:visible`);
}

export function activeNarrativeLocator(
  page: Page,
  layout: NarrativeLayout,
  selector: string,
  chapter: NarrativeChapter = "settlediff",
): Locator {
  return activeLayout(page, layout, chapter).locator(selector);
}

export async function scrollNarrativeTo(page: Page, layout: NarrativeLayout, progress: number): Promise<void>;
export async function scrollNarrativeTo(page: Page, chapter: NarrativeChapter, layout: NarrativeLayout, progress: number): Promise<void>;
export async function scrollNarrativeTo(
  page: Page,
  chapterOrLayout: NarrativeChapter | NarrativeLayout,
  layoutOrProgress: NarrativeLayout | number,
  maybeProgress?: number,
) {
  const chapter: NarrativeChapter = maybeProgress === undefined ? "settlediff" : chapterOrLayout as NarrativeChapter;
  const layout: NarrativeLayout = maybeProgress === undefined ? chapterOrLayout as NarrativeLayout : layoutOrProgress as NarrativeLayout;
  const progress = maybeProgress === undefined ? layoutOrProgress as number : maybeProgress;
  if (progress < 0 || progress > 1) {
    throw new Error(`Narrative progress must be between 0 and 1: ${progress}`);
  }

  // Compact CSS is enabled before pins are measured. Do not sample geometry
  // or set a restore position during that intermediate setup frame.
  await expect(page.locator('[data-portfolio-experience][data-scroll-ready="true"]')).toBeVisible();

  const top = await page.locator(`[data-narrative="${chapter}"]`).evaluate((node) => {
    // ScrollTrigger pins the narrative itself, so use its spacer as the
    // document anchor once the pin is active.
    const anchor = node.parentElement?.classList.contains("pin-spacer")
      ? node.parentElement
      : node;
    const rect = anchor.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("Viewport is required for narrative tests");

  const y = top + viewport.height * RUNWAY_MULTIPLIER[chapter][layout] * progress;
  await page.evaluate((target) => window.scrollTo(0, target), y);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

export async function expectMostlyVisible(
  locator: Locator,
  options: { requireViewport?: boolean; viewportRatio?: number } = {},
) {
  const { requireViewport = true } = options;
  const viewportRatio = options.viewportRatio ?? 0.25;
  const minimumOpacity = 0.75;
  await expect(locator).toBeVisible();
  if (requireViewport) {
    await expect(locator).toBeInViewport({ ratio: viewportRatio });
  }
  await expect
    .poll(async () =>
      locator.evaluate((node, minimumOpacity) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return (
          Number(style.opacity) >= minimumOpacity && rect.width > 0 && rect.height > 0
          && Number.isFinite(rect.top) && Number.isFinite(rect.left)
        );
      }, minimumOpacity),
    )
    .toBe(true);
}

export async function expectMostlyHidden(locator: Locator) {
  await expect
    .poll(async () =>
      locator.evaluate((node) => {
        const style = getComputedStyle(node);
        return Number(style.opacity) <= 0.25 || style.visibility === "hidden";
      }),
    )
    .toBe(true);
}

export async function waitForAnimationFrames(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

export function capturePageDiagnostics(page: Page) {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("response", (response) => {
    if (!response.ok()) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  return { consoleErrors, failedResponses, pageErrors };
}
