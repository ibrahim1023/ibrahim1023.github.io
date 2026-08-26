import {
  comparisonRows,
  evidenceObjects,
} from "@/content/portfolioContent";

import styles from "./MobileSettleDiff.module.css";

export function MobileEvidenceRail() {
  return (
    <>
      <ol className={styles.evidenceRail} data-mobile-evidence data-evidence data-animatable>
        {evidenceObjects.map((object) => (
          <li
            key={object.id}
            data-mobile-evidence-item={object.id}
            data-evidence-item={object.id}
            data-animatable
          >
            <span>{object.label}</span>
            <strong>{object.primary}</strong>
            <small>{object.detail}</small>
          </li>
        ))}
      </ol>

      <section className={styles.comparison} data-mobile-comparison data-comparison data-animatable>
        <h3>Expected versus observed evidence</h3>
        <dl>
          {comparisonRows.map((row) => (
            <div key={row.id} data-comparison-row={row.id}>
              <dt>{row.aspect}</dt>
              <dd>
                <span>Expected</span>
                <strong>{row.expected}</strong>
              </dd>
              <dd>
                <span>Observed</span>
                <strong>{row.observed}</strong>
              </dd>
              <dd>
                <span data-classification={row.classification}>
                  {row.classification}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
