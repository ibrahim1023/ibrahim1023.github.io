import {
  comparisonRows,
  evidenceObjects,
  mismatch,
} from "@/content/portfolioContent";

import styles from "./SettleDiff.module.css";

export function EvidenceMap() {
  return (
    <>
      <div className={styles.evidence} data-evidence>
        <svg
          className={styles.connectors}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 50 45 L 16 22" />
          <path d="M 50 45 L 16 70" />
          <path d="M 50 45 L 46 16" />
          <path d="M 50 45 L 46 76" />
          <path d="M 50 45 L 74 22" />
          <path d="M 50 45 L 74 70" />
        </svg>
        <ul className={styles.evidenceList}>
          {evidenceObjects.map((object) => (
            <li
              key={object.id}
              className={styles.evidenceItem}
              data-evidence-item={object.id}
            >
              <span className={styles.evidenceLabel}>{object.label}</span>
              <span className={styles.evidencePrimary}>{object.primary}</span>
              <span className={styles.evidenceDetail}>{object.detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.comparison} data-comparison>
        <table className={styles.comparisonTable}>
          <caption className={styles.comparisonCaption}>
            Expected versus observed evidence
          </caption>
          <thead>
            <tr>
              <th scope="col">Aspect</th>
              <th scope="col">EXPECTED</th>
              <th scope="col">OBSERVED</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.id} data-comparison-row={row.id}>
                <th scope="row">{row.aspect}</th>
                <td>{row.expected}</td>
                <td
                  className={
                    row.matches ? undefined : styles.comparisonMismatch
                  }
                >
                  {row.observed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.mismatch} data-mismatch>
        <p className={styles.mismatchValues}>
          <span>{mismatch.expected}</span>
          <span className={styles.mismatchOperator} aria-label="does not equal">
            ≠
          </span>
          <span>{mismatch.observed}</span>
        </p>
        <p className={styles.mismatchExplanation}>{mismatch.explanation}</p>
      </div>
    </>
  );
}
