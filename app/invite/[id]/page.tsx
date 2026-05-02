import type { Metadata } from "next";
import Link from "next/link";

type InvitePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://getpalm.app").replace(/\/$/, "");
const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL;
const appStoreId = process.env.NEXT_PUBLIC_APP_STORE_ID;
const appClipBundleId = process.env.NEXT_PUBLIC_APP_CLIP_BUNDLE_ID;

function inviteUrl(id: string) {
  return `${siteUrl}/invite/${encodeURIComponent(id)}`;
}

export async function generateMetadata({
  params
}: InvitePageProps): Promise<Metadata> {
  const { id } = await params;
  const appleBannerParts = [
    appStoreId ? `app-id=${appStoreId}` : undefined,
    `app-argument=${inviteUrl(id)}`,
    appClipBundleId ? `app-clip-bundle-id=${appClipBundleId}` : undefined,
    appClipBundleId ? "app-clip-display=card" : undefined
  ].filter(Boolean);

  return {
    title: "Palm invite",
    description: "Someone invited you to compare palm patterns.",
    openGraph: {
      title: "Palm invite",
      description: "Someone invited you to compare palm patterns.",
      url: inviteUrl(id),
      type: "website"
    },
    other: appleBannerParts.length > 1
      ? {
          "apple-itunes-app": appleBannerParts.join(", ")
        }
      : undefined
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params;

  return (
    <main className="page-shell invite-page">
      <header className="site-header" aria-label="Palm">
        <Link href="/" className="brand-mark" aria-label="Palm home">
          <span className="brand-glyph" aria-hidden="true">P</span>
          <span>Palm</span>
        </Link>
      </header>

      <section className="invite-hero">
        <div className="invite-visual" aria-hidden="true">
          <div className="scan-frame">
            <img src="/palm-mark.svg" alt="" />
            <span className="scan-line" />
          </div>
        </div>

        <div className="invite-copy">
          <p className="section-label">Invite</p>
          <h1>Someone invited you to compare palm patterns.</h1>
          <p>
            Open Palm to scan once and see how your patterns interact. Your
            camera image is not uploaded from this fallback page.
          </p>

          <div className="actions" aria-label="Invite actions">
            <a className="button primary" href={inviteUrl(id)}>
              Open Palm
            </a>
            {appStoreUrl ? (
              <a className="button secondary" href={appStoreUrl}>
                Get Palm
              </a>
            ) : (
              <span className="button secondary disabled" aria-disabled="true">
                App Store link coming soon
              </span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
