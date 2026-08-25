import { gsap } from "gsap";

import { STATE_RANGES } from "@/features/settle-diff/settleDiffState";
import type { SettleDiffState } from "@/features/settle-diff/settleDiffTypes";

export interface PortfolioTimelineElements {
  intro: {
    section: HTMLElement | null;
    role: HTMLElement | null;
    name: HTMLElement | null;
    rule: HTMLElement | null;
    framing: HTMLElement | null;
    cue: HTMLElement | null;
    cueLine: HTMLElement | null;
  };
  narrative: HTMLElement | null;
  settle: SettleDiffTimelineElements;
  vault: VaultTimelineElements;
}

export interface SettleDiffTimelineElements {
  stage: HTMLElement | null;
  header: HTMLElement | null;
  transaction: HTMLElement | null;
  pathLine: SVGPathElement | null;
  token: HTMLElement | null;
  ack: HTMLElement | null;
  attempt: HTMLElement | null;
  evidence: HTMLElement | null;
  evidenceItems: Element[] | null;
  comparison: HTMLElement | null;
  mismatch: HTMLElement | null;
  verdict: HTMLElement | null;
  chain: HTMLElement | null;
  chainItems: Element[] | null;
}

export interface VaultTimelineElements {
  layer: HTMLElement | null;
  section: HTMLElement | null;
  title: HTMLElement | null;
  descriptor: HTMLElement | null;
  rail: HTMLElement | null;
  railItems: Element[] | null;
  cue: HTMLElement | null;
}

export function queryTimelineElements(root: HTMLElement): PortfolioTimelineElements {
  const toArray = (selector: string): Element[] | null => {
    const found = root.querySelectorAll(selector);
    return found.length ? Array.from(found) : null;
  };

  return {
    intro: {
      section: root.querySelector('[data-intro]') as HTMLElement | null,
      role: root.querySelector('[data-intro] [data-intro-role]') as HTMLElement | null,
      name: root.querySelector('[data-intro] [data-intro-name]') as HTMLElement | null,
      rule: root.querySelector('[data-intro] [data-intro-rule]') as HTMLElement | null,
      framing: root.querySelector('[data-intro] [data-intro-framing]') as HTMLElement | null,
      cue: root.querySelector('[data-intro] [data-intro-cue]') as HTMLElement | null,
      cueLine: root.querySelector('[data-intro] [data-intro-cue-line]') as HTMLElement | null,
    },
    narrative: root.querySelector('[data-narrative]') as HTMLElement | null,
    settle: {
      stage: root.querySelector('[data-scene-layer="settle"] [data-stage]') as HTMLElement | null,
      header: root.querySelector('[data-scene-layer="settle"] [data-stage-header]') as HTMLElement | null,
      transaction: root.querySelector('[data-scene-layer="settle"] [data-transaction]') as HTMLElement | null,
      pathLine: root.querySelector('[data-scene-layer="settle"] [data-path-line]') as SVGPathElement | null,
      token: root.querySelector('[data-scene-layer="settle"] [data-token]') as HTMLElement | null,
      ack: root.querySelector('[data-scene-layer="settle"] [data-ack]') as HTMLElement | null,
      attempt: root.querySelector('[data-scene-layer="settle"] [data-attempt]') as HTMLElement | null,
      evidence: root.querySelector('[data-scene-layer="settle"] [data-evidence]') as HTMLElement | null,
      evidenceItems: toArray('[data-scene-layer="settle"] [data-evidence-item]'),
      comparison: root.querySelector('[data-scene-layer="settle"] [data-comparison]') as HTMLElement | null,
      mismatch: root.querySelector('[data-scene-layer="settle"] [data-mismatch]') as HTMLElement | null,
      verdict: root.querySelector('[data-scene-layer="settle"] [data-verdict]') as HTMLElement | null,
      chain: root.querySelector('[data-scene-layer="settle"] [data-chain]') as HTMLElement | null,
      chainItems: toArray('[data-scene-layer="settle"] [data-chain-item]'),
    },
    vault: {
      layer: root.querySelector('[data-scene-layer="vault"]') as HTMLElement | null,
      section: root.querySelector('[data-scene-layer="vault"] [data-vault-arrival]') as HTMLElement | null,
      title: root.querySelector('[data-scene-layer="vault"] h2') as HTMLElement | null,
      descriptor: root.querySelector('[data-scene-layer="vault"] [data-vault-descriptor]') as HTMLElement | null,
      rail: root.querySelector('[data-scene-layer="vault"] [data-vault-rail]') as HTMLElement | null,
      railItems: toArray('[data-scene-layer="vault"] [data-vault-rail-item]'),
      cue: root.querySelector('[data-scene-layer="vault"] [data-vault-cue]') as HTMLElement | null,
    },
  };
}

const RUNWAY_SECONDS = 12;

export const seconds = (progress: number) => progress * RUNWAY_SECONDS;

export const stateTime = (
  state: SettleDiffState,
): readonly [number, number] => STATE_RANGES[state].map(seconds) as unknown as readonly [number, number];

export function buildNarrativeTimeline(
  elements: PortfolioTimelineElements,
): gsap.core.Timeline {
  const master = gsap.timeline({
    defaults: { ease: "none" },
    paused: true,
  });

  appendSettleDiffTweens(master, elements.settle);

  const [vaultStart] = stateTime("vault-steward-arrival");
  appendVaultRevealTweens(master, elements.settle, elements.vault, vaultStart);

  return master;
}

