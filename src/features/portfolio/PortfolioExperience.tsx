"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { IntroSection } from "@/features/intro/IntroSection";
import { SettleDiffSection } from "@/features/settle-diff/SettleDiffSection";
import { VaultStewardArrival } from "@/features/vault-steward/VaultStewardArrival";

import { progressToSettleDiffState } from "@/features/settle-diff/settleDiffState";
import {
  buildIntroTimeline,
  buildNarrativeTimeline,
  queryTimelineElements,
} from "@/lib/animation/timeline";

import styles from "./PortfolioExperience.module.css";

const MOBILE_LAYOUT_QUERY =
  "(width < 768px), (orientation: portrait) and (max-width: 1024px)";

export function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia(MOBILE_LAYOUT_QUERY).matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      root.dataset.animated = "ready";
      const elements = queryTimelineElements(root);

      const narrativeTimeline = buildNarrativeTimeline(elements);
      const introTimeline = buildIntroTimeline(elements.intro);

      ScrollTrigger.create({
        trigger: elements.narrative,
        start: "top top",
        end: "+=240vh",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        animation: narrativeTimeline,
        onUpdate: (self) => {
          const state = progressToSettleDiffState(self.progress);
          if (elements.settle.stage) {
            elements.settle.stage.dataset.state = state;
          }
        },
      });

      ScrollTrigger.create({
        trigger: elements.intro.section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: introTimeline,
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.root} data-portfolio-experience ref={rootRef}>
      <IntroSection />
      <div className={styles.narrative} data-narrative>
        <div className={styles.sceneLayer} data-scene-layer="settle">
          <SettleDiffSection />
        </div>
        <div className={styles.sceneLayer} data-scene-layer="vault">
          <VaultStewardArrival />
        </div>
      </div>
    </div>
  );
}
