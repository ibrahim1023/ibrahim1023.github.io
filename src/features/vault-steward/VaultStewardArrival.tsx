import { vaultSteward } from "@/content/portfolioContent";

import styles from "./VaultStewardArrival.module.css";

export function VaultStewardArrival() {
  return (
    <section
      className={styles.section}
      aria-label={vaultSteward.title}
      data-vault-arrival
    >
      <h2 className={styles.title}>{vaultSteward.title}</h2>
      <p className={styles.descriptor}>{vaultSteward.descriptor}</p>
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
