import { settleDiff } from "@/content/portfolioContent";

import styles from "./SettleDiff.module.css";

export function TransactionPath() {
  return (
    <div className={styles.transaction} data-transaction data-animatable>
      <span className={styles.anchor} data-agent>
        {settleDiff.agentLabel}
      </span>
      <svg
        className={styles.pathSvg}
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-path
        data-animatable
      >
        <path
          className={styles.pathLine}
          d="M 20 46 L 980 46"
          data-path-line
          data-animatable
        />
        <path className={styles.pathReturn} d="M 980 86 L 20 86" />
      </svg>
      <span className={styles.token} data-token data-animatable>
        {settleDiff.requestAmount}
      </span>
      <span className={styles.budget} data-budget>
        {settleDiff.maxBudget} MAX
      </span>
      <span className={styles.return} data-return>
        <strong>{settleDiff.returnLabel}</strong>
        <span>{settleDiff.returnDetail}</span>
      </span>
      <span className={styles.anchor} data-service>
        {settleDiff.serviceLabel}
      </span>
    </div>
  );
}
