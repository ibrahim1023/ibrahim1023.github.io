import { identity } from "@/content/portfolioContent";

import styles from "./IntroSection.module.css";

export function IntroSection() {
  return (
    <section className={styles.section} aria-label="Intro" data-intro>
      <p className={styles.role}>{identity.role}</p>
      <h1 className={styles.name}>{identity.name}</h1>
      <span className={styles.rule} aria-hidden="true" />
      <p className={styles.framing}>{identity.framing}</p>
      <p className={styles.cue}>
        <span className={styles.cueLine} aria-hidden="true" />
        {identity.selectedWorkCue}
      </p>
    </section>
  );
}
