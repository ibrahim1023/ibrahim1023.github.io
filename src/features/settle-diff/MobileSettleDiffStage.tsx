import {
  mismatch,
  projectLinks,
  reasoningChain,
  settleDiff,
} from "@/content/portfolioContent";
import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";
import { VaultTransitionOverlay } from "../vault-steward/VaultTransitionOverlay";

import { MobileEvidenceRail } from "./MobileEvidenceRail";
import styles from "./MobileSettleDiff.module.css";

export function MobileSettleDiffStage() {
  return (
    <div className={styles.stage} data-animatable data-stage data-layout="mobile">
      <header className={styles.header} data-stage-header data-animatable>
        <div className={styles.titleRow}>
          <h2>{settleDiff.title}</h2>
          <ProjectSourceLink href={projectLinks.settleDiff} project={settleDiff.title} />
        </div>
        <p>{settleDiff.descriptor}</p>
      </header>

      <section className={styles.requestPath} data-transaction data-animatable>
        <h3>Request path</h3>
        <p>
          <strong>{settleDiff.agentLabel}</strong>
          <span aria-hidden="true">→</span>
          <strong>{settleDiff.serviceLabel}</strong>
        </p>
        <p>
          {settleDiff.requestAmount} request · {settleDiff.maxBudget} max budget
        </p>
      </section>

      <section className={styles.activity} data-attempt data-animatable>
        <h3>Activity status</h3>
        <p>
          <strong>{settleDiff.attemptLabel}</strong>
          <span>{settleDiff.activityStatus}</span>
        </p>
        <p>{settleDiff.attemptQualifier}</p>
      </section>

      <MobileEvidenceRail />

      <section className={styles.conflict} data-mismatch data-animatable>
        <h3>Chain conflict</h3>
        <p>
          <strong>{mismatch.expected}</strong>
          <span aria-label="does not equal">≠</span>
          <strong>{mismatch.observed}</strong>
        </p>
        <p>{mismatch.explanation}</p>
      </section>

      <section className={styles.verdict} data-mobile-verdict data-verdict data-animatable>
        <h3>{settleDiff.verdict}</h3>
        <p>{settleDiff.verdictReason}</p>
      </section>

      <section className={styles.reasoning} data-chain data-animatable>
        <h3>Reasoning</h3>
        <ol>
          {reasoningChain.map((step) => (
            <li key={step.id} data-chain-item={step.id} data-animatable>
              <strong>{step.label}</strong>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <VaultTransitionOverlay className={styles.transition} />
    </div>
  );
}
