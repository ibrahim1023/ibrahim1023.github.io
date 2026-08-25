import { identity } from "@/content/portfolioContent";

import styles from "./IntroSection.module.css";

export function IntroSection() {
  return (
    <section className={styles.section} aria-label="Intro" data-intro>
      <p className={styles.role} data-intro-role>{identity.role}</p>
      <h1 className={styles.name} data-intro-name>{identity.name}</h1>
      <span className={styles.rule} aria-hidden="true" data-intro-rule />
      <p className={styles.framing} data-intro-framing>{identity.framing}</p>
      <p className={styles.cue} data-intro-cue>
        <span className={styles.cueLine} aria-hidden="true" data-intro-cue-line />
        {identity.selectedWorkCue}
      </p>
    </section>
  );
}
