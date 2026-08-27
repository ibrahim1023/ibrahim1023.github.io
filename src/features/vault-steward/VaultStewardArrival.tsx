import { vaultSteward } from "@/content/portfolioContent";

import styles from "./VaultStewardArrival.module.css";

export function VaultStewardArrival() {
  return (
    <section
      className={styles.section}
      aria-label={vaultSteward.title}
      data-vault-arrival
    >
      <h2 className={styles.title} data-animatable>{vaultSteward.title}</h2>
      <p className={styles.descriptor} data-vault-headline>{vaultSteward.headline}</p>
      <p className={styles.descriptor} data-vault-descriptor data-animatable>{vaultSteward.descriptor}</p>
      <ol className={styles.rail} data-vault-rail>
        {vaultSteward.rail.map((step) => (
          <li key={step} className={styles.railItem} data-vault-rail-item data-animatable>
            {step}
          </li>
        ))}
      </ol>
      <p className={styles.cue} data-vault-cue data-animatable>{vaultSteward.continuationCue}</p>
    </section>
  );
}
