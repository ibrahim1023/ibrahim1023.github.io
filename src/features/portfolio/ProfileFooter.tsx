import styles from "./ProfileFooter.module.css";

export const profiles = [
  { label: "GitHub", href: "https://github.com/ibrahim1023" },
  { label: "X", href: "https://x.com/Ibrahim__Arshad" },
  { label: "Medium", href: "https://medium.com/@ibrahim.a.motiwala" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ibrahim-arshad-23355a166/" },
] as const;

export function ProfileFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <h2>Find me elsewhere</h2>
        <nav aria-label="Social profiles">
          {profiles.map(({ label, href }) => <a key={label} href={href} aria-label={`${label} (opens in a new tab)`} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true"> ↗</span></a>)}
        </nav>
      </div>
    </footer>
  );
}
