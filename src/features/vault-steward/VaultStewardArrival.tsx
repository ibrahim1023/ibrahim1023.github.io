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
      <dl className={styles.preview}>
        <div>
          <dt>Current</dt>
          <dd>{vaultSteward.preview.current}</dd>
        </div>
        <div>
          <dt>After</dt>
          <dd>{vaultSteward.preview.after}</dd>
        </div>
      </dl>
      <p className={styles.expectedResult}>{vaultSteward.preview.expectedResult}</p>
      <ol className={styles.rail} data-vault-rail>
        {vaultSteward.rail.map((step) => (
          <li key={step} className={styles.railItem} data-vault-rail-item>
            {step}
          </li>
        ))}
      </ol>
      <p className={styles.cue}>{vaultSteward.continuationCue}</p>
    </section>
  );
}
