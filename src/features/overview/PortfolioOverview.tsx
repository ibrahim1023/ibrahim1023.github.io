import { withBasePath } from "@/lib/deployment/basePath";
import { profiles } from "@/features/portfolio/ProfileFooter";
import { SiteHeader } from "@/features/portfolio/SiteHeader";

import { SettleDiffCaseStudy } from "./SettleDiffCaseStudy";
import { RuntimeLabCaseStudy } from "./RuntimeLabCaseStudy";
import { VaultStewardCaseStudy } from "./VaultStewardCaseStudy";
import styles from "./PortfolioOverview.module.css";

export function PortfolioOverview({ project }: { project: "agent-runtime-lab" | "settlediff" | "vault-steward" }) {
  const next = project === "agent-runtime-lab" ? ["settlediff", "SettleDiff"] : project === "settlediff" ? ["vault-steward", "Vault Steward"] : ["agent-runtime-lab", "Agent Runtime Lab"];
  return <div className={styles.page}>
    <SiteHeader />
    <main id="main" className={styles.main}>
      <a className={styles.back} href={withBasePath("/#work")}>← Back to projects</a>
      {project === "agent-runtime-lab" ? <RuntimeLabCaseStudy /> : project === "settlediff" ? <SettleDiffCaseStudy /> : <VaultStewardCaseStudy />}
      <div className={styles.next}><a href={withBasePath(`/projects/${next[0]}/`)}>Next: {next[1]} ↗</a></div>
    </main>
    <footer className={styles.footer}><a href="mailto:ibrahim_arshad@outlook.com">Get in touch ↗</a><nav aria-label="Social profiles">{profiles.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}</nav></footer>
  </div>;
}
