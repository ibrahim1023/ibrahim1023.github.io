import { withBasePath } from "@/lib/deployment/basePath";

import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return <header className={styles.header}>
    <a className={styles.name} href={withBasePath("/")}>Ibrahim Arshad</a>
    <a className={styles.resume} href={withBasePath("/ibrahim-arshad-resume.pdf")} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
  </header>;
}
