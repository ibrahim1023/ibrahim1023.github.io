import { publicVerification, settleDiff } from "@/content/portfolioContent";
import styles from "./SettleDiff.module.css";

export function TransactionArtifact({ layout }: { layout: "desktop" | "mobile" }) {
  return (
    <div className={styles.artifactScene} data-animatable data-transaction data-artifact-scene>
      <span className={styles.pathOrigin} aria-hidden="true" data-path-origin data-animatable />
      <div className={styles.route} aria-hidden="true">
        <span>{settleDiff.agentLabel}</span><span className={styles.routeLine} data-route-line data-animatable /><span>{settleDiff.serviceLabel}</span>
      </div>
      <article className={styles.artifact} data-artifact data-animatable data-layout={layout} data-meaningful-object>
        <span className={styles.artifactLabel}>PURCHASE</span>
        <strong data-artifact-status>Authorized request</strong>
        <span>{publicVerification.amount}</span>
      </article>
      <p className={styles.openingPrompt} data-opening-prompt data-animatable>{settleDiff.openingPrompt}</p>
    </div>
  );
}
