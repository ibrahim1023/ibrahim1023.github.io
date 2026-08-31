import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { progressToSettleDiffState } from "@/features/settle-diff/settleDiffState";

import { NARRATIVE_MEDIA, runwayPixels, type NarrativeLayout } from "./media";
import {
  buildIntroTimeline,
  buildNarrativeTimeline,
  queryTimelineElements,
} from "./timeline";

interface E2ELifecycleProbe {
  generation: number;
  initializations: number;
  registrations: Array<{
    generation: number;
    id: number;
    role: "narrative" | "intro";
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

    const registerProbeTrigger = (role: "narrative" | "intro") => {
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
      const elements = queryTimelineElements(root, layout);
      if (!elements.narrative || !elements.intro.section) {
        throw new Error("Portfolio animation targets are unavailable.");
      }
      if (exposeState && elements.settle.stage) {
        stageStates.set(elements.settle.stage, elements.settle.stage.getAttribute("data-state"));
      }

      const narrativeTimeline = buildNarrativeTimeline(elements, layout);
      const introTimeline = buildIntroTimeline(elements.intro);
      timelines.push(narrativeTimeline, introTimeline);

      triggers.push(
        scrollTriggerApi.create({
          trigger: elements.narrative,
          start: "top top",
          end: () => `+=${runwayPixels(layout, viewportHeight())}`,
          pin: layout === "desktop",
          pinSpacing: layout === "desktop",
          scrub: layout === "mobile" ? true : 0.5,
          animation: narrativeTimeline,
          onUpdate: (self) => {
            if (exposeState && elements.settle.stage) {
              elements.settle.stage.dataset.state = progressToSettleDiffState(self.progress);
            }
          },
        }),
      );
      registerProbeTrigger("narrative");

      triggers.push(
        scrollTriggerApi.create({
          trigger: elements.intro.section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          animation: introTimeline,
        }),
      );
      registerProbeTrigger("intro");

      root.dataset.animated = "ready";

      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = undefined;
        scrollTriggerApi.refresh();
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
