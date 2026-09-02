import { originIncident, reconstructionLayers } from "@/content/portfolioContent";
import styles from "./SettleDiff.module.css";

export function EvidenceReconstruction({ layout }: { layout: "desktop" | "mobile" }) {
  return <>
    <section className={styles.reconstruction} data-animatable data-reconstruction data-layout={layout}>
      <header><span>RECONSTRUCT</span><h3>What was promised, executed, and recorded?</h3></header>
      <ol>{reconstructionLayers.map((layer) => (
        <li key={layer.id} data-animatable data-meaningful-object data-reconstruction-layer={layer.id}>
          <span>{layer.label}</span><strong>{layer.title}</strong><small>{layer.detail}</small>
        </li>
      ))}</ol>
    </section>
    <section className={styles.originIncident} data-animatable data-origin-incident>
      <span>{originIncident.eyebrow}</span><h3>{originIncident.headline}</h3>
      <p>{originIncident.decisiveFinding}</p>
      <ul aria-label="Historical incident evidence">{originIncident.technical.map((item) => <li key={item}>{item}</li>)}</ul>
      <strong>{originIncident.verdict}</strong>
    </section>
  </>;
}
