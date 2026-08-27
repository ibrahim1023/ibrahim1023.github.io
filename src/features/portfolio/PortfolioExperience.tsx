"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { IntroSection } from "@/features/intro/IntroSection";
import { SettleDiffSection } from "@/features/settle-diff/SettleDiffSection";
import { VaultStewardArrival } from "@/features/vault-steward/VaultStewardArrival";

import { initializePortfolioAnimations } from "@/lib/animation/runtime";

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
      exposeState:
        process.env.NODE_ENV !== "production" &&
        process.env.NEXT_PUBLIC_TIMELINE_DEBUG === "true",
    });
  }, []);

  return (
    <div className={styles.root} data-portfolio-experience ref={rootRef}>
      <IntroSection />
      <div className={styles.narrative} data-narrative>
        <div className={styles.sceneLayer} data-scene-layer="settle">
          <SettleDiffSection />
        </div>
        <div className={styles.sceneLayer} data-scene-layer="vault" data-animatable>
          <VaultStewardArrival />
        </div>
      </div>
    </div>
  );
}
