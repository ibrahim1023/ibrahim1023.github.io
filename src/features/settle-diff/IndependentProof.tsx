import { externalLinks, laterValidation, originIncident, settleDiff, verificationChecks, verificationSystem } from "@/content/portfolioContent";
import styles from "./SettleDiff.module.css";
import { ProjectDetailsLink } from "@/components/projects/ProjectDetailsLink";

export function IndependentProof({ layout }: { layout: "desktop" | "mobile" }) {
  return <>
    <section className={styles.systemBoundary} data-animatable data-system-boundary>
      <span>{verificationSystem.eyebrow}</span><h3>{verificationSystem.headline}</h3><p>{verificationSystem.detail}</p>
      <div className={styles.railLabels}>{verificationSystem.rails.map((rail) => <span key={rail} data-animatable data-rail-label>{rail}</span>)}</div>
    </section>
    <section className={styles.proof} data-animatable data-proof data-layout={layout}>
      <header data-animatable data-proof-header><span>LIVE VALIDATION CHRONOLOGY</span><h3>One verifier. Stronger evidence.</h3><p><a className={styles.proofReport} href={externalLinks.settleDiffLiveReport}>Historical incident and September 8 follow-up · Read live report ↗</a></p></header>
      <div className={styles.proofRecords}>
        <article className={styles.originValidation} data-animatable data-meaningful-object data-provider-record data-origin-validation><span>{originIncident.eyebrow}</span><strong className={styles.validationRoute}>{originIncident.technical[0]}</strong><p className={styles.validationEvidence}>HTTP 402 · broadcast_failed</p><small className={styles.validationVerdict}>{originIncident.verdict}</small></article>
        <span className={styles.proofLink} aria-hidden="true" data-animatable data-proof-link>→</span>
        <article className={styles.laterValidation} data-animatable data-meaningful-object data-independent-record data-later-validation><span>{laterValidation.eyebrow}</span><strong className={styles.validationRoute}>{laterValidation.route}</strong><p className={styles.validationEvidence}>{laterValidation.evidence}</p><small className={styles.validationVerdict}>{laterValidation.verdict}</small><small className={styles.validationWarning}>{laterValidation.warning}</small></article>
      </div>
    </section>
    <section className={styles.checks} data-animatable data-checks><span>DETERMINISTIC VERIFICATION</span><ol>{verificationChecks.map((check) => <li key={check} data-animatable data-check>{check}</li>)}</ol><p>Deterministic checks assign the verdict; models may explain, never override.</p></section>
    <section className={`${styles.verified} ${styles.evidenceVerdict}`} data-animatable data-verified><span>DETERMINISTIC VERDICT</span><strong>EVIDENCE DECIDES</strong><p data-animatable data-closing-thesis>{settleDiff.closingThesis}</p><small>No provider, Activity record, or model is treated as financial truth.</small><ProjectDetailsLink slug="settlediff" /></section>
  </>;
}
