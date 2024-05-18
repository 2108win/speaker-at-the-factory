import { Product } from "@/interfaces/product";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
const type = process.env.NEXT_PUBLIC_SERVER_URL ? "server" : "local";

export async function getListProduct() {
  const res = await fetch(`${baseUrl}/Product/getList`);

  return res.json() as Promise<Product[]>;
}

export async function getOneProduct(slug: string) {
  const res = await fetch(`${baseUrl}/Product/getOneSlug/${slug}?type=server`);

  return res.json() as Promise<Product>;
}

export async function getImageProduct(slug: string) {
  const data = await getOneProduct(slug);
  return data.images[0] || "";
}
