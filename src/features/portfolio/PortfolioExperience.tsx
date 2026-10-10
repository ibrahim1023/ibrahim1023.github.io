import { IntroSection } from "@/features/intro/IntroSection";
import { SettleDiffPreview } from "@/features/settle-diff/SettleDiffPreview";
import { VaultStewardPreview } from "@/features/vault-steward/VaultStewardPreview";

import { ProfileFooter } from "./ProfileFooter";
import { SiteHeader } from "./SiteHeader";
import styles from "./PortfolioExperience.module.css";

export function PortfolioExperience() {
  return <div className={styles.root} data-portfolio-experience>
    <SiteHeader />
    <main id="main">
      <IntroSection />
      <div id="work" className={styles.project} data-project-root="settlediff"><SettleDiffPreview /></div>
      <div className={styles.project} data-project-root="vault-steward"><VaultStewardPreview /></div>
    </main>
    <ProfileFooter />
  </div>;
}
