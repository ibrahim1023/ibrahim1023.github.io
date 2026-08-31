"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  initializePortfolioAnimations,
  shouldExposeTimelineState,
} from "@/lib/animation/runtime";

export function PortfolioAnimationController() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = markerRef.current?.closest<HTMLElement>("[data-portfolio-experience]");
    if (!root) return;

    return initializePortfolioAnimations({
      root,
      gsapApi: gsap,
      scrollTriggerApi: ScrollTrigger,
      viewportHeight: () => window.innerHeight,
      exposeState: shouldExposeTimelineState({
        nodeEnv: process.env.NODE_ENV,
        timelineDebug: process.env.NEXT_PUBLIC_TIMELINE_DEBUG,
      }),
    });
  }, []);

  return <span ref={markerRef} hidden aria-hidden="true" />;
}
