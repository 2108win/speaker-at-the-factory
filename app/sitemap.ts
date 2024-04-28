import { Blog } from "@/interfaces/blog";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://loataixuong.com";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
const type = process.env.NEXT_PUBLIC_SERVER_URL ? "server" : "local";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogsData = await fetch(`${serverUrl}/Blog/getList?type=${type}`);
  const blogs: Blog[] = await blogsData.json();

  const blogEntries = blogs.map((blog: Blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.createdAt),
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2024-03-01"),
    },
    ...blogEntries,
  ];
}
