"use client";

import { IntroSection } from "@/features/intro/IntroSection";
import { SettleDiffSection } from "@/features/settle-diff/SettleDiffSection";
import { VaultStewardArrival } from "@/features/vault-steward/VaultStewardArrival";

import styles from "./PortfolioExperience.module.css";

export function PortfolioExperience() {
  return (
    <div className={styles.root} data-portfolio-experience>
      <IntroSection />
      <SettleDiffSection />
      <VaultStewardArrival />
    </div>
  );
}
