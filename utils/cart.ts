const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
const type = process.env.NEXT_PUBLIC_SERVER_URL ? "server" : "local";

export type ProductId = {
  Id: string;
  Qty: number;
};
export type CartId = {
  CusToken: string;
  CusName: string;
  ItemsId: ProductId[];
};

export type Cart = {
  cusName: string;
  createdAt: string;
};

export async function addToCart(cart: CartId) {
  const res = await fetch(`${baseUrl}/Cart/addCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });

  return res.json() as Promise<CartId[]>;
}

export async function getListCart(id: string) {
  const res = await fetch(`${baseUrl}/Cart/getList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ CusToken: id }),
  });
  if (!res.ok) {
    throw new Error("Có lỗi xảy ra, vui hãy thử lại sau!");
  }
  return res.json() as Promise<Cart[]>;
}
