import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://engatuny-tours.netlify.app";

  return [
    "",
    "/about",
    "/tours",
    "/blog",
    "/contact",
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
