import { caseZero } from "@/content/portfolioContent";
import { CaseZeroStage } from "./CaseZeroStage";
import { MobileCaseZeroStage } from "./MobileCaseZeroStage";
import styles from "./CaseZero.module.css";

export function CaseZeroSection() {
  return (
    <section className={styles.section} aria-label={caseZero.title}>
      <div className={styles.desktopBranch} data-animated-layout="desktop"><CaseZeroStage /></div>
      <div className={styles.mobileBranch} data-animated-layout="mobile"><MobileCaseZeroStage /></div>
    </section>
  );
}
