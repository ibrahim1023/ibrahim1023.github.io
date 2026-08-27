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
              <div data-evidence-item="request">REQUEST</div>
              <div data-evidence-item="payment">PAYMENT</div>
              <div data-evidence-item="vendor">VENDOR</div>
              <div data-evidence-item="chain">CHAIN</div>
              <div data-evidence-item="response">RESPONSE</div>
              <div data-evidence-item="activity">ACTIVITY</div>
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
              <div data-evidence><div data-evidence-item="request">MOBILE REQUEST</div></div>
              <div data-comparison>mobile comparison</div>
              <div data-mismatch>mobile mismatch</div>
              <div data-verdict>mobile verdict</div>
              <ol data-chain><li data-chain-item="claim">mobile claim</li></ol>
            </div>
          </div>
        </div>
        <div data-scene-layer="vault">
          <section data-vault-arrival>
            <h2>Vault Steward</h2>
            <p data-vault-descriptor>Keep your vault trustworthy</p>
            <ol data-vault-rail><li data-vault-rail-item>PROPOSE</li><li data-vault-rail-item>SIMULATE</li></ol>
            <p data-vault-cue>continues</p>
          </section>
        </div>
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
    expect(desktop.vault.section).not.toBeNull();
    expect(desktop.vault.railItems).toHaveLength(2);
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
