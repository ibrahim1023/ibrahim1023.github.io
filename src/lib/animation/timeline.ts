import { gsap } from "gsap";

import { STATE_RANGES } from "@/features/settle-diff/settleDiffState";
import {
  SETTLE_DIFF_STATES,
  type SettleDiffState,
} from "@/features/settle-diff/settleDiffTypes";
import type { NarrativeLayout } from "./media";

export interface PortfolioTimelineElements {
  intro: {
    section: HTMLElement | null;
    role: HTMLElement | null;
    name: HTMLElement | null;
    rule: HTMLElement | null;
    framing: HTMLElement | null;
    cue: HTMLElement | null;
    cueLine: HTMLElement | null;
    pathOrigin: HTMLElement | null;
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
  return: HTMLElement | null;
  attempt: HTMLElement | null;
  attemptStatus: HTMLElement | null;
  evidence: HTMLElement | null;
  evidenceItems: Element[] | null;
  settleLabels: Element[] | null;
  vaultLabels: Element[] | null;
  connectors: SVGPathElement[] | null;
  comparison: HTMLElement | null;
  mismatch: HTMLElement | null;
  verdict: HTMLElement | null;
  chain: HTMLElement | null;
  chainItems: Element[] | null;
}

export interface VaultTimelineElements {
  transition: HTMLElement | null;
  title: HTMLElement | null;
  rail: HTMLElement | null;
  railItems: Element[] | null;
  connectors: SVGPathElement[] | null;
}

export function queryTimelineElements(
  root: HTMLElement,
  layout: NarrativeLayout,
): PortfolioTimelineElements {
  const layoutScope = `[data-animated-layout="${layout}"]`;
  const query = <ElementType extends Element>(selector: string): ElementType | null =>
    root.querySelector(`${layoutScope} ${selector}`) as ElementType | null;
  const toArray = (selector: string): Element[] | null => {
    const found = root.querySelectorAll(`${layoutScope} ${selector}`);
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
      pathOrigin: query<HTMLElement>('[data-path-origin]'),
    },
    narrative: root.querySelector('[data-narrative]') as HTMLElement | null,
    settle: {
      stage: query<HTMLElement>('[data-stage]'),
      header: query<HTMLElement>('[data-stage-header]'),
      transaction: query<HTMLElement>('[data-transaction]'),
      pathLine: query<SVGPathElement>('[data-path-line]'),
      token: query<HTMLElement>('[data-token]'),
      return: query<HTMLElement>('[data-return]'),
      attempt: query<HTMLElement>('[data-attempt]'),
      attemptStatus: query<HTMLElement>('[data-attempt-status]'),
      evidence: query<HTMLElement>('[data-evidence]'),
      evidenceItems: toArray('[data-evidence-item]'),
      settleLabels: toArray('[data-object-label="settle"]'),
      vaultLabels: toArray('[data-object-label="vault"]'),
      connectors: toArray('[data-evidence-connector]') as SVGPathElement[] | null,
      comparison: query<HTMLElement>('[data-comparison]'),
      mismatch: query<HTMLElement>('[data-mismatch]'),
      verdict: query<HTMLElement>('[data-verdict]'),
      chain: query<HTMLElement>('[data-chain]'),
      chainItems: toArray('[data-chain-item]'),
    },
    vault: {
      transition: query<HTMLElement>('[data-vault-transition]'),
      title: query<HTMLElement>('[data-vault-transition-title]'),
      rail: query<HTMLElement>('[data-vault-transition-rail]'),
      railItems: toArray('[data-vault-transition-step]'),
      connectors: toArray('[data-vault-transition-connector]') as SVGPathElement[] | null,
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
  layout: NarrativeLayout,
): gsap.core.Timeline {
  const master = gsap.timeline({
    defaults: { ease: "none" },
    paused: true,
  });

  appendSettleDiffTweens(master, elements.settle, layout);

  const [vaultStart] = stateTime("vault-steward-arrival");
  appendVaultTransitionTweens(master, elements.settle, elements.vault, vaultStart, layout);

  return master;
}

export function buildSettleDiffTimeline(
  elements: SettleDiffTimelineElements,
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  appendSettleDiffTweens(tl, elements, "desktop");
  return tl;
}

function appendSettleDiffTweens(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
  layout: NarrativeLayout,
) {
  addStateLabels(tl);
  appendRequestSegment(tl, elements, layout);
  appendAttemptSegment(tl, elements, layout);
  appendEvidenceSegment(tl, elements, layout);
  appendComparisonSegment(tl, elements, layout);
  appendConflictSegment(tl, elements, layout);
  appendVerdictSegment(tl, elements, layout);
  appendReasoningSegment(tl, elements, layout);

  const [vaultStart, vaultEnd] = stateTime("vault-steward-arrival");
  tl.to({}, { duration: vaultEnd - vaultStart }, vaultStart);
}

function addStateLabels(tl: gsap.core.Timeline) {
  SETTLE_DIFF_STATES.forEach((state) => tl.addLabel(state, stateTime(state)[0]));
}

const segmentTiming = (state: SettleDiffState) => {
  const [start, end] = stateTime(state);
  return { start, end, duration: end - start };
};

export function appendRequestSegment(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
  layout: NarrativeLayout,
) {
  const { start, duration } = segmentTiming("request-in-flight");

  if (layout === "mobile" && elements.transaction) {
    tl.fromTo(
      elements.transaction,
      { opacity: 0.45, yPercent: -24 },
      {
        id: "mobile-request",
        opacity: 1,
        yPercent: 0,
        duration,
        ease: "power1.out",
      },
      start,
    );
  }

  if (layout === "desktop" && elements.pathLine && typeof elements.pathLine.getTotalLength === "function") {
    const length = elements.pathLine.getTotalLength();
    gsap.set(elements.pathLine, { strokeDasharray: length, strokeDashoffset: length });
    tl.to(elements.pathLine, { strokeDashoffset: 0, duration }, start);
  }

  if (elements.token) {
    tl.fromTo(
      elements.token,
      { "--token-progress": "8%", opacity: 1 },
      layout === "desktop"
        ? { "--token-progress": "86%", opacity: 1, duration }
        : { opacity: 1, duration },
      start,
    );
  }

  if (elements.return) {
    tl.fromTo(
      elements.return,
      layout === "desktop" ? { opacity: 0, y: 12 } : { opacity: 0 },
      layout === "desktop"
        ? { opacity: 1, y: 0, duration: duration * 0.38, ease: "power1.out" }
        : { opacity: 1, duration: duration * 0.38, ease: "power1.out" },
      start + duration * 0.62,
    );
  }
}

export function appendAttemptSegment(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
  layout: NarrativeLayout,
) {
  const { start, duration } = segmentTiming("attempt-recorded");
  const targets = [elements.attempt, elements.attemptStatus].filter(
    (target): target is HTMLElement => target !== null,
  );

  if (elements.token) {
    tl.to(
      elements.token,
      layout === "desktop"
        ? { opacity: 0.2, y: -10, duration: duration * 0.45 }
        : { opacity: 0.2, duration: duration * 0.45 },
      start,
    );
  }
  if (targets.length) {
    tl.fromTo(
      targets,
      layout === "desktop" ? { opacity: 0, y: 16 } : { opacity: 0, yPercent: 12 },
      layout === "desktop"
        ? { opacity: 1, y: 0, stagger: 0.06, duration: duration * 0.6, ease: "power1.out" }
        : {
          id: "mobile-activity",
          opacity: 1,
          yPercent: 0,
          stagger: 0.06,
          duration: duration * 0.6,
          ease: "power1.out",
        },
      start,
    );
  }
}

export function appendEvidenceSegment(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
  layout: NarrativeLayout,
) {
  const { start, duration } = segmentTiming("evidence-expanded");
  if (elements.evidence) {
    tl.fromTo(elements.evidence, { opacity: 0 }, { opacity: 1, duration: duration * 0.35 }, start);
  }
  if (elements.evidenceItems) {
    tl.fromTo(
      elements.evidenceItems,
      layout === "desktop" ? { opacity: 0, y: 24, scale: 0.96 } : { opacity: 0, yPercent: 18 },
      layout === "desktop"
        ? { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: duration * 0.55, ease: "power1.out" }
        : {
          id: "mobile-evidence",
          opacity: 1,
          yPercent: 0,
          stagger: 0.055,
          duration: duration * 0.55,
          ease: "power1.out",
        },
      start + duration * 0.1,
    );
  }
  elements.connectors?.forEach((connector) => {
    if (typeof connector.getTotalLength !== "function") return;
    const length = connector.getTotalLength();
    gsap.set(connector, { strokeDasharray: length, strokeDashoffset: length });
    tl.to(connector, { strokeDashoffset: 0, duration: duration * 0.55 }, start + duration * 0.1);
  });
}

export function appendComparisonSegment(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
  layout: NarrativeLayout,
) {
  const { start, duration } = segmentTiming("comparison-visible");
  const backgroundTargets = [elements.transaction, elements.attempt, elements.attemptStatus].filter(
    (target): target is HTMLElement => target !== null,
  );
  if (backgroundTargets.length) {
    tl.to(backgroundTargets, { opacity: 0, duration: duration * 0.32 }, start);
  }
  if (elements.evidence) {
    tl.to(elements.evidence, { opacity: 0.06, duration: duration * 0.36 }, start);
  }
  if (layout === "desktop" && elements.evidenceItems) {
    tl.to(
      elements.evidenceItems,
      {
        x: (index) => (index % 2 === 0 ? -54 : 54),
        y: (index) => (Math.floor(index / 2) - 1) * 30,
        opacity: 0.22,
        duration: duration * 0.65,
        ease: "power1.out",
      },
      start,
    );
  }
  if (elements.comparison) {
    tl.fromTo(
      elements.comparison,
      layout === "desktop" ? { opacity: 0, y: 28 } : { opacity: 0, yPercent: 12 },
      layout === "desktop"
        ? { opacity: 1, y: 0, duration: duration * 0.6, ease: "power1.out" }
        : {
          id: "mobile-comparison",
          opacity: 1,
          yPercent: 0,
          duration: duration * 0.6,
          ease: "power1.out",
        },
      start + duration * 0.16,
    );
  }
}

export function appendConflictSegment(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
  layout: NarrativeLayout,
) {
  const { start, duration } = segmentTiming("mismatch-isolated");
  const supportingTargets = [elements.transaction, elements.attempt, elements.attemptStatus, elements.comparison, elements.evidence].filter(
    (target): target is HTMLElement => target !== null,
  );
  if (supportingTargets.length) {
    tl.to(supportingTargets, { opacity: 0, duration: duration * 0.36 }, start);
  }
  if (elements.mismatch) {
    tl.fromTo(
      elements.mismatch,
      layout === "desktop" ? { opacity: 0, y: 18, scale: 0.96 } : { opacity: 0, yPercent: 10 },
      layout === "desktop"
        ? { opacity: 1, y: 0, scale: 1, duration: duration * 0.55, ease: "power1.out" }
        : {
          id: "mobile-conflict",
          opacity: 1,
          yPercent: 0,
          duration: duration * 0.55,
          ease: "power1.out",
        },
      start + duration * 0.12,
    );
  }
}

export function appendVerdictSegment(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
  layout: NarrativeLayout,
) {
  const { start, duration } = segmentTiming("unverifiable");
  const surroundingTargets = [elements.transaction, elements.attempt, elements.attemptStatus, elements.comparison, elements.mismatch, elements.evidence].filter(
    (target): target is HTMLElement => target !== null,
  );
  if (surroundingTargets.length) {
    tl.to(surroundingTargets, { opacity: 0, duration: duration * 0.34 }, start);
  }
  if (elements.verdict) {
    tl.fromTo(
      elements.verdict,
      layout === "desktop" ? { opacity: 0, y: 12, scale: 0.92 } : { opacity: 0, yPercent: 10 },
      layout === "desktop"
        ? { opacity: 1, y: 0, scale: 1, duration: duration * 0.55, ease: "power1.out" }
        : {
          id: "mobile-verdict",
          opacity: 1,
          yPercent: 0,
          duration: duration * 0.55,
          ease: "power1.out",
        },
      start + duration * 0.12,
    );
  }
}

export function appendReasoningSegment(
  tl: gsap.core.Timeline,
  elements: SettleDiffTimelineElements,
  layout: NarrativeLayout,
) {
  const { start, duration } = segmentTiming("reasoning-chain");
  const priorFrames = [elements.comparison, elements.mismatch, elements.verdict, elements.evidence].filter(
    (target): target is HTMLElement => target !== null,
  );
  if (priorFrames.length) {
    tl.to(priorFrames, { opacity: 0, duration: duration * 0.3 }, start);
  }
  if (elements.chain) {
    tl.fromTo(
      elements.chain,
      layout === "desktop" ? { opacity: 0, y: 28 } : { opacity: 0, yPercent: 10 },
      layout === "desktop"
        ? { opacity: 1, y: 0, duration: duration * 0.55, ease: "power1.out" }
        : { id: "mobile-reasoning", opacity: 1, yPercent: 0, duration: duration * 0.55, ease: "power1.out" },
      start + duration * 0.18,
    );
  }
  if (elements.chainItems) {
    tl.fromTo(
      elements.chainItems,
      layout === "desktop" ? { opacity: 0, y: 16 } : { opacity: 0, yPercent: 8 },
      layout === "desktop"
        ? { opacity: 1, y: 0, stagger: 0.06, duration: duration * 0.4, ease: "power1.out" }
        : { opacity: 1, yPercent: 0, stagger: 0.055, duration: duration * 0.4, ease: "power1.out" },
      start + duration * 0.28,
    );
  }
}

function appendVaultTransitionTweens(
  tl: gsap.core.Timeline,
  settle: SettleDiffTimelineElements,
  vault: VaultTimelineElements,
  startTime: number,
  layout: NarrativeLayout,
) {
  const [, endTime] = stateTime("vault-steward-arrival");
  const available = endTime - startTime;
  const finalStateEnd = startTime + available;

  const obsoleteFrames = [
    settle.transaction,
    settle.attempt,
    settle.attemptStatus,
    settle.comparison,
    settle.mismatch,
    settle.verdict,
  ].filter((target): target is HTMLElement => target !== null);
  if (obsoleteFrames.length) {
    tl.to(obsoleteFrames, { opacity: 0, duration: available * 0.16 }, startTime);
  }

  if (settle.evidence) {
    tl.to(settle.evidence, { opacity: 1, duration: available * 0.16 }, startTime + available * 0.2);
  }

  if (settle.evidenceItems) {
    tl.to(
      settle.evidenceItems,
      layout === "desktop"
        ? {
          "--evidence-left": (index: number) => `${20 + (index % 3) * 30}%`,
          "--evidence-top": (index: number) => `${42 + Math.floor(index / 3) * 20}%`,
          opacity: 0,
          scale: 0.84,
          x: 0,
          y: 0,
          xPercent: -50,
          duration: available * 0.42,
          ease: "power1.out",
        }
        : {
          opacity: 0,
          yPercent: 0,
          duration: available * 0.3,
          ease: "power1.out",
        },
      startTime,
    );
    tl.to(
      settle.evidenceItems,
      {
        opacity: 1,
        stagger: available * 0.018,
        duration: available * 0.22,
        ease: "power1.out",
      },
      startTime + available * 0.3,
    );
  }

  if (settle.settleLabels) {
    tl.to(
      settle.settleLabels,
      {
        opacity: 0,
        visibility: "hidden",
        duration: available * 0.24,
        ease: "power1.out",
      },
      startTime + available * 0.12,
    );
  }

  if (settle.vaultLabels) {
    tl.fromTo(
      settle.vaultLabels,
      layout === "desktop"
        ? { opacity: 0, visibility: "hidden", y: 8 }
        : { opacity: 0, visibility: "hidden", yPercent: 8 },
      layout === "desktop"
        ? {
          opacity: 1,
          visibility: "visible",
          y: 0,
          duration: available * 0.28,
          ease: "power1.out",
        }
        : {
          opacity: 1,
          visibility: "visible",
          yPercent: 0,
          duration: available * 0.28,
          ease: "power1.out",
        },
      startTime + available * 0.18,
    );
  }

  if (settle.connectors) {
    tl.to(
      settle.connectors,
      {
        opacity: 0,
        scale: layout === "desktop" ? 0.01 : 1,
        transformOrigin: "50% 50%",
        duration: available * 0.24,
        ease: "power1.out",
      },
      startTime + available * 0.08,
    );
  }

  if (settle.stage) {
    tl.to(
      settle.stage,
      {
        "--stage-accent": "var(--color-vault)",
        "--stage-line": "var(--color-vault)",
        duration: available * 0.38,
        ease: "power1.out",
      },
      startTime + available * 0.1,
    );
  }

  if (vault.transition) {
    tl.fromTo(
      vault.transition,
      layout === "desktop" ? { opacity: 0, y: 14 } : { opacity: 0, yPercent: 8 },
      layout === "desktop"
        ? { opacity: 1, y: 0, duration: available * 0.3, ease: "power1.out" }
        : { opacity: 1, yPercent: 0, duration: available * 0.3, ease: "power1.out" },
      startTime + available * 0.38,
    );
  }

  if (vault.connectors) {
    tl.fromTo(
      vault.connectors,
      { opacity: 0 },
      { opacity: 1, duration: available * 0.28, ease: "power1.out" },
      startTime + available * 0.4,
    );
  }

  if (vault.railItems) {
    const railStart = startTime + available * 0.46;
    const railTiming = staggerTiming(railStart, finalStateEnd, vault.railItems.length);
    tl.fromTo(
      vault.railItems,
      layout === "desktop" ? { opacity: 0, x: -16 } : { opacity: 0, yPercent: 8 },
      layout === "desktop"
        ? { opacity: 1, x: 0, stagger: railTiming.stagger, duration: railTiming.duration }
        : { opacity: 1, yPercent: 0, stagger: railTiming.stagger, duration: railTiming.duration },
      railStart,
    );
  }

  if (settle.chainItems) {
    const chainStart = startTime + available * 0.28;
    const chainTiming = staggerTiming(chainStart, finalStateEnd, settle.chainItems.length);
    tl.to(
      settle.chainItems,
      layout === "desktop"
        ? { opacity: 0, x: 16, stagger: chainTiming.stagger, duration: chainTiming.duration }
        : { opacity: 0, yPercent: -6, stagger: chainTiming.stagger, duration: chainTiming.duration },
      chainStart,
    );
  }

  if (settle.chain) {
    tl.to(
      settle.chain,
      { opacity: 0, duration: available * 0.2 },
      startTime + available * 0.3,
    );
  }

  const headlineTargets = [vault.title].filter(
    (t): t is HTMLElement => t !== null,
  );
  if (headlineTargets.length) {
    const headlineStart = startTime + available * 0.68;
    const headlineTiming = staggerTiming(headlineStart, finalStateEnd, headlineTargets.length);
    tl.fromTo(
      headlineTargets,
      layout === "desktop" ? { opacity: 0, y: 24 } : { opacity: 0 },
      layout === "desktop"
        ? {
          opacity: 1,
          y: 0,
          stagger: headlineTiming.stagger,
          duration: headlineTiming.duration,
        }
        : { opacity: 1, stagger: headlineTiming.stagger, duration: headlineTiming.duration },
      headlineStart,
    );
  }
}

function staggerTiming(start: number, end: number, targetCount: number) {
  const available = Math.max(0, end - start);
  const duration = available * 0.7;
  const stagger = targetCount > 1 ? (available - duration) / (targetCount - 1) : 0;
  return { duration, stagger };
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
      { scaleX: 1.7, duration: 0.6 },
      0,
    );
  }

  if (elements.pathOrigin) {
    tl.fromTo(
      elements.pathOrigin,
      { opacity: 0.2, scaleX: 0.4, transformOrigin: "left center" },
      { opacity: 1, scaleX: 1, duration: 0.6 },
      0,
    );
  }

  return tl;
}
