import { reasoningChain } from "@/content/portfolioContent";

import styles from "./SettleDiff.module.css";

export function ReasoningRail() {
  return (
    <ol className={styles.chain} data-chain data-animatable>
      {reasoningChain.map((step) => (
        <li
          key={step.id}
          className={styles.chainItem}
          data-chain-item={step.id}
          data-animatable
        >
          <span className={styles.chainLabel}>{step.label}</span>{" "}
          <span className={styles.chainText}>{step.text}</span>
        </li>
      ))}
    </ol>
  );
}
