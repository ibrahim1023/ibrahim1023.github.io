"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { IntroSection } from "@/features/intro/IntroSection";
import { SettleDiffSection } from "@/features/settle-diff/SettleDiffSection";
import { VaultStewardArrival } from "@/features/vault-steward/VaultStewardArrival";

import {
  initializePortfolioAnimations,
  shouldExposeTimelineState,
} from "@/lib/animation/runtime";

import styles from "./PortfolioExperience.module.css";

export function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

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

  return (
    <div className={styles.root} data-portfolio-experience ref={rootRef}>
      <IntroSection />
      <div className={styles.narrative} data-narrative>
        <SettleDiffSection />
      </div>
      <VaultStewardArrival />
    </div>
  );
}
