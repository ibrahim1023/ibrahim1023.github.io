import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { progressToSettleDiffState } from "@/features/settle-diff/settleDiffState";

import { NARRATIVE_MEDIA, runwayPixels, type NarrativeLayout } from "./media";
import {
  buildIntroTimeline,
  buildNarrativeTimeline,
  queryTimelineElements,
} from "./timeline";

export interface PortfolioAnimationOptions {
  root: HTMLElement;
  gsapApi: typeof gsap;
  scrollTriggerApi: typeof ScrollTrigger;
  viewportHeight: () => number;
  exposeState: boolean;
}

export function initializePortfolioAnimations(
  options: PortfolioAnimationOptions,
): () => void {
  const { root, gsapApi, scrollTriggerApi, viewportHeight, exposeState } = options;
  let cleanedUp = false;

  const resetReadableContent = () => {
    gsapApi.set(root.querySelectorAll("[data-animatable]"), { clearProps: "all" });
    root.removeAttribute("data-animated");
    root.removeAttribute("data-state");
  };

  const cleanupBranch = (
    timelines: gsap.core.Timeline[],
    triggers: ScrollTrigger[],
  ) => {
    triggers.forEach((trigger) => trigger.kill());
    timelines.forEach((timeline) => timeline.kill());
    resetReadableContent();
  };

  const initializeBranch = (layout: NarrativeLayout) => () => {
    const timelines: gsap.core.Timeline[] = [];
    const triggers: ScrollTrigger[] = [];

    try {
      const elements = queryTimelineElements(root, layout);
      if (!elements.narrative || !elements.intro.section) {
        throw new Error("Portfolio animation targets are unavailable.");
      }

      const narrativeTimeline = buildNarrativeTimeline(elements, layout);
      const introTimeline = buildIntroTimeline(elements.intro);
      timelines.push(narrativeTimeline, introTimeline);

      triggers.push(
        scrollTriggerApi.create({
          trigger: elements.narrative,
          start: "top top",
          end: () => `+=${runwayPixels(layout, viewportHeight())}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          animation: narrativeTimeline,
          onUpdate: (self) => {
            if (exposeState && elements.settle.stage) {
              elements.settle.stage.dataset.state = progressToSettleDiffState(self.progress);
            }
          },
        }),
      );

      triggers.push(
        scrollTriggerApi.create({
          trigger: elements.intro.section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          animation: introTimeline,
        }),
      );

      root.dataset.animated = "ready";

      return () => cleanupBranch(timelines, triggers);
    } catch {
      cleanupBranch(timelines, triggers);
      return () => undefined;
    }
  };

  try {
    gsapApi.registerPlugin(scrollTriggerApi);
    const media = gsapApi.matchMedia();
    media.add(NARRATIVE_MEDIA.desktop, initializeBranch("desktop"));
    media.add(NARRATIVE_MEDIA.mobile, initializeBranch("mobile"));

    return () => {
      if (cleanedUp) return;
      cleanedUp = true;
      media.revert();
      resetReadableContent();
    };
  } catch {
    resetReadableContent();
    return () => undefined;
  }
}
