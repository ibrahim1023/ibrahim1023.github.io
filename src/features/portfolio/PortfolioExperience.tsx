import { IntroSection } from "@/features/intro/IntroSection";
import { CaseZeroSection } from "@/features/case-zero/CaseZeroSection";
import { SettleDiffSection } from "@/features/settle-diff/SettleDiffSection";
import { VaultStewardArrival } from "@/features/vault-steward/VaultStewardArrival";

import { PortfolioAnimationController } from "./PortfolioAnimationController";
import { ReducedMotionNarrative } from "./ReducedMotionNarrative";
import styles from "./PortfolioExperience.module.css";

export function PortfolioExperience() {
  return (
    <div className={styles.root} data-portfolio-experience>
      <PortfolioAnimationController />
      <IntroSection />
      <div className={styles.narrative} data-project-root="settlediff" data-narrative="settlediff">
        <SettleDiffSection />
      </div>
      <div className={styles.caseZeroNarrative} data-project-root="casezero" data-narrative="casezero">
        <CaseZeroSection />
      </div>
      <div className={styles.reducedBranch} data-branch="reduced" data-no-js-narrative><ReducedMotionNarrative /></div>
      <div className={styles.vaultArrival} data-project-root="vault-steward" data-stable-vault><VaultStewardArrival /></div>
      <noscript><style>{`[data-animated-layout], [data-stable-vault] { display: none !important; } [data-branch="reduced"] { display: block !important; }`}</style></noscript>
    </div>
  );
}