export function buildSettleDiffTimeline(
  elements: SettleDiffTimelineElements,
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  appendSettleDiffTweens(tl, elements);
  return tl;
}

function appendSettleDiffTweens(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
) {
  const addStateLabel = (state: SettleDiffState) => {
    const [start] = stateTime(state);
    tl.addLabel(state, start);
    return [start, stateTime(state)[1]] as const;
  };

  addStateLabel("project-established");

  const [reqStart, reqEnd] = addStateLabel("request-in-flight");

  if (elements.pathLine && typeof elements.pathLine.getTotalLength === "function") {
    const length = elements.pathLine.getTotalLength();
    gsap.set(elements.pathLine, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    tl.to(
      elements.pathLine,
      { strokeDashoffset: 0, duration: reqEnd - reqStart },
      reqStart,
    );
  }

  if (elements.token) {
    gsap.set(elements.token, { left: "8%" });
    tl.fromTo(
      elements.token,
      { left: "8%" },
      { left: "86%", duration: reqEnd - reqStart },
      reqStart,
    );
  }

  addStateLabel("attempt-recorded");

  const [evStart] = addStateLabel("evidence-expanded");

  if (elements.evidenceItems) {
    tl.fromTo(
      elements.evidenceItems,
      { opacity: 0, y: 24, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.04,
        duration: 0.4,
      },
      evStart,
    );
  }

  const [cmpStart, cmpEnd] = addStateLabel("comparison-visible");

  if (elements.comparison) {
    tl.fromTo(
      elements.comparison,
      { y: 30, xPercent: -50, yPercent: -50 },
      { y: 0, xPercent: -50, yPercent: -50, duration: cmpEnd - cmpStart },
      cmpStart,
    );
  }

  const [mmStart, mmEnd] = addStateLabel("mismatch-isolated");

  if (elements.mismatch) {
    tl.fromTo(
      elements.mismatch,
      { scale: 0.88, xPercent: -50, yPercent: -50 },
      { scale: 1, xPercent: -50, yPercent: -50, duration: mmEnd - mmStart },
      mmStart,
    );
  }

  const [uvStart, uvEnd] = addStateLabel("unverifiable");

  if (elements.verdict) {
    tl.fromTo(
      elements.verdict,
      { scale: 0.85, xPercent: -50, yPercent: -50 },
      { scale: 1, xPercent: -50, yPercent: -50, duration: uvEnd - uvStart },
      uvStart,
    );
  }

  const [rcStart, rcEnd] = addStateLabel("reasoning-chain");

  if (elements.evidence) {
    tl.fromTo(
      elements.evidence,
      { y: 0, scale: 1 },
      { y: -40, scale: 0.85, duration: rcEnd - rcStart },
      rcStart,
    );
  }

  if (elements.evidenceItems) {
    tl.fromTo(
      elements.evidenceItems,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -24, stagger: 0.02, duration: 0.35 },
      rcStart,
    );
  }

  if (elements.chain) {
    tl.fromTo(
      elements.chain,
      { y: 40, xPercent: -50, yPercent: -50 },
      { y: 0, xPercent: -50, yPercent: -50, duration: rcEnd - rcStart },
      rcStart,
    );
  }

  if (elements.chainItems) {
    tl.fromTo(
      elements.chainItems,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.03, duration: 0.25 },
      rcStart + 0.1,
    );
  }

  addStateLabel("vault-steward-arrival");
}

function appendVaultRevealTweens(
  tl: gsap.core.Timeline,
  settle: SettleDiffTimelineElements,
  vault: VaultTimelineElements,
  startTime: number,
) {
  const [, endTime] = stateTime("vault-steward-arrival");
  const available = endTime - startTime;

  if (vault.layer) {
    tl.fromTo(
      vault.layer,
      { opacity: 0 },
      { opacity: 1, duration: available * 0.25 },
      startTime,
    );
  }

  if (vault.railItems) {
    tl.fromTo(
      vault.railItems,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.04,
        duration: 0.3,
      },
      startTime + available * 0.15,
    );
  }

  if (settle.chainItems) {
    tl.to(
      settle.chainItems,
      {
        opacity: 0,
        x: 24,
        stagger: 0.02,
        duration: 0.3,
      },
      startTime + available * 0.15,
    );
  }

  if (settle.chain) {
    tl.to(
      settle.chain,
      { opacity: 0, duration: available * 0.2 },
      startTime + available * 0.2,
    );
  }

  const headlineTargets = [vault.title, vault.descriptor, vault.cue].filter(
    (t): t is HTMLElement => t !== null,
  );
  if (headlineTargets.length) {
    tl.fromTo(
      headlineTargets,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.3 },
      startTime + available * 0.45,
    );
  }
}

export function buildIntroTimeline(
  elements: PortfolioTimelineElements["intro"],
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });

  const targets = [elements.role, elements.name, elements.rule, elements.framing, elements.cue].filter(
    (t): t is HTMLElement => t !== null,
  );

  if (targets.length) {
    tl.fromTo(
      targets,
      { opacity: 1, y: 0 },
      { opacity: 0.15, y: -40, stagger: 0.02, duration: 0.6 },
      0,
    );
  }

  if (elements.cueLine) {
    tl.fromTo(
      elements.cueLine,
      { scaleX: 1, transformOrigin: "left center" },
      { scaleX: 0, duration: 0.6 },
      0,
    );
  }

  return tl;
}
