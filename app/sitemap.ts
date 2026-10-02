import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/properties";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/properties`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/agents`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const propertyPages: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${SITE.url}/properties/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...propertyPages, ...blogPages];
}
