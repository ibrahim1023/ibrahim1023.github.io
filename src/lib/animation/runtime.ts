import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildVaultTimeline } from "./vaultTimeline";


import { NARRATIVE_MEDIA, runwayPixels, type NarrativeLayout } from "./media";
import {
  buildIntroTimeline,
  queryPortfolioTimelineElements,
} from "./timeline";
import { buildCompactCaseTimeline as buildCaseZeroNarrativeTimeline, buildCompactSettleTimeline as buildSettleDiffNarrativeTimeline } from "./compactTimeline";

interface E2ELifecycleProbe {
  generation: number;
  initializations: number;
  registrations: Array<{
    generation: number;
    id: number;
    role: "settlediff" | "casezero" | "intro" | "vault";
    active: boolean;
  }>;
  nextRegistrationId: number;
}

declare global {
  interface Window {
    __portfolioE2ELifecycle__?: E2ELifecycleProbe;
  }
}

function getE2ELifecycleProbe(): E2ELifecycleProbe | undefined {
  if (
    process.env.NEXT_PUBLIC_E2E !== "true" ||
    typeof window === "undefined" ||
    new URL(window.location.href).searchParams.get("e2eLifecycle") !== "1"
  ) {
    return undefined;
  }
  return (window.__portfolioE2ELifecycle__ ??= {
    generation: 0,
    initializations: 0,
    registrations: [],
    nextRegistrationId: 1,
  });
}

export interface PortfolioAnimationOptions {
  root: HTMLElement;
  gsapApi: typeof gsap;
  scrollTriggerApi: typeof ScrollTrigger;
  viewportHeight: () => number;
  exposeState: boolean;
}

export interface TimelineDebugEnvironment {
  nodeEnv: string | undefined;
  timelineDebug: string | undefined;
}

export function shouldExposeTimelineState(
  env: TimelineDebugEnvironment,
): boolean {
  return env.nodeEnv === "development" && env.timelineDebug === "true";
}

