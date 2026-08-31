import { IntroSection } from "@/features/intro/IntroSection";
import { SettleDiffSection } from "@/features/settle-diff/SettleDiffSection";
import { VaultStewardArrival } from "@/features/vault-steward/VaultStewardArrival";

import { PortfolioAnimationController } from "./PortfolioAnimationController";
import styles from "./PortfolioExperience.module.css";

export function PortfolioExperience() {
  return (
    <div className={styles.root} data-portfolio-experience>
      <PortfolioAnimationController />
      <IntroSection />
      <div className={styles.narrative} data-narrative>
        <SettleDiffSection />
      </div>
      <VaultStewardArrival />
    </div>
  );
}
