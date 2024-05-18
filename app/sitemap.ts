import { Blog } from "@/interfaces/blog";
import { Product } from "@/interfaces/product";
import { getListBlog } from "@/utils/fetchBlogs";
import { getListProduct } from "@/utils/fetchProducts";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://loataixuong.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getListBlog();
  const product = await getListProduct();

  const blogEntries = blogs.map((blog: Blog) => ({
    url: `${baseUrl}/blogs/${blog?.slug}`,
    lastModified: new Date(blog?.createdAt),
  }));

  const productEntries = product.map((product: Product) => ({
    url: `${baseUrl}/products/${product?.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2024-03-01"),
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date("2024-03-01"),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date("2024-03-01"),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2024-03-01"),
    },
    ...blogEntries,
    ...productEntries,
  ];
}
