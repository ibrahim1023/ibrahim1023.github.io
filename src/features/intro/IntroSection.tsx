import { identity } from "@/content/portfolioContent";

import styles from "./IntroSection.module.css";

export function IntroSection() {
  return (
    <section className={styles.section} aria-label="Intro" data-intro>
      <p className={styles.role}>{identity.role}</p>
      <h1 className={styles.name}>Building trust into AI systems.</h1>
      <p className={styles.framing}>I’m Ibrahim Arshad, an AI systems engineer focused on verification, evaluation, and human control. I build tools that check agent payments, trace findings to source evidence, and require approval before making changes.</p>
      <a className={styles.jump} href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
    </section>
  );
}
