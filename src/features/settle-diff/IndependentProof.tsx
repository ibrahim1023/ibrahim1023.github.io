import { currentPerfloValidation, externalLinks, laterValidation, paidDeliveryFailure, publicVerification, settleDiff } from "@/content/portfolioContent";
import styles from "./SettleDiff.module.css";
import { ProjectDetailsLink } from "@/components/projects/ProjectDetailsLink";

export function IndependentProof({ layout }: { layout: "desktop" | "mobile" }) {
  return <>
    <section className={styles.systemBoundary} data-animatable data-system-boundary>
      <span>PERFLO · PROVIDER EVIDENCE</span><h3>Agreement is useful. It is not independence.</h3><p>SettleDiff preserves what the provider can establish without promoting it into customer-settlement proof.</p>
      <div className={styles.railLabels}>
        <article data-animatable data-rail-label data-historical-perflo><span>{laterValidation.eyebrow}</span><strong>{laterValidation.title}</strong><p>{laterValidation.evidence}</p><small>{laterValidation.verdict}</small><em>{laterValidation.warning}</em></article>
        <article data-animatable data-rail-label data-current-perflo><span>{currentPerfloValidation.eyebrow}</span><strong>{currentPerfloValidation.title}</strong><p>{currentPerfloValidation.evidence}</p><small>{currentPerfloValidation.verdict}</small><em>{currentPerfloValidation.warning}</em><a href={externalLinks.settleDiffCurrentValidation}>September 28 validation</a></article>
      </div>
    </section>
    <section className={styles.proof} data-animatable data-proof data-layout={layout}>
      <header data-animatable data-proof-header><span>{publicVerification.eyebrow}</span><h3>{publicVerification.headline}</h3><p>{publicVerification.amount} · <a className={styles.proofReport} href={externalLinks.settleDiffCurrentValidation}>Read current validation</a></p></header>
      <div className={styles.proofRecords}>
        <article data-animatable data-meaningful-object data-provider-record><span>{publicVerification.provider.label}</span><strong className={styles.validationRoute}>{publicVerification.provider.title}</strong><p className={styles.validationEvidence}>{publicVerification.provider.detail}</p><small>{publicVerification.provider.provenance}</small></article>
        <span className={styles.proofLink} aria-hidden="true" data-animatable data-proof-link>≠</span>
        <article className={styles.independentValidation} data-animatable data-meaningful-object data-independent-record><span>{publicVerification.independent.label}</span><strong className={styles.validationRoute}>{publicVerification.independent.title}</strong><p className={styles.validationEvidence}>{publicVerification.independent.detail}</p><small>{publicVerification.independent.provenance}</small><b className={styles.validationVerdict}>{publicVerification.verdict}</b></article>
      </div>
      <p className={styles.checkSummary}>{publicVerification.checkSummary}</p>
    </section>
    <section className={`${styles.checks} ${styles.deliveryFailure}`} data-animatable data-checks data-paid-delivery-failure><span>{paidDeliveryFailure.eyebrow}</span><h3>{paidDeliveryFailure.headline}</h3><div className={styles.deliveryGrid}><p data-animatable data-check><strong>SETTLEMENT</strong>{paidDeliveryFailure.settlement}</p><p data-animatable data-check><strong>DELIVERY CONTRACT</strong>{paidDeliveryFailure.delivery}</p></div><div className={styles.deliveryVerdict}><strong>{paidDeliveryFailure.verdict}</strong><b>{paidDeliveryFailure.retry}</b></div><small>{paidDeliveryFailure.caveat}</small><a className={styles.proofReport} href={externalLinks.settleDiffCurrentValidation}>Read the September 28 validation</a></section>
    <section className={`${styles.verified} ${styles.evidenceVerdict}`} data-animatable data-verified><span>DETERMINISTIC VERDICT</span><strong>EVIDENCE DECIDES</strong><p data-animatable data-closing-thesis>{settleDiff.closingThesis}</p><small>No provider, Activity record, or model is treated as financial truth.</small><ProjectDetailsLink slug="settlediff" /></section>
  </>;
}
