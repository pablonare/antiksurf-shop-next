import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://antiksurf.com",
      lastModified: new Date(),
    },
    {
      url: "https://antiksurf.com/surftrips",
      lastModified: new Date(),
    },
    {
      url: "https://antiksurf.com/events",
      lastModified: new Date(),
    },
    {
      url: "https://antiksurf.com/shop",
      lastModified: new Date(),
    },
  ];
}