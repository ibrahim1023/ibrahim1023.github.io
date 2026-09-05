import { projectLinks, vaultSteward } from "@/content/portfolioContent";
import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";

import styles from "./VaultStewardArrival.module.css";
import { ProjectDetailsLink } from "@/components/projects/ProjectDetailsLink";

export function VaultStewardArrival() {
  return (
    <section
      className={styles.section}
      aria-label={vaultSteward.title}
      data-vault-arrival
    >
      <header className={styles.header}>
        <h2 className={styles.title}>{vaultSteward.title}</h2>
        <ProjectSourceLink href={projectLinks.vaultSteward} project={vaultSteward.title} />
        <ProjectDetailsLink slug="vault-steward" inline />
      </header>
      <p className={styles.headline}>{vaultSteward.headline}</p>
      <p className={styles.descriptor}>{vaultSteward.descriptor}</p>
      <div className={styles.workflow} data-vault-workflow>
      <div className={styles.workbench} data-vault-workbench>
      <dl className={styles.preview}>
        <div data-vault-current data-animatable>
          <dt>Broken link: target missing</dt>
          <dd>{vaultSteward.preview.current}</dd>
        </div>
        <div data-vault-proposal data-animatable>
          <dt>Repaired link: existing target</dt>
          <dd>{vaultSteward.preview.after}</dd>
        </div>
      </dl>
      <div className={styles.approval} aria-label="Illustrative approval sequence">
        <span>EXPLICIT APPROVAL</span>
        <strong data-vault-approved data-animatable>Approved · illustrative example</strong>
      </div>
      <p className={styles.expectedResult} data-vault-result data-animatable>{vaultSteward.preview.expectedResult}</p>
      <p className={styles.expectedResult}>Illustrative repair: the link points to a missing note. I preview an existing target, require approval, then re-check the vault.</p>
      <div className={styles.progress} aria-hidden="true"><span data-vault-progress data-animatable /></div>
      <ol className={styles.rail} data-vault-rail>
        {vaultSteward.rail.map((step) => (
          <li key={step} className={styles.railItem} data-vault-rail-item data-animatable>
            {step}
          </li>
        ))}
      </ol>
      <ProjectDetailsLink slug="vault-steward" />
      </div>
      </div>
    </section>
  );
}
