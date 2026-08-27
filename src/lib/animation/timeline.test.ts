import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { gsap } from "gsap";

import {
  buildIntroTimeline,
  buildNarrativeTimeline,
  buildSettleDiffTimeline,
  queryTimelineElements,
  seconds,
} from "./timeline";
import { SETTLE_DIFF_STATES } from "@/features/settle-diff/settleDiffTypes";

describe("animation timeline builders", () => {
  beforeAll(() => {
    gsap.registerPlugin();
  });

  afterEach(() => {
    gsap.globalTimeline.clear();
  });

  function buildRoot() {
    const root = document.createElement("div");
    root.innerHTML = `
      <section data-intro>
        <p data-intro-role>AI Systems Engineer</p>
        <h1 data-intro-name>Ibrahim Arshad</h1>
        <span data-intro-rule></span>
        <p data-intro-framing>Framing</p>
        <p data-intro-cue><span data-handoff-track><span data-intro-cue-line></span></span>Selected work</p>
      </section>
      <div data-narrative>
        <div data-scene-layer="settle">
          <div data-animated-layout="desktop">
          <div data-stage data-layout="desktop" data-state="project-established">
            <header data-stage-header><h2>SettleDiff</h2><p>desc</p></header>
            <div data-transaction>
              <svg viewBox="0 0 1000 120" data-path>
                <path data-path-line d="M 20 46 L 980 46" />
              </svg>
              <span data-path-origin></span>
              <span data-token>0.01 USDC</span>
              <div data-attempt>ACTIVITY RECORDED</div>
            </div>
            <div data-evidence>
              <svg><path data-evidence-connector /><path data-evidence-connector /></svg>
              <div data-evidence-item="request"><span data-object-label="settle">REQUEST</span><span data-object-label="vault">NOTE</span></div>
              <div data-evidence-item="payment"><span data-object-label="settle">PAYMENT</span><span data-object-label="vault">PROPOSED CHANGE</span></div>
              <div data-evidence-item="vendor"><span data-object-label="settle">VENDOR</span><span data-object-label="vault">EVIDENCE SOURCE</span></div>
              <div data-evidence-item="chain"><span data-object-label="settle">CHAIN</span><span data-object-label="vault">POLICY</span></div>
              <div data-evidence-item="response"><span data-object-label="settle">RESPONSE</span><span data-object-label="vault">CURRENT / AFTER</span></div>
              <div data-evidence-item="activity"><span data-object-label="settle">ACTIVITY</span><span data-object-label="vault">AUDIT / RECHECK</span></div>
            </div>
            <div data-comparison>comparison</div>
            <div data-mismatch>mismatch</div>
            <div data-verdict>verdict</div>
            <ol data-chain><li data-chain-item="claim">claim</li><li data-chain-item="evidence">evidence</li></ol>
          </div>
          </div>
          <div data-animated-layout="mobile">
            <div data-stage data-layout="mobile">
              <div data-transaction><span data-token>mobile token</span></div>
              <div data-attempt>mobile attempt</div>
              <div data-evidence><div data-evidence-item="request"><span data-object-label="settle">MOBILE REQUEST</span><span data-object-label="vault">MOBILE NOTE</span></div></div>
              <div data-comparison>mobile comparison</div>
              <div data-mismatch>mobile mismatch</div>
              <div data-verdict>mobile verdict</div>
              <ol data-chain><li data-chain-item="claim">mobile claim</li></ol>
            </div>
          </div>
        </div>
        <div data-animated-layout="desktop">
          <section data-vault-transition>
            <svg data-vault-transition-connectors><path data-vault-transition-connector="boundary" /><path data-vault-transition-connector="recheck" /></svg>
            <h2 data-vault-transition-title>Vault Steward</h2>
            <ol data-vault-transition-rail><li data-vault-transition-step>FIND</li><li data-vault-transition-step>PREVIEW</li></ol>
          </section>
        </div>
        <section data-vault-arrival><h2>Vault Steward</h2></section>
      </div>
    `;
    const path = root.querySelector('[data-path-line]') as SVGPathElement & {
      getTotalLength?: () => number;
    };
    if (path && typeof path.getTotalLength !== "function") {
      path.getTotalLength = () => 1000;
    }
    return root;
  }

  test("queryTimelineElements scopes animated targets to the active layout", () => {
    const root = buildRoot();
    const desktop = queryTimelineElements(root, "desktop");
    const mobile = queryTimelineElements(root, "mobile");

    expect(desktop.intro.section).not.toBeNull();
    expect(desktop.narrative).not.toBeNull();
    expect(desktop.settle.stage).toHaveAttribute("data-layout", "desktop");
    expect(desktop.settle.token).not.toBeNull();
    expect(desktop.settle.pathLine).not.toBeNull();
    expect(desktop.settle.evidenceItems).toHaveLength(6);
    expect("ack" in desktop.settle).toBe(false);
    expect(desktop.vault.transition).not.toBeNull();
    expect(desktop.vault.railItems).toHaveLength(2);
    expect(Object.values(desktop.vault)).not.toContain(
      root.querySelector("[data-vault-arrival]"),
    );
    expect(mobile.settle.stage).toHaveAttribute("data-layout", "mobile");
    expect(mobile.settle.token).toHaveTextContent("mobile token");
    expect(mobile.settle.evidenceItems).toHaveLength(1);
    expect(mobile.settle.stage).not.toBe(desktop.settle.stage);
  });

  test("buildSettleDiffTimeline uses every approved state boundary and preserves its final hold", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");
    const tl = buildSettleDiffTimeline(elements.settle);

    expect(Object.keys(tl.labels)).toEqual(SETTLE_DIFF_STATES);
    expect(tl.labels["request-in-flight"]).toBe(seconds(0.1));
    expect(tl.labels["attempt-recorded"]).toBe(seconds(0.24));
    expect(tl.labels.unverifiable).toBe(seconds(0.8));
    expect(tl.labels["vault-steward-arrival"]).toBe(seconds(0.96));
    expect(tl.duration()).toBe(seconds(1));
  });

  test("buildNarrativeTimeline gives desktop objects non-zero motion in the approved segments", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");
    const timeline = buildNarrativeTimeline(elements, "desktop");
    const children = timeline.getChildren(true, true, true);

    expect(children.some((child) => child.duration() > 0 && child.targets().includes(elements.settle.token!))).toBe(true);
    expect(children.some((child) => child.duration() > 0 && child.targets().includes(elements.settle.attempt!))).toBe(true);
    expect(children.some((child) => child.duration() > 0 && child.targets().includes(elements.settle.evidenceItems![0]!))).toBe(true);
    expect(children.some((child) => child.duration() > 0 && child.targets().includes(elements.settle.comparison!))).toBe(true);
    expect(children.some((child) => child.duration() > 0 && child.targets().includes(elements.settle.mismatch!))).toBe(true);
    expect(children.some((child) => child.duration() > 0 && child.targets().includes(elements.settle.verdict!))).toBe(true);
    expect(children.some((child) => child.duration() > 0 && child.targets().includes(elements.settle.chain!))).toBe(true);
  });

  test("buildNarrativeTimeline stays inside the normalized twelve-second runway", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");

    expect(buildNarrativeTimeline(elements, "desktop").duration()).toBeCloseTo(seconds(1), 6);
  });

  test("gives the mobile narrative vertical, in-order choreography without desktop coordinates", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "mobile");
    const timeline = buildNarrativeTimeline(elements, "mobile");
    const mobileRequest = timeline.getById("mobile-request");
    const mobileActivity = timeline.getById("mobile-activity");
    const mobileEvidence = timeline.getById("mobile-evidence");
    const mobileComparison = timeline.getById("mobile-comparison");
    const mobileVerdict = timeline.getById("mobile-verdict");

    expect(Object.keys(timeline.labels)).toEqual(SETTLE_DIFF_STATES);
    expect(mobileRequest).toBeTruthy();
    expect(mobileActivity).toBeTruthy();
    expect(mobileEvidence).toBeTruthy();
    expect(mobileComparison).toBeTruthy();
    expect(mobileVerdict).toBeTruthy();
    expect(mobileRequest!.vars.yPercent).toBe(0);
    expect(mobileRequest!.vars.startAt).toMatchObject({ yPercent: -24 });
    expect(mobileRequest!.vars).not.toHaveProperty("left");
    expect(mobileActivity!.vars.yPercent).toBe(0);
    expect(mobileActivity!.vars.startAt).toMatchObject({ yPercent: 12 });
    expect(mobileEvidence!.vars.yPercent).toBe(0);
    expect(mobileEvidence!.vars.startAt).toMatchObject({ yPercent: 18 });
    expect(mobileEvidence!.vars.stagger).toBeGreaterThan(0);
    expect(mobileComparison!.vars.yPercent).toBe(0);
    expect(mobileComparison!.vars.startAt).toMatchObject({ yPercent: 12 });
    expect(mobileVerdict!.vars.yPercent).toBe(0);
    expect(mobileVerdict!.vars.startAt).toMatchObject({ yPercent: 10 });
    expect(mobileVerdict!.vars).not.toHaveProperty("scale");
  });

  test("aligns persistent desktop evidence wrappers into one reasoning rail", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");
    const timeline = buildNarrativeTimeline(elements, "desktop");
    const evidenceItems = elements.settle.evidenceItems!;
    const railTween = timeline
      .getChildren(true, true, true)
      .find((child) => child.targets().length === evidenceItems.length
        && child.targets().every((target: Element) => evidenceItems.includes(target))
        && child.vars["--evidence-left"] === "50%");

    expect(railTween).toBeDefined();
    expect(railTween!.vars.xPercent).toBe(-50);
    expect(railTween!.vars["--evidence-top"](0)).toBe("20%");
    expect(railTween!.vars["--evidence-top"](5)).toBe("70%");
  });

  test("targets each persistent label once and excludes the stable arrival from the scrub timeline", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");
    const timeline = buildNarrativeTimeline(elements, "desktop");
    const children = timeline.getChildren(true, true, true);

    expect(elements.settle.settleLabels).toHaveLength(6);
    expect(elements.settle.vaultLabels).toHaveLength(6);
    expect(Object.values(elements.vault)).not.toContain(
      root.querySelector("[data-vault-arrival]"),
    );

    for (const label of elements.settle.settleLabels!) {
      expect(children.filter((child) => child.targets().includes(label))).toHaveLength(1);
    }
    for (const label of elements.settle.vaultLabels!) {
      expect(children.filter((child) => child.targets().includes(label))).toHaveLength(1);
    }
  });

  test("fades obsolete connectors and reveals the Vault boundary connectors", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");
    const timeline = buildNarrativeTimeline(elements, "desktop");
    const children = timeline.getChildren(true, true, true);
    const oldConnectors: Element[] = elements.settle.connectors!;
    const newConnectors: Element[] = elements.vault.connectors!;

    expect(newConnectors).toHaveLength(2);
    expect(children.some((child) => child.targets().length === oldConnectors.length
      && child.targets().every((target: Element) => oldConnectors.includes(target))
      && child.vars.opacity === 0)).toBe(true);
    expect(children.some((child) => child.targets().length === newConnectors.length
      && child.targets().every((target: Element) => newConnectors.includes(target))
      && child.vars.opacity === 1)).toBe(true);
  });

  test("buildNarrativeTimeline and buildIntroTimeline are non-empty", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");

    const narrative = buildNarrativeTimeline(elements, "desktop");
    const intro = buildIntroTimeline(elements.intro);

    expect(narrative.duration()).toBeGreaterThan(0);
    expect(intro.duration()).toBeGreaterThan(0);
  });

  test("buildIntroTimeline extends the cue toward the active transaction path origin", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");
    const pathOrigin = root.querySelector("[data-animated-layout=\"desktop\"] [data-path-origin]");
    const intro = buildIntroTimeline(elements.intro);
    const introTargets = intro
      .getChildren(true, true, true)
      .flatMap((child) => child.targets());

    expect((elements.intro as { pathOrigin?: HTMLElement | null }).pathOrigin).toBe(pathOrigin);
    expect(introTargets).toContain(elements.intro.cueLine);
    expect(introTargets).toContain(pathOrigin);
  });
});
