import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blogs", "/products", "/contact"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
