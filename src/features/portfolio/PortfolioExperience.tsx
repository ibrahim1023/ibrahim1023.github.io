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
  buildSettleDiffTimeline,
  buildVaultTimeline,
  queryTimelineElements,
} from "@/lib/animation/timeline";

import styles from "./PortfolioExperience.module.css";

export function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      root.dataset.animated = "ready";
      const elements = queryTimelineElements(root);

      const settleTimeline = buildSettleDiffTimeline(elements.settle);
      const introTimeline = buildIntroTimeline(elements.intro);
      const vaultTimeline = buildVaultTimeline(elements.vault);

      ScrollTrigger.create({
        trigger: elements.settle.stage,
        start: "top top",
        end: "+=150vh",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        animation: settleTimeline,
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

      ScrollTrigger.create({
        trigger: elements.vault.section,
        start: "top 90%",
        end: "top 40%",
        scrub: true,
        animation: vaultTimeline,
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.root} data-portfolio-experience ref={rootRef}>
      <IntroSection />
      <SettleDiffSection />
      <VaultStewardArrival />
    </div>
  );
}
