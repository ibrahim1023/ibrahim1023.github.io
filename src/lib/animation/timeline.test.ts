import { afterEach, describe, expect, test } from "vitest";
import { gsap } from "gsap";
import { CASE_ZERO_STATES } from "@/features/case-zero/caseZeroTypes";
import { SETTLE_DIFF_STATES } from "@/features/settle-diff/settleDiffTypes";
import { buildCaseZeroNarrativeTimeline, buildIntroTimeline, buildSettleDiffNarrativeTimeline, queryPortfolioTimelineElements, seconds } from "./timeline";

function scene(layout: string) {
  return `<div data-animated-layout="${layout}"><div data-stage data-layout="${layout}"><div data-scene-surface></div><header data-stage-header></header><div data-artifact-scene><span data-path-origin></span><article data-artifact></article><p data-opening-prompt></p></div><p data-uncertainty></p><section data-reconstruction><i data-reconstruction-layer></i><i data-reconstruction-layer></i><i data-reconstruction-layer></i></section><section data-origin-incident></section><section data-system-boundary><i data-rail-label></i><i data-rail-label></i></section><section data-proof><header data-proof-header></header><article data-provider-record></article><i data-proof-link></i><article data-independent-record></article></section><section data-checks><i data-check></i></section><section data-verified><p data-closing-thesis></p></section><section data-settle-case-transition><div data-verified-evidence-token></div><p data-casezero-bridge-copy></p></section></div></div>`;
}

function caseScene(layout: string) {
  return `<div data-animated-layout="${layout}"><div data-casezero-stage data-layout="${layout}"><div data-casezero-surface></div><header data-casezero-header></header><p data-casezero-question></p><article data-case-file><i data-evidence-layer></i><i data-evidence-layer></i><i data-evidence-layer></i></article><section data-blind-scene><article data-generated-evidence></article><div data-blind-boundary></div><aside data-official-finding></aside><p data-blind-climax></p></section><article data-lock-record></article><section data-vault-transition><div data-lock-packet></div><div data-vault-boundary></div><h3 data-vault-transition-title></h3><p data-vault-transition-headline></p><ol data-vault-transition-rail><li data-vault-transition-step></li></ol></section></div></div>`;
}

function buildRoot() {
  const root = document.createElement("div");
  root.innerHTML = `<section data-intro><p data-intro-role></p><h1 data-intro-name></h1><i data-intro-rule></i><p data-intro-framing></p><p data-intro-cue><i data-intro-cue-line></i></p></section><div data-narrative="settlediff">${scene("desktop")}${scene("mobile")}</div><div data-narrative="casezero">${caseScene("desktop")}${caseScene("mobile")}</div>`;
  return root;
}

describe("three-project timelines", () => {
  afterEach(() => gsap.globalTimeline.clear());

  test("queries every chapter through its active layout", () => {
    const root = buildRoot();
    const desktop = queryPortfolioTimelineElements(root, "desktop");
    const mobile = queryPortfolioTimelineElements(root, "mobile");
    expect(desktop.settlediff.layers).toHaveLength(3);
    expect(desktop.casezero.evidenceLayers).toHaveLength(3);
    expect(desktop.settlediff.stage).not.toBe(mobile.settlediff.stage);
    expect(desktop.casezero.stage).not.toBe(mobile.casezero.stage);
  });

  test("ends SettleDiff in the CaseZero seam", () => {
    const elements = queryPortfolioTimelineElements(buildRoot(), "desktop");
    const timeline = buildSettleDiffNarrativeTimeline(elements.settlediff, "desktop");
    expect(Object.keys(timeline.labels)).toEqual([...SETTLE_DIFF_STATES]);
    expect(timeline.labels["independent-proof"]).toBe(seconds(.65));
    expect(timeline.getById("verified-evidence-token")).toBeTruthy();
    expect(timeline.getById("vault-transition")).toBeFalsy();
  });

  test("gives CaseZero ordered payoffs and sole Vault ownership", () => {
    const elements = queryPortfolioTimelineElements(buildRoot(), "desktop");
    const timeline = buildCaseZeroNarrativeTimeline(elements.casezero, "desktop");
    expect(Object.keys(timeline.labels)).toEqual([...CASE_ZERO_STATES]);
    expect(timeline.labels["public-docket"]).toBeLessThan(timeline.labels["evidence-typed"]!);
    expect(timeline.labels["blind-by-construction"]).toBeLessThan(timeline.labels["lock-ready"]!);
    expect(timeline.getById("case-file-open")).toBeTruthy();
    expect(timeline.getById("blind-climax")).toBeTruthy();
    expect(timeline.getById("lock-record")).toBeTruthy();
    expect(timeline.getById("vault-transition")).toBeTruthy();
  });

  test("uses vertical CaseZero motion on mobile", () => {
    const elements = queryPortfolioTimelineElements(buildRoot(), "mobile");
    const timeline = buildCaseZeroNarrativeTimeline(elements.casezero, "mobile");
    expect(timeline.getById("mobile-case-file-open")?.vars.y).toBe(0);
    expect(timeline.getById("mobile-evidence-lineage")?.vars.y).toBe(0);
  });

  test("keeps intro motion attached to SettleDiff's path origin", () => {
    const elements = queryPortfolioTimelineElements(buildRoot(), "desktop");
    expect(buildIntroTimeline(elements.intro).duration()).toBeGreaterThan(0);
  });
});
