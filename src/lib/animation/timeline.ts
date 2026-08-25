import { gsap } from "gsap";

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
  handoff: {
    line: HTMLElement | null;
    arrow: HTMLElement | null;
  };
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
    handoff: {
      line: root.querySelector('[data-handoff-line]') as HTMLElement | null,
      arrow: root.querySelector('[data-handoff-arrow]') as HTMLElement | null,
    },
    settle: {
      stage: root.querySelector('[data-stage]') as HTMLElement | null,
      header: root.querySelector('[data-stage] [data-stage-header]') as HTMLElement | null,
      transaction: root.querySelector('[data-transaction]') as HTMLElement | null,
      pathLine: root.querySelector('[data-path-line]') as SVGPathElement | null,
      token: root.querySelector('[data-token]') as HTMLElement | null,
      ack: root.querySelector('[data-ack]') as HTMLElement | null,
      attempt: root.querySelector('[data-attempt]') as HTMLElement | null,
      evidence: root.querySelector('[data-evidence]') as HTMLElement | null,
      evidenceItems: toArray('[data-evidence-item]'),
      comparison: root.querySelector('[data-comparison]') as HTMLElement | null,
      mismatch: root.querySelector('[data-mismatch]') as HTMLElement | null,
      verdict: root.querySelector('[data-verdict]') as HTMLElement | null,
      chain: root.querySelector('[data-chain]') as HTMLElement | null,
      chainItems: toArray('[data-chain-item]'),
    },
    vault: {
      section: root.querySelector('[data-vault-arrival]') as HTMLElement | null,
      title: root.querySelector('[data-vault-arrival] h2') as HTMLElement | null,
      descriptor: root.querySelector('[data-vault-arrival] [data-vault-descriptor]') as HTMLElement | null,
      rail: root.querySelector('[data-vault-rail]') as HTMLElement | null,
      railItems: toArray('[data-vault-rail-item]'),
      cue: root.querySelector('[data-vault-arrival] [data-vault-cue]') as HTMLElement | null,
    },
  };
}

const RUNWAY_SECONDS = 12;

const sec = (progress: number) => progress * RUNWAY_SECONDS;

export function buildSettleDiffTimeline(
  elements: SettleDiffTimelineElements,
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });

  tl.addLabel("project-established", sec(0));
  tl.addLabel("request-in-flight", sec(0.1));

  if (elements.pathLine && typeof elements.pathLine.getTotalLength === "function") {
    const length = elements.pathLine.getTotalLength();
    gsap.set(elements.pathLine, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    tl.to(
      elements.pathLine,
      { strokeDashoffset: 0, duration: sec(0.24) - sec(0.1) },
      sec(0.1),
    );
  }

  if (elements.token) {
    gsap.set(elements.token, { left: "8%" });
    tl.fromTo(
      elements.token,
      { left: "8%" },
      { left: "86%", duration: sec(0.24) - sec(0.1) },
      sec(0.1),
    );
  }

  tl.addLabel("attempt-recorded", sec(0.24));
  tl.addLabel("evidence-expanded", sec(0.34));

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
      sec(0.34),
    );
  }

  tl.addLabel("comparison-visible", sec(0.52));

  if (elements.comparison) {
    tl.fromTo(
      elements.comparison,
      { y: 30, xPercent: -50, yPercent: -50 },
      { y: 0, xPercent: -50, yPercent: -50, duration: sec(0.68) - sec(0.52) },
      sec(0.52),
    );
  }

  tl.addLabel("mismatch-isolated", sec(0.68));

  if (elements.mismatch) {
    tl.fromTo(
      elements.mismatch,
      { scale: 0.88, xPercent: -50, yPercent: -50 },
      { scale: 1, xPercent: -50, yPercent: -50, duration: sec(0.8) - sec(0.68) },
      sec(0.68),
    );
  }

  tl.addLabel("unverifiable", sec(0.8));

  if (elements.verdict) {
    tl.fromTo(
      elements.verdict,
      { scale: 0.85, xPercent: -50, yPercent: -50 },
      { scale: 1, xPercent: -50, yPercent: -50, duration: sec(0.9) - sec(0.8) },
      sec(0.8),
    );
  }

  tl.addLabel("reasoning-chain", sec(0.9));

  if (elements.chain) {
    tl.fromTo(
      elements.chain,
      { y: 40, xPercent: -50, yPercent: -50 },
      { y: 0, xPercent: -50, yPercent: -50, duration: sec(1.0) - sec(0.9) },
      sec(0.9),
    );
  }

  if (elements.chainItems) {
    tl.fromTo(
      elements.chainItems,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.03, duration: 0.25 },
      sec(0.92),
    );
  }

  tl.addLabel("vault-steward-arrival", sec(1.0));

  if (elements.stage) {
    tl.fromTo(
      elements.stage,
      { opacity: 1, y: 0 },
      { opacity: 0.25, y: -20, duration: 0.4 },
      sec(1.0),
    );
  }

  return tl;
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

export function buildVaultTimeline(
  elements: VaultTimelineElements,
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });

  const sectionTargets = [elements.title, elements.descriptor, elements.rail, elements.cue].filter(
    (t): t is HTMLElement => t !== null,
  );

  if (sectionTargets.length) {
    tl.fromTo(
      sectionTargets,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.5 },
      0,
    );
  }

  if (elements.railItems) {
    tl.fromTo(
      elements.railItems,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.35 },
      0.2,
    );
  }

  return tl;
}
