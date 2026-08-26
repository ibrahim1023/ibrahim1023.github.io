import {
  comparisonRows,
  evidenceObjects,
  mismatch,
  projectLinks,
  reasoningChain,
  settleDiff,
  vaultSteward,
} from "@/content/portfolioContent";
import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";

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
          <strong>{settleDiff.attemptLabel}</strong> — {settleDiff.activityStatus}. An
          activity record exists for the attempt; it is not proof of settlement.
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
                <td>
                  <span data-classification={row.classification}>
                    {row.classification}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.panel}>
        <h3>Chain conflict</h3>
        <p>
          <strong>{mismatch.expected}</strong> ≠ <strong>{mismatch.observed}</strong> —{" "}
          {mismatch.explanation} Missing settlement proof remains visible: no
          confirmed charge and no transaction hash.
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
        <p className={styles.vaultHeadline}>{vaultSteward.headline}</p>
        <p>{vaultSteward.descriptor}</p>
        <ul className={styles.mapping}>
          {vaultSteward.objectMapping.map((entry) => (
            <li key={entry.from}>
              <span>{entry.from}</span> → <span>{entry.to}</span>
            </li>
          ))}
        </ul>
        <dl className={styles.preview}>
          <div>
            <dt>Current</dt>
            <dd>{vaultSteward.preview.current}</dd>
          </div>
          <div>
            <dt>After</dt>
            <dd>{vaultSteward.preview.after}</dd>
          </div>
        </dl>
        <p>{vaultSteward.preview.expectedResult}</p>
        <p className={styles.rail}>{vaultSteward.rail.join(" → ")}</p>
        <ProjectSourceLink href={projectLinks.vaultSteward} project={vaultSteward.title} />
      </section>
    </div>
  );
}
