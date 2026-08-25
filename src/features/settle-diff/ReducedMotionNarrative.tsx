import {
  comparisonRows,
  evidenceObjects,
  mismatch,
  reasoningChain,
  settleDiff,
  vaultSteward,
} from "@/content/portfolioContent";

import styles from "./ReducedMotionNarrative.module.css";

export function ReducedMotionNarrative() {
  return (
    <div className={styles.narrative}>
      <h2 className={styles.projectTitle}>{settleDiff.title}</h2>

      <section className={styles.panel}>
        <h3>Request</h3>
        <p>
          A {settleDiff.requestAmount} request travels from agent to service
          (max budget {settleDiff.maxBudget}).
        </p>
      </section>

      <section className={styles.panel}>
        <h3>Activity recorded</h3>
        <p>
          An activity record exists for the attempt. A record is not proof of
          settlement.
        </p>
      </section>

      <section className={styles.panel}>
        <h3>Evidence</h3>
        <ul className={styles.evidenceList}>
          {evidenceObjects.map((object) => (
            <li key={object.id}>
              <strong>{object.label}</strong> — {object.primary} (
              {object.detail})
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.panel}>
        <h3>Expected vs observed</h3>
        <table className={styles.table}>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.aspect}</th>
                <td>{row.expected}</td>
                <td>{row.observed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.panel}>
        <h3>Chain mismatch</h3>
        <p>
          <strong>{mismatch.expected}</strong> ≠ <strong>{mismatch.observed}</strong> —{" "}
          {mismatch.explanation}
        </p>
      </section>

      <section className={styles.panel}>
        <h3>UNVERIFIABLE</h3>
        <p>{settleDiff.verdictReason}</p>
      </section>

      <section className={styles.panel}>
        <h3>Reasoning</h3>
        <ol className={styles.chain}>
          {reasoningChain.map((step) => (
            <li key={step.id}>
              <strong>{step.label}</strong> — {step.text}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.panel}>
        <h3>Vault Steward transformation</h3>
        <ul className={styles.mapping}>
          {vaultSteward.objectMapping.map((entry) => (
            <li key={entry.from}>
              {entry.from} → {entry.to}
            </li>
          ))}
        </ul>
        <p className={styles.rail}>{vaultSteward.rail.join(" → ")}</p>
      </section>
    </div>
  );
}
