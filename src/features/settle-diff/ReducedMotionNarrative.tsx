import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";
import { originIncident, projectLinks, publicVerification, reconstructionLayers, settleDiff, vaultSteward, verificationChecks, verificationSystem } from "@/content/portfolioContent";
import styles from "./ReducedMotionNarrative.module.css";

export function ReducedMotionNarrative() {
  return <div className={styles.narrative}>
    <header className={styles.projectHeader}><h2>{settleDiff.title}</h2><ProjectSourceLink href={projectLinks.settleDiff} project={settleDiff.title} /><p>{settleDiff.descriptor}</p></header>
    <section className={styles.panel}><h3>Purchase</h3><p>{settleDiff.openingPrompt} {settleDiff.uncertainty}</p></section>
    <section className={styles.panel}><h3>Promised, executed, recorded</h3><ol>{reconstructionLayers.map((layer) => <li key={layer.id}><strong>{layer.label}</strong> — {layer.detail}</li>)}</ol></section>
    <section className={styles.panel}><h3>Original incident</h3><p>{originIncident.headline} {originIncident.decisiveFinding}</p><p><strong>{originIncident.verdict}</strong> · {originIncident.technical.join(" · ")}</p></section>
    <section className={styles.panel}><h3>One verification system</h3><p>{verificationSystem.headline} {verificationSystem.detail}</p><p>{verificationSystem.rails.join(" · ")}</p></section>
    <section className={styles.panel}><h3>Provider receipt and independent record</h3><p><strong>{publicVerification.provider.label}</strong> — {publicVerification.provider.detail}</p><p><strong>{publicVerification.independent.label}</strong> — {publicVerification.independent.detail}</p><p>{publicVerification.scope}</p></section>
    <section className={styles.panel}><h3>Deterministic checks</h3><ol>{verificationChecks.map((check) => <li key={check}>{check} — PASS</li>)}</ol><p>{publicVerification.checkSummary}</p></section>
    <section className={styles.panel}><h3>{publicVerification.verdict}</h3><p>{settleDiff.closingThesis}</p><p>{publicVerification.modelSummary}</p></section>
    <section className={styles.panel}><h3>Vault Steward arrival</h3><p>{vaultSteward.headline}</p><p>{vaultSteward.descriptor}</p><p>{vaultSteward.rail.join(" → ")}</p><ProjectSourceLink href={projectLinks.vaultSteward} project={vaultSteward.title} /></section>
  </div>;
}
