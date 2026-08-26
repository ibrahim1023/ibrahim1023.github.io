import styles from "./ProjectSourceLink.module.css";

export function ProjectSourceLink({
  href,
  project,
}: {
  href: string;
  project: string;
}) {
  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${project} source on GitHub`}
    >
      <span aria-hidden="true">↗</span>
    </a>
  );
}
