import { withBasePath } from "@/lib/deployment/basePath";
import { profiles } from "@/features/portfolio/ProfileFooter";
import { SiteHeader } from "@/features/portfolio/SiteHeader";

import { SettleDiffCaseStudy } from "./SettleDiffCaseStudy";
import { VaultStewardCaseStudy } from "./VaultStewardCaseStudy";
import styles from "./PortfolioOverview.module.css";

export function PortfolioOverview({ project }: { project: "settlediff" | "vault-steward" }) {
  return <div className={styles.page}>
    <SiteHeader />
    <main id="main" className={styles.main}>
      <a className={styles.back} href={withBasePath("/#work")}>← Back to projects</a>
      {project === "settlediff" ? <SettleDiffCaseStudy /> : <VaultStewardCaseStudy />}
      <div className={styles.next}><a href={withBasePath(project === "settlediff" ? "/projects/vault-steward/" : "/projects/settlediff/")}>Next: {project === "settlediff" ? "Vault Steward" : "SettleDiff"} ↗</a></div>
    </main>
    <footer className={styles.footer}><a href="mailto:ibrahim_arshad@outlook.com">Get in touch ↗</a><nav aria-label="Social profiles">{profiles.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}</nav></footer>
  </div>;
}
