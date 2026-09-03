import { caseZero } from "@/content/portfolioContent";
import styles from "./CaseZero.module.css";

export function BlindBoundary({ layout }: { layout: "desktop" | "mobile" }) {
  return (
    <section className={styles.blindScene} data-animatable data-blind-scene data-layout={layout}>
      <article className={styles.generatedEvidence} data-animatable data-generated-evidence data-foreground-object>
        <span>GENERATED ASSESSMENT</span>
        <strong>Evidence-bound candidate findings</strong>
        <small>Provisional · independently reasoned</small>
      </article>
      <div className={styles.blindBoundary} data-animatable data-blind-boundary data-foreground-object>
        <span>{caseZero.blindness}</span>
      </div>
      <aside className={styles.officialFinding} data-animatable data-official-finding data-foreground-object>
        <span>OFFICIAL NTSB FINDING</span>
        <strong>SEALED UNTIL LOCK</strong>
      </aside>
      <p className={styles.blindClimax} data-animatable data-blind-climax data-scene-primary>
        {caseZero.climax}
      </p>
    </section>
  );
}
