import { afterEach, describe, expect, test } from "vitest";
import { gsap } from "gsap";
import { SETTLE_DIFF_STATES } from "@/features/settle-diff/settleDiffTypes";
import { buildIntroTimeline, buildNarrativeTimeline, buildSettleDiffTimeline, queryTimelineElements, seconds } from "./timeline";

function buildRoot() {
  const root = document.createElement("div");
  const stage = (layout: string) => `<div data-animated-layout="${layout}"><div data-stage data-layout="${layout}"><div data-scene-surface></div><header data-stage-header></header><div data-artifact-scene><span data-path-origin></span><article data-artifact></article><p data-opening-prompt></p></div><p data-uncertainty></p><section data-reconstruction><i data-reconstruction-layer></i><i data-reconstruction-layer></i><i data-reconstruction-layer></i></section><section data-origin-incident></section><section data-system-boundary><i data-rail-label></i><i data-rail-label></i></section><section data-proof><header data-proof-header></header><article data-provider-record></article><i data-proof-link></i><article data-independent-record></article></section><section data-checks>${Array.from({length: 12}, () => "<i data-check></i>").join("")}</section><section data-verified><p data-closing-thesis></p></section><section data-vault-transition><div data-evidence-packet></div><div data-vault-boundary></div><h3 data-vault-transition-title></h3><p data-vault-transition-headline></p><ol data-vault-transition-rail><li data-vault-transition-step></li></ol></section></div></div>`;
  root.innerHTML = `<section data-intro><p data-intro-role></p><h1 data-intro-name></h1><i data-intro-rule></i><p data-intro-framing></p><p data-intro-cue><i data-intro-cue-line></i></p></section><div data-narrative>${stage("desktop")}${stage("mobile")}</div>`;
  return root;
}

describe("new narrative timeline", () => {
  afterEach(() => gsap.globalTimeline.clear());
  test("queries only the active layout and all new scene targets", () => {
    const root = buildRoot(); const desktop = queryTimelineElements(root, "desktop"); const mobile = queryTimelineElements(root, "mobile");
    expect(desktop.settle.layers).toHaveLength(3); expect(desktop.settle.checkItems).toHaveLength(12);
    expect(desktop.settle.stage).not.toBe(mobile.settle.stage); expect(desktop.vault.packet).not.toBeNull();
  });
  test("uses every approved boundary and fills the twelve-second runway", () => {
    const e = queryTimelineElements(buildRoot(), "desktop"); const tl = buildSettleDiffTimeline(e.settle);
    expect(Object.keys(tl.labels)).toEqual([...SETTLE_DIFF_STATES]);
    expect(tl.labels["independent-proof"]).toBe(seconds(.65)); expect(tl.labels.verified).toBe(seconds(.88)); expect(tl.duration()).toBe(seconds(1));
  });
  test("animates the persistent proof and clean evidence-packet handoff", () => {
    const e = queryTimelineElements(buildRoot(), "desktop"); const tl = buildNarrativeTimeline(e, "desktop");
    expect(tl.getById("purchase-flight")).toBeTruthy(); expect(tl.getById("provider-record")).toBeTruthy();
    expect(tl.getById("independent-record")).toBeTruthy(); expect(tl.getById("deterministic-checks")).toBeTruthy();
    expect(tl.getById("verified-result")).toBeTruthy(); expect(tl.getById("evidence-packet")).toBeTruthy();
  });
  test("uses purpose-built vertical motion on mobile", () => {
    const tl = buildNarrativeTimeline(queryTimelineElements(buildRoot(), "mobile"), "mobile");
    expect(tl.getById("mobile-purchase-flight")?.vars.yPercent).toBe(0);
    expect(tl.getById("mobile-provider-record")?.vars.yPercent).toBe(0);
    expect(tl.getById("mobile-independent-record")?.vars.yPercent).toBe(0);
  });
  test("keeps intro motion connected to the path origin", () => {
    const e = queryTimelineElements(buildRoot(), "desktop"); expect(buildIntroTimeline(e.intro).duration()).toBeGreaterThan(0);
  });
});
