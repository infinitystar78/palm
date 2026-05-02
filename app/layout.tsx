import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://getpalm.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Palm",
    template: "%s | Palm"
  },
  description: "Private palm readings and compatibility scans.",
  openGraph: {
    title: "Palm",
    description: "Private palm readings and compatibility scans.",
    url: siteUrl,
    siteName: "Palm",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
