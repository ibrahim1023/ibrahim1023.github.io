import { caseZero } from "@/content/portfolioContent";
import styles from "./CaseZero.module.css";
import { ProjectDetailsLink } from "@/components/projects/ProjectDetailsLink";

const fields = ["assessment hash", "evidence-set hash", "model versions", "prompt versions"] as const;

export function LockRecord({ layout }: { layout: "desktop" | "mobile" }) {
  return (
    <article className={styles.lockRecord} data-animatable data-lock-record data-layout={layout} data-scene-primary data-foreground-object>
      <header><span>LOCK RECORD</span><strong>{caseZero.lock}</strong></header>
      <ul>{fields.map((field) => <li key={field}><span>{field}</span><b>RECORDED</b></li>)}</ul>
      <small>Implemented lock infrastructure · outcome evaluation pending</small>
      <ProjectDetailsLink slug="casezero" />
    </article>
  );
}
