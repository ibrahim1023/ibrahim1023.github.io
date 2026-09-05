import { caseZero, caseZeroMetrics, contextDevUsage, externalLinks } from "@/content/portfolioContent";
import styles from "./CaseZero.module.css";

export function CaseFile({ layout }: { layout: "desktop" | "mobile" }) {
  return (
    <article className={styles.caseFile} data-animatable data-case-file data-layout={layout} data-foreground-object>
      <header>
        <span>CASEZERO · PUBLIC NTSB DOCKET</span>
        <strong>{caseZero.acquisition}</strong>
        <small>{caseZeroMetrics.caseId} · measured {caseZeroMetrics.measuredOn}</small>
        <a href={externalLinks.contextDev} target="_blank" rel="noreferrer">
          {contextDevUsage.caseZero}
        </a>
      </header>
      <ol aria-label="Evidence lineage">
        <li data-animatable data-evidence-layer><span>01</span><strong>SOURCE</strong><small>{caseZeroMetrics.processedSources} processed public sources</small></li>
        <li data-animatable data-evidence-layer><span>02</span><strong>LOCATOR</strong><small>{caseZeroMetrics.pdfLocated} PDF · {caseZeroMetrics.tableLocated} table</small></li>
        <li data-animatable data-evidence-layer><span>03</span><strong>EVIDENCE</strong><small>{caseZeroMetrics.evidenceItems} typed items</small></li>
      </ol>
      <p>{caseZero.evidence}</p>
    </article>
  );
}
