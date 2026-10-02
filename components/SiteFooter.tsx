import Link from "next/link";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>Palm · Avantra Services Ltd</p>
      <nav aria-label="Footer">
        <Link href="/terms">Terms of Use</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </nav>
    </footer>
  );
}
