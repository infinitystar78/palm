import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./LegalPage.module.css";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  page: "terms" | "privacy";
  title: string;
  introduction: string;
  sections: LegalSection[];
};

export default function LegalPage({
  page,
  title,
  introduction,
  sections
}: LegalPageProps) {
  return (
    <div className={`page-shell ${styles.shell}`} id="top">
      <a className={styles.skipLink} href="#legal-content">
        Skip to {title.toLowerCase()}
      </a>

      <header className={`site-header ${styles.header}`}>
        <Link href="/" className="brand-mark" aria-label="Palm home">
          <span className="brand-glyph" aria-hidden="true">P</span>
          <span>Palm</span>
        </Link>
        <nav className={styles.pageNavigation} aria-label="Legal pages">
          <Link href="/terms" aria-current={page === "terms" ? "page" : undefined}>
            Terms
          </Link>
          <Link href="/privacy" aria-current={page === "privacy" ? "page" : undefined}>
            Privacy
          </Link>
        </nav>
      </header>

      <main id="legal-content" className={styles.main} tabIndex={-1}>
        <div className={styles.introduction}>
          <p className="section-label">Palm · Avantra Services Ltd</p>
          <h1>{title}</h1>
          <p className={styles.lead}>{introduction}</p>
          <p className={styles.date}>Effective 26 October 2026</p>
        </div>

        <div className={styles.readingLayout}>
          <nav className={styles.contents} aria-label="On this page">
            <h2>On this page</h2>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <article className={styles.content} aria-label={title}>
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id} tabIndex={-1}>{section.title}</h2>
                {section.content}
              </section>
            ))}

            <a className={styles.backToTop} href="#top">Back to top ↑</a>
          </article>
        </div>
      </main>
    </div>
  );
}
