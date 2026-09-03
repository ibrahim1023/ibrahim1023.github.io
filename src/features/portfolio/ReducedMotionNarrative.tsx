import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";
import { caseZero, caseZeroMetrics, contextDevUsage, externalLinks, originIncident, projectLinks, publicVerification, reconstructionLayers, settleDiff, vaultSteward, verificationChecks, verificationSystem } from "@/content/portfolioContent";
import styles from "./ReducedMotionNarrative.module.css";

export function ReducedMotionNarrative() {
  return <div className={styles.narrative}>
    <section className={styles.chapter} aria-label="SettleDiff reduced narrative">
      <header className={styles.projectHeader}><h2>{settleDiff.title}</h2><ProjectSourceLink href={projectLinks.settleDiff} project={settleDiff.title} /><p>{settleDiff.descriptor}</p></header>
      <div className={styles.panel}><h3>Purchase</h3><p>{settleDiff.openingPrompt} {settleDiff.uncertainty}</p></div>
      <div className={styles.panel}><h3>Promised, executed, recorded</h3><ol>{reconstructionLayers.map((layer) => <li key={layer.id}><strong>{layer.label}</strong> — {layer.detail}</li>)}</ol></div>
      <div className={styles.panel}><h3>Original incident</h3><p>{originIncident.headline} {originIncident.decisiveFinding}</p><p><strong>{originIncident.verdict}</strong> · {originIncident.technical.join(" · ")}</p></div>
      <div className={styles.panel}><h3>One verification system</h3><p>{verificationSystem.headline} {verificationSystem.detail}</p><a href={externalLinks.contextDev}>{contextDevUsage.settleDiff}</a></div>
      <div className={styles.panel}><h3>Provider receipt and independent record</h3><p><strong>{publicVerification.provider.label}</strong> — {publicVerification.provider.detail}</p><p><strong>{publicVerification.independent.label}</strong> — {publicVerification.independent.detail}</p><p>{publicVerification.scope}</p></div>
      <div className={styles.panel}><h3>Deterministic checks</h3><p>{verificationChecks.join(" · ")}</p><p>{publicVerification.checkSummary}</p></div>
      <div className={styles.verdict}><h3>{publicVerification.verdict}</h3><p>{settleDiff.closingThesis}</p></div>
    </section>

    <section className={`${styles.chapter} ${styles.caseZero}`} aria-label="CaseZero reduced narrative">
      <header className={styles.projectHeader}><h2>{caseZero.title}</h2><ProjectSourceLink href={projectLinks.caseZero} project={caseZero.title} /><p>{caseZero.descriptor}</p><small>{caseZero.qualifier}</small></header>
      <div className={styles.panel}><h3>Public docket</h3><p>{caseZero.acquisition}</p><p>{caseZeroMetrics.caseId} · measured {caseZeroMetrics.measuredOn} · {caseZeroMetrics.evidenceItems} evidence items</p><a href={externalLinks.contextDev}>{contextDevUsage.caseZero}</a></div>
      <div className={styles.lineage} aria-label="Evidence lineage"><span>SOURCE</span><i>→</i><span>LOCATOR</span><i>→</i><span>EVIDENCE</span></div>
      <div className={styles.sealed}><div><small>GENERATED ASSESSMENT</small><strong>Evidence-bound</strong></div><b>THE ANSWER IS OUTSIDE THE ROOM</b><div><small>OFFICIAL NTSB FINDING</small><strong>SEALED UNTIL LOCK</strong></div></div>
      <div className={styles.climax}>{caseZero.climax}</div>
      <div className={styles.panel}><h3>Lock record</h3><p>{caseZero.lock}</p><p>Assessment hash · evidence-set hash · model versions · prompt versions</p><small>Implemented lock infrastructure</small></div>
    </section>

    <section className={styles.chapter} aria-label="Vault Steward reduced narrative">
      <header className={styles.projectHeader}><h2>{vaultSteward.title}</h2><ProjectSourceLink href={projectLinks.vaultSteward} project={vaultSteward.title} /><p>{vaultSteward.headline}</p></header>
      <div className={styles.panel}><p>{vaultSteward.descriptor}</p><p>{vaultSteward.rail.join(" → ")}</p></div>
    </section>
  </div>;
}
