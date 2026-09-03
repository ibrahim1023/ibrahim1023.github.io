import styles from "./CaseZero.module.css";

export function SettleToCaseZeroTransition({ layout }: { layout: "desktop" | "mobile" }) {
  return (
    <section className={styles.settleTransition} data-animatable data-settle-case-transition data-layout={layout}>
      <div data-animatable data-verified-evidence-token data-scene-primary>VERIFIED EVIDENCE</div>
      <p data-animatable data-casezero-bridge-copy>
        Evidence can be verified.<br />
        Can an investigation stay blind to the answer?
      </p>
    </section>
  );
}