export function initializePortfolioAnimations(
  options: PortfolioAnimationOptions,
): () => void {
  const { root, gsapApi, scrollTriggerApi, viewportHeight, exposeState } = options;
  let cleanedUp = false;
  let media: ReturnType<typeof gsap.matchMedia> | undefined;
  let warnedForInitialization = false;
  const lifecycleProbe = getE2ELifecycleProbe();
  const probeGeneration = lifecycleProbe ? ++lifecycleProbe.generation : 0;
  if (lifecycleProbe) lifecycleProbe.initializations += 1;

  const warnAnimationFailureOnce = () => {
    if (process.env.NODE_ENV !== "development" || warnedForInitialization) return;
    warnedForInitialization = true;
    console.warn("Portfolio animation disabled; using readable fallback.");
  };

  const resetReadableContent = (stageStates = new Map<HTMLElement, string | null>()) => {
    gsapApi.set(root.querySelectorAll("[data-animatable]"), { clearProps: "all" });
    if (exposeState) {
      stageStates.forEach((initialState, stage) => {
        if (initialState === null) {
          stage.removeAttribute("data-state");
        } else {
          stage.dataset.state = initialState;
        }
      });
      root.removeAttribute("data-state");
    }
    root.removeAttribute("data-animated");
    root.removeAttribute("data-scroll-ready");
  };

  const cleanupBranch = (
    timelines: gsap.core.Timeline[],
    triggers: ScrollTrigger[],
    stageStates: Map<HTMLElement, string | null>,
  ) => {
    triggers.forEach((trigger) => trigger.kill());
    timelines.forEach((timeline) => timeline.kill());
    resetReadableContent(stageStates);
  };

  const initializeBranch = (layout: NarrativeLayout) => () => {
    const timelines: gsap.core.Timeline[] = [];
    const triggers: ScrollTrigger[] = [];
    const stageStates = new Map<HTMLElement, string | null>();
    let refreshFrame: number | undefined;
    const probeRegistrations: E2ELifecycleProbe["registrations"] = [];

    const registerProbeTrigger = (role: "settlediff" | "casezero" | "intro" | "vault") => {
      if (!lifecycleProbe) return;
      const registration: E2ELifecycleProbe["registrations"][number] = {
        generation: probeGeneration,
        id: lifecycleProbe.nextRegistrationId++,
        role,
        active: true,
      };
      lifecycleProbe.registrations.push(registration);
      probeRegistrations.push(registration);
    };

    try {
      // Preserve the browser's position before any immediate-render tween
      // changes the fallback layout or its overflow bounds.
      const restoredScrollY = window.scrollY;
      const elements = queryPortfolioTimelineElements(root, layout);
      if (!elements.settlediff.narrative || !elements.casezero.narrative || !elements.intro.section || !elements.settlediff.stage || !elements.casezero.stage) {
        throw new Error("Portfolio animation targets are unavailable.");
      }
      if (exposeState) {
        stageStates.set(elements.settlediff.stage, elements.settlediff.stage.getAttribute("data-state"));
        stageStates.set(elements.casezero.stage, elements.casezero.stage.getAttribute("data-state"));
      }

      const settleTimeline = buildSettleDiffNarrativeTimeline(elements.settlediff, layout);
      const caseZeroTimeline = buildCaseZeroNarrativeTimeline(elements.casezero, layout);
      const introTimeline = buildIntroTimeline(elements.intro);
      timelines.push(settleTimeline, caseZeroTimeline, introTimeline);

      // Pin dimensions must come from the compact animated layout, not the
      // tall normal-flow fallback. Setup is synchronous; failure restores it.
      root.dataset.animated = "ready";

      triggers.push(
        scrollTriggerApi.create({
          id: "settlediff",
          trigger: elements.settlediff.narrative,
          start: "top top",
          end: () => `+=${runwayPixels("settlediff", layout, viewportHeight())}`,
          pin: layout === "desktop",
          pinSpacing: layout === "desktop",
          scrub: layout === "mobile" ? true : 0.5,
          animation: settleTimeline,
          onUpdate: (self) => {
            if (exposeState) {
              elements.settlediff.stage!.dataset.state = self.progress < 1 / 3 ? "receipt" : self.progress < 2 / 3 ? "compare" : "verdict";
            }
          },
        }),
      );
      registerProbeTrigger("settlediff");

      triggers.push(
        scrollTriggerApi.create({
          id: "casezero",
          trigger: elements.casezero.narrative,
          start: "top top",
          end: () => `+=${runwayPixels("casezero", layout, viewportHeight())}`,
          pin: layout === "desktop",
          pinSpacing: layout === "desktop",
          scrub: layout === "mobile" ? true : 0.5,
          animation: caseZeroTimeline,
          onUpdate: (self) => {
            if (exposeState) {
              elements.casezero.stage!.dataset.state = self.progress < 1 / 3 ? "evidence" : self.progress < 2 / 3 ? "boundary" : "lock";
            }
          },
        }),
      );
      registerProbeTrigger("casezero");

      triggers.push(
        scrollTriggerApi.create({
          id: "intro",
          trigger: elements.intro.section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          animation: introTimeline,
        }),
      );
      registerProbeTrigger("intro");

      const vault = root.querySelector<HTMLElement>("[data-stable-vault] [data-vault-arrival]");
      if (vault) {
        const vaultTimeline = buildVaultTimeline(vault);
        timelines.push(vaultTimeline);
        triggers.push(scrollTriggerApi.create({
          id: "vault", trigger: vault.querySelector("[data-vault-workflow]"),
          start: () => viewportHeight() > 650 ? "top 8%" : "top 85%",
          end: "+=320",
          pin: false, pinSpacing: false, scrub: true, animation: vaultTimeline,
        }));
        registerProbeTrigger("vault");
      }


      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = window.requestAnimationFrame(() => {
          refreshFrame = undefined;
          scrollTriggerApi.refresh();
          // Timeline pins defer their spacer sizes until refresh. A reload's
          // position can be clamped against the shorter interim document.
          if (restoredScrollY > 0 && window.scrollY !== restoredScrollY) {
            window.scrollTo(0, restoredScrollY);
          }
          root.dataset.scrollReady = "true";
        });
      });

      return () => {
        if (refreshFrame !== undefined) {
          window.cancelAnimationFrame(refreshFrame);
        }
        probeRegistrations.forEach((registration) => {
          registration.active = false;
        });
        cleanupBranch(timelines, triggers, stageStates);
      };
    } catch {
      cleanupBranch(timelines, triggers, stageStates);
      warnAnimationFailureOnce();
      return () => undefined;
    }
  };

  try {
    gsapApi.registerPlugin(scrollTriggerApi);
    media = gsapApi.matchMedia();
    media.add(NARRATIVE_MEDIA.desktop, initializeBranch("desktop"));
    media.add(NARRATIVE_MEDIA.mobile, initializeBranch("mobile"));

    return () => {
      if (cleanedUp) return;
      cleanedUp = true;
      media?.revert();
      resetReadableContent();
    };
  } catch {
    media?.revert();
    resetReadableContent();
    warnAnimationFailureOnce();
    return () => undefined;
  }
}
