import {
  comparisonRows,
  evidenceObjects,
  mismatch,
} from "@/content/portfolioContent";

import styles from "./SettleDiff.module.css";

export function EvidenceMap() {
  return (
    <>
      <div className={styles.evidence} data-evidence data-animatable>
        <svg
          className={styles.connectors}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 50 45 L 16 22" data-evidence-connector />
          <path d="M 50 45 L 16 70" data-evidence-connector />
          <path d="M 50 45 L 46 16" data-evidence-connector />
          <path d="M 50 45 L 46 76" data-evidence-connector />
          <path d="M 50 45 L 74 22" data-evidence-connector />
          <path d="M 50 45 L 74 70" data-evidence-connector />
        </svg>
        <ul className={styles.evidenceList}>
          {evidenceObjects.map((object) => (
            <li
              key={object.id}
              className={styles.evidenceItem}
              data-evidence-item={object.id}
              data-animatable
            >
              <span className={styles.evidenceLabel} data-object-label="settle">
                {object.label}
              </span>
              <span className={styles.evidencePrimary}>{object.primary}</span>
              <span className={styles.evidenceDetail}>{object.detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.comparison} data-comparison data-animatable>
        <table className={styles.comparisonTable}>
          <caption className={styles.comparisonCaption}>
            Expected versus observed evidence
          </caption>
          <thead>
            <tr>
              <th scope="col">Aspect</th>
              <th scope="col">EXPECTED</th>
              <th scope="col">OBSERVED</th>
              <th scope="col">CLASSIFICATION</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.id} data-comparison-row={row.id}>
                <th scope="row">{row.aspect}</th>
                <td>{row.expected}</td>
                <td>{row.observed}</td>
                <td className={styles[row.classification.toLowerCase()]}>
                  <span data-classification={row.classification}>
                    {row.classification}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.mismatch} data-mismatch data-animatable>
        <h3 className={styles.mismatchHeading}>Chain conflict</h3>
        <p className={styles.mismatchValues}>
          <span>{mismatch.expected}</span>
          <span className={styles.mismatchOperator} aria-label="does not equal">
            ≠
          </span>
          <span>{mismatch.observed}</span>
        </p>
        <p className={styles.mismatchExplanation}>
          {mismatch.explanation} Missing settlement proof remains visible: no
          confirmed charge and no transaction hash.
        </p>
      </div>
    </>
  );
}
