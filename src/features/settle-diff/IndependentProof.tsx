import { publicVerification, settleDiff, verificationChecks, verificationSystem } from "@/content/portfolioContent";
import styles from "./SettleDiff.module.css";

export function IndependentProof({ layout }: { layout: "desktop" | "mobile" }) {
  return <>
    <section className={styles.systemBoundary} data-animatable data-system-boundary>
      <span>{verificationSystem.eyebrow}</span><h3>{verificationSystem.headline}</h3><p>{verificationSystem.detail}</p>
      <div className={styles.railLabels}>{verificationSystem.rails.map((rail) => <span key={rail} data-animatable data-rail-label>{rail}</span>)}</div>
    </section>
    <section className={styles.proof} data-proof data-layout={layout}>
      <header data-animatable data-proof-header><span>{publicVerification.eyebrow}</span><h3>{publicVerification.headline}</h3><p>{publicVerification.scope}</p></header>
      <div className={styles.proofRecords}>
        <article data-animatable data-meaningful-object data-provider-record><span>{publicVerification.provider.label}</span><strong>{publicVerification.provider.title}</strong><p>{publicVerification.provider.detail}</p><small>{publicVerification.provider.provenance}</small></article>
        <span className={styles.proofLink} aria-hidden="true" data-animatable data-proof-link>≠</span>
        <article data-animatable data-meaningful-object data-independent-record><span>{publicVerification.independent.label}</span><strong>{publicVerification.independent.title}</strong><p>{publicVerification.independent.detail}</p><small>{publicVerification.independent.provenance}</small></article>
      </div>
    </section>
    <section className={styles.checks} data-animatable data-checks><span>DETERMINISTIC VERIFICATION</span><ol>{verificationChecks.map((check) => <li key={check} data-animatable data-check>{check}</li>)}</ol><p>{publicVerification.checkSummary}</p></section>
    <section className={styles.verified} data-animatable data-verified><span>{publicVerification.eyebrow}</span><strong>{publicVerification.verdict}</strong><p data-animatable data-closing-thesis>{settleDiff.closingThesis}</p><small>{publicVerification.modelSummary}</small></section>
  </>;
}
