import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="site-header" aria-label="Palm">
        <Link href="/" className="brand-mark" aria-label="Palm home">
          <span className="brand-glyph" aria-hidden="true">P</span>
          <span>Palm</span>
        </Link>
      </header>

      <section className="home-hero">
        <div className="hero-copy">
          <p className="section-label">Private readings</p>
          <h1>Understand the pattern behind the palm.</h1>
          <p>
            Palm is being prepared for invite links, compatibility scans, and
            App Clip access from getpalm.app.
          </p>
          <Link className="button primary" href="/invite/demo">
            Preview invite
          </Link>
        </div>

        <div className="palm-stage" aria-hidden="true">
          <img src="/palm-mark.svg" alt="" />
        </div>
      </section>
    </main>
  );
}

