import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://getpalm.app").replace(/\/$/, "");

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    ...["terms", "privacy"].map((page) => ({
      url: `${siteUrl}/${page}`,
      lastModified: new Date("2026-10-26T00:00:00Z"),
      changeFrequency: "yearly" as const,
      priority: 0.3
    }))
  ];
}

