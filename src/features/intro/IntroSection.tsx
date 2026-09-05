import { identity } from "@/content/portfolioContent";
import { withBasePath } from "@/lib/deployment/basePath";

import styles from "./IntroSection.module.css";

export function IntroSection() {
  return (
    <section className={styles.section} aria-label="Intro" data-intro>
      <p className={styles.role} data-intro-role data-animatable>{identity.role}</p>
      <h1 className={styles.name} data-intro-name data-animatable>{identity.name}</h1>
      <span className={styles.rule} aria-hidden="true" data-intro-rule data-animatable />
      <p className={styles.framing} data-intro-framing data-animatable>I’m an AI systems engineer focused on verification, evaluation, and human control. I build tools that check agent payments, trace findings to source evidence, and require approval before making changes.</p>
      <a className={styles.resume} href={withBasePath("/ibrahim-arshad-resume.pdf")} target="_blank" rel="noopener noreferrer">View résumé ↗</a>
      <p className={styles.cue} data-intro-cue data-animatable>
        <span className={styles.handoffTrack} aria-hidden="true" data-handoff-track>
          <span className={styles.cueLine} data-intro-cue-line data-animatable />
        </span>
        {identity.selectedWorkCue}
      </p>
    </section>
  );
}
