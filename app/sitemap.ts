import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mohammed-asfar.netlify.app";

// Homepage section anchors — surfaced so search engines see the page structure.
const sections = ["about", "projects", "skills", "services", "experience", "process", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sections.map((section) => ({
      url: `${siteUrl}/#${section}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
