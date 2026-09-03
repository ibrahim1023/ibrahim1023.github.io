import { projectLinks, vaultSteward } from "@/content/portfolioContent";
import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";

import styles from "./VaultStewardArrival.module.css";

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
      </header>
      <p className={styles.headline}>{vaultSteward.headline}</p>
      <p className={styles.descriptor}>{vaultSteward.descriptor}</p>
      <div className={styles.workflow} data-vault-workflow>
      <div className={styles.workbench} data-vault-workbench>
      <dl className={styles.preview}>
        <div data-vault-current data-animatable>
          <dt>Current</dt>
          <dd>{vaultSteward.preview.current}</dd>
        </div>
        <div data-vault-proposal data-animatable>
          <dt>After</dt>
          <dd>{vaultSteward.preview.after}</dd>
        </div>
      </dl>
      <div className={styles.approval} aria-label="Illustrative approval sequence">
        <span>EXPLICIT APPROVAL</span>
        <strong data-vault-approved data-animatable>Approved · illustrative example</strong>
      </div>
      <p className={styles.expectedResult} data-vault-result data-animatable>{vaultSteward.preview.expectedResult}</p>
      <div className={styles.progress} aria-hidden="true"><span data-vault-progress data-animatable /></div>
      <ol className={styles.rail} data-vault-rail>
        {vaultSteward.rail.map((step) => (
          <li key={step} className={styles.railItem} data-vault-rail-item data-animatable>
            {step}
          </li>
        ))}
      </ol>
      <p className={styles.cue}>{vaultSteward.continuationCue}</p>
      </div>
      </div>
    </section>
  );
}
